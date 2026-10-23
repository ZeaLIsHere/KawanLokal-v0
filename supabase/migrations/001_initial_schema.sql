-- Migrasi 001: Skema Database Awal KawanLokal
-- RLS aktif di seluruh tabel skema public

-- 1. Enums
CREATE TYPE user_role AS ENUM ('traveler', 'provider', 'admin');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE event_category AS ENUM ('adat', 'keagamaan', 'festival', 'kuliner', 'seni');
CREATE TYPE event_visibility AS ENUM ('public', 'public_with_permission', 'closed');
CREATE TYPE event_status AS ENUM ('draft', 'pending_review', 'published', 'cancelled', 'finished');
CREATE TYPE service_type AS ENUM ('event_ticket', 'guide', 'workshop', 'homestay');
CREATE TYPE booking_status AS ENUM ('pending_payment', 'paid', 'cancelled', 'expired', 'completed', 'refunded');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'expired', 'refunded');
CREATE TYPE ticket_status AS ENUM ('valid', 'used', 'void');

-- 2. Profiles (1:1 auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'traveler',
  language TEXT NOT NULL DEFAULT 'id',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profil dapat dibaca oleh pemilik atau admin"
  ON profiles FOR SELECT
  USING (auth.uid() = id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Profil dapat diupdate oleh pemilik (kecuali role)"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 3. Providers
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  contact TEXT,
  location_text TEXT,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Penyedia terverifikasi dapat dibaca publik"
  ON providers FOR SELECT
  USING (verification_status = 'verified' OR auth.uid() = owner_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Penyedia dapat dibuat oleh pengguna terdaftar"
  ON providers FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Penyedia dapat diperbarui oleh pemilik atau admin"
  ON providers FOR UPDATE
  USING (auth.uid() = owner_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- 4. Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category event_category NOT NULL,
  summary TEXT NOT NULL,
  cultural_meaning TEXT,
  etiquette TEXT,
  program_outline JSONB,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  location_name TEXT NOT NULL,
  district TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  visibility event_visibility NOT NULL DEFAULT 'public',
  status event_status NOT NULL DEFAULT 'draft',
  cover_url TEXT,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acara terpublikasi dapat dibaca publik"
  ON events FOR SELECT
  USING (
    (status = 'published' AND visibility <> 'closed')
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
    OR (provider_id IN (SELECT id FROM providers WHERE owner_id = auth.uid()))
  );

CREATE POLICY "Penyedia atau admin dapat membuat acara"
  ON events FOR INSERT
  WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'provider')
  );

CREATE POLICY "Penyedia mengelola acara sendiri atau admin"
  ON events FOR UPDATE
  USING (
    (provider_id IN (SELECT id FROM providers WHERE owner_id = auth.uid()))
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- 5. Event Updates
CREATE TABLE event_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  change_type TEXT NOT NULL,
  message TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE event_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pembaruan acara dapat dibaca publik"
  ON event_updates FOR SELECT
  USING (true);

-- 6. Saved Events
CREATE TABLE saved_events (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  remind_at_offsets INT[] DEFAULT '{10080, 1440, 120}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (user_id, event_id)
);
ALTER TABLE saved_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pengguna mengelola acara tersimpan miliknya"
  ON saved_events FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 7. Services & Slots
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  type service_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price_idr INT NOT NULL CHECK (price_idr >= 0),
  capacity INT NOT NULL DEFAULT 1,
  cancellation_policy TEXT,
  images TEXT[] DEFAULT '{}',
  district TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Layanan aktif dapat dibaca publik"
  ON services FOR SELECT
  USING (active = true OR (provider_id IN (SELECT id FROM providers WHERE owner_id = auth.uid())));

CREATE POLICY "Penyedia mengelola layanannya"
  ON services FOR ALL
  USING (provider_id IN (SELECT id FROM providers WHERE owner_id = auth.uid()))
  WITH CHECK (provider_id IN (SELECT id FROM providers WHERE owner_id = auth.uid()));

CREATE TABLE service_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  capacity INT NOT NULL,
  booked_count INT NOT NULL DEFAULT 0,
  CONSTRAINT slot_capacity_check CHECK (booked_count <= capacity)
);
ALTER TABLE service_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Slot layanan dapat dibaca publik"
  ON service_slots FOR SELECT
  USING (true);

-- 8. Bookings & Payments
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id),
  slot_id UUID NOT NULL REFERENCES service_slots(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  total_idr INT NOT NULL CHECK (total_idr >= 0),
  status booking_status NOT NULL DEFAULT 'pending_payment',
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pengguna membaca booking sendiri"
  ON bookings FOR SELECT
  USING (
    auth.uid() = user_id
    OR (service_id IN (SELECT s.id FROM services s JOIN providers p ON s.provider_id = p.id WHERE p.owner_id = auth.uid()))
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  gateway TEXT NOT NULL DEFAULT 'midtrans',
  gateway_order_id TEXT NOT NULL UNIQUE,
  method TEXT,
  amount_idr INT NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  raw_payload JSONB,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pengguna hanya dapat membaca riwayat bayar miliknya"
  ON payments FOR SELECT
  USING (
    booking_id IN (SELECT id FROM bookings WHERE user_id = auth.uid())
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- 9. Tickets
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  status ticket_status NOT NULL DEFAULT 'valid',
  scanned_at TIMESTAMPTZ,
  scanned_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pengguna dan penyedia membaca tiket terkait"
  ON tickets FOR SELECT
  USING (
    booking_id IN (SELECT id FROM bookings WHERE user_id = auth.uid())
    OR (booking_id IN (SELECT b.id FROM bookings b JOIN services s ON b.service_id = s.id JOIN providers p ON s.provider_id = p.id WHERE p.owner_id = auth.uid()))
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- 10. Fungsi Booking Atomik
CREATE OR REPLACE FUNCTION create_booking(
  p_user_id UUID,
  p_service_id UUID,
  p_slot_id UUID,
  p_quantity INT,
  p_total_idr INT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_capacity INT;
  v_booked INT;
  v_booking_id UUID;
BEGIN
  -- Kunci baris slot kapasitas dengan FOR UPDATE guna cegah race condition
  SELECT capacity, booked_count INTO v_capacity, v_booked
  FROM service_slots
  WHERE id = p_slot_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Slot tidak ditemukan';
  END IF;

  IF (v_booked + p_quantity) > v_capacity THEN
    RAISE EXCEPTION 'Kapasitas slot tidak mencukupi';
  END IF;

  -- Tambah kuota terpesan
  UPDATE service_slots
  SET booked_count = booked_count + p_quantity
  WHERE id = p_slot_id;

  -- Buat pesanan (kedaluwarsa 15 menit)
  INSERT INTO bookings (user_id, service_id, slot_id, quantity, total_idr, status, expires_at)
  VALUES (p_user_id, p_service_id, p_slot_id, p_quantity, p_total_idr, 'pending_payment', now() + INTERVAL '15 minutes')
  RETURNING id INTO v_booking_id;

  RETURN v_booking_id;
END;
$$;

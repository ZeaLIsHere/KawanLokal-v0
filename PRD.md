# PRD: KawanLokal

> Versi 1.0 | Platform: Android dulu (APK), cross-platform dengan Expo | Wilayah awal: Kawasan Danau Toba

---

## 1. Ringkasan Produk

**KawanLokal** adalah aplikasi mobile yang menghubungkan wisatawan dan masyarakat dengan budaya dan layanan lokal Toba. Pengguna dapat melihat jadwal upacara adat dan festival budaya, memesan pengalaman atau layanan (tiket acara, pemandu, homestay, workshop ulos), dan membayar secara digital.

### Tiga pilar
1. **Pemesanan (Booking):** katalog layanan dan pengalaman lokal.
2. **Smart Cultural Calendar:** jadwal upacara adat dan festival budaya Toba yang selalu diperbarui.
3. **Transaksi Digital:** pembayaran lewat QRIS, virtual account, dan e-wallet, dengan tiket digital berupa QR code.

### Masalah yang diselesaikan
- Jadwal upacara adat dan festival Toba tersebar di banyak sumber (kerabat, gereja, desa, media sosial) dan sering berubah mendadak.
- Wisatawan tidak tahu acara mana yang terbuka untuk umum dan etiket apa yang harus dijaga.
- Penyedia jasa lokal (pemandu, homestay, sanggar) belum punya kanal pemesanan dan pembayaran digital yang sederhana.

### Tujuan produk
- Menjadi sumber tepercaya jadwal budaya Toba.
- Memudahkan wisatawan memesan dan membayar layanan lokal dalam satu aplikasi.
- Membantu penyedia lokal menerima pesanan dan pembayaran digital.
- Menjaga kesakralan dan penghormatan terhadap adat.

### Metrik keberhasilan (awal)
| Metrik | Target 3 bulan pertama |
|---|---|
| Acara terverifikasi di kalender | 30 atau lebih |
| Penyedia terverifikasi | 15 atau lebih |
| Pengguna terdaftar | 500 |
| Rasio acara terbuka yang punya minimal 1 booking | 30% |
| Pembayaran sukses dibanding checkout dimulai | 60% atau lebih |

---

## 2. Pengguna dan Peran

| Peran | Deskripsi | Kemampuan utama |
|---|---|---|
| **Wisatawan** (`traveler`) | Wisatawan domestik/mancanegara dan warga yang ingin ikut acara | Lihat kalender, simpan acara, pesan, bayar, tiket QR |
| **Penyedia** (`provider`) | Pemandu, homestay, sanggar, penyelenggara acara, panitia | Kelola profil, acara, layanan, pesanan, scan tiket |
| **Admin** (`admin`) | Tim KawanLokal / kurator budaya | Verifikasi penyedia dan acara, kelola data master |

> Panel admin untuk MVP tersedia sebagai **layar Panel kurator di aplikasi** untuk peran `admin` (kurator), dibuka dari Pengaturan. Seluruh akses tetap dibatasi RLS, sehingga penyedia dan wisatawan tidak dapat melakukan tindakan kurator. Supabase Studio tetap dipakai untuk operasi darurat seperti menyiapkan data master dan menelusuri masalah.

---

## 3. Lingkup

### 3.1 Masuk MVP
- Registrasi dan login (email + password, Google, magic link/OTP)
- Smart Cultural Calendar (daftar, bulan, filter, detail, simpan, pengingat, cache offline)
- Katalog layanan dan detail layanan
- Booking dengan kuota, checkout, pembayaran via payment gateway (sandbox lalu produksi)
- Riwayat pesanan dan tiket QR (bisa dibuka offline)
- Push notification (pengingat acara, perubahan jadwal, status pembayaran)
- Peran penyedia: kelola acara dan layanan, lihat pesanan, scan tiket
- Tambah acara ke kalender perangkat
- Bahasa Indonesia dan Inggris (struktur i18n sejak awal; konten utama Indonesia)

### 3.2 Di luar MVP (tahap berikutnya)
- Ulasan dan rating
- Chat pengguna dengan penyedia
- Dompet digital internal
- Rekomendasi berbasis AI
- Peta interaktif penuh dan navigasi
- Offline penuh untuk transaksi
- Rilis iOS dan Google Play Store (AAB)
- Panel admin penuh berbasis web
- Program loyalitas dan promo

### 3.3 Permintaan fitur tambahan (lingkup dan fase belum diputuskan)
- **Lokasi wisata Danau Toba:** akses informasi lokasi wisata sebagai fitur tersendiri; saat ini PRD baru mengatur lokasi untuk acara dan layanan. Bentuk tampilan dan sumber data perlu ditentukan tanpa mengasumsikan peta interaktif penuh (masih di luar MVP).
- **Pemesanan hotel:** pemesanan hotel diminta selain `homestay` yang sudah tercantum; sumber ketersediaan kamar dan alur pemesanan belum ditentukan.
- **Panduan tour guide:** fitur panduan terkait pemandu wisata diminta, tetapi sasaran pengguna dan bentuk panduannya belum jelas. Ini berbeda dari layanan pemesanan pemandu (`guide`) yang sudah tercantum.

> Ketiga permintaan di atas belum menjadi kriteria penerimaan MVP atau perubahan model data. Tetapkan detail dan fase pengerjaannya sebelum implementasi.

---

## 4. Fitur dan Kriteria Penerimaan

### F1. Autentikasi dan Profil
**Deskripsi:** Pengguna mendaftar dan masuk, memilih peran awal (wisatawan atau penyedia), dan mengelola profil.

**Kriteria penerimaan:**
- [ ] Pengguna dapat daftar dan login dengan email+password dan Google.
- [ ] Sesi tetap tersimpan setelah aplikasi ditutup.
- [ ] Logout menghapus sesi dan cache data sensitif.
- [ ] Pengguna dapat mengubah nama, foto, bahasa, dan preferensi notifikasi.
- [ ] Pendaftaran sebagai penyedia membuat status `pending` hingga diverifikasi admin.
- [ ] Seluruh akses data dilindungi RLS; pengguna tidak dapat membaca data orang lain.

### F2. Smart Cultural Calendar
**Deskripsi:** Jadwal upacara adat dan festival budaya Toba yang terkurasi dan diperbarui secara langsung.

**Sumber data (tiga lapisan):**
1. **Terkurasi:** festival dan upacara tahunan yang dimasukkan admin/kurator.
2. **Kiriman penyelenggara:** acara dari penyedia terverifikasi, disetujui admin sebelum tampil.
3. **Pembaruan langsung:** perubahan jadwal, pembatalan, cuaca, penutupan jalan; dikirim sebagai push ke pengguna yang menyimpan acara.

**Kriteria penerimaan:**
- [ ] Tampilan **daftar** (dikelompokkan per tanggal) dan tampilan **bulan** dengan penanda hari yang ada acara.
- [ ] Filter: jenis acara (adat, keagamaan, festival, kuliner, seni), lokasi/kabupaten, rentang tanggal, "terbuka untuk wisatawan".
- [ ] Pencarian berdasarkan judul dan lokasi.
- [ ] Halaman detail: judul, tanggal dan jam, lokasi, makna budaya, urutan acara, etiket pengunjung, status keterbukaan, penyelenggara, tombol "Pesan" (jika ada layanan terkait), tombol "Simpan/Ingatkan", tombol "Tambah ke kalender HP", tombol bagikan (deep link).
- [ ] Label jelas: **Terbuka untuk wisatawan** atau **Khusus keluarga/adat tertutup**. Acara tertutup **tidak** tampil di kalender publik kecuali ditandai publik oleh penyelenggara dengan persetujuan.
- [ ] Riwayat perubahan (`event_updates`) terlihat di detail acara ("Diperbarui: jadwal dimajukan 1 jam").
- [ ] Jika jadwal atau status acara berubah, semua pengguna yang menyimpan acara menerima push dalam maksimal 1 menit.
- [ ] Data kalender yang pernah dimuat dapat dibuka tanpa internet, dengan penanda "Terakhir diperbarui: ...".
- [ ] Zona waktu acara selalu WIB (Asia/Jakarta), ditampilkan konsisten.

**Aturan sensitivitas budaya:**
- Acara berstatus `published` hanya setelah `verified_by` terisi (admin/kurator).
- Acara privat/sakral tertutup tidak dipublikasikan tanpa izin penyelenggara/tokoh adat.
- Istilah adat memakai ejaan yang benar dan disertai penjelasan singkat.

### F3. Katalog Layanan
**Deskripsi:** Daftar layanan dan pengalaman dari penyedia terverifikasi.

**Kriteria penerimaan:**
- [ ] Jenis layanan MVP: `event_ticket`, `guide`, `workshop`, `homestay`.
- [ ] Daftar dengan filter jenis, lokasi, rentang harga; pengurutan.
- [ ] Detail layanan: foto, deskripsi, harga, kuota tersisa, penyedia, kebijakan pembatalan, acara terkait (opsional).
- [ ] Harga ditampilkan dalam Rupiah dengan format `Rp 150.000`.

### F4. Booking
**Deskripsi:** Pengguna memilih layanan, tanggal/sesi, jumlah, lalu membuat pesanan.

**Kriteria penerimaan:**
- [ ] Pemilihan tanggal/sesi dan jumlah peserta; validasi kuota di server.
- [ ] Pembuatan booking bersifat **atomik** (tidak boleh overbooking walau dua pengguna memesan bersamaan).
- [ ] Booking berstatus `pending_payment` dan kedaluwarsa otomatis dalam **15 menit** jika tidak dibayar; kuota dikembalikan.
- [ ] Ringkasan pesanan menampilkan harga, biaya layanan (jika ada), dan total.
- [ ] Pengguna dapat membatalkan sesuai kebijakan pembatalan layanan.

### F5. Pembayaran Digital
**Deskripsi:** Pembayaran lewat payment gateway (Midtrans Snap sebagai pilihan awal, Xendit sebagai alternatif).

**Alur:**
1. App memanggil Edge Function `create-payment` dengan `booking_id`.
2. Edge Function memvalidasi booking milik pengguna, menghitung total **di server**, meminta Snap token/redirect URL ke gateway.
3. App membuka halaman pembayaran lewat in-app browser (`expo-web-browser`).
4. Setelah bayar, gateway memanggil webhook (`payment-webhook` Edge Function).
5. Webhook memverifikasi signature, memperbarui `payments` dan `bookings`, membuat tiket, mengirim push.
6. App kembali lewat deep link `kawanlokal://booking/{id}` dan menampilkan status terbaru (dengan polling singkat atau realtime subscription).

**Kriteria penerimaan:**
- [ ] Metode: QRIS, virtual account bank, e-wallet (sesuai yang diaktifkan di gateway).
- [ ] Total yang dibayar dihitung server; nilai dari klien tidak dipercaya.
- [ ] Signature webhook diverifikasi; webhook bersifat **idempotent** (terima ulang tidak menggandakan tiket).
- [ ] Status pembayaran: `pending`, `paid`, `failed`, `expired`, `refunded`.
- [ ] Tidak ada data kartu atau secret gateway di aplikasi atau database klien.
- [ ] Pengujian lengkap di **sandbox** sebelum mode produksi.

### F6. Tiket Digital
**Kriteria penerimaan:**
- [ ] Setelah `paid`, tiket dibuat dengan kode unik dan QR code.
- [ ] Tiket dapat dibuka tanpa internet (disimpan lokal setelah dimuat).
- [ ] Penyedia dapat memindai QR lewat kamera dan melihat hasil: valid, sudah dipakai, tidak valid, atau bukan untuk acara/layanan ini.
- [ ] Tiket yang sudah dipindai ditandai `used` dan tidak dapat dipakai ulang.
- [ ] Validasi scan dilakukan di server (butuh internet) dengan fallback daftar peserta untuk penyedia.

### F7. Notifikasi
**Kriteria penerimaan:**
- [ ] Izin notifikasi diminta pada momen yang relevan (misalnya saat pertama menyimpan acara), bukan saat pertama membuka aplikasi.
- [ ] Jenis notifikasi: pengingat acara (H-7, H-1, 2 jam sebelum), perubahan/pembatalan jadwal, status pembayaran, persetujuan penyedia/acara.
- [ ] Pengguna dapat mengatur jenis notifikasi di profil.
- [ ] Token push disimpan per perangkat dan dibersihkan saat logout.
- [ ] Deep link dari notifikasi membuka halaman yang tepat.

### F8. Peran Penyedia
**Kriteria penerimaan:**
- [ ] Penyedia melengkapi profil dan menunggu verifikasi.
- [ ] Penyedia terverifikasi dapat membuat/mengubah acara (status `pending_review` sebelum tayang) dan layanan.
- [ ] Penyedia melihat daftar pesanan dan peserta per layanan/acara.
- [ ] Penyedia dapat memindai tiket.
- [ ] Penyedia dapat memperbarui jadwal acara; perubahan tercatat di `event_updates` dan memicu push.
- [ ] Formulir dibuat sederhana (sedikit kolom, bahasa mudah, pilihan ketimbang ketikan).

### F9. Admin (Panel kurator di aplikasi + Supabase Studio)
**Deskripsi:** Kurator meninjau penyedia dan acara dari **Panel kurator** di aplikasi (dibuka dari Pengaturan). Operasi lanjutan (penyiapan data master, penelusuran masalah) tetap memakai Supabase Studio.

**Kriteria penerimaan:**
- [ ] Admin dapat memverifikasi/menolak penyedia dan acara.
- [ ] Admin dapat menambah acara terkurasi langsung.
- [ ] Admin dapat melihat pesanan dan pembayaran.

---

## 5. Alur Pengguna Utama

### Wisatawan
1. Buka aplikasi dan mendarat di tab **Beranda** — halaman pembuka yang menjelaskan nilai aplikasi
2. Memilih pintasan jenis acara atau CTA **Jelajahi kegiatan**, lalu melihat festival minggu ini di **Kalender**
3. Pilih acara, membaca detail dan etiket
4. Tekan **Pesan**, memilih tiket atau paket pemandu
5. Bayar lewat QRIS
6. Menerima tiket QR dan pengingat otomatis
7. Hadir; tiket dipindai penyedia

### Penyedia
1. Daftar sebagai penyedia, lengkapi profil, menunggu verifikasi
2. Buat acara dan layanan
3. Terima pesanan, lihat peserta
4. Pada hari acara, scan tiket
5. Jika jadwal berubah, edit acara; peserta otomatis diberi tahu

---

## 6. Navigasi Aplikasi

**Tab bawah (wisatawan):** Beranda | Jelajah | Pesanan

**Beranda (halaman pembuka):** setiap kali aplikasi dibuka, pengguna mendarat di Beranda — halaman bergaya *landing page*: sapaan "Hai, [nama]!" dengan foto profil di kiri atas dan ikon pengaturan di kanan atas, kartu hero berlatar foto Danau Toba dengan angka ringkas dan ajakan, carousel **"Pilihan Untukmu"** berisi kartu produk berfoto beserta tombol "Lihat semua", pintasan lima jenis acara, acara terdekat, janji kepercayaan, dan penutup berisi ajakan ke Kalender atau Jelajah.

**Kalender, Profil, dan Pengaturan bukan tab**, melainkan layar tersendiri: Kalender dibuka dari Beranda (pintasan jenis acara, "Lihat semua" pada acara terdekat, atau ajakan di penutup), Profil dibuka dari foto pengguna di Beranda, dan Pengaturan dari ikon roda gigi. Pengaturan memuat kartu akun, pengalih bahasa, tautan Dasbor penyedia atau Panel kurator sesuai peran, keluar akun, serta versi aplikasi dan wilayah budaya. Keluar akun hanya ada di sini.

**Foto:** setiap kartu (layanan, acara, pesanan) selalu menampilkan foto. Unggahan penyedia atau kurator dipakai lebih dulu; bila belum ada, dipakai foto bawaan bertema Danau Toba/Sumatera Utara dari `assets/photos/` sesuai kategori acara atau jenis layanan. Foto profil, foto sampul acara, dan foto layanan diunggah ke bucket penyimpanan dengan batas 5 MB dan hanya dapat ditulis oleh pemiliknya.

**Kolom filter:** pencarian selalu tampak; jenis, kabupaten, hanya-tersimpan, dan tampilan daftar/bulan berada di satu *bottom sheet* dengan tombol **Terapkan** (perubahan baru berlaku setelah ditekan), **Reset**, serta cip filter aktif yang dapat dihapus langsung dari daftar.

**Umpan balik interaksi:** setiap sentuhan diberi jawaban yang terasa — kartu dan tombol merespons saat ditekan, konten muncul bertahap, daftar memakai *skeleton* alih-alih pemutar loading, dan aksi penting memberi getaran halus serta konfirmasi sebelum berpindah layar. Semua animasi menghormati setelan "kurangi gerak" perangkat.

**Layar penyedia (bukan tab):** Dasbor penyedia beserta pengelolaan acara, layanan, dan jadwal, dibuka dari Pengaturan.

**Layar kurator (bukan tab):** Panel kurator (verifikasi penyedia, verifikasi acara, acara kurasi, pesanan & pembayaran), dibuka dari Pengaturan.

**Layar utama:**
- `/(auth)/login`, `/(auth)/register`
- `/(tabs)/home` (Beranda — halaman pembuka)
- `/(tabs)/explore`, `/service/[id]`
- `/(tabs)/orders`
- `/calendar` (daftar + bulan), `/event/[id]`
- `/profile`, `/profile/edit`, `/settings`
- `/booking/new`, `/booking/[id]`, `/ticket/[id]`
- `/provider/*` (dasbor, acara, layanan, jadwal)
- `/admin/*` (panel, verifikasi penyedia, verifikasi acara, acara kurasi, pesanan & pembayaran)

---

## 7. Model Data

> Semua tabel di skema `public`, RLS **aktif** di setiap tabel. Waktu disimpan `timestamptz` (UTC), ditampilkan WIB.

### Enum
- `user_role`: `traveler`, `provider`, `admin`
- `verification_status`: `pending`, `verified`, `rejected`
- `event_category`: `adat`, `keagamaan`, `festival`, `kuliner`, `seni`
- `event_visibility`: `public`, `public_with_permission`, `closed`
- `event_status`: `draft`, `pending_review`, `published`, `cancelled`, `finished`
- `service_type`: `event_ticket`, `guide`, `workshop`, `homestay`
- `booking_status`: `pending_payment`, `paid`, `cancelled`, `expired`, `completed`, `refunded`
- `payment_status`: `pending`, `paid`, `failed`, `expired`, `refunded`
- `ticket_status`: `valid`, `used`, `void`

### Tabel

**profiles** (1:1 dengan `auth.users`)
`id (uuid, pk, fk auth.users)`, `full_name`, `avatar_url`, `phone`, `role user_role default 'traveler'`, `language default 'id'`, `created_at`

**providers**
`id`, `owner_id (fk profiles)`, `name`, `description`, `contact`, `location_text`, `verification_status`, `verified_by`, `verified_at`, `created_at`

**events**
`id`, `provider_id (nullable, fk)`, `title`, `slug`, `category`, `summary`, `cultural_meaning`, `etiquette`, `program_outline (jsonb)`, `start_at`, `end_at`, `location_name`, `district`, `lat`, `lng`, `visibility`, `status`, `cover_url`, `verified_by`, `verified_at`, `created_at`, `updated_at`

**event_updates** (log perubahan)
`id`, `event_id`, `change_type (schedule|location|cancelled|info)`, `message`, `old_value jsonb`, `new_value jsonb`, `created_by`, `created_at`

**saved_events**
`user_id`, `event_id`, `remind_at_offsets (int[])`, `created_at` (pk gabungan)

**services**
`id`, `provider_id`, `event_id (nullable)`, `type service_type`, `title`, `description`, `price_idr (int)`, `capacity`, `cancellation_policy`, `images (text[])`, `district`, `active`, `created_at`

**service_slots** (sesi/tanggal dengan kuota)
`id`, `service_id`, `start_at`, `end_at`, `capacity`, `booked_count`

**bookings**
`id`, `user_id`, `service_id`, `slot_id`, `quantity`, `total_idr`, `status booking_status`, `expires_at`, `created_at`

**payments**
`id`, `booking_id`, `gateway (midtrans|xendit)`, `gateway_order_id (unique)`, `method`, `amount_idr`, `status payment_status`, `raw_payload jsonb`, `paid_at`, `created_at`

**tickets**
`id`, `booking_id`, `code (unique)`, `status ticket_status`, `scanned_at`, `scanned_by`, `created_at`

**push_tokens**
`id`, `user_id`, `expo_push_token (unique)`, `platform`, `created_at`

**notification_prefs**
`user_id`, `event_reminders bool`, `schedule_changes bool`, `payments bool`, `promos bool`

### Fungsi/aturan database penting
- `create_booking(service_id, slot_id, quantity)`: transaksi atomik, `SELECT ... FOR UPDATE` pada slot, menambah `booked_count`, mengisi `expires_at = now() + 15 menit`.
- `expire_pending_bookings()`: dijalankan terjadwal (`pg_cron`), mengubah status ke `expired` dan mengembalikan kuota.
- Trigger pada `events`: perubahan `start_at`, `end_at`, `location_*`, atau `status` otomatis membuat baris `event_updates` dan memanggil Edge Function notifikasi.

### Prinsip RLS
- `profiles`: pengguna hanya membaca/mengubah baris sendiri, kecuali admin yang boleh membaca seluruh profil untuk keperluan kurasi; kolom `role` tidak dapat diubah klien.
- `events`: publik membaca hanya `status = 'published'` dan `visibility <> 'closed'`; penyedia membaca/mengubah acara miliknya; admin penuh.
- `services`, `service_slots`: publik membaca yang `active`; penyedia mengelola miliknya.
- `bookings`, `payments`, `tickets`: pengguna hanya membaca miliknya; penyedia membaca yang terkait layanannya; **penulisan `payments` dan perubahan status hanya oleh service role (Edge Function)**.
- `push_tokens`, `saved_events`, `notification_prefs`: hanya pemilik.

---

## 8. Arsitektur dan Tech Stack

| Lapisan | Pilihan |
|---|---|
| App | Expo (React Native) + TypeScript |
| Navigasi | Expo Router |
| Styling | NativeWind (Tailwind untuk RN) |
| Animasi dan umpan balik | `react-native-reanimated` (sudah termasuk Expo) + `expo-haptics` + `expo-linear-gradient` |
| State server | TanStack Query (+ persistensi cache untuk offline) |
| Form dan validasi | React Hook Form + Zod |
| Backend | Supabase: Postgres, Auth, Storage, Realtime, Edge Functions, `pg_cron` |
| Pembayaran | Midtrans Snap (sandbox dahulu) |
| Push | `expo-notifications` + Firebase Cloud Messaging |
| Kalender HP | `expo-calendar` |
| Kamera/scan | `expo-camera` |
| QR tiket | `react-native-qrcode-svg` |
| Peta (opsional MVP) | `react-native-maps` atau MapLibre |
| Penyimpanan aman | `expo-secure-store` (untuk token kecil), `AsyncStorage` untuk cache |
| i18n | `i18next` + `expo-localization` |
| Build | EAS Build (profil `preview` menghasilkan APK) |

### Struktur folder yang diusulkan
```
kawanlokal/
├─ app/                    # Expo Router (halaman)
│  ├─ (auth)/
│  ├─ (tabs)/              # Beranda, Jelajah, Pesanan
│  ├─ calendar.tsx         # daftar + bulan
│  ├─ profile/             # profil + edit
│  ├─ settings.tsx         # akun, bahasa, peran, keluar
│  ├─ event/[id].tsx
│  ├─ service/[id].tsx
│  ├─ booking/
│  ├─ ticket/[id].tsx
│  ├─ provider/            # dasbor, acara, layanan, jadwal
│  └─ admin/               # panel kurator
├─ src/
│  ├─ components/          # UI reusable
│  ├─ features/            # home, calendar, explore, booking, payment, tickets, provider, admin, profile, settings
│  ├─ lib/                 # supabase client, query client, utils
│  ├─ hooks/
│  ├─ i18n/                # id.json, en.json
│  ├─ types/               # tipe dari skema database
│  └─ constants/
├─ supabase/
│  ├─ migrations/          # SQL migrasi berurutan
│  ├─ functions/
│  │  ├─ create-payment/
│  │  ├─ payment-webhook/
│  │  ├─ send-notification/
│  │  └─ validate-ticket/
│  └─ seed.sql
├─ assets/
│  └─ photos/              # foto bawaan (lisensi di CREDITS.md)
├─ app.config.ts
├─ eas.json
├─ CREDITS.md
├─ PRD.md
└─ AGENT.md
```

---

## 9. Persyaratan Non-Fungsional

**Performa**
- Daftar kalender muncul < 2 detik pada jaringan 3G/4G lemah (dari cache < 500 ms).
- Dukung Android 8.0 (API 26) ke atas; uji di perangkat kelas bawah (RAM 3 GB).
- Gambar dioptimalkan (ukuran terkontrol, lazy load); ukuran APK ditargetkan < 60 MB.

**Offline**
- Kalender dan tiket yang pernah dimuat dapat dibuka offline.
- Aksi yang butuh server (booking, bayar) menampilkan pesan jelas saat offline.

**Keamanan**
- Tidak ada secret (service role key, server key gateway) di aplikasi.
- Semua tabel ber-RLS; setiap kebijakan diuji.
- Webhook memverifikasi signature dan idempotent.
- Validasi input di klien (Zod) **dan** di server.
- Data pribadi minimal; tidak menyimpan data kartu.
- Mematuhi UU Pelindungan Data Pribadi (UU PDP): persetujuan, kebijakan privasi, hak hapus akun.

**Aksesibilitas dan UX**
- Ukuran teks dapat diperbesar; kontras memadai; target sentuh minimal 44 dp.
- Bahasa sederhana dan sopan; istilah adat dijelaskan.
- Status loading, kosong, dan error di setiap layar.

**Observabilitas**
- Pelaporan crash (Sentry atau setara) di build rilis.
- Log Edge Function untuk pembayaran dan webhook.

---

## 10. Rencana Fase Pengerjaan

> Kerjakan **satu fase per sesi**. Fase berikutnya hanya dimulai setelah kriteria selesai fase sebelumnya terpenuhi.

### Fase 0: Persiapan
- Akun Expo, Supabase, Midtrans sandbox, Firebase
- Repo git, `PRD.md`, `AGENT.md`
- **Selesai jika:** semua akun siap dan repo dibuat.

### Fase 1: Fondasi
- Inisialisasi Expo + TypeScript + Expo Router + NativeWind
- Tab navigasi dan tema (warna terinspirasi ulos: merah, hitam, putih)
- Klien Supabase, auth (email, Google), profil
- Migrasi skema awal + RLS + seed
- **Selesai jika:** pengguna dapat daftar, login, logout, dan melihat tab kosong; RLS profil teruji; app jalan di HP lewat Expo Go/dev build.

### Fase 2: Smart Cultural Calendar
- CRUD acara oleh admin (via Studio/seed)
- Daftar, tampilan bulan, filter, pencarian, detail, simpan acara
- Cache offline, tambah ke kalender HP, deep link bagikan
- **Selesai jika:** semua kriteria F2 terpenuhi dengan 20+ acara seed.

### Fase 3: Katalog dan Booking
- Layanan, slot, detail layanan
- `create_booking` atomik dan kedaluwarsa otomatis
- **Selesai jika:** dua pengguna memesan slot terakhir bersamaan hanya satu yang berhasil (diuji).

### Fase 4: Pembayaran dan Tiket
- Edge Function `create-payment` dan `payment-webhook`
- In-app browser, deep link kembali, status realtime
- Pembuatan tiket QR, tampilan offline
- **Selesai jika:** pembayaran sandbox QRIS dan VA berhasil end-to-end; webhook ganda tidak membuat tiket ganda.

### Fase 5: Notifikasi dan Pembaruan Langsung
- Registrasi token push, FCM
- Pengingat terjadwal, trigger perubahan jadwal
- **Selesai jika:** perubahan jadwal oleh penyedia memicu push ke penyimpan acara dalam 1 menit.

### Fase 6: Peran Penyedia
- Pendaftaran dan verifikasi penyedia
- Kelola acara, layanan, pesanan, scan tiket
- **Selesai jika:** penyedia dapat dari awal hingga akhir mengelola acara dan memindai tiket.

### Fase 7: Polesan dan Build APK
- i18n Inggris, aksesibilitas, performa, ikon, splash screen
- Crash reporting, uji di beberapa perangkat
- `eas build -p android --profile preview` menghasilkan APK
- **Selesai jika:** APK terpasang dan lulus checklist QA (bagian 11).

---

## 11. Checklist QA Sebelum APK Dibagikan

- [ ] Daftar, login, logout, lupa password
- [ ] Kalender: filter, pencarian, detail, offline
- [ ] Booking: kuota, kedaluwarsa, pembatalan
- [ ] Pembayaran sandbox: sukses, gagal, kedaluwarsa, webhook ganda
- [ ] Tiket QR terbuka offline; scan valid, terpakai, tidak valid
- [ ] Push: pengingat, perubahan jadwal, status bayar
- [ ] Deep link: dari notifikasi dan dari bagikan
- [ ] Izin: notifikasi, kamera, kalender, lokasi hanya diminta saat perlu
- [ ] Uji di Android 8, 11, dan 14 serta perangkat RAM rendah
- [ ] Tidak ada secret di bundle (periksa `app.config.ts`, env publik)
- [ ] Semua teks tampil benar dalam Indonesia dan Inggris

---

## 12. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data budaya tidak akurat | Kehilangan kepercayaan | Verifikasi kurator/tokoh adat, jalur laporan koreksi, label "terakhir diperbarui" |
| Acara sakral/tertutup terpublikasi | Pelanggaran adat | Status `visibility`, wajib persetujuan, tinjauan admin |
| Kalender kosong saat peluncuran | Aplikasi tidak menarik | Isi 20-30 acara awal sebelum rilis |
| Penyedia kurang melek digital | Data tidak terisi | Form sederhana, admin membantu input, pendampingan komunitas |
| Overbooking | Pengalaman buruk | Booking atomik di database |
| Kesalahan pembayaran/webhook | Kerugian finansial | Verifikasi signature, idempotensi, log, uji sandbox menyeluruh |
| Sinyal lemah di lokasi | Aplikasi tidak bisa dipakai | Cache offline, tiket offline |
| Push tidak andal di beberapa HP Android | Pengingat terlewat | Pengingat lokal sebagai cadangan dengan `expo-notifications` |
| Kehilangan keystore Android | Tidak bisa update aplikasi | Dikelola EAS, simpan cadangan |
| Kebijakan Play Store (saat rilis) | Ditolak | Tinjau kebijakan pembayaran sebelum submit |

---

## 13. Pertanyaan Terbuka

1. Siapa target utama peluncuran awal: wisatawan atau penyelenggara/masyarakat lokal?
2. Model bisnis: komisi per transaksi, biaya langganan penyedia, atau gratis dahulu?
3. Siapa kurator budaya/lembaga adat yang akan memverifikasi acara?
4. Apakah penyedia menerima dana langsung dari gateway (split payment) atau lewat KawanLokal?
5. Kebijakan pembatalan dan refund standar?
6. Nama domain, ikon, dan identitas visual final?
7. Untuk lokasi wisata Danau Toba, apakah yang dibutuhkan direktori daftar/detail lokasi, peta, atau keduanya? Siapa yang menyediakan dan memverifikasi data lokasi?
8. Untuk pemesanan hotel, apakah hotel mengelola ketersediaan langsung di KawanLokal atau memakai integrasi mitra? Apakah hotel masuk MVP atau fase berikutnya?
9. "Panduan tour guide" ditujukan bagi wisatawan (informasi/panduan dari pemandu) atau bagi pemandu (panduan operasional menggunakan aplikasi)? Fitur apa yang harus bisa dilakukan?

---

## 14. Glosarium

- **Adat:** tata cara dan upacara tradisional masyarakat Batak Toba.
- **Ulos:** kain tenun tradisional Batak.
- **Sipaha Lima, Mangongkal Holi, Pesta Danau Toba:** contoh acara budaya yang dapat ditampilkan (data final dari kurator).
- **RLS:** Row Level Security, aturan akses per baris di Postgres.
- **Edge Function:** fungsi serverless Supabase untuk logika yang menyimpan secret.
- **APK/AAB:** format paket aplikasi Android (APK untuk instal langsung, AAB untuk Play Store).

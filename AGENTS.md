# AGENTS.md — Panduan Agen AI: KawanLokal

Dokumen instruksi kerja agen AI di repositori **KawanLokal**. Rujukan utama produk: `PRD.md` dan pelacak progres: `PROGRESS.md`.

---

## 1. Ringkasan Proyek & Tech Stack

Aplikasi mobile budaya dan pariwisata Danau Toba (Android APK via Expo, bertahap iOS).

- **Framework:** Expo (React Native) + TypeScript (Strict)
- **Routing:** Expo Router (`app/`)
- **Styling:** NativeWind (Tailwind CSS untuk React Native)
- **State & Data Fetching:** TanStack Query (offline persistence via AsyncStorage)
- **Backend & Database:** Supabase (PostgreSQL, Auth, Storage, Edge Functions, Realtime, `pg_cron`)
- **Form & Validasi:** React Hook Form + Zod
- **Pembayaran:** Midtrans Snap (Sandbox dahulu via Supabase Edge Function)
- **Notifikasi:** `expo-notifications` + FCM
- **Hardware/Device API:** `expo-camera` (scan QR), `expo-calendar`, `expo-haptics`, `expo-secure-store`
- **i18n:** `i18next` + `expo-localization` (ID utama, EN sekunder)

---

## 2. Aturan Mutlak Pengembangan (Non-Negotiable)

1. **Satu Fase Per Sesi:** Ikuti urutan fase di `PRD.md` Bagian 10 (Fase 0 s/d 7). Dilarang loncat fase sebelum kriteria selesai fase aktif tuntas dan teruji.
2. **Keamanan & Secrets:**
   - Dilarang keras menaruh `SUPABASE_SERVICE_ROLE_KEY`, Midtrans Server Key, atau secret gateway di aplikasi/klien.
   - Semua operasi sensitif (hitung total bayar, webhook pembayaran, validasi scan tiket) wajib di Supabase Edge Functions.
3. **Row Level Security (RLS):**
   - RLS wajib aktif di **seluruh** tabel skema `public`.
   - Data `payments` dan update status booking hanya boleh ditulis oleh Edge Function / service role.
   - Verifikasi bahwa pengguna tidak bisa membaca/mengubah data privat pengguna lain.
4. **Sensitivitas Budaya Toba:**
   - Acara berstatus `published` hanya jika `verified_by` terisi (admin/kurator).
   - Acara sakral/tertutup (`visibility = 'closed'`) dilarang muncul di kalender publik tanpa izin adat.
   - Istilah budaya Batak Toba (ulos, mangongkal holi, sipaha lima, dsb.) harus akurat dan sopan.
5. **Zona Waktu:** Semua waktu disimpan dalam UTC (`timestamptz`) di database, tapi **wajib ditampilkan dalam WIB (Asia/Jakarta)** di aplikasi.
6. **Integritas Booking:** Pembuatan booking harus atomik (`create_booking` dengan `FOR UPDATE` di slot kapasitas) guna mencegah overbooking. Kedaluwarsa otomatis 15 menit jika belum bayar.
8. **Siklus Tugas, Commit & Push:** Setiap menyelesaikan satu tugas atau menambah fitur baru, **wajib** melakukan commit dan push ke remote repository (`https://github.com/ZeaLIsHere/KawanLokal-v0.git`).
9. **Penundaan Fitur Auth/Login:** Fitur autentikasi dan alur login dilewati untuk sementara sampai ada instruksi lanjutan (*callback*) dari pengguna. Layar dan navigasi diarahkan langsung ke antarmuka utama (bypass auth).
10. **Wajib Baca PROGRESS.md:** Sebelum memulai atau melanjutkan pengerjaan fitur/bagian apa pun, agen **wajib membaca `PROGRESS.md`** guna memastikan pemahaman konteks terkini, keputusan teknis yang telah diambil, dan menghindari pengerjaan ulang.

---

## 3. Struktur Direktori Proyek

Patuhi struktur folder berikut:

```
kawanlokal/
├─ app/                    # Expo Router (halaman & navigasi)
│  ├─ (auth)/              # login, register
│  ├─ (tabs)/              # home, explore, orders
│  ├─ calendar.tsx         # kalender budaya (daftar + bulan)
│  ├─ event/[id].tsx       # detail acara & etiket
│  ├─ service/[id].tsx     # detail layanan/pengalaman
│  ├─ booking/             # form booking & checkout
│  ├─ ticket/[id].tsx      # tiket QR offline & detail
│  ├─ profile/             # profil & edit profil
│  ├─ settings.tsx         # pengaturan, bahasa, ganti peran, logout
│  ├─ provider/            # dasbor penyedia, kelola acara, layanan, scan tiket
│  └─ admin/               # panel kurator/admin
├─ src/
│  ├─ components/          # Komponen UI bersama (Button, Card, Skeleton, dll.)
│  ├─ features/            # Modul fitur (home, calendar, booking, provider, admin, dll.)
│  ├─ lib/                 # Supabase client, query client, formatting helpers
│  ├─ hooks/               # Custom hooks
│  ├─ i18n/                # Kamus bahasa (id.json, en.json)
│  ├─ types/               # TypeScript types (DB schema, navigation, domain)
│  └─ constants/           # Warna ulos, config key, district list
├─ supabase/
│  ├─ migrations/          # SQL berurutan (001_..., 002_...)
│  ├─ functions/           # Edge Functions (Deno/TypeScript)
│  │  ├─ create-payment/
│  │  ├─ payment-webhook/
│  │  ├─ send-notification/
│  │  └─ validate-ticket/
│  └─ seed.sql             # Data awal 20+ acara budaya & master data
├─ assets/
│  └─ photos/              # Aset gambar bawaan bertema Danau Toba
├─ PRD.md
├─ AGENTS.md
├─ app.config.ts
└─ eas.json
```

---

## 4. Konvensi Kode & Standar Kualitas

### TypeScript & React Native
- Gunakan TypeScript ketat. Hindari `any`. Definisikan interface/type domain di `src/types/`.
- Styling gunakan utility class NativeWind. Hindari inline style objek kecuali nilai dinamis yang tidak didukung Tailwind.
- Sediakan state visual lengkap untuk setiap layar: **Loading (Skeleton)**, **Error**, dan **Empty State**. Jangan gunakan spinner layar penuh jika skeleton memungkinkan.
- Berikan umpan balik taktil (`expo-haptics`) pada tombol tindakan penting dan konfirmasi modal.
- Hormati setelan aksesibilitas perangkat (kontras, target sentuh minimal 44 dp, `reduce motion`).

### Supabase & Database
- Tulis migrasi SQL modular di `supabase/migrations/` dengan timestamp atau nomor urut.
- Tulis RLS policy eksplisit untuk operasi `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- Idempotensi webhook: verifikasi signature Midtrans, tangani duplikasi request webhook tanpa menggandakan tiket.

### Skema & Tipe Enums
Gunakan enum sesuai `PRD.md`:
- `user_role`: `traveler`, `provider`, `admin`
- `verification_status`: `pending`, `verified`, `rejected`
- `event_category`: `adat`, `keagamaan`, `festival`, `kuliner`, `seni`
- `event_visibility`: `public`, `public_with_permission`, `closed`
- `event_status`: `draft`, `pending_review`, `published`, `cancelled`, `finished`
- `service_type`: `event_ticket`, `guide`, `workshop`, `homestay`
- `booking_status`: `pending_payment`, `paid`, `cancelled`, `expired`, `completed`, `refunded`
- `ticket_status`: `valid`, `used`, `void`

---

## 5. Alur Kerja Agen AI

1. **Baca Spesifikasi & Progres:** Cek `PRD.md` bagian terkait serta wajib baca `PROGRESS.md` sebelum memulai atau melanjutkan penulisan kode fitur.
2. **Minimal & Bertahap:** Buat perubahan sesedikit dan seefisien mungkin. Jangan buat scaffold fitur di luar fase yang sedang dikerjakan.
3. **Uji Mandiri:**
   - Jalankan typecheck TypeScript / linter sebelum menyatakan selesai.
   - Verifikasi alur kritis (RLS, kalkulasi harga server-side, kuota booking).
4. **Format Git Commit & Push:**
   - **Wajib commit dan push** setiap menyelesaikan satu fitur atau tugas.
   - Pesan commit wajib dalam **Bahasa Indonesia** mengikuti *best practice*:
     - Judul imperatif (kata kerja bentuk perintah, contoh: `Inisialisasi proyek Expo dengan TypeScript`, `Tambah navigasi tab utama`), huruf kapital awal, tanpa titik akhir, maksimal 50 karakter.
     - Body dipisahkan baris kosong, dibungkus 72 karakter (hanya jika butuh konteks tambahan).

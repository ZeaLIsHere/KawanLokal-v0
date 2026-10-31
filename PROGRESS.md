# PROGRESS.md — Perkembangan Proyek KawanLokal

Dokumen catatan kemajuan pengembangan aplikasi mobile **KawanLokal** (Platform Budaya & Pariwisata Danau Toba). Rujukan produk: `PRD.md` dan pedoman agen: `AGENTS.md`.

---

## 1. Ringkasan Proyek & Tech Stack Aktif

- **Framework:** Expo SDK 58 (React Native 0.88, React 19.3.0)
- **Routing:** Expo Router v58 (File-based routing)
- **Styling:** NativeWind v4 (Tailwind CSS) dengan palet tema Royal Blue Danau Toba (`#1D4ED8`)
- **Bahasa:** TypeScript (Strict Mode)
- **Aset Visual:** 20 Ikon SVG teroptimasi (`react-native-svg`) + 111 Foto Asli Danau Toba offline (`assets/photos/`)
- **Penyimpanan Lokal:** `@react-native-async-storage/async-storage`
- **Device API:** `expo-image-picker` (Galeri foto profil), `expo-haptics` (Umpan balik sentuh)
- **Remote Repository:** `https://github.com/ZeaLIsHere/KawanLokal-v0.git` (Branch: `main`)

---

## 2. Pencapaian yang Sudah Diselesaikan

### A. Inisialisasi & Fondasi Arsitektur
- [x] Inisialisasi proyek Expo dengan TypeScript ketat dan konfigurasi Expo Router.
- [x] Integrasi NativeWind v4 dan konfigurasi Metro Bundler (`metro.config.js`).
- [x] Upgrade bertahap ke **Expo SDK 58** (kompatibel penuh dengan aplikasi Expo Go terbaru di perangkat penguji).
- [x] Penyesuaian konfigurasi `app.config.ts` untuk plugin `expo-splash-screen`, ikon adaptif, dan konfigurasi skema rute.

### B. Desain Sistem & Aset Visual Lokal
- [x] Transformasi warna tema utama ke **Royal Blue Danau Toba (`#1D4ED8`)** dipadukan dengan palet **Warm Sand Glassmorphic (`@DESIGN.md`)** (`#FAF7F2` canvas, `#23201E` dark charcoal, `#8A827A` subdued neutral, `#EBE3D5` hairline divider).
- [x] Integrasi Google Fonts resmi: **Raleway** (Headings 400, 500, 700) dan **DM Sans** (Body & tracked uppercase micro-labels 400, 500, 700).
- [x] Implementasi **Floating Pill Tab Bar** (`rounded-full`, melayang di atas batas bawah, transparan kaca `bg-white/92`, border hairline, dan indikator dot aktif biru).
- [x] Pembersihan dan integrasi 20 ikon antarmuka SVG bertema minimalis di `assets/icons/` menggunakan komponen `src/components/AppIcon.tsx`.
- [x] Integrasi **111 foto dokumentasi asli Danau Toba & budaya Batak** dari 16 kategori folder lokal (`lake toba`, `desa tomok`, `gondang`, `gorga`, `homestay sopo`, `huta ginjang`, `kampung suhisuhi`, `lembah bakkara`, `parapat`, `pusuk buhit`, `rumah bolon`, `sipiso piso`, `tao silalahi`, `toba culinary`, `tor tor`, `ulos`) via modul `src/constants/localPhotos.ts`.
- [x] Dukungan registrasi ekstensi aset kapital (`JPG`, `PNG`, `WEBP`) pada Metro bundler agar pembundelan foto lokal berjalan 100% tanpa error.

### C. Antarmuka Layar Frontend (100% Konten KawanLokal)
1. **Onboarding (`app/onboarding.tsx`):**
   - 3 kartu interaktif dengan geser horizontal (carousel), dot pagination dinamis, tombol Lewati, dan foto asli Danau Toba.
2. **Beranda (`app/(tabs)/home.tsx`):**
   - TopAppBar dengan sapaan "Horas", tombol utama CTA ("Mulai Eksplorasi →") dengan umpan balik haptik, 4 tombol cepat layanan, kartu acara budaya dengan status kuota, dan avatar pengguna dinamis.
3. **Katalog Mandiri 4 Layanan Lokal:**
   - **Tiket Acara (`app/tickets.tsx`):** Tiket pesta danau, pagelaran gondang, dan upacara adat lengkap dengan sisa kuota.
   - **Pemandu Budaya (`app/guides.tsx`):** Daftar pemandu lokal berlisensi, spesialisasi adat/sejarah, bahasa yang dikuasai, dan tarif per trip.
   - **Workshop Kerajinan (`app/workshops.tsx`):** Kelas tenun ulos gedongan, ukir gorga Batak, kelas musik gondang, dan demo masak kuliner Naniura.
   - **Homestay Adat (`app/homestays.tsx`):** Pilihan Sopo Bolon tradisional tepi danau dan daftar penginapan rekomendasi per kabupaten.
4. **Jelajah Layanan (`app/(tabs)/explore.tsx`):**
   - Penjelajahan terpadu seluruh kategori layanan dengan tab filter cepat.
5. **Pesanan & Tiket Saya (`app/(tabs)/orders.tsx`):**
   - Filter tab Mendatang, Selesai, dan Dibatalkan dengan kartu ringkasan pesanan.
6. **Destinasi 7 Kabupaten (`app/destinations.tsx`):**
   - Grid 2-kolom destinasi budaya (Pusuk Buhit, Tomok, Parapat, Sipiso-piso, Huta Ginjang, Bakkara, Tao Silalahi, Lumban Suhi).
7. **Detail Acara Budaya (`app/event/detail.tsx`):**
   - Filosofi makna adat, etiket berkunjung, timeline rangkaian acara WIB, dan galeri dokumentasi foto lapangan asli.
8. **Alur Pemesanan & Pembayaran:**
   - Formulir pemesanan (`app/booking/new.tsx`) dengan stepper peserta atomik dan rincian harga Rupiah.
   - Layar pembayaran (`app/payment.tsx`) dengan pilihan metode QRIS instan, Virtual Account, dan Kartu Debit/Kredit.
   - Tiket digital boarding-pass (`app/ticket/detail.tsx`) dengan QR Code siap offline dan rincian biaya resmi.
9. **Profil Pengguna (`app/profile/index.tsx`):**
   - Pemilih foto profil langsung dari galeri HP pengguna (`expo-image-picker`) dengan persistensi otomatis di `AsyncStorage`.
10. **Pengaturan (`app/settings.tsx`):**
    - Konfigurasi bahasa, zona waktu kalender (WIB), dan switcher simulasi peran (Traveler, Provider, Admin).
11. **Autentikasi (Bypass Sementara):**
    - Layar login (`app/(auth)/login.tsx`) dan registrasi (`app/(auth)/register.tsx`) sudah tersedia, dengan alur langsung diarahkan ke Beranda sesuai instruksi penundaan auth.

---

## 3. Catatan Solusi Teknis & Stabilitas

1. **Resolusi Ekstensi Metro:**
   - Permasalahan: File kamera/ponsel sering menggunakan ekstensi huruf besar (`.JPG`, `.PNG`, `.WEBP`) yang ditolak oleh resolver default Metro.
   - Solusi: Menambahkan `config.resolver.assetExts.push("JPG", "PNG", "WEBP", "JPEG")` di `metro.config.js`.
2. **Pembersihan Kelas Transisi CSS:**
   - Permasalahan: Kelas Tailwind seperti `transition-all` dan `active:scale-*` memanggil `makeMutable` dari Reanimated v3 yang telah diubah arsitekturnya di SDK 58 (Reanimated v4), memicu crash runtime.
   - Solusi: Mengganti efek sentuh ke interaksi native murni React Native (`active:opacity-*`).
3. **Penyaringan Log Peringatan (LogBox):**
   - Menambahkan pembungkaman peringatan internal library pihak ketiga (`ImageBackground is deprecated` dan `Reanimated dependencies on web`) di `app/_layout.tsx` agar tampilan pratinjau di ponsel bersih.
4. **Presisi Penjajaran Vertikal Floating Pill Tab Bar:**
   - Permasalahan: Ikon pada Floating Pill Tab Bar tidak rata tengah vertikal akibat default `justifyContent: 'flex-start'` dan padding bawaan React Navigation tab item.
   - Solusi: Menambahkan `tabBarButton` dengan perataan tengah eksplisit (`justifyContent: 'center'`, `alignItems: 'center'`, `padding: 0`) dan indikator dot aktif berbasis `absolute` sesuai spesifikasi `DESIGN.md`.

---

## 4. Rencana Pengembangan Selanjutnya (Next Steps)

Sesuai tahapan di `PRD.md` Bagian 10 dan instruksi kerja:

```
[Fase Saat Ini: Frontend Interaktif Selesai] 
                     │
                     ▼
[Tahap 1: Backend Supabase & Skema Data] (Menunggu Callback Pengguna)
                     │
                     ▼
[Tahap 2: Pengaktifan Auth & Alur Profil]
                     │
                     ▼
[Tahap 3: Integrasi Data Kalender Budaya & Kuota Booking]
                     │
                     ▼
[Tahap 4: Supabase Edge Functions & Webhook Pembayaran Midtrans]
                     │
                     ▼
[Tahap 5: Fitur Tiket QR Offline & Scan Tiket Provider]
                     │
                     ▼
[Tahap 6: Dasbor Pengelola (Provider & Kurator/Admin)]
```

### Prioritas Pekerjaan Berikutnya:
1. **Penyambungan Supabase Client & Migrasi Database (`supabase/migrations/`):**
   - Membuat skema tabel relasional sesuai PRD: `profiles`, `events`, `services`, `bookings`, `tickets`, `payments`.
   - Mengaktifkan Row Level Security (RLS) di seluruh tabel publik.
2. **Pengaktifan Alur Login/Auth (Jika sudah ada instruksi callback):**
   - Menghubungkan form login/register ke Supabase Auth (Email & OTP).
   - Pengalihan peran otomatis berdasarkan data tabel `profiles`.
3. **Fungsi Atomik Pemesanan (Anti-Overbooking):**
   - Membuat fungsi PostgreSQL `create_booking` dengan `FOR UPDATE` kuota slot.
   - Penerapan masa kedaluwarsa booking 15 menit otomatis.
4. **Integrasi Edge Functions Pembayaran:**
   - Pembuatan token transaksi Midtrans Snap via Edge Function aman (kunci rahasia tidak bocor ke klien).
   - Penanganan webhook notifikasi pembayaran berstatus idempotent.

---

## 5. Cara Menjalankan Pratinjau di Perangkat HP

1. Pastikan komputer dan ponsel terhubung dalam satu jaringan Wi-Fi yang sama (atau gunakan opsi `--tunnel` jika berbeda jaringan).
2. Jalankan server Expo di terminal:
   ```bash
   npx expo start -c
   ```
3. Buka aplikasi **Expo Go (SDK 58)** di ponsel Android atau iOS.
4. Pindai (scan) QR Code yang tampil di terminal.
5. Perubahan kode otomatis ter-refresh langsung di layar ponsel (*Fast Refresh*).

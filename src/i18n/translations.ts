export type Locale = 'en' | 'id';

export const TRANSLATIONS = {
  en: {
    // Navigation & Headers
    'nav.home': 'Home',
    'nav.explore': 'Explore',
    'nav.orders': 'Orders',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.calendar': 'Calendar',
    'nav.back': 'Back',

    // Settings Screen
    'settings.title': 'Settings',
    'settings.account': 'ACCOUNT & PREFERENCES',
    'settings.edit_profile': 'Edit Profile',
    'settings.edit_profile_desc': 'Update avatar, name, and personal details',
    'settings.language': 'Language',
    'settings.language_desc': 'Select application display language',
    'settings.app_info': 'KawanLokal v1.0.0 • Lake Toba Cultural Tourism',
    'settings.lang_en': 'English',
    'settings.lang_id': 'Indonesia',
    'settings.lang_changed': 'Language switched to English',

    // Common Actions
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.close': 'Close',
    'common.book': 'Book Now',
    'common.details': 'View Details',
    'common.free': 'Free',
    'common.per_person': '/ person',
    'common.per_night': '/ night',
    'common.per_trip': '/ group trip',
    'common.verified': 'Verified',
    'common.logout': 'Sign Out',

    // Home Screen
    'home.greeting': 'HORAS, LOCAL EXPLORER',
    'home.hero_title': 'Explore the majesty\nof Lake Toba culture',
    'home.explore_cta': 'Start Exploration',
    'home.services_title': 'Local Cultural Services',
    'home.cat_tickets': 'Event Tickets',
    'home.cat_guides': 'Local Guides',
    'home.cat_workshops': 'Workshops',
    'home.cat_homestays': 'Homestays',
    'home.upcoming_title': 'Upcoming Cultural Events',
    'home.see_all': 'VIEW ALL',
    'home.closest_event_tag': 'UPCOMING EVENT • NOV 2',

    // Booking & Payment
    'booking.ticket_title': 'Book Event Ticket',
    'booking.guide_title': 'Reserve Local Guide',
    'booking.workshop_title': 'Book Workshop Class',
    'booking.homestay_title': 'Reserve Homestay',
    'booking.proceed_payment': 'Proceed to Payment',
    'payment.title': 'Digital Checkout',
    'payment.pay_now': 'Pay Now',
    'payment.success': 'Payment Successful',
    'ticket.title': 'Digital Ticket',
    'ticket.voucher_guide': 'Guide Voucher',
    'ticket.save_gallery': 'Save Ticket to Gallery',
  },
  id: {
    // Navigation & Headers
    'nav.home': 'Beranda',
    'nav.explore': 'Jelajah',
    'nav.orders': 'Pesanan',
    'nav.profile': 'Profil',
    'nav.settings': 'Pengaturan',
    'nav.calendar': 'Kalender',
    'nav.back': 'Kembali',

    // Settings Screen
    'settings.title': 'Pengaturan',
    'settings.account': 'AKUN & PREFERENSI',
    'settings.edit_profile': 'Edit Profil',
    'settings.edit_profile_desc': 'Ubah foto profil, nama, dan detail akun',
    'settings.language': 'Bahasa',
    'settings.language_desc': 'Pilih bahasa tampilan aplikasi',
    'settings.app_info': 'KawanLokal v1.0.0 • Kawasan Pariwisata Budaya Danau Toba',
    'settings.lang_en': 'English',
    'settings.lang_id': 'Indonesia',
    'settings.lang_changed': 'Bahasa berhasil dialihkan ke Bahasa Indonesia',

    // Common Actions
    'common.save': 'Simpan',
    'common.cancel': 'Batal',
    'common.continue': 'Lanjut',
    'common.close': 'Tutup',
    'common.book': 'Pesan',
    'common.details': 'Lihat Detail',
    'common.free': 'Gratis',
    'common.per_person': '/ orang',
    'common.per_night': '/ malam',
    'common.per_trip': '/ rombongan trip',
    'common.verified': 'Terverifikasi',
    'common.logout': 'Keluar Akun',

    // Home Screen
    'home.greeting': 'HORAS, KAWAN LOKAL',
    'home.hero_title': 'Jelajahi keagungan\nbudaya Danau Toba',
    'home.explore_cta': 'Mulai Eksplorasi',
    'home.services_title': 'Layanan Budaya Lokal',
    'home.cat_tickets': 'Tiket Acara',
    'home.cat_guides': 'Pemandu',
    'home.cat_workshops': 'Workshop',
    'home.cat_homestays': 'Homestay',
    'home.upcoming_title': 'Acara Budaya Terdekat',
    'home.see_all': 'LIHAT SEMUA',
    'home.closest_event_tag': 'ACARA TERDEKAT • 2 NOV',

    // Booking & Payment
    'booking.ticket_title': 'Pesan Tiket Acara',
    'booking.guide_title': 'Reservasi Pemandu',
    'booking.workshop_title': 'Pesan Workshop Seni',
    'booking.homestay_title': 'Reservasi Homestay',
    'booking.proceed_payment': 'Lanjut ke Pembayaran',
    'payment.title': 'Pembayaran Digital',
    'payment.pay_now': 'Bayar Sekarang',
    'payment.success': 'Pembayaran Berhasil',
    'ticket.title': 'Detail Tiket Acara',
    'ticket.voucher_guide': 'Voucher Pemandu',
    'ticket.save_gallery': 'Simpan Tiket ke Galeri',
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS.en;

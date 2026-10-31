import { ImageSourcePropType } from 'react-native';
import { LOCAL_PHOTOS, PHOTO_COVERS } from './localPhotos';

export interface CulturalEventDetail {
  id: string;
  title: string;
  category: string;
  district: string;
  location: string;
  day: number;
  month: number;
  year: number;
  timeWIB: string;
  scheduleText: string;
  summary: string;
  philosophy: string;
  etiquettes: string[];
  itinerary: {
    dayLabel: string;
    time: string;
    title: string;
    description: string;
  }[];
  coverImage: ImageSourcePropType;
  gallery: ImageSourcePropType[];
  communityName: string;
  communitySubtitle: string;
  rating: number;
  reviewCount: string;
  price: string;
  numericPrice: number;
  verified: boolean;
}

export const CULTURAL_EVENTS: Record<string, CulturalEventDetail> = {
  'ev-1': {
    id: 'ev-1',
    title: 'Pesta Danau Toba & Pagelaran Gondang',
    category: 'Festival',
    district: 'Simalungun',
    location: 'Pantai Bebas Parapat, Simalungun',
    day: 2,
    month: 11,
    year: 2026,
    timeWIB: '10.00',
    scheduleText: '3 Hari Festival • 2 - 4 Nov 2026',
    summary: 'Parade perahu kayu solu bolon, tarian Tortor kolosal, dan pameran tenun pusaka.',
    philosophy:
      'Pesta Danau Toba merupakan perayaan budaya tahunan terbesar yang menyatukan masyarakat di sekeliling kaldera Toba. Menampilkan atraksi perahu kayu solu bolon, kompetisi renang danau, tarian Tortor massal, serta pameran ulos pusaka turun-temurun sebagai simbol pelestarian alam dan rasa syukur atas kemakmuran kawasan danau.',
    etiquettes: [
      'Dilarang membuang sampah sembarangan ke perairan Danau Toba.',
      'Hormati prosesi ritual mambere mangan pitu huta sebelum lomba perahu solu bolon dimulai.',
      'Gunakan pakaian santai namun tetap sopan saat memasuki area panggung utama adat.',
    ],
    itinerary: [
      {
        dayLabel: 'Hari 1',
        time: '10.00',
        title: 'Pembukaan Karnaval Perahu Solu Bolon & Gondang Sabangunan',
        description: 'Parade perahu hias solu bolon melintasi perairan Parapat diiringi tabuhan gondang pemersatu 7 kabupaten.',
      },
      {
        dayLabel: 'Hari 2',
        time: '09.00',
        title: 'Lomba Tari Tortor Kreasi Muda & Pameran Ulos Langka',
        description: 'Pagelaran tari budaya antar-sanggar remaja dan pameran tenun ulos ragi hotang pusaka bersejarah.',
      },
      {
        dayLabel: 'Hari 3',
        time: '15.00',
        title: 'Penutupan Pesta Rakyat & Konser Musik Etnik Toba',
        description: 'Malam penganugerahan pemenang lomba perahu dan panggung kolaborasi seniman musik tradisional Batak modern.',
      },
    ],
    coverImage: PHOTO_COVERS.parapat,
    gallery: [...LOCAL_PHOTOS.parapat, ...LOCAL_PHOTOS.lakeToba.slice(0, 3)],
    communityName: 'Panitia Pesta Danau Toba',
    communitySubtitle: 'Panitia Budaya Resmi Simalungun',
    rating: 4.9,
    reviewCount: '240+ ulasan',
    price: 'Rp 50.000',
    numericPrice: 50000,
    verified: true,
  },
  'ev-2': {
    id: 'ev-2',
    title: 'Upacara Mangongkal Holi',
    category: 'Adat Sakral',
    district: 'Samosir',
    location: 'Desa Adat Tomok, Samosir',
    day: 15,
    month: 11,
    year: 2026,
    timeWIB: '09.00',
    scheduleText: '3 Hari Prosesi • 15 - 17 Nov 2026',
    summary: 'Pemindahan tulang belulang leluhur ke tugu keluarga marga. Wajib berbusana sopan.',
    philosophy:
      'Upacara Mangongkal Holi merupakan tradisi sakral pemindahan tulang-belulang leluhur ke tugu keluarga permanen. Bertujuan menyatukan seluruh keturunan marga dalam satu tempat peristirahatan terhormat, sebagai wujud bhakti tertinggi anak-cucu serta pengikat tali persaudaraan dalihan na tolu.',
    etiquettes: [
      'Wajib mengenakan Ulos ragi hotang atau busana sopan menutup bahu dan lutut.',
      'Dilarang melintas sembarangan di depan tetua adat saat lantunan doa tonggo-tonggo.',
      'Mintalah izin panitia keluarga sebelum mendokumentasikan prosesi pembukaan peti tulang leluhur.',
    ],
    itinerary: [
      {
        dayLabel: 'Hari 1',
        time: '10.00',
        title: 'Penyambutan Marga & Gondang Sabangunan Pembuka',
        description: 'Tarian Tortor pembuka oleh raja huta dan tetua adat marga yang menyambut kedatangan seluruh kerabat.',
      },
      {
        dayLabel: 'Hari 2',
        time: '09.00',
        title: 'Prosesi Penggalian & Pencucian Tulang Belulang Leluhur',
        description: 'Ritual sakral pembersihan tulang leluhur dengan air perasan jeruk purut wangi dan balutan kain kafan putih.',
      },
      {
        dayLabel: 'Hari 3',
        time: '13.00',
        title: 'Penyemayaman ke Tugu Keluarga & Pesta Syukur',
        description: 'Penyemayaman abadi di puncak tugu tugu marga diiringi doa bersama dan jamuan makan adat khas Toba.',
      },
    ],
    coverImage: PHOTO_COVERS.desaTomok,
    gallery: [...LOCAL_PHOTOS.torTor, ...LOCAL_PHOTOS.desaTomok.slice(0, 4)],
    communityName: 'Komunitas Pemandu Adat Tomok',
    communitySubtitle: 'Pemandu Resmi Berlisensi Samosir',
    rating: 4.95,
    reviewCount: '180+ ulasan',
    price: 'Gratis',
    numericPrice: 0,
    verified: true,
  },
  'ev-3': {
    id: 'ev-3',
    title: 'Festival Gondang Naposo',
    category: 'Seni Tradisi',
    district: 'Toba',
    location: 'Pantai Lumban Bulbul, Balige, Toba',
    day: 20,
    month: 11,
    year: 2026,
    timeWIB: '14.00',
    scheduleText: '2 Hari Acara • 20 - 21 Nov 2026',
    summary: 'Ajang tari Tortor kreasi muda-mudi Batak dalam mencari pasangan dan silaturahmi.',
    philosophy:
      'Gondang Naposo adalah media silaturahmi dan perkenalan adat bagi pemuda-pemudi Batak (naposo bulung). Diiringi ritme gondang sabangunan yang dinamis, generasi muda mengekspresikan kesantunan, tari Tortor kreasi, serta menjalin ikatan kekerabatan yang harmonis sesuai falsafah tutur Batak.',
    etiquettes: [
      'Wisatawan diperkenankan ikut manortor bersama di lingkaran luar atas izin pimpinan sanggar.',
      'Kenakan kain tenun atau selendang ulos sadum bernuansa ceria di atas pundak.',
      'Jaga ketertiban, kebersihan pantai, dan saling menghormati tata krama pergaulan lokal.',
    ],
    itinerary: [
      {
        dayLabel: 'Hari 1',
        time: '14.00',
        title: 'Parade Sanggar Seni Muda & Tabuhan Gondang Pembuka',
        description: 'Pawai kostum adat Batak kontemporer dari 12 sanggar pemuda se-kawasan Danau Toba.',
      },
      {
        dayLabel: 'Hari 2',
        time: '16.00',
        title: 'Malam Puncak Manortor Bersama & Pemilihan Duta Budaya',
        description: 'Atraksi tari Tortor kreasi massal di tepi pantai pasir putih dan penganugerahan Duta Muda Toba.',
      },
    ],
    coverImage: PHOTO_COVERS.gondang,
    gallery: [...LOCAL_PHOTOS.gondang, ...LOCAL_PHOTOS.gorga.slice(0, 3)],
    communityName: 'Sanggar Seni Naposo Bulung Balige',
    communitySubtitle: 'Komunitas Seni Muda Kabupaten Toba',
    rating: 4.88,
    reviewCount: '95+ ulasan',
    price: 'Rp 25.000',
    numericPrice: 25000,
    verified: true,
  },
  'ev-4': {
    id: 'ev-4',
    title: 'Ritual Sipaha Lima Parmalim',
    category: 'Keagamaan',
    district: 'Toba',
    location: 'Bale Pasogit Huta Tinggi, Laguboti, Toba',
    day: 25,
    month: 11,
    year: 2026,
    timeWIB: '08.30',
    scheduleText: '2 Hari Upacara • 25 - 26 Nov 2026',
    summary: 'Ucapan syukur tahunan penganut Ugamo Malim atas limpahan berkah panen dan kehidupan.',
    philosophy:
      'Ritual Sipaha Lima merupakan upacara syukuran akbar penganut Ugamo Malim (Parmalim) kepada Tuhan Yang Maha Esa (Debata Mulajadi Nabolon). Dilakukan di bulan kelima kalender Batak kuno, upacara ini memanjatkan rasa terima kasih atas panen bumi, kesehatan keluarga, dan ketenteraman semesta.',
    etiquettes: [
      'Wajib mengenakan sarung Batak rapi dan baju berlengan panjang yang tertutup.',
      'Wajib melepas alas kaki saat melangkah masuk ke pelataran suci Bale Pasogit.',
      'Dilarang menyalakan lampu kilat kamera (flash) atau berbicara keras selama doa sakral berlangsung.',
    ],
    itinerary: [
      {
        dayLabel: 'Hari 1',
        time: '08.30',
        title: 'Ibadah Pangurason (Penyucian Batin) & Doa Bersama',
        description: 'Ritual penyucian diri dengan air jeruk purut dan doa pembuka keselamatan para penganut.',
      },
      {
        dayLabel: 'Hari 2',
        time: '09.00',
        title: 'Persembahan Syukur & Tarian Tortor Sipitu Cawan',
        description: 'Prosesi persembahan syukur hasil bumi diiringi tarian sakral cawan yang penuh khidmat.',
      },
    ],
    coverImage: PHOTO_COVERS.rumahBolon,
    gallery: [...LOCAL_PHOTOS.rumahBolon, ...LOCAL_PHOTOS.torTor.slice(0, 3)],
    communityName: 'Pengurus Bale Pasogit Parmalim',
    communitySubtitle: 'Lembaga Adat Keagamaan Laguboti',
    rating: 4.98,
    reviewCount: '70+ ulasan',
    price: 'Gratis',
    numericPrice: 0,
    verified: true,
  },
  'ev-5': {
    id: 'ev-5',
    title: 'Pesta Rondang Bittang',
    category: 'Festival',
    district: 'Simalungun',
    location: 'Pamatang Raya, Simalungun',
    day: 28,
    month: 11,
    year: 2026,
    timeWIB: '16.00',
    scheduleText: '2 Hari Perayaan • 28 - 29 Nov 2026',
    summary: 'Perayaan panen raya suku Simalungun di bawah sinar bulan purnama yang megah.',
    philosophy:
      'Pesta Rondang Bittang (Terangnya Bintang dan Bulan) adalah tradisi pesta panen raya adat Simalungun. Diselenggarakan saat bulan purnama penuh, pesta ini memadukan rasa syukur keberhasilan panen padi dengan tarian Tortor Sombah, alunan gonrang sipitu-pitu, dan jamuan panganan khas Nitak Simalungun.',
    etiquettes: [
      'Hormati tetua adat dan tarian pembuka Tortor Sombah dengan berdiri tenang.',
      'Dipersilakan mengenakan selempang kain Hiou Simalungun khas warna hitam-merah emas.',
      'Ikuti petunjuk titik dokumentasi yang telah disediakan panitia adat.',
    ],
    itinerary: [
      {
        dayLabel: 'Hari 1',
        time: '16.00',
        title: 'Pembukaan Upacara Gonrang & Jamuan Nitak Simalungun',
        description: 'Pemukulan gong gonrang sipitu-pitu tanda panen dan pembagian kue adat nitak kepada pengunjung.',
      },
      {
        dayLabel: 'Hari 2',
        time: '19.00',
        title: 'Malam Puncak Bulan Purnama & Tortor Kolosal Sombah',
        description: 'Tarian massal di bawah sinar bulan purnama penuh disusul pagelaran seni musik etnik Simalungun.',
      },
    ],
    coverImage: PHOTO_COVERS.torTor,
    gallery: [...LOCAL_PHOTOS.torTor, ...LOCAL_PHOTOS.parapat.slice(0, 3)],
    communityName: 'Dewan Adat Harungguan Simalungun',
    communitySubtitle: 'Lembaga Pelestari Budaya Raya',
    rating: 4.92,
    reviewCount: '110+ ulasan',
    price: 'Gratis',
    numericPrice: 0,
    verified: true,
  },
};

// Aliases untuk ID ramah pembacaan
CULTURAL_EVENTS['pesta-toba'] = CULTURAL_EVENTS['ev-1'];
CULTURAL_EVENTS['mangongkal-holi'] = CULTURAL_EVENTS['ev-2'];
CULTURAL_EVENTS['gondang-naposo'] = CULTURAL_EVENTS['ev-3'];
CULTURAL_EVENTS['sipaha-lima'] = CULTURAL_EVENTS['ev-4'];
CULTURAL_EVENTS['rondang-bittang'] = CULTURAL_EVENTS['ev-5'];

export const DEFAULT_EVENT = CULTURAL_EVENTS['ev-2'];

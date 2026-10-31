import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatRupiah } from './format';

const STORAGE_ORDERS_KEY = '@user_orders';

export type OrderStatus = 'upcoming' | 'completed' | 'cancelled';

export interface StoredOrder {
  id: string;
  code: string;
  service_type: 'ticket' | 'guide' | 'workshop' | 'homestay';
  title: string;
  location: string;
  dateWIB: string;
  dateTimestamp: number; // Waktu timestamp acara untuk cek status selesai
  travelers: string;
  status: OrderStatus;
  statusLabel: string;
  statusBadgeVariant: 'emerald' | 'amber' | 'slate' | 'rose';
  priceFormatted: string;
  amount: number;
  imageKey: 'parapat' | 'desaTomok' | 'ulos' | 'homestaySopo';
  createdAt: number;
}

export interface CreateOrderInput {
  service_type: 'ticket' | 'guide' | 'workshop' | 'homestay';
  title: string;
  location: string;
  amount: number;
  participants: string;
  dateString?: string;
  dateTimestamp?: number;
}

/**
 * Mengambil seluruh daftar pesanan pengguna.
 * Jika kosong, mengembalikan array kosong [] (awalnya kosong).
 * Jika tanggal kegiatan telah lewat dari waktu saat ini, status otomatis berubah menjadi 'completed' (Selesai).
 */
export async function getOrders(): Promise<StoredOrder[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_ORDERS_KEY);
    if (!raw) return [];

    const orders: StoredOrder[] = JSON.parse(raw);
    const now = Date.now();
    let hasChanges = false;

    // Cek otomatis: jika tanggal kegiatan sudah lewat, status berubah menjadi 'completed'
    const updatedOrders = orders.map((order) => {
      if (order.status === 'upcoming' && order.dateTimestamp > 0 && now > order.dateTimestamp) {
        hasChanges = true;
        return {
          ...order,
          status: 'completed' as OrderStatus,
          statusLabel: 'Selesai',
          statusBadgeVariant: 'slate' as const,
        };
      }
      return order;
    });

    if (hasChanges) {
      await AsyncStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updatedOrders));
    }

    return updatedOrders;
  } catch (error) {
    return [];
  }
}

/**
 * Membuat pesanan baru setelah pembayaran berhasil.
 * Langsung masuk ke tab 'upcoming' (Mendatang).
 */
export async function createOrder(input: CreateOrderInput): Promise<StoredOrder> {
  const existingOrders = await getOrders();
  const now = Date.now();

  const codePrefix =
    input.service_type === 'guide'
      ? 'KL-GD'
      : input.service_type === 'workshop'
      ? 'KL-WS'
      : input.service_type === 'homestay'
      ? 'KL-HS'
      : 'KL-TB';

  const randomCode = Math.floor(100 + Math.random() * 900);
  const bookingCode = `#${codePrefix}-2026-${randomCode}`;

  const imageKey: StoredOrder['imageKey'] =
    input.service_type === 'guide'
      ? 'desaTomok'
      : input.service_type === 'workshop'
      ? 'ulos'
      : input.service_type === 'homestay'
      ? 'homestaySopo'
      : 'parapat';

  const travelersLabel =
    input.service_type === 'homestay'
      ? `${input.participants} Malam (Penginapan)`
      : `${input.participants} Peserta`;

  // Default tanggal acara di masa depan (misal 2 Nov 2026 atau 3 hari ke depan)
  const defaultTimestamp = now + 3 * 24 * 60 * 60 * 1000;

  const newOrder: StoredOrder = {
    id: `ord-${now}`,
    code: bookingCode,
    service_type: input.service_type,
    title: input.title,
    location: input.location,
    dateWIB: input.dateString || 'Jumat, 2 Nov 2026 • 10.00',
    dateTimestamp: input.dateTimestamp || defaultTimestamp,
    travelers: travelersLabel,
    status: 'upcoming',
    statusLabel: 'Lunas / Siap',
    statusBadgeVariant: 'emerald',
    priceFormatted: formatRupiah(input.amount),
    amount: input.amount,
    imageKey,
    createdAt: now,
  };

  const updatedOrders = [newOrder, ...existingOrders];
  await AsyncStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updatedOrders));
  return newOrder;
}

/**
 * Membatalkan tiket/pesanan yang ada di bagian 'upcoming'.
 * Status otomatis berpindah ke 'cancelled' (Dibatalkan).
 */
export async function cancelOrder(orderId: string): Promise<void> {
  const orders = await getOrders();
  const updatedOrders = orders.map((order) => {
    if (order.id === orderId) {
      return {
        ...order,
        status: 'cancelled' as OrderStatus,
        statusLabel: 'Dibatalkan',
        statusBadgeVariant: 'rose' as const,
      };
    }
    return order;
  });

  await AsyncStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updatedOrders));
}

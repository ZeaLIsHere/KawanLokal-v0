export type UserRole = 'traveler' | 'provider' | 'admin';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type EventCategory = 'adat' | 'keagamaan' | 'festival' | 'kuliner' | 'seni';
export type EventVisibility = 'public' | 'public_with_permission' | 'closed';
export type EventStatus = 'draft' | 'pending_review' | 'published' | 'cancelled' | 'finished';
export type ServiceType = 'event_ticket' | 'guide' | 'workshop' | 'homestay';
export type BookingStatus = 'pending_payment' | 'paid' | 'cancelled' | 'expired' | 'completed' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'expired' | 'refunded';
export type TicketStatus = 'valid' | 'used' | 'void';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
  language: string;
  created_at: string;
}

export interface Provider {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  contact: string | null;
  location_text: string | null;
  verification_status: VerificationStatus;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  provider_id: string | null;
  title: string;
  slug: string;
  category: EventCategory;
  summary: string;
  cultural_meaning: string | null;
  etiquette: string | null;
  program_outline: Record<string, unknown> | null;
  start_at: string;
  end_at: string;
  location_name: string;
  district: string;
  lat: number | null;
  lng: number | null;
  visibility: EventVisibility;
  status: EventStatus;
  cover_url: string | null;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventUpdate {
  id: string;
  event_id: string;
  change_type: 'schedule' | 'location' | 'cancelled' | 'info';
  message: string;
  old_value: Record<string, unknown> | null;
  new_value: Record<string, unknown> | null;
  created_by: string;
  created_at: string;
}

export interface Service {
  id: string;
  provider_id: string;
  event_id: string | null;
  type: ServiceType;
  title: string;
  description: string | null;
  price_idr: number;
  capacity: number;
  cancellation_policy: string | null;
  images: string[];
  district: string;
  active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  slot_id: string;
  quantity: number;
  total_idr: number;
  status: BookingStatus;
  expires_at: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  booking_id: string;
  code: string;
  status: TicketStatus;
  scanned_at: string | null;
  scanned_by: string | null;
  created_at: string;
}

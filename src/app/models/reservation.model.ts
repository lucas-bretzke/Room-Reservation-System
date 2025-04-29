export interface Reservation {
  id?: number;
  roomId: number;
  userId: number;
  reservationDate?: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt?: string;
  updatedAt?: string;
} 
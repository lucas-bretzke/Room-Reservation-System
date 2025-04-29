export interface Room {
  id?: number;
  name: string;
  capacity: number;
  location: string;
  description: string;
  equipment: string;
  status: 'available' | 'maintenance' | 'occupied';
  created_at?: string;
  updated_at?: string;
} 
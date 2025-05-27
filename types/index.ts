export interface Warehouse {
  id: string;
  location: string;
  code: string;
  type: string;
  address: string;
}

export interface Comment {
  id: string;
  warehouseId: string;
  userId: string;
  userName: string;
  content: string;
  status: WarehouseStatus;
  timestamp: Date;
}

export interface Media {
  id: string;
  commentId: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface Price {
  id: string;
  warehouseId: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  details: string;
  timestamp: Date;
}

export type WarehouseStatus = 'normal' | 'busy' | 'overcrowded' | 'closed' | 'unknown';

export interface User {
  id: string;
  name: string;
  avatar?: string;
} 
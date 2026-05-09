export interface Expert {
  _id: string;
  name: string;
  avatar: string;
  category: string;
  rating: number;
  experience: number;
  slots: Slot[];
}

export interface Slot {
  startTime: string;
  isBooked: boolean;
}

export interface Booking {
  _id: string;
  expertId: string | Expert;
  startTime: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  status: string;
}

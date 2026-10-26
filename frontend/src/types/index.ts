export interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  occasion: string;
  tag: string;
  rating: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

export interface Order {
  id: number;
  username?: string;
  recipient_name: string;
  delivery_date: string;
  delivery_address: string;
  calligraphy_note: string;
  cart: CartItem[];
  total_amount: number | string;
  payment_method: string;
  payment_status: string;
  timestamp: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

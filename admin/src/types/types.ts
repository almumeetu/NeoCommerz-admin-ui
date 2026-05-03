// E-Commerce Types

export interface Customer {
  name: string;
  phone: string;
  address?: string;
  avatar?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: number;
  amount: number;
  paymentMethod: string;
  orderDate: string;
  status: 'placed' | 'packaging' | 'ready' | 'onway' | 'delivered' | 'failed';
  products?: OrderProduct[];
  deliveryFee?: number;
  discount?: number;
}

export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface CanceledOrder {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
  };
  items: number;
  amount: number;
  orderDate: string;
  canceledDate: string;
  cancelReason: string;
  canceledBy: 'customer' | 'admin' | 'system';
}

export interface CompletedOrder {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: number;
  amount: number;
  paymentMethod: string;
  orderDate: string;
  completedDate: string;
  deliveryTime: string;
}

export interface Review {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    avatar?: string;
  };
  product: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  status: 'pending' | 'approved' | 'rejected';
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

// Supplier Types
export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
}

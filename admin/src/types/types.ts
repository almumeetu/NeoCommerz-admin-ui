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

// Additional app-specific types consolidated from components/pages
export interface Warranty {
  id: number;
  name: string;
  duration: string;
  type: string;
  status: boolean;
}

export type StatusFilterKey = 'all' | 'pending' | 'approved' | 'rejected';
export type PaymentFilterKey = 'all' | 'bKash' | 'Nagad' | 'Cash on Delivery';
export type CancelFilterKey = 'all' | 'customer' | 'admin' | 'system';
export type TabKey = 'placed' | 'packaging' | 'ready' | 'onway' | 'delivered' | 'failed';

export interface ProductReviews {
  productId: string;
  productName: string;
  totalReviews: number;
  averageRating: number;
  reviews: Review[];
}

export interface CategoryItem {
  id: string;
  name: string;
  children?: CategoryItem[];
}

export interface Branch {
  id: number;
  name: string;
  location: string;
  phone: string;
  manager: string;
  status: boolean;
}

export interface ProductItem {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: string;
  stock: number;
  status: boolean;
  description?: string;
  image?: string;
}

export interface Role {
  id: number;
  name: string;
  permissions: string;
  users: number;
  status: boolean;
}

export interface Tag {
  id: number;
  name: string;
  createdOn?: string;
  status?: boolean;
  slug?: string;
}

export interface Brand {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  status?: boolean;
  slug?: string;
}

export interface SystemUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface SupplierItem {
  id: number;
  companyName: string;
  businessPhone: string;
  address: string;
  status: boolean;
}

export interface GenericFinancePageProps {
  title: string;
  subtitle?: string;
}

export interface Register {
  id: number;
  name: string;
  branch: string;
  status: boolean;
}

export interface PlaceholderProps {
  title: string;
  subtitle?: string;
  message?: string;
}

export interface AuthUser {
  id: number | string;
  name: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface CustomerGroup {
  id: number;
  name: string;
  discount?: string;
  members?: number;
  status?: boolean;
}

// Dashboard Types
export interface Metric {
  id: number;
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  icon: string;
}

export interface SalesTrend {
  date: string;
  sales: number;
}

export interface RecentActivity {
  id: number;
  user: string;
  action: string;
  time: string;
  amount?: string | null;
}

export interface TopProduct {
  id: number;
  name: string;
  sales: number;
  revenue: string;
}

export interface RevenueChannel {
  name: string;
  value: number;
  color: string;
}

export interface DashboardData {
  metrics: Metric[];
  salesTrend: SalesTrend[];
  recentActivity: RecentActivity[];
  topProducts: TopProduct[];
  revenueChannels: RevenueChannel[];
}

// Gift Voucher Types
export interface GiftVoucherType {
  id: number;
  amount: string;
  message: string;
  code: string;
  theme: string;
}

// Report Types
export interface RevenueAnalysis {
  name: string;
  value: number;
}

export interface SaleReportSummary {
  totalSales: string;
  totalOrders: number;
  averageOrderValue: string;
  growth: string;
}

export interface SaleReport {
  summary: SaleReportSummary;
}

export interface FinanceData {
  revenueAnalysis: RevenueAnalysis[];
  saleReport: SaleReport;
}

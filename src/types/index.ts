export interface Product {
  id: string;
  name: string;
  category: 'skincare' | 'fashion' | 'lifestyle';
  categoryLabel: string;
  price: number;
  salePrice?: number;
  description: string;
  details: string[];
  ritualOrCare: string;
  images: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  stock: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Review {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  title: string;
  text: string;
  date: string;
  productPurchased: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  discountCode?: string;
  total: number;
  paymentMethod: 'credit_card' | 'cod';
  customer: OrderCustomer;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  estimatedDelivery: string;
}

export type Category = 'Neera' | 'Flavoured Beverages' | 'Gift Collections' | 'Wellness';

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Refunded';

export type SubscriptionFrequency = 'every_2_weeks' | 'every_month' | 'every_2_months';

export interface ProductVariant {
  id: string;
  name: string;
  size: string; // e.g. "250ml", "500ml", "Pack of 6 (250ml)", "Royal Gift Crate (12x250ml)"
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
}

export interface NutritionFact {
  servingSize: string;
  calories: number;
  naturalElectrolytes: string; // e.g., "Potassium 280mg, Magnesium 34mg, Sodium 18mg"
  potassium: string;
  magnesium: string;
  sodium: string;
  iron: string;
  totalCarbs: string;
  naturalSugars: string;
  addedSugar: string; // "0g (Zero Added Sugar)"
  glycemicIndex: string; // "Low GI (~35)"
  vitaminC: string;
  activeEnzymes: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  location: string;
  rating: number; // 1-5
  reviewText: string;
  productPurchased: string;
  date: string;
  isVerified: boolean;
  status: 'Approved' | 'Pending' | 'Rejected';
  isFeatured?: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  slug: string;
  category: Category;
  shortDescription: string;
  fullDescription: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  primaryImage: string;
  galleryImages: string[];
  variants: ProductVariant[];
  sku: string;
  stock: number;
  inStock: boolean;
  isFeatured: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  origin: string; // e.g. "Tirunelveli & Wild Khajur Groves of South India"
  shelfLife: string; // e.g. "90 Days (Chilled at 2°C - 6°C)"
  storageInstructions: string; // "Keep refrigerated. Gently invert before serving chilled."
  ingredients: string[];
  allergens: string; // "None. Naturally Gluten-Free & Vegan."
  certifications: string[]; // ["FSSAI Certified", "100% Raw Khajur Nectar", "Zero Preservatives", "Cold-Chain Certified"]
  nutrition: NutritionFact;
  tastingNotes: string[];
  servingsPerBottle: number;
  dimensions?: string;
  weight?: string;
  tags: string[];
  whyNiraa: string[];
  faq: { q: string; a: string }[];
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g. 10 for 10%, or 200 for ₹200 off
  minOrderValue: number;
  description: string;
  expiryDate: string;
  maxUses?: number;
  currentUses: number;
  isActive: boolean;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface TrackingMilestone {
  status: OrderStatus;
  label: string;
  timestamp: string;
  location: string;
  completed: boolean;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "NIRAA-84920"
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponApplied?: string;
  shippingFee: number;
  total: number;
  paymentMethod: 'Razorpay' | 'UPI' | 'Cards' | 'Net Banking';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderStatus: OrderStatus;
  deliveryMethod?: 'air_express' | 'cold_van';
  carrier?: string; // "Delhivery Cold-Express" | "Blue Dart Air" | "Shiprocket Prime"
  trackingNumber?: string;
  estimatedDelivery: string;
  trackingHistory: TrackingMilestone[];
  notes?: string;
}

export interface Subscription {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  frequency: SubscriptionFrequency;
  discountPercentage: number;
  nextDeliveryDate: string;
  status: 'Active' | 'Paused' | 'Cancelled';
  createdAt: string;
  shippingAddress: ShippingAddress;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
  orders: Order[];
  subscriptions: Subscription[];
  wishlist: string[]; // product IDs
  totalSpend: number;
  registeredDate: string;
  segment: 'VIP' | 'Regular' | 'New';
  status: 'Active' | 'Blocked';
}

export type AdminRole = 'super_admin' | 'admin' | 'order_manager' | 'content_manager';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  publishedDate?: string;
  readTime: string;
  summary: string;
  excerpt?: string;
  content: string[];
  category: string;
  image: string;
  coverImage?: string;
  featured: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Purity & Processing' | 'Health & Nutrition' | 'Orders & Cold-Chain Shipping';
}

export interface SiteSettings {
  brandTagline: string;
  heroHeadline: string;
  heroSubheading: string;
  announcementBar: string;
  showAnnouncementBar: boolean;
  freeShippingThreshold: number;
  coldChainPackagingFee: number;
  airlineExpressFee: number;
  supportEmail: string;
  supportPhone: string;
  instagramHandle: string;
}

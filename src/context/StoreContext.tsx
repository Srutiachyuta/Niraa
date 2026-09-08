import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Coupon,
  Order,
  CustomerProfile,
  AdminUser,
  AdminRole,
  ProductVariant,
  Subscription,
  SubscriptionFrequency,
  OrderStatus,
  BlogPost,
  FAQItem,
  SiteSettings,
  ShippingAddress,
  ProductReview,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_ADMIN_USERS,
  INITIAL_BLOG_POSTS,
  INITIAL_FAQS,
  INITIAL_SITE_SETTINGS,
  INITIAL_REVIEWS,
} from '../data/mockData';

export type ActivePage =
  | 'home'
  | 'shop'
  | 'product'
  | 'story'
  | 'khajur-to-bottle'
  | 'palm-to-bottle'
  | 'sustainability'
  | 'journal'
  | 'contact'
  | 'faq'
  | 'shipping'
  | 'privacy'
  | 'terms'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'tracking'
  | 'admin';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  // Navigation
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedBlogId: string | null;
  setSelectedBlogId: (id: string | null) => void;
  trackingOrderId: string | null;
  setTrackingOrderId: (id: string | null) => void;

  // Currency
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  formatPrice: (amountInINR: number) => string;

  // Products
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  selectedProduct: Product | undefined;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateCartQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  shippingFee: number;
  cartTotal: number;
  deliveryMethod: 'air_express' | 'cold_van';
  setDeliveryMethod: (method: 'air_express' | 'cold_van') => void;
  airlineDeliveryCharge: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  subscriptionModalProduct: Product | null;
  setSubscriptionModalProduct: (product: Product | null) => void;

  // Auth & Customer
  currentUser: CustomerProfile | null;
  loginUser: (email: string) => boolean;
  registerUser: (name: string, email: string, phone: string) => boolean;
  logoutUser: () => void;
  updateUserProfile: (profile: Partial<CustomerProfile>) => void;
  saveAddress: (address: ShippingAddress) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingHistory'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, notes?: string, carrier?: string, trackingNumber?: string) => void;

  // Subscriptions
  subscriptions: Subscription[];
  createSubscription: (product: Product, variant: ProductVariant, frequency: SubscriptionFrequency, qty: number, address: ShippingAddress) => void;
  pauseSubscription: (id: string) => void;
  cancelSubscription: (id: string) => void;

  // Admin
  adminUser: AdminUser | null;
  setAdminUser: (admin: AdminUser | null) => void;
  adminLogin: (role: AdminRole) => void;
  adminLogout: () => void;
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  reviews: ProductReview[];
  updateReviewStatus: (id: string, status: 'Approved' | 'Rejected') => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (newSettings: Partial<SiteSettings>) => void;
  blogPosts: BlogPost[];
  faqs: FAQItem[];

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;

  // Logistics
  checkPincodeServiceability: (pincode: string) => { serviceable: boolean; estimatedDays: string; carrier: string };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('niraa-pure-neera');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  // Currency
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('niraa_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('niraa_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('niraa_wishlist');
    return saved ? JSON.parse(saved) : ['niraa-pure-neera'];
  });

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [subscriptionModalProduct, setSubscriptionModalProduct] = useState<Product | null>(null);

  // User
  const [currentUser, setCurrentUser] = useState<CustomerProfile | null>(() => {
    const saved = localStorage.getItem('niraa_current_user');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS[0];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('niraa_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Subscriptions
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('niraa_subscriptions');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'sub-101',
        product: INITIAL_PRODUCTS[0],
        variant: INITIAL_PRODUCTS[0].variants[1],
        quantity: 1,
        frequency: 'every_2_weeks',
        discountPercentage: 15,
        nextDeliveryDate: '2026-09-20',
        status: 'Active',
        createdAt: '2026-08-01',
        shippingAddress: INITIAL_CUSTOMERS[0].addresses[0],
      },
    ];
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('niraa_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  // Reviews
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('niraa_reviews');
    return saved ? JSON.parse(saved) : (INITIAL_REVIEWS as ProductReview[]);
  });

  // Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('niraa_site_settings');
    return saved ? JSON.parse(saved) : INITIAL_SITE_SETTINGS;
  });

  // Blog & FAQ
  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [faqs] = useState<FAQItem[]>(INITIAL_FAQS);

  // Delivery Method Selection ('air_express' = Airline Cold-Chain Air Cargo, 'cold_van' = Ground Refrigerated)
  const [deliveryMethod, setDeliveryMethod] = useState<'air_express' | 'cold_van'>('air_express');

  // Admin
  const [adminUser, setAdminUser] = useState<AdminUser | null>(INITIAL_ADMIN_USERS[0]);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // LocalStorage synchronizers
  useEffect(() => {
    localStorage.setItem('niraa_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('niraa_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('niraa_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('niraa_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('niraa_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('niraa_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('niraa_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('niraa_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('niraa_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('niraa_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Price Formatter
  const formatPrice = (amountInINR: number): string => {
    if (currency === 'USD') {
      const usd = (amountInINR / 84).toFixed(2);
      return `$${usd}`;
    }
    return `₹${amountInINR.toLocaleString('en-IN')}`;
  };

  // Active Product Helper
  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  // Cart Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
    if (discountAmount > cartSubtotal) discountAmount = cartSubtotal;
  }

  const airlineDeliveryCharge = siteSettings.airlineExpressFee ?? 350;
  const standardGroundFee = cartSubtotal > siteSettings.freeShippingThreshold || cartSubtotal === 0 ? 0 : siteSettings.coldChainPackagingFee;
  const shippingFee = cartSubtotal === 0 ? 0 : (deliveryMethod === 'air_express' ? airlineDeliveryCharge : standardGroundFee);
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Cart Operations
  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.variant.id === variant.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, variant, quantity }];
    });
    showToast(`Added ${quantity}x ${product.name} (${variant.size}) to your cellar cart.`);
  };

  const updateCartQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.variant.id === variantId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (variantId: string) => {
    setCart((prev) => prev.filter((item) => item.variant.id !== variantId));
    showToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === trimmed && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired concierge promo code.' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `This privilege code requires a minimum order value of ${formatPrice(found.minOrderValue)}.`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Code ${found.code} applied: ${found.description}`);
    return { success: true, message: `Privilege code applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your private wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your private wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Customer Auth
  const loginUser = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    const found = INITIAL_CUSTOMERS.find((c) => c.email.toLowerCase() === trimmed);
    if (found) {
      setCurrentUser(found);
    } else {
      const newUser: CustomerProfile = {
        id: `cust-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email: trimmed,
        phone: '+91 98000 00000',
        addresses: [],
        orders: [],
        subscriptions: [],
        wishlist: [],
        totalSpend: 0,
        registeredDate: new Date().toISOString().split('T')[0],
        segment: 'New',
        status: 'Active',
      };
      setCurrentUser(newUser);
    }
    showToast(`Welcome back, ${email}`);
    return true;
  };

  const registerUser = (name: string, email: string, phone: string) => {
    const newUser: CustomerProfile = {
      id: `cust-${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      phone,
      addresses: [],
      orders: [],
      subscriptions: [],
      wishlist: [],
      totalSpend: 0,
      registeredDate: new Date().toISOString().split('T')[0],
      segment: 'New',
      status: 'Active',
    };
    setCurrentUser(newUser);
    showToast(`Account successfully created for ${name}`);
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('You have been securely signed out.', 'info');
  };

  const updateUserProfile = (profile: Partial<CustomerProfile>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...profile });
    showToast('Profile updated successfully.');
  };

  const saveAddress = (address: ShippingAddress) => {
    if (!currentUser) return;
    const existing = currentUser.addresses || [];
    const updated = [...existing, address];
    setCurrentUser({ ...currentUser, addresses: updated });
    showToast('Address added to your vault.');
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingHistory'>): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `NIRAA-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      trackingNumber: `BD-NIRAA-${Math.floor(1000000 + Math.random() * 9000000)}`,
      carrier: 'Blue Dart Cold-Chain Air',
      trackingHistory: [
        {
          status: 'Confirmed',
          label: 'Order Confirmed & Payment Captured',
          timestamp: 'Just now',
          location: 'NIRAA Central Vault, Bengaluru',
          completed: true,
        },
        {
          status: 'Packed',
          label: 'Chilled Packing in Cryo-Insulated Box',
          timestamp: 'Scheduled',
          location: 'Cold Cellar',
          completed: false,
        },
        {
          status: 'Shipped',
          label: 'Dispatched via Temperature-Controlled Air Cargo',
          timestamp: 'Scheduled',
          location: 'Airport Cold Hub',
          completed: false,
        },
        {
          status: 'Out for Delivery',
          label: 'Out for Delivery with Cold Seal Verification',
          timestamp: 'Scheduled',
          location: 'Local Metro Hub',
          completed: false,
        },
        {
          status: 'Delivered',
          label: 'Delivered to Customer',
          timestamp: 'Scheduled',
          location: 'Destination',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update customer stats
    if (currentUser) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              orders: [newOrder, ...prev.orders],
              totalSpend: prev.totalSpend + newOrder.total,
            }
          : null
      );
    }

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    notes?: string,
    carrier?: string,
    trackingNumber?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const history = [...ord.trackingHistory];
        const index = history.findIndex((h) => h.status === status);
        if (index > -1) {
          history[index] = {
            ...history[index],
            completed: true,
            timestamp: 'Updated just now',
            notes: notes || history[index].notes,
          };
        }
        return {
          ...ord,
          orderStatus: status,
          carrier: carrier || ord.carrier,
          trackingNumber: trackingNumber || ord.trackingNumber,
          trackingHistory: history,
        };
      })
    );
    showToast(`Order ${orderId} updated to ${status}`);
  };

  // Subscriptions
  const createSubscription = (
    product: Product,
    variant: ProductVariant,
    frequency: SubscriptionFrequency,
    quantity: number,
    address: ShippingAddress
  ) => {
    const nextDelivery = new Date();
    if (frequency === 'every_2_weeks') {
      nextDelivery.setDate(nextDelivery.getDate() + 14);
    } else if (frequency === 'every_month') {
      nextDelivery.setMonth(nextDelivery.getMonth() + 1);
    } else {
      nextDelivery.setMonth(nextDelivery.getMonth() + 2);
    }

    const newSub: Subscription = {
      id: `sub-${Date.now()}`,
      product,
      variant,
      quantity,
      frequency,
      discountPercentage: 15,
      nextDeliveryDate: nextDelivery.toISOString().split('T')[0],
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      shippingAddress: address,
    };

    setSubscriptions((prev) => [newSub, ...prev]);
    showToast(`Subscription activated! Enjoy 15% off recurring deliveries.`);
  };

  const pauseSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' } : s))
    );
    showToast('Subscription schedule updated.');
  };

  const cancelSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Cancelled' } : s))
    );
    showToast('Subscription cancelled.', 'info');
  };

  // Admin
  const adminLogin = (role: AdminRole) => {
    const admin = INITIAL_ADMIN_USERS.find((a) => a.role === role) || INITIAL_ADMIN_USERS[0];
    setAdminUser(admin);
    showToast(`Logged in to backoffice as ${admin.name} (${admin.role})`);
  };

  const adminLogout = () => {
    setAdminUser(null);
    showToast('Logged out of admin panel.', 'info');
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Product "${product.name}" created.`);
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    showToast(`Product "${product.name}" updated.`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.', 'warning');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    showToast(`Coupon ${coupon.code} activated.`);
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Coupon ${code} removed.`, 'info');
  };

  const updateReviewStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    showToast(`Review marked as ${status}.`);
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Store settings updated.');
  };

  // Pincode Logistics Checker
  const checkPincodeServiceability = (pincode: string) => {
    const pin = pincode.trim();
    if (pin.length !== 6 || isNaN(Number(pin))) {
      return { serviceable: false, estimatedDays: '', carrier: '' };
    }
    // Metro check
    const prefix = pin.slice(0, 2);
    if (['56', '40', '11', '60', '50', '70'].includes(prefix)) {
      return {
        serviceable: true,
        estimatedDays: 'Within 24 Hours (Chilled Air Express)',
        carrier: 'Blue Dart Cold-Chain Air',
      };
    }
    return {
      serviceable: true,
      estimatedDays: '24–48 Hours (Temperature-Controlled Van)',
      carrier: 'Delhivery Cold-Express',
    };
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductId,
        setSelectedProductId,
        selectedBlogId,
        setSelectedBlogId,
        trackingOrderId,
        setTrackingOrderId,
        currency,
        setCurrency,
        formatPrice,
        products,
        setProducts,
        selectedProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal,
        deliveryMethod,
        setDeliveryMethod,
        airlineDeliveryCharge,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        subscriptionModalProduct,
        setSubscriptionModalProduct,
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        saveAddress,
        orders,
        createOrder,
        updateOrderStatus,
        subscriptions,
        createSubscription,
        pauseSubscription,
        cancelSubscription,
        adminUser,
        setAdminUser,
        adminLogin,
        adminLogout,
        coupons,
        addCoupon,
        deleteCoupon,
        reviews,
        updateReviewStatus,
        siteSettings,
        updateSiteSettings,
        blogPosts,
        faqs,
        toasts,
        showToast,
        dismissToast,
        checkPincodeServiceability,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

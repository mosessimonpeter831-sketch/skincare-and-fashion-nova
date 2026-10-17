import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order } from '../types';
import { PRODUCTS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  activeOrder: Order | null;
  activeProduct: Product | null;
  currentView: 'home' | 'shop' | 'skincare' | 'fashion' | 'lifestyle' | 'pdp';
  activeCategoryFilter: string;
  searchQuery: string;
  discountCode: string | null;
  discountPercent: number;
  isFreeShippingCode: boolean;

  // AI Active Vision & Cinematic State
  isAiActive: boolean;
  toggleAiActive: () => void;
  isCinematicPlaying: boolean;
  toggleCinematicPlaying: () => void;
  activeCinematicScene: number;
  setActiveCinematicScene: (scene: number) => void;
  
  // Modals & Drawers
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isCheckoutOpen: boolean;
  isOrderConfirmationOpen: boolean;
  isOrderTrackingOpen: boolean;
  isAboutOpen: boolean;
  activePolicy: 'shipping' | 'returns' | 'privacy' | 'terms' | 'faq' | null;
  quickViewProduct: Product | null;
  
  // Computed Cart Stats
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;

  // Actions
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  createOrder: (orderData: { paymentMethod: 'credit_card' | 'cod'; customer: Order['customer'] }) => Order;
  trackOrderById: (orderId: string) => Order | undefined;
  
  // Navigation & UI controls
  setCurrentView: (view: 'home' | 'shop' | 'skincare' | 'fashion' | 'lifestyle' | 'pdp') => void;
  navigateToProduct: (product: Product) => void;
  navigateToCategory: (category: string) => void;
  setActiveCategoryFilter: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsOrderConfirmationOpen: (open: boolean) => void;
  setIsOrderTrackingOpen: (open: boolean) => void;
  setIsAboutOpen: (open: boolean) => void;
  setActivePolicy: (policy: 'shipping' | 'returns' | 'privacy' | 'terms' | 'faq' | null) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setActiveOrder: (order: Order | null) => void;
  
  // Notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 120;
const STANDARD_SHIPPING_FEE = 15;
const ESTIMATED_TAX_RATE = 0.08;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('naova_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 1 }
      ];
    } catch {
      return [{ product: PRODUCTS[0], quantity: 1 }];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('naova_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1].id];
    } catch {
      return [PRODUCTS[1].id];
    }
  });

  // Orders history
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('naova_orders');
      if (saved) return JSON.parse(saved);
      // Sample initial verified order for immediate order-tracking verification
      return [
        {
          id: 'NOV-84920',
          date: 'April 15, 2026',
          items: [
            { product: PRODUCTS[0], quantity: 1 },
            { product: PRODUCTS[5], quantity: 1, selectedSize: 'S', selectedColor: 'Champagne Silk' }
          ],
          subtotal: 233,
          discount: 0,
          shipping: 0,
          tax: 18.64,
          total: 251.64,
          paymentMethod: 'credit_card',
          status: 'shipped',
          estimatedDelivery: 'April 20, 2026',
          customer: {
            fullName: 'Camille Laurent',
            email: 'camille.l@example.com',
            phone: '+1 (555) 234-8971',
            address: '450 Park Avenue, Apt 14B',
            city: 'New York',
            state: 'NY',
            postalCode: '10022',
            country: 'United States'
          }
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'skincare' | 'fashion' | 'lifestyle' | 'pdp'>('home');
  const [activeProduct, setActiveProduct] = useState<Product | null>(PRODUCTS[0]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // AI Active Vision & Cinematic State
  const [isAiActive, setIsAiActive] = useState<boolean>(true);
  const [isCinematicPlaying, setIsCinematicPlaying] = useState<boolean>(true);
  const [activeCinematicScene, setActiveCinematicScene] = useState<number>(0);

  const toggleAiActive = () => {
    setIsAiActive((prev) => {
      const next = !prev;
      showToast(next ? 'AI Active Vision & Optical Scan: Enabled' : 'AI Active Vision: Paused', 'info');
      return next;
    });
  };

  const toggleCinematicPlaying = () => {
    setIsCinematicPlaying((prev) => {
      const next = !prev;
      showToast(next ? 'Cinematic Motion: Resumed' : 'Cinematic Motion: Paused', 'info');
      return next;
    });
  };

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<'shipping' | 'returns' | 'privacy' | 'terms' | 'faq' | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Discount
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isFreeShippingCode, setIsFreeShippingCode] = useState<boolean>(false);

  // Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('naova_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Unable to persist cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('naova_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Unable to persist wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('naova_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Unable to persist orders', e);
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    // If fashion product without size specified, pick first size
    const effectiveSize = selectedSize || (product.sizes ? product.sizes[0] : undefined);
    const effectiveColor = selectedColor || (product.colors ? product.colors[0].name : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === effectiveSize &&
          item.selectedColor === effectiveColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = next[existingIndex].quantity + quantity;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Math.min(newQty, product.stock)
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          quantity: Math.min(quantity, product.stock),
          selectedSize: effectiveSize,
          selectedColor: effectiveColor
        }
      ];
    });

    showToast(`Added "${product.name}" to your shopping bag`, 'success');
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        ) {
          return {
            ...item,
            quantity: Math.min(quantity, item.product.stock)
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (
    productId: string,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
    showToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your saved wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Discount codes
  const applyDiscountCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NAOVA15') {
      setDiscountCode('NAOVA15');
      setDiscountPercent(15);
      setIsFreeShippingCode(false);
      showToast('Offer code NAOVA15 applied: 15% discount activated!', 'success');
      return { success: true, message: '15% discount applied successfully.' };
    } else if (clean === 'FREESHIP') {
      setDiscountCode('FREESHIP');
      setDiscountPercent(0);
      setIsFreeShippingCode(true);
      showToast('Offer code FREESHIP applied: Free delivery granted!', 'success');
      return { success: true, message: 'Complimentary shipping applied.' };
    } else {
      showToast('Invalid promotional code. Try NAOVA15 for 15% off.', 'error');
      return { success: false, message: 'The promotion code entered is not valid.' };
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode(null);
    setDiscountPercent(0);
    setIsFreeShippingCode(false);
    showToast('Promotion code removed', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.salePrice ?? item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = discountPercent > 0 ? (subtotal * discountPercent) / 100 : 0;
  
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || isFreeShippingCode;
  const shipping = subtotal > 0 ? (qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE) : 0;
  
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount > 0 ? Math.round(taxableAmount * ESTIMATED_TAX_RATE * 100) / 100 : 0;
  
  const total = Math.max(0, taxableAmount + shipping + tax);
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  // Create Order
  const createOrder = (orderData: { paymentMethod: 'credit_card' | 'cod'; customer: Order['customer'] }): Order => {
    const orderNumber = `NOV-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Estimated 4 business days ahead
    const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: orderNumber,
      date: formattedDate,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      discountCode: discountCode || undefined,
      shipping,
      tax,
      total,
      paymentMethod: orderData.paymentMethod,
      customer: orderData.customer,
      status: 'confirmed',
      estimatedDelivery: deliveryDate
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderConfirmationOpen(true);
    showToast(`Order ${newOrder.id} successfully created!`, 'success');

    return newOrder;
  };

  const trackOrderById = (orderId: string): Order | undefined => {
    const cleanId = orderId.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase() === cleanId);
  };

  // Navigation helpers
  const navigateToProduct = (product: Product) => {
    setActiveProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (category: string) => {
    setActiveCategoryFilter(category);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        activeOrder,
        activeProduct,
        currentView,
        activeCategoryFilter,
        searchQuery,
        discountCode,
        discountPercent,
        isFreeShippingCode,

        isAiActive,
        toggleAiActive,
        isCinematicPlaying,
        toggleCinematicPlaying,
        activeCinematicScene,
        setActiveCinematicScene,

        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isCheckoutOpen,
        isOrderConfirmationOpen,
        isOrderTrackingOpen,
        isAboutOpen,
        activePolicy,
        quickViewProduct,

        cartCount,
        subtotal,
        discountAmount,
        shipping,
        tax,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountUntilFreeShipping,

        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyDiscountCode,
        removeDiscountCode,
        createOrder,
        trackOrderById,

        setCurrentView,
        navigateToProduct,
        navigateToCategory,
        setActiveCategoryFilter,
        setSearchQuery,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        setIsCheckoutOpen,
        setIsOrderConfirmationOpen,
        setIsOrderTrackingOpen,
        setIsAboutOpen,
        setActivePolicy,
        setQuickViewProduct,
        setActiveOrder,

        toasts,
        showToast,
        dismissToast,
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

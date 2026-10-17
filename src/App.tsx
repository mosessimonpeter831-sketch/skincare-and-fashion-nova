import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { TheNaovaEdit } from './components/TheNaovaEdit';
import { BrandStorySection } from './components/BrandStorySection';
import { SkincareExperienceSection } from './components/SkincareExperienceSection';
import { FashionCollectionSection } from './components/FashionCollectionSection';
import { AiStudioSection } from './components/AiStudioSection';
import { PromotionalBanner } from './components/PromotionalBanner';
import { TestimonialsAndTrust } from './components/TestimonialsAndTrust';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AboutModal } from './components/AboutModal';
import { PolicyModal } from './components/PolicyModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ShopCatalogView } from './components/ShopCatalogView';
import { ToastContainer } from './components/ToastContainer';

const MainLayout: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] selection:bg-[#EAE4DC] selection:text-[#1C1917]">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <FeaturedCategories />
            <TheNaovaEdit />
            <BrandStorySection />
            <SkincareExperienceSection />
            <FashionCollectionSection />
            <AiStudioSection />
            <PromotionalBanner />
            <TestimonialsAndTrust />
            <NewsletterSection />
          </>
        )}

        {currentView === 'shop' && <ShopCatalogView />}

        {currentView === 'pdp' && <ProductDetailPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Drawers & Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderTrackingModal />
      <AboutModal />
      <PolicyModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}

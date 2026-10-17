import { Review } from '../types';

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev-01',
    author: 'Elena Vance',
    verified: true,
    rating: 5,
    title: 'Transformative texture & effortless elegance',
    text: 'The Botanical Renewal Serum has completely simplified my morning ritual. It absorbs without any stickiness and leaves my skin deeply hydrated with a dewy, natural finish. Paired with the Silk Blouse, I feel put-together the second I leave the house.',
    date: 'March 14, 2026',
    productPurchased: 'AURA Botanical Renewal Serum'
  },
  {
    id: 'rev-02',
    author: 'Camille Laurent',
    verified: true,
    rating: 5,
    title: 'Impeccable tailoring and heirloom feel',
    text: 'I ordered the Architectural Wool Trench after searching for the perfect structured outerwear for months. The weight of the fabric and the drape are exceptional—comparable to luxury houses charging triple the price. Customer care was also wonderfully prompt.',
    date: 'April 02, 2026',
    productPurchased: 'The Architectural Wool-Blend Trench'
  },
  {
    id: 'rev-03',
    author: 'Sophia Chen',
    verified: true,
    rating: 5,
    title: 'The perfect harmony of skincare and daily style',
    text: 'NAOVA represents everything modern luxury should be: intentional, clean, and understated. The Cellular Barrier Crème restored my dry skin during cold flights, while the Mini Tote has become my everyday signature accessory. Absolutely in love.',
    date: 'April 19, 2026',
    productPurchased: 'Cellular Hydration Barrier Crème'
  }
];

export const TRUST_PILLARS = [
  {
    title: 'Secure Checkout',
    description: '256-bit encrypted transactions with multiple payment methods and Cash on Delivery options.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Live Order Tracking',
    description: 'Track your package progress in real-time with continuous SMS and email shipping milestones.',
    iconName: 'Truck'
  },
  {
    title: 'Dedicated Client Care',
    description: 'Our concierge advisory team is available 7 days a week for sizing, rituals, and order support.',
    iconName: 'Sparkles'
  },
  {
    title: 'Complimentary Returns',
    description: '30-day effortless return and exchange policy on all unworn items and unopened beauty products.',
    iconName: 'RefreshCw'
  }
];

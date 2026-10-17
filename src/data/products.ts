import { Product } from '../types';

export const ASSETS = {
  heroCampaign: '/src/assets/images/naova_hero_campaign_1792240922588.jpg',
  cinematicAtelier: '/src/assets/images/naova_cinematic_atelier_1792242751327.jpg',
  skincareBottle: '/src/assets/images/naova_skincare_bottle_1792240923541.jpg',
  fashionEditorial: '/src/assets/images/naova_fashion_editorial_1792240923463.jpg',
  brandStory: '/src/assets/images/naova_brand_story_1792240923272.jpg',
  lifestyleCollection: '/src/assets/images/naova_lifestyle_collection_1792240923861.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'naova-serum-01',
    name: 'AURA Botanical Renewal Serum',
    category: 'skincare',
    categoryLabel: 'Skincare Essentials',
    price: 78,
    salePrice: 68,
    description: 'An ultra-lightweight elixir infused with cold-pressed botanical lipids, plant squalane, and active niacinamide. Formulated to restore barrier resilience, even skin tone, and impart an effortless luminous morning glow.',
    details: [
      'Targeted hydration with botanical ceramides and plant squalane',
      'Non-greasy, fast-absorbing micro-emulsion',
      'Glass dropper bottle with UV-filtering frosted finish (30ml / 1.0 fl. oz.)',
      'Free from synthetic fragrances, sulfates, parabens, and phthalates'
    ],
    ritualOrCare: 'Dispense 3–4 drops onto freshly cleansed fingertips. Gently press into face, neck, and décolletage every morning and evening before creams.',
    images: [
      ASSETS.skincareBottle,
      ASSETS.heroCampaign,
      ASSETS.brandStory
    ],
    stock: 24,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 148
  },
  {
    id: 'naova-trench-02',
    name: 'The Architectural Wool-Blend Trench',
    category: 'fashion',
    categoryLabel: 'Fashion Collection',
    price: 285,
    description: 'Tailored from an Italian double-faced virgin wool and organic cotton blend. Features structured storm flaps, a defined waist tie, horn buttons, and an elongated editorial silhouette for effortless all-season elegance.',
    details: [
      '70% Virgin Wool, 30% Long-Staple Organic Cotton',
      'Full interior lining in breathable cupro silk-touch fabric',
      'Removable belt with matching horn buckle and deep welt pockets',
      'Dry clean only by garment care specialists'
    ],
    ritualOrCare: 'Store on a broad wooden hanger. Steam lightly between wears. Professional dry clean when necessary.',
    images: [
      ASSETS.fashionEditorial,
      ASSETS.heroCampaign
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ivory Cream', hex: '#F3EFE6' },
      { name: 'Desert Camel', hex: '#C2A382' },
      { name: 'Espresso Noir', hex: '#25211E' }
    ],
    stock: 12,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 86
  },
  {
    id: 'naova-cream-03',
    name: 'Cellular Hydration Barrier Crème',
    category: 'skincare',
    categoryLabel: 'Skincare Essentials',
    price: 84,
    description: 'A comforting, velvety moisturizer formulated with multi-weight hyaluronic acid, provitamin B5, and calming oat lipids. Delivers deep, lasting nourishment while shielding skin against dry environments.',
    details: [
      'Multi-molecular weight hyaluronic acid matrix',
      'Enriched with soothing oat kernel extract and shea butter esters',
      'Rich yet weightless cushion texture that melts upon contact',
      'Recyclable glass jar with brushed gold lid (50ml / 1.7 oz.)'
    ],
    ritualOrCare: 'Warm a pea-sized amount between clean palms. Smooth upward along cheeks, forehead, and jawline morning and evening.',
    images: [
      ASSETS.brandStory,
      ASSETS.skincareBottle
    ],
    stock: 18,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 112
  },
  {
    id: 'naova-tote-04',
    name: 'The Sculpted Leather Mini Tote',
    category: 'lifestyle',
    categoryLabel: 'Beauty & Lifestyle',
    price: 240,
    description: 'Handcrafted in Florence from supple vegetable-tanned calfskin. Features an architectural trapezoid silhouette, gold-tone custom hardware lock, and a detachable crossbody strap.',
    details: [
      '100% Full-grain vegetable-tanned Italian calf leather',
      'Custom brushed brass turn-lock closure',
      'Dual top handles and adjustable/detachable leather shoulder strap',
      'Suede-lined interior with card slot and zip pocket'
    ],
    ritualOrCare: 'Condition with specialized leather cream twice yearly. Keep away from direct water and store in the provided cotton dust bag.',
    images: [
      ASSETS.lifestyleCollection,
      ASSETS.heroCampaign
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#9E5B32' },
      { name: 'Oatmeal Beige', hex: '#D6C8B4' },
      { name: 'Charcoal Black', hex: '#1E1B18' }
    ],
    stock: 9,
    isFeatured: true,
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 42
  },
  {
    id: 'naova-mist-05',
    name: 'Rosewater & Neroli Radiance Mist',
    category: 'skincare',
    categoryLabel: 'Skincare Essentials',
    price: 42,
    description: 'An ultra-fine botanical facial mist distilled from organic Damask rose petals and neroli blossom. Instantly revitalizes dry skin, sets makeup, and soothes midday fatigue.',
    details: [
      'Steam-distilled Mediterranean floral hydrosols',
      'Infused with glycerin and witch hazel for balanced hydration',
      'Micro-mist pump produces an ethereal cloud spray',
      'Glass spray bottle (100ml / 3.4 fl. oz.)'
    ],
    ritualOrCare: 'Mist generously over face from 8–10 inches away at any time during the day to refresh and reset.',
    images: [
      ASSETS.lifestyleCollection,
      ASSETS.skincareBottle
    ],
    stock: 35,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 64
  },
  {
    id: 'naova-blouse-06',
    name: 'Sartorial Mulberry Silk Crepe Blouse',
    category: 'fashion',
    categoryLabel: 'Fashion Collection',
    price: 175,
    salePrice: 155,
    description: 'Cut from 22-momme pure mulberry silk crepe with a fluid drape, concealed button placket, and refined French cuffs. The epitome of quiet luxury for boardroom meetings or candlelit dinners.',
    details: [
      '100% Grade 6A Mulberry Silk Crepe',
      'Mother-of-pearl buttons with hidden front placket',
      'Soft tailored collar and relaxed dropped shoulder',
      'Hand wash in cold water or dry clean'
    ],
    ritualOrCare: 'Hand wash gently with silk detergent in lukewarm water. Iron inside out on the lowest heat setting while slightly damp.',
    images: [
      ASSETS.fashionEditorial,
      ASSETS.brandStory
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne Silk', hex: '#EBE2D5' },
      { name: 'Muted Rose', hex: '#C49E9E' },
      { name: 'Midnight Onyx', hex: '#1C1917' }
    ],
    stock: 15,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 78
  },
  {
    id: 'naova-sunglasses-07',
    name: 'L’Atelier Tortoiseshell Sunglasses',
    category: 'lifestyle',
    categoryLabel: 'Beauty & Lifestyle',
    price: 135,
    description: 'Bold rectangular frames crafted from hand-polished bio-acetate. Outfitted with Category 3 scratch-resistant green lenses providing complete UV400 protection.',
    details: [
      'Italian Mazzucchelli cellulose bio-acetate frame',
      '100% UVA/UVB Category 3 optical lenses',
      'Five-barrel reinforced gold-plated barrel hinges',
      'Includes vegan leather hard case and microfiber cleaning cloth'
    ],
    ritualOrCare: 'Rinse with clean water to remove dust. Wipe only with the included microfiber cloth. Do not leave on hot car dashboards.',
    images: [
      ASSETS.lifestyleCollection,
      ASSETS.fashionEditorial
    ],
    stock: 14,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 39
  },
  {
    id: 'naova-trouser-08',
    name: 'Relaxed Wide-Leg Pleated Trouser',
    category: 'fashion',
    categoryLabel: 'Fashion Collection',
    price: 160,
    description: 'Designed with clean front double pleats, high-rise waist, and a fluid wide-leg silhouette. Made from a premium seasonless wool-linen blend that drapes with graceful poise.',
    details: [
      '55% Organic Linen, 45% Fine Merino Wool',
      'High-waisted fit with internal gripper waistband',
      'Side slant pockets and rear buttoned jetted pockets',
      'Full length with 2-inch hem allowance for tailoring'
    ],
    ritualOrCare: 'Dry clean or steam to maintain crisp pleat creases. Hang from cuff clamps.',
    images: [
      ASSETS.heroCampaign,
      ASSETS.fashionEditorial
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand Taupe', hex: '#D2C3B2' },
      { name: 'Rich Espresso', hex: '#2B241E' }
    ],
    stock: 19,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 52
  }
];

export const CATEGORIES = [
  {
    id: 'skincare',
    title: 'Skincare Essentials',
    subtitle: 'Nourish your skin with products selected for your daily beauty ritual.',
    cta: 'Explore Skincare',
    image: ASSETS.skincareBottle,
    itemCount: '8 Products'
  },
  {
    id: 'fashion',
    title: 'Fashion Collection',
    subtitle: 'Discover contemporary styles that bring confidence and personality to every look.',
    cta: 'Shop Fashion',
    image: ASSETS.fashionEditorial,
    itemCount: '12 Items'
  },
  {
    id: 'lifestyle',
    title: 'Beauty & Lifestyle',
    subtitle: 'Complete your routine with beauty and lifestyle essentials that complement your personal style.',
    cta: 'Discover More',
    image: ASSETS.lifestyleCollection,
    itemCount: '6 Accessories'
  }
];

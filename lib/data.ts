export type Condition = 'New' | 'Used'

export type Product = {
  id: string
  name: string
  price: number
  condition: Condition
  location: string
  state: string
  storeSlug: string
  storeName: string
  verified: boolean
  category: string
  image: string
  images: string[]
  partNumber: string
  compatible: string
  postedLabel: string
  inStock: boolean
  vehicleMake: string
  vehicleModel: string
  description: string
}

export const NAIRA = '\u20A6'

export function formatNaira(value: number): string {
  return `${NAIRA}${value.toLocaleString('en-NG')}`
}

export const categories = [
  { id: 'car', label: 'Car Parts', icon: 'Car' },
  { id: 'motorcycle', label: 'Motorcycle Parts', icon: 'Bike' },
  { id: 'truck', label: 'Truck & Trailer', icon: 'Truck' },
  { id: 'tractor', label: 'Tractor & Farm', icon: 'Tractor' },
  { id: 'heavy', label: 'Heavy Equipment', icon: 'Forklift' },
  { id: 'electrical', label: 'Electrical Parts', icon: 'Zap' },
] as const

export const products: Product[] = [
  {
    id: 'tcbp-2017-f',
    name: 'Toyota Corolla Front Brake Pad',
    price: 28500,
    condition: 'New',
    location: 'Ladipo, Lagos',
    state: 'Lagos',
    storeSlug: 'ladipo-auto-spares',
    storeName: 'Ladipo Auto Spares',
    verified: true,
    category: 'Braking System',
    image: '/products/brake-pad.png',
    images: ['/products/brake-pad.png', '/products/oil-filter.png', '/products/headlight.png'],
    partNumber: 'TCBP-2017-F',
    compatible: 'Toyota Corolla 2014–2019',
    postedLabel: 'Today',
    inStock: true,
    vehicleMake: 'Toyota',
    vehicleModel: 'Corolla',
    description:
      'Original-quality front brake pads suitable for Toyota Corolla models from 2014 to 2019. Available for pickup or nationwide delivery arranged directly with the seller.',
  },
  {
    id: 'ha-2013-alt',
    name: 'Honda Accord 2013 Alternator',
    price: 95000,
    condition: 'Used',
    location: 'Surulere, Lagos',
    state: 'Lagos',
    storeSlug: 'surulere-auto-centre',
    storeName: 'Surulere Auto Centre',
    verified: true,
    category: 'Electrical Parts',
    image: '/products/alternator.png',
    images: ['/products/alternator.png', '/products/oil-filter.png', '/products/headlight.png'],
    partNumber: 'HA-ALT-2013',
    compatible: 'Honda Accord 2008–2015',
    postedLabel: '2 days ago',
    inStock: true,
    vehicleMake: 'Honda',
    vehicleModel: 'Accord',
    description:
      'Tested and working alternator removed from a Honda Accord 2013. Output verified on the bench. Fitment support available — contact the seller to confirm compatibility.',
  },
  {
    id: 'cat-hyd-pump',
    name: 'Caterpillar Hydraulic Pump',
    price: 780000,
    condition: 'Used',
    location: 'Kano',
    state: 'Kano',
    storeSlug: 'kano-heavy-equipment-parts',
    storeName: 'Kano Heavy Equipment Parts',
    verified: true,
    category: 'Heavy Equipment',
    image: '/products/hydraulic-pump.png',
    images: ['/products/hydraulic-pump.png', '/products/alternator.png', '/products/tractor-tire.png'],
    partNumber: 'CAT-HP-320',
    compatible: 'Caterpillar 320 / 330 Excavators',
    postedLabel: '5 days ago',
    inStock: true,
    vehicleMake: 'Caterpillar',
    vehicleModel: '320',
    description:
      'Refurbished main hydraulic pump for Caterpillar 320-class excavators. Pressure-tested and ready for installation. Delivery nationwide arranged directly with the seller.',
  },
  {
    id: 'bajaj-clutch',
    name: 'Bajaj Boxer Clutch Plate',
    price: 18000,
    condition: 'New',
    location: 'Nnewi, Anambra',
    state: 'Anambra',
    storeSlug: 'nnewi-motor-parts-hub',
    storeName: 'Nnewi Motor Parts Hub',
    verified: true,
    category: 'Motorcycle Parts',
    image: '/products/clutch-plate.png',
    images: ['/products/clutch-plate.png', '/products/oil-filter.png', '/products/brake-pad.png'],
    partNumber: 'BJ-BX-CP',
    compatible: 'Bajaj Boxer 100 / 150',
    postedLabel: '1 week ago',
    inStock: true,
    vehicleMake: 'Bajaj',
    vehicleModel: 'Boxer',
    description:
      'Brand-new clutch plate set for Bajaj Boxer commercial motorcycles. Genuine friction material for long service life. Wholesale quantities available on request.',
  },
  {
    id: 'oil-filter-univ',
    name: 'Toyota Genuine Oil Filter',
    price: 4500,
    condition: 'New',
    location: 'Ladipo, Lagos',
    state: 'Lagos',
    storeSlug: 'ladipo-auto-spares',
    storeName: 'Ladipo Auto Spares',
    verified: true,
    category: 'Engine Parts',
    image: '/products/oil-filter.png',
    images: ['/products/oil-filter.png', '/products/brake-pad.png', '/products/headlight.png'],
    partNumber: 'TG-OF-90915',
    compatible: 'Toyota Corolla / Camry / RAV4',
    postedLabel: '3 days ago',
    inStock: true,
    vehicleMake: 'Toyota',
    vehicleModel: 'Corolla',
    description:
      'Genuine Toyota spin-on oil filter for most Toyota petrol engines. Sold individually or by the carton.',
  },
  {
    id: 'led-headlight',
    name: 'Toyota Corolla LED Headlight Assembly',
    price: 62000,
    condition: 'New',
    location: 'Surulere, Lagos',
    state: 'Lagos',
    storeSlug: 'surulere-auto-centre',
    storeName: 'Surulere Auto Centre',
    verified: true,
    category: 'Lighting',
    image: '/products/headlight.png',
    images: ['/products/headlight.png', '/products/brake-pad.png', '/products/alternator.png'],
    partNumber: 'TC-HL-LED-R',
    compatible: 'Toyota Corolla 2017–2022',
    postedLabel: '4 days ago',
    inStock: true,
    vehicleMake: 'Toyota',
    vehicleModel: 'Corolla',
    description:
      'Right-hand LED headlight assembly for Toyota Corolla 2017–2022. Plug-and-play fitment. Contact seller for the matching left-hand unit.',
  },
  {
    id: 'tractor-tire',
    name: 'Massey Ferguson Rear Tractor Tyre',
    price: 210000,
    condition: 'New',
    location: 'Kaduna',
    state: 'Kaduna',
    storeSlug: 'kano-heavy-equipment-parts',
    storeName: 'Kano Heavy Equipment Parts',
    verified: true,
    category: 'Tractor & Farm',
    image: '/products/tractor-tire.png',
    images: ['/products/tractor-tire.png', '/products/hydraulic-pump.png', '/products/oil-filter.png'],
    partNumber: 'MF-RT-1828',
    compatible: 'Massey Ferguson 375 / 385',
    postedLabel: '6 days ago',
    inStock: true,
    vehicleMake: 'Massey Ferguson',
    vehicleModel: '375',
    description:
      'Heavy-duty rear tractor tyre with deep lug tread for maximum traction on farmland. Sold per unit.',
  },
]

export type Store = {
  slug: string
  name: string
  tagline: string
  address: string
  phone: string
  whatsapp: string
  state: string
  verified: boolean
  activeListings: number
  rating: number
  memberSince: string
  openToday: boolean
  hours: string
  categories: string[]
  about: string
}

export const stores: Store[] = [
  {
    slug: 'ladipo-auto-spares',
    name: 'Ladipo Auto Spares',
    tagline: 'Automotive parts dealer in Lagos',
    address: '50 Ladipo Market Road, Mushin, Lagos',
    phone: '+234 903 672 6262',
    whatsapp: '+234 903 672 6262',
    state: 'Lagos',
    verified: true,
    activeListings: 24,
    rating: 4.8,
    memberSince: '2026',
    openToday: true,
    hours: 'Mon–Sat, 8:00 AM – 6:00 PM',
    categories: ['Car Parts', 'Engine Parts', 'Braking System'],
    about:
      'Ladipo Auto Spares is a verified automotive parts dealer based in the Ladipo Market, Lagos. We stock genuine and quality-grade parts for popular Toyota, Honda and Nissan models, with nationwide delivery arranged directly with buyers.',
  },
  {
    slug: 'surulere-auto-centre',
    name: 'Surulere Auto Centre',
    tagline: 'Quality used and new car parts',
    address: '12 Adeniran Ogunsanya Street, Surulere, Lagos',
    phone: '+234 802 445 1190',
    whatsapp: '+234 802 445 1190',
    state: 'Lagos',
    verified: true,
    activeListings: 18,
    rating: 4.6,
    memberSince: '2026',
    openToday: true,
    hours: 'Mon–Sat, 9:00 AM – 6:00 PM',
    categories: ['Car Parts', 'Electrical Parts', 'Lighting'],
    about:
      'Surulere Auto Centre specialises in tested used parts and new replacement components for saloon cars and SUVs across Lagos.',
  },
  {
    slug: 'kano-heavy-equipment-parts',
    name: 'Kano Heavy Equipment Parts',
    tagline: 'Heavy equipment & agricultural parts',
    address: '4 Zaria Road, Kano',
    phone: '+234 705 998 2210',
    whatsapp: '+234 705 998 2210',
    state: 'Kano',
    verified: true,
    activeListings: 31,
    rating: 4.9,
    memberSince: '2026',
    openToday: false,
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    categories: ['Heavy Equipment', 'Tractor & Farm', 'Truck & Trailer'],
    about:
      'Kano Heavy Equipment Parts supplies components for excavators, tractors and trucks across northern Nigeria, including Caterpillar and Massey Ferguson machinery.',
  },
  {
    slug: 'nnewi-motor-parts-hub',
    name: 'Nnewi Motor Parts Hub',
    tagline: 'Motorcycle & commercial vehicle parts',
    address: '7 Owerri Road, Nnewi, Anambra',
    phone: '+234 816 220 7745',
    whatsapp: '+234 816 220 7745',
    state: 'Anambra',
    verified: true,
    activeListings: 27,
    rating: 4.7,
    memberSince: '2026',
    openToday: true,
    hours: 'Mon–Sat, 7:30 AM – 6:30 PM',
    categories: ['Motorcycle Parts', 'Electrical Parts'],
    about:
      'Nnewi Motor Parts Hub is a trusted supplier of motorcycle and commercial vehicle parts, serving mechanics and riders across the south-east.',
  },
]

export function getStore(slug: string): Store | undefined {
  return stores.find((s) => s.slug === slug)
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function productsByStore(slug: string): Product[] {
  return products.filter((p) => p.storeSlug === slug)
}

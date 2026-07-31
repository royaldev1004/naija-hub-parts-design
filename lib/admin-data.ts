export type Business = {
  id: string
  name: string
  owner: string
  cac: string
  phone: string
  location: string
  submitted: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  category: string
  email: string
  address: string
  description: string
}

export const businesses: Business[] = [
  {
    id: 'b1',
    name: 'Ladipo Auto Spares',
    owner: 'Tinuoye Adeyemi',
    cac: 'RC 2841096',
    phone: '+234 903 672 6262',
    location: 'Mushin, Lagos',
    submitted: '28 Jan 2026',
    status: 'approved',
    category: 'Car Parts',
    email: 'ladipoautospares@gmail.com',
    address: '50 Ladipo Market Road, Mushin, Lagos',
    description: 'Dealer in genuine and quality-grade car parts for Toyota, Honda and Nissan models.',
  },
  {
    id: 'b2',
    name: 'Aba Truck Parts Depot',
    owner: 'Chukwuemeka Okoro',
    cac: 'RC 3910447',
    phone: '+234 806 552 3391',
    location: 'Aba, Abia',
    submitted: '30 Jan 2026',
    status: 'pending',
    category: 'Truck & Trailer',
    email: 'abatruckparts@gmail.com',
    address: '18 Ariaria Market Road, Aba, Abia',
    description: 'Specialist supplier of truck and trailer parts for commercial haulage operators.',
  },
  {
    id: 'b3',
    name: 'Ibadan Motorcycle Spares',
    owner: 'Rasheed Salami',
    cac: 'RC 4102338',
    phone: '+234 701 448 9920',
    location: 'Ibadan, Oyo',
    submitted: '30 Jan 2026',
    status: 'pending',
    category: 'Motorcycle Parts',
    email: 'ibadanmotorspares@gmail.com',
    address: '9 Dugbe Market, Ibadan, Oyo',
    description: 'Motorcycle spare parts for Bajaj, TVS and Haojue commercial riders.',
  },
  {
    id: 'b4',
    name: 'PH Marine & Heavy Parts',
    owner: 'Ebiere Preye',
    cac: 'RC 3771290',
    phone: '+234 812 009 4471',
    location: 'Port Harcourt, Rivers',
    submitted: '29 Jan 2026',
    status: 'rejected',
    category: 'Heavy Equipment',
    email: 'phheavyparts@gmail.com',
    address: '22 Aba Road, Port Harcourt, Rivers',
    description: 'Heavy equipment and generator parts. CAC document was unclear on first submission.',
  },
  {
    id: 'b5',
    name: 'Surulere Auto Centre',
    owner: 'Adaeze Nwosu',
    cac: 'RC 2984410',
    phone: '+234 802 445 1190',
    location: 'Surulere, Lagos',
    submitted: '25 Jan 2026',
    status: 'approved',
    category: 'Car Parts',
    email: 'surulereauto@gmail.com',
    address: '12 Adeniran Ogunsanya Street, Surulere, Lagos',
    description: 'Tested used parts and new components for saloon cars and SUVs.',
  },
  {
    id: 'b6',
    name: 'Onitsha Diesel Parts',
    owner: 'Ifeanyi Eze',
    cac: 'RC 4450912',
    phone: '+234 803 771 2204',
    location: 'Onitsha, Anambra',
    submitted: '31 Jan 2026',
    status: 'pending',
    category: 'Truck & Trailer',
    email: 'onitshadiesel@gmail.com',
    address: '5 Upper Iweka Road, Onitsha, Anambra',
    description: 'Diesel engine and injection parts for trucks and buses.',
  },
  {
    id: 'b7',
    name: 'Kaduna Farm Machinery',
    owner: 'Musa Bello',
    cac: 'RC 3665521',
    phone: '+234 705 330 8812',
    location: 'Kaduna',
    submitted: '20 Jan 2026',
    status: 'suspended',
    category: 'Tractor & Farm',
    email: 'kadunafarm@gmail.com',
    address: '3 Kachia Road, Kaduna',
    description: 'Tractor and agricultural machinery parts. Suspended pending subscription review.',
  },
]

export type ModListing = {
  id: string
  name: string
  store: string
  price: number
  category: string
  location: string
  status: 'active' | 'pending' | 'reported' | 'removed'
  image: string
}

export const modListings: ModListing[] = [
  { id: 'm1', name: 'Toyota Corolla Front Brake Pad', store: 'Ladipo Auto Spares', price: 28500, category: 'Braking System', location: 'Lagos', status: 'active', image: '/products/brake-pad.png' },
  { id: 'm2', name: 'Honda Accord 2013 Alternator', store: 'Surulere Auto Centre', price: 95000, category: 'Electrical Parts', location: 'Lagos', status: 'reported', image: '/products/alternator.png' },
  { id: 'm3', name: 'Caterpillar Hydraulic Pump', store: 'Kano Heavy Equipment Parts', price: 780000, category: 'Heavy Equipment', location: 'Kano', status: 'active', image: '/products/hydraulic-pump.png' },
  { id: 'm4', name: 'Bajaj Boxer Clutch Plate', store: 'Nnewi Motor Parts Hub', price: 18000, category: 'Motorcycle Parts', location: 'Anambra', status: 'pending', image: '/products/clutch-plate.png' },
  { id: 'm5', name: 'Massey Ferguson Rear Tractor Tyre', store: 'Kano Heavy Equipment Parts', price: 210000, category: 'Tractor & Farm', location: 'Kaduna', status: 'active', image: '/products/tractor-tire.png' },
  { id: 'm6', name: 'Unbranded Airbag Module', store: 'Aba Truck Parts Depot', price: 45000, category: 'Safety', location: 'Abia', status: 'removed', image: '/products/oil-filter.png' },
]

export type AdminSubscription = {
  store: string
  plan: 'Monthly' | 'Yearly'
  amount: number
  reference: string
  start: string
  expiry: string
  status: 'active' | 'expired' | 'pending'
}

export const adminSubscriptions: AdminSubscription[] = [
  { store: 'Ladipo Auto Spares', plan: 'Yearly', amount: 50000, reference: 'NHP-PS-2026-0417', start: '12 Jan 2026', expiry: '12 Jan 2027', status: 'active' },
  { store: 'Surulere Auto Centre', plan: 'Monthly', amount: 5000, reference: 'NHP-PS-2026-0455', start: '02 Feb 2026', expiry: '03 Mar 2026', status: 'active' },
  { store: 'Kano Heavy Equipment Parts', plan: 'Yearly', amount: 50000, reference: 'NHP-PS-2025-0391', start: '15 Aug 2025', expiry: '15 Aug 2026', status: 'active' },
  { store: 'Nnewi Motor Parts Hub', plan: 'Monthly', amount: 5000, reference: 'NHP-PS-2026-0288', start: '05 Jan 2026', expiry: '04 Feb 2026', status: 'expired' },
  { store: 'Kaduna Farm Machinery', plan: 'Monthly', amount: 5000, reference: 'NHP-PS-2026-0501', start: '—', expiry: '—', status: 'pending' },
]

export const overviewStats = [
  { label: 'Total Verified Stores', value: '128', delta: '+12 this month', tone: 'success' as const },
  { label: 'Pending Approvals', value: '9', delta: '3 new today', tone: 'warning' as const },
  { label: 'Active Listings', value: '1,842', delta: '+96 this week', tone: 'success' as const },
  { label: 'Paid Subscriptions', value: '54', delta: '+7 this month', tone: 'success' as const },
  { label: 'Monthly Revenue', value: '₦615,000', delta: '+18% vs last month', tone: 'success' as const },
  { label: 'Suspended Stores', value: '4', delta: '1 this week', tone: 'error' as const },
]

export const newStoresByMonth = [
  { month: 'Aug', stores: 8 },
  { month: 'Sep', stores: 14 },
  { month: 'Oct', stores: 11 },
  { month: 'Nov', stores: 19 },
  { month: 'Dec', stores: 22 },
  { month: 'Jan', stores: 28 },
]

export const listingsByCategory = [
  { category: 'Car', count: 720 },
  { category: 'Motorcycle', count: 410 },
  { category: 'Truck', count: 305 },
  { category: 'Tractor', count: 180 },
  { category: 'Heavy Eq.', count: 150 },
  { category: 'Electrical', count: 77 },
]

export const subscriptionBreakdown = [
  { name: 'Free', value: 74 },
  { name: 'Monthly', value: 31 },
  { name: 'Yearly', value: 23 },
]

export const recentActivity = [
  { time: '10:24 AM', text: 'Aba Truck Parts Depot submitted for verification', tag: 'Verification' },
  { time: '09:58 AM', text: 'Surulere Auto Centre renewed Monthly subscription', tag: 'Subscription' },
  { time: '09:12 AM', text: 'Listing “Unbranded Airbag Module” was reported by a buyer', tag: 'Moderation' },
  { time: 'Yesterday', text: 'Ladipo Auto Spares was approved by admin', tag: 'Verification' },
  { time: 'Yesterday', text: 'Kaduna Farm Machinery was suspended', tag: 'Moderation' },
]

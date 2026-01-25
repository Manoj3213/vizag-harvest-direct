import { Farmer, Vegetable, Listing } from '@/types';

export const farmers: Farmer[] = [
  {
    id: 'farmer-1',
    name: 'Ramesh Naidu',
    phone: '+91 9876543210',
    whatsapp: '+919876543210',
    location: {
      latitude: 17.7231,
      longitude: 83.3012,
      areaName: 'Pendurthi',
      address: 'Near Pendurthi Junction, Visakhapatnam'
    },
    description: 'Organic vegetable farmer with 15 years of experience. Specializing in leafy greens and tomatoes.',
    isVerified: true,
    createdAt: '2024-01-15'
  },
  {
    id: 'farmer-2',
    name: 'Lakshmi Devi',
    phone: '+91 9876543211',
    whatsapp: '+919876543211',
    location: {
      latitude: 17.7456,
      longitude: 83.2234,
      areaName: 'Anakapalle',
      address: 'Village Road, Anakapalle'
    },
    description: 'Family-owned farm growing fresh vegetables and spices for over 20 years.',
    isVerified: true,
    createdAt: '2024-02-10'
  },
  {
    id: 'farmer-3',
    name: 'Suresh Reddy',
    phone: '+91 9876543212',
    whatsapp: '+919876543212',
    location: {
      latitude: 17.6868,
      longitude: 83.2185,
      areaName: 'Gajuwaka',
      address: 'Near Steel Plant, Gajuwaka'
    },
    description: 'Growing organic vegetables without pesticides. Fresh produce daily.',
    isVerified: true,
    createdAt: '2024-01-20'
  },
  {
    id: 'farmer-4',
    name: 'Venkata Rao',
    phone: '+91 9876543213',
    whatsapp: '+919876543213',
    location: {
      latitude: 17.7349,
      longitude: 83.3412,
      areaName: 'Madhurawada',
      address: 'IT Park Road, Madhurawada'
    },
    description: 'Specializing in gourds and root vegetables. Wholesale and retail available.',
    isVerified: false,
    createdAt: '2024-03-05'
  },
  {
    id: 'farmer-5',
    name: 'Padma Kumari',
    phone: '+91 9876543214',
    whatsapp: '+919876543214',
    location: {
      latitude: 17.7089,
      longitude: 83.2972,
      areaName: 'MVP Colony',
      address: 'Near Beach Road, MVP Colony'
    },
    description: 'Fresh organic herbs and leafy vegetables. Home delivery available.',
    isVerified: true,
    createdAt: '2024-02-28'
  },
  {
    id: 'farmer-6',
    name: 'Krishna Murthy',
    phone: '+91 9876543215',
    whatsapp: '+919876543215',
    location: {
      latitude: 17.7502,
      longitude: 83.2567,
      areaName: 'Sabbavaram',
      address: 'Main Road, Sabbavaram'
    },
    description: 'Large-scale vegetable farming. Best prices for bulk orders.',
    isVerified: true,
    createdAt: '2024-01-05'
  },
  {
    id: 'farmer-7',
    name: 'Sarada Devi',
    phone: '+91 9876543216',
    whatsapp: '+919876543216',
    location: {
      latitude: 17.6723,
      longitude: 83.1856,
      areaName: 'Yelamanchili',
      address: 'Village Center, Yelamanchili'
    },
    description: 'Traditional farming methods. All seasonal vegetables available.',
    isVerified: false,
    createdAt: '2024-03-12'
  },
  {
    id: 'farmer-8',
    name: 'Ravi Kumar',
    phone: '+91 9876543217',
    whatsapp: '+919876543217',
    location: {
      latitude: 17.7189,
      longitude: 83.3256,
      areaName: 'Seethammadhara',
      address: 'Near Railway Station, Seethammadhara'
    },
    description: 'Fresh vegetables from our family farm. Quality guaranteed.',
    isVerified: true,
    createdAt: '2024-02-15'
  },
  {
    id: 'farmer-9',
    name: 'Anjali Reddy',
    phone: '+91 9876543218',
    whatsapp: '+919876543218',
    location: {
      latitude: 17.6945,
      longitude: 83.2478,
      areaName: 'Gopalapatnam',
      address: 'Temple Road, Gopalapatnam'
    },
    description: 'Organic certified farm. Pesticide-free vegetables.',
    isVerified: true,
    createdAt: '2024-01-25'
  },
  {
    id: 'farmer-10',
    name: 'Mohan Rao',
    phone: '+91 9876543219',
    whatsapp: '+919876543219',
    location: {
      latitude: 17.7612,
      longitude: 83.2789,
      areaName: 'Simhachalam',
      address: 'Hill Road, Simhachalam'
    },
    description: 'Mountain-grown vegetables. Fresh and nutritious.',
    isVerified: false,
    createdAt: '2024-03-01'
  }
];

export const vegetables: Vegetable[] = [
  // Leafy Greens
  {
    id: 'veg-1',
    name: { en: 'Spinach', te: 'పాలకూర', hi: 'पालक' },
    category: 'leafy-greens',
    season: 'Winter'
  },
  {
    id: 'veg-2',
    name: { en: 'Coriander', te: 'కొత్తిమీర', hi: 'धनिया' },
    category: 'spices-herbs',
    season: 'Year-round'
  },
  {
    id: 'veg-3',
    name: { en: 'Curry Leaves', te: 'కరివేపాకు', hi: 'करी पत्ता' },
    category: 'spices-herbs',
    season: 'Year-round'
  },
  {
    id: 'veg-4',
    name: { en: 'Fenugreek Leaves', te: 'మెంతికూర', hi: 'मेथी' },
    category: 'leafy-greens',
    season: 'Winter'
  },
  // Root Vegetables
  {
    id: 'veg-5',
    name: { en: 'Potato', te: 'బంగాళదుంప', hi: 'आलू' },
    category: 'root-vegetables',
    season: 'Year-round'
  },
  {
    id: 'veg-6',
    name: { en: 'Onion', te: 'ఉల్లిపాయ', hi: 'प्याज' },
    category: 'root-vegetables',
    season: 'Year-round'
  },
  {
    id: 'veg-7',
    name: { en: 'Carrot', te: 'క్యారెట్', hi: 'गाजर' },
    category: 'root-vegetables',
    season: 'Winter'
  },
  {
    id: 'veg-8',
    name: { en: 'Radish', te: 'ముల్లంగి', hi: 'मूली' },
    category: 'root-vegetables',
    season: 'Winter'
  },
  // Gourds
  {
    id: 'veg-9',
    name: { en: 'Bottle Gourd', te: 'సొరకాయ', hi: 'लौकी' },
    category: 'gourds',
    season: 'Summer'
  },
  {
    id: 'veg-10',
    name: { en: 'Bitter Gourd', te: 'కాకరకాయ', hi: 'करेला' },
    category: 'gourds',
    season: 'Summer'
  },
  {
    id: 'veg-11',
    name: { en: 'Ridge Gourd', te: 'బీరకాయ', hi: 'तोरई' },
    category: 'gourds',
    season: 'Summer'
  },
  {
    id: 'veg-12',
    name: { en: 'Snake Gourd', te: 'పొట్లకాయ', hi: 'चचिंडा' },
    category: 'gourds',
    season: 'Summer'
  },
  // Beans & Legumes
  {
    id: 'veg-13',
    name: { en: 'Green Beans', te: 'చిక్కుడుకాయ', hi: 'फ्रेंच बीन्स' },
    category: 'beans-legumes',
    season: 'Winter'
  },
  {
    id: 'veg-14',
    name: { en: 'Cluster Beans', te: 'గోరుచిక్కుడు', hi: 'ग्वार फली' },
    category: 'beans-legumes',
    season: 'Summer'
  },
  {
    id: 'veg-15',
    name: { en: 'Drumstick', te: 'మునగకాయ', hi: 'सहजन' },
    category: 'beans-legumes',
    season: 'Year-round'
  },
  // Fruits/Vegetables
  {
    id: 'veg-16',
    name: { en: 'Tomato', te: 'టమాటో', hi: 'टमाटर' },
    category: 'fruits-vegetables',
    season: 'Year-round'
  },
  {
    id: 'veg-17',
    name: { en: 'Brinjal', te: 'వంకాయ', hi: 'बैंगन' },
    category: 'fruits-vegetables',
    season: 'Year-round'
  },
  {
    id: 'veg-18',
    name: { en: 'Okra (Lady Finger)', te: 'బెండకాయ', hi: 'भिंडी' },
    category: 'fruits-vegetables',
    season: 'Summer'
  },
  {
    id: 'veg-19',
    name: { en: 'Capsicum', te: 'క్యాప్సికం', hi: 'शिमला मिर्च' },
    category: 'fruits-vegetables',
    season: 'Year-round'
  },
  {
    id: 'veg-20',
    name: { en: 'Green Chilli', te: 'పచ్చిమిర్చి', hi: 'हरी मिर्च' },
    category: 'spices-herbs',
    season: 'Year-round'
  }
];

export const listings: Listing[] = [
  // Farmer 1 - Ramesh Naidu
  { id: 'list-1', farmerId: 'farmer-1', vegetableId: 'veg-1', pricePerKg: 35, quantityAvailable: 50, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-20' },
  { id: 'list-2', farmerId: 'farmer-1', vegetableId: 'veg-16', pricePerKg: 25, quantityAvailable: 100, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-20' },
  { id: 'list-3', farmerId: 'farmer-1', vegetableId: 'veg-2', pricePerKg: 80, quantityAvailable: 20, unit: 'bunch', isAvailable: true, lastUpdated: '2024-01-20' },
  
  // Farmer 2 - Lakshmi Devi
  { id: 'list-4', farmerId: 'farmer-2', vegetableId: 'veg-5', pricePerKg: 30, quantityAvailable: 200, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-19' },
  { id: 'list-5', farmerId: 'farmer-2', vegetableId: 'veg-6', pricePerKg: 40, quantityAvailable: 150, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-19' },
  { id: 'list-6', farmerId: 'farmer-2', vegetableId: 'veg-3', pricePerKg: 60, quantityAvailable: 30, unit: 'bunch', isAvailable: true, lastUpdated: '2024-01-19' },
  
  // Farmer 3 - Suresh Reddy
  { id: 'list-7', farmerId: 'farmer-3', vegetableId: 'veg-17', pricePerKg: 35, quantityAvailable: 80, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-20' },
  { id: 'list-8', farmerId: 'farmer-3', vegetableId: 'veg-18', pricePerKg: 45, quantityAvailable: 60, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-20' },
  { id: 'list-9', farmerId: 'farmer-3', vegetableId: 'veg-20', pricePerKg: 50, quantityAvailable: 25, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-20' },
  
  // Farmer 4 - Venkata Rao
  { id: 'list-10', farmerId: 'farmer-4', vegetableId: 'veg-9', pricePerKg: 20, quantityAvailable: 120, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-18' },
  { id: 'list-11', farmerId: 'farmer-4', vegetableId: 'veg-10', pricePerKg: 40, quantityAvailable: 70, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-18' },
  { id: 'list-12', farmerId: 'farmer-4', vegetableId: 'veg-11', pricePerKg: 30, quantityAvailable: 90, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-18' },
  
  // Farmer 5 - Padma Kumari
  { id: 'list-13', farmerId: 'farmer-5', vegetableId: 'veg-2', pricePerKg: 75, quantityAvailable: 40, unit: 'bunch', isAvailable: true, lastUpdated: '2024-01-20' },
  { id: 'list-14', farmerId: 'farmer-5', vegetableId: 'veg-4', pricePerKg: 60, quantityAvailable: 35, unit: 'bunch', isAvailable: true, lastUpdated: '2024-01-20' },
  { id: 'list-15', farmerId: 'farmer-5', vegetableId: 'veg-1', pricePerKg: 40, quantityAvailable: 45, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-20' },
  
  // Farmer 6 - Krishna Murthy
  { id: 'list-16', farmerId: 'farmer-6', vegetableId: 'veg-5', pricePerKg: 28, quantityAvailable: 500, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-19' },
  { id: 'list-17', farmerId: 'farmer-6', vegetableId: 'veg-6', pricePerKg: 35, quantityAvailable: 400, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-19' },
  { id: 'list-18', farmerId: 'farmer-6', vegetableId: 'veg-7', pricePerKg: 45, quantityAvailable: 200, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-19' },
  { id: 'list-19', farmerId: 'farmer-6', vegetableId: 'veg-16', pricePerKg: 22, quantityAvailable: 300, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-19' },
  
  // Farmer 7 - Sarada Devi
  { id: 'list-20', farmerId: 'farmer-7', vegetableId: 'veg-12', pricePerKg: 25, quantityAvailable: 60, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-17' },
  { id: 'list-21', farmerId: 'farmer-7', vegetableId: 'veg-13', pricePerKg: 55, quantityAvailable: 40, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-17' },
  { id: 'list-22', farmerId: 'farmer-7', vegetableId: 'veg-14', pricePerKg: 50, quantityAvailable: 35, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-17' },
  
  // Farmer 8 - Ravi Kumar
  { id: 'list-23', farmerId: 'farmer-8', vegetableId: 'veg-16', pricePerKg: 28, quantityAvailable: 150, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-20' },
  { id: 'list-24', farmerId: 'farmer-8', vegetableId: 'veg-19', pricePerKg: 60, quantityAvailable: 50, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-20' },
  { id: 'list-25', farmerId: 'farmer-8', vegetableId: 'veg-15', pricePerKg: 40, quantityAvailable: 80, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-20' },
  
  // Farmer 9 - Anjali Reddy
  { id: 'list-26', farmerId: 'farmer-9', vegetableId: 'veg-1', pricePerKg: 45, quantityAvailable: 60, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-19' },
  { id: 'list-27', farmerId: 'farmer-9', vegetableId: 'veg-8', pricePerKg: 30, quantityAvailable: 100, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-19' },
  { id: 'list-28', farmerId: 'farmer-9', vegetableId: 'veg-17', pricePerKg: 40, quantityAvailable: 70, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-19' },
  
  // Farmer 10 - Mohan Rao
  { id: 'list-29', farmerId: 'farmer-10', vegetableId: 'veg-7', pricePerKg: 50, quantityAvailable: 80, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-18' },
  { id: 'list-30', farmerId: 'farmer-10', vegetableId: 'veg-5', pricePerKg: 32, quantityAvailable: 150, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-18' },
  { id: 'list-31', farmerId: 'farmer-10', vegetableId: 'veg-9', pricePerKg: 22, quantityAvailable: 100, unit: 'kg', isAvailable: true, lastUpdated: '2024-01-18' },
];

// Helper functions
export const getFarmerById = (id: string): Farmer | undefined => {
  return farmers.find(f => f.id === id);
};

export const getVegetableById = (id: string): Vegetable | undefined => {
  return vegetables.find(v => v.id === id);
};

export const getListingsForFarmer = (farmerId: string): Listing[] => {
  return listings.filter(l => l.farmerId === farmerId && l.isAvailable);
};

export const getListingsForVegetable = (vegetableId: string): Listing[] => {
  return listings.filter(l => l.vegetableId === vegetableId && l.isAvailable);
};

export const getCategoryLabel = (category: string, lang: 'en' | 'te' | 'hi' = 'en'): string => {
  const labels: Record<string, Record<string, string>> = {
    'leafy-greens': { en: 'Leafy Greens', te: 'ఆకుకూరలు', hi: 'पत्तेदार सब्जियां' },
    'root-vegetables': { en: 'Root Vegetables', te: 'దుంప కూరగాయలు', hi: 'जड़ वाली सब्जियां' },
    'gourds': { en: 'Gourds', te: 'గుమ్మడి జాతి', hi: 'लौकी जाति' },
    'beans-legumes': { en: 'Beans & Legumes', te: 'చిక్కుళ్ళు', hi: 'फलियां' },
    'fruits-vegetables': { en: 'Fruits & Vegetables', te: 'పండ్లు & కూరగాయలు', hi: 'फल और सब्जियां' },
    'spices-herbs': { en: 'Spices & Herbs', te: 'మసాలాలు', hi: 'मसाले' },
  };
  return labels[category]?.[lang] || category;
};

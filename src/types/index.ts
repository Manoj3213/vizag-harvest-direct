export interface Farmer {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  location: {
    latitude: number;
    longitude: number;
    areaName: string;
    address?: string;
  };
  profilePhoto?: string;
  farmPhotos?: string[];
  description?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Vegetable {
  id: string;
  name: {
    en: string;
    te: string;
    hi: string;
  };
  category: VegetableCategory;
  image?: string;
  season?: string;
}

export type VegetableCategory = 
  | 'leafy-greens'
  | 'root-vegetables'
  | 'gourds'
  | 'beans-legumes'
  | 'fruits-vegetables'
  | 'spices-herbs';

export interface Listing {
  id: string;
  farmerId: string;
  vegetableId: string;
  pricePerKg: number;
  quantityAvailable?: number; // in kg
  unit: 'kg' | 'bunch' | 'piece';
  isAvailable: boolean;
  lastUpdated: string;
}

export interface ListingWithDetails extends Listing {
  farmer: Farmer;
  vegetable: Vegetable;
  distance?: number; // in km
}

export type Language = 'en' | 'te' | 'hi';

export interface Translation {
  [key: string]: string | Translation;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

import { UserLocation } from '@/types';

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

// Get user's current location
export const getUserLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};

// Default center for Visakhapatnam
export const VISAKHAPATNAM_CENTER = {
  latitude: 17.6868,
  longitude: 83.2185,
};

// Format distance for display
export const formatDistance = (km: number): string => {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)}km`;
};

// Generate Google Maps directions URL
export const getDirectionsUrl = (lat: number, lon: number): string => {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
};

// Generate WhatsApp message URL
export const getWhatsAppUrl = (phone: string, vegetableName?: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  const message = vegetableName
    ? `Hi, I found you on FarmDirect. I'm interested in buying ${vegetableName}. Is it available?`
    : `Hi, I found you on FarmDirect. I'm interested in your vegetables. Can you share more details?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

// Generate phone call URL
export const getPhoneUrl = (phone: string): string => {
  return `tel:${phone}`;
};

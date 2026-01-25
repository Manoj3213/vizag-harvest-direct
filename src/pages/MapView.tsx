import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Locate, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { farmers, vegetables, getListingsForFarmer } from '@/data/farmers';
import { getUserLocation, VISAKHAPATNAM_CENTER } from '@/utils/location';
import { UserLocation } from '@/types';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom farmer marker
const createFarmerIcon = (isVerified: boolean) => {
  return L.divIcon({
    className: 'custom-marker-container',
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: ${isVerified ? 'hsl(142, 71%, 35%)' : 'hsl(25, 95%, 55%)'};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: 18px;
      ">🌱</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

// User location marker
const userIcon = L.divIcon({
  className: 'user-marker',
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: hsl(217, 91%, 60%);
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Component to recenter map
const RecenterMap: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
};

const MapView: React.FC = () => {
  const { t, language } = useLanguage();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedVegetable, setSelectedVegetable] = useState<string>('all');
  const [isLocating, setIsLocating] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    VISAKHAPATNAM_CENTER.latitude,
    VISAKHAPATNAM_CENTER.longitude,
  ]);

  // Filter farmers based on selected vegetable
  const filteredFarmers = React.useMemo(() => {
    if (selectedVegetable === 'all') return farmers;
    return farmers.filter((farmer) => {
      const farmerListings = getListingsForFarmer(farmer.id);
      return farmerListings.some((l) => l.vegetableId === selectedVegetable);
    });
  }, [selectedVegetable]);

  const handleFindMe = async () => {
    setIsLocating(true);
    try {
      const location = await getUserLocation();
      setUserLocation(location);
      setMapCenter([location.latitude, location.longitude]);
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Controls */}
      <div className="p-4 border-b bg-background flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-bold">{t('map.title')}</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <Select value={selectedVegetable} onValueChange={setSelectedVegetable}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('map.filterVegetables')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('map.allVegetables')}</SelectItem>
              {vegetables.map((veg) => (
                <SelectItem key={veg.id} value={veg.id}>
                  {veg.name[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleFindMe} disabled={isLocating} className="gap-2">
            <Locate className={`h-4 w-4 ${isLocating ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{t('map.findMe')}</span>
          </Button>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer
          center={mapCenter}
          zoom={11}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <RecenterMap center={mapCenter} />

          {/* User location marker */}
          {userLocation && (
            <Marker
              position={[userLocation.latitude, userLocation.longitude]}
              icon={userIcon}
            >
              <Popup>Your Location</Popup>
            </Marker>
          )}

          {/* Farmer markers */}
          {filteredFarmers.map((farmer) => {
            const farmerListings = getListingsForFarmer(farmer.id);
            const farmerVegetables = farmerListings
              .map((l) => vegetables.find((v) => v.id === l.vegetableId))
              .filter(Boolean);

            return (
              <Marker
                key={farmer.id}
                position={[farmer.location.latitude, farmer.location.longitude]}
                icon={createFarmerIcon(farmer.isVerified)}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="font-semibold text-base mb-1">{farmer.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      📍 {farmer.location.areaName}
                    </p>
                    <div className="mb-3">
                      <p className="text-xs font-medium mb-1">Available:</p>
                      <div className="flex flex-wrap gap-1">
                        {farmerVegetables.slice(0, 4).map((veg) => (
                          <span
                            key={veg!.id}
                            className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                          >
                            {veg!.name[language]}
                          </span>
                        ))}
                        {farmerVegetables.length > 4 && (
                          <span className="text-xs text-muted-foreground">
                            +{farmerVegetables.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    <a
                      href={`/farmer/${farmer.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View Details →
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;

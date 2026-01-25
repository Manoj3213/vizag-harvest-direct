import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  BadgeCheck,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getFarmerById,
  getListingsForFarmer,
  vegetables,
} from '@/data/farmers';
import { getDirectionsUrl, getWhatsAppUrl, getPhoneUrl } from '@/utils/location';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const FarmerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();

  const farmer = getFarmerById(id || '');
  const farmerListings = farmer ? getListingsForFarmer(farmer.id) : [];

  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Farmer Not Found</h2>
          <Link to="/farmers" className="text-primary hover:underline">
            ← Back to Farmers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Back Button */}
      <div className="container py-4">
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link to="/farmers">
            <ArrowLeft className="h-4 w-4" />
            Back to Farmers
          </Link>
        </Button>
      </div>

      <div className="container pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Farmer Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Card */}
            <Card>
              <CardContent className="p-0">
                <div className="h-32 bg-gradient-to-br from-primary to-primary/70 relative">
                  <div className="absolute -bottom-10 left-6 w-20 h-20 bg-background rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-background">
                    👨‍🌾
                  </div>
                </div>
                <div className="pt-14 p-6">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold">{farmer.name}</h1>
                        {farmer.isVerified && (
                          <Badge className="gap-1 bg-primary">
                            <BadgeCheck className="h-3 w-3" />
                            {t('farmer.verified')}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {farmer.location.areaName}, Visakhapatnam
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" className="gap-2">
                        <a href={getPhoneUrl(farmer.phone)}>
                          <Phone className="h-4 w-4" />
                          {t('farmer.call')}
                        </a>
                      </Button>
                      {farmer.whatsapp && (
                        <Button
                          asChild
                          className="gap-2 bg-green-600 hover:bg-green-700"
                        >
                          <a
                            href={getWhatsAppUrl(farmer.whatsapp)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="h-4 w-4" />
                            {t('farmer.whatsapp')}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {farmer.description && (
                    <div className="mt-6">
                      <h3 className="font-semibold mb-2">{t('farmer.about')}</h3>
                      <p className="text-muted-foreground">{farmer.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle>{t('farmer.products')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {farmerListings.map((listing) => {
                    const vegetable = vegetables.find((v) => v.id === listing.vegetableId);
                    if (!vegetable) return null;

                    return (
                      <div
                        key={listing.id}
                        className="py-4 first:pt-0 last:pb-0 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                            🥬
                          </div>
                          <div>
                            <h4 className="font-medium">{vegetable.name[language]}</h4>
                            <p className="text-sm text-muted-foreground">
                              {vegetable.name.en !== vegetable.name[language] &&
                                vegetable.name.en}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">
                            ₹{listing.pricePerKg}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {listing.unit === 'bunch'
                              ? t('listings.perBunch')
                              : listing.unit === 'piece'
                              ? t('listings.perPiece')
                              : t('listings.perKg')}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Map & Location */}
          <div className="space-y-6">
            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t('farmer.location')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mini Map */}
                <div className="h-48 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[farmer.location.latitude, farmer.location.longitude]}
                    zoom={14}
                    className="h-full w-full"
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[farmer.location.latitude, farmer.location.longitude]}
                    >
                      <Popup>{farmer.name}</Popup>
                    </Marker>
                  </MapContainer>
                </div>

                {/* Address */}
                <div>
                  <p className="font-medium">{farmer.location.areaName}</p>
                  {farmer.location.address && (
                    <p className="text-sm text-muted-foreground">{farmer.location.address}</p>
                  )}
                </div>

                {/* Coordinates */}
                <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                  📍 Lat: {farmer.location.latitude.toFixed(4)}, Long:{' '}
                  {farmer.location.longitude.toFixed(4)}
                </div>

                {/* Directions Button */}
                <Button asChild className="w-full gap-2">
                  <a
                    href={getDirectionsUrl(
                      farmer.location.latitude,
                      farmer.location.longitude
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="h-4 w-4" />
                    {t('farmer.directions')}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <a href={getPhoneUrl(farmer.phone)} className="hover:text-primary">
                    {farmer.phone}
                  </a>
                </div>
                {farmer.whatsapp && (
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <a
                      href={getWhatsAppUrl(farmer.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      WhatsApp
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm">Member since {farmer.createdAt}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetail;

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, BadgeCheck, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { farmers, vegetables, getListingsForFarmer } from '@/data/farmers';
import { getWhatsAppUrl, getPhoneUrl } from '@/utils/location';

const FarmersPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('nav.farmers')}</h1>
          <p className="text-muted-foreground">
            {farmers.length} farmers in Visakhapatnam area
          </p>
        </div>

        {/* Farmer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.map((farmer) => {
            const farmerListings = getListingsForFarmer(farmer.id);
            const farmerVegetables = farmerListings
              .map((l) => vegetables.find((v) => v.id === l.vegetableId))
              .filter(Boolean);

            return (
              <Card key={farmer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Header with gradient */}
                  <div className="h-24 bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center relative">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center text-3xl shadow-lg absolute -bottom-8">
                      👨‍🌾
                    </div>
                    {farmer.isVerified && (
                      <Badge className="absolute top-3 right-3 gap-1 bg-white/20 backdrop-blur">
                        <BadgeCheck className="h-3 w-3" />
                        {t('farmer.verified')}
                      </Badge>
                    )}
                  </div>

                  <div className="pt-12 p-5">
                    {/* Farmer Info */}
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-lg">{farmer.name}</h3>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        {farmer.location.areaName}
                      </div>
                    </div>

                    {/* Available Vegetables */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        {t('farmer.products')}:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {farmerVegetables.slice(0, 4).map((veg) => (
                          <Badge key={veg!.id} variant="secondary" className="text-xs">
                            {veg!.name[language]}
                          </Badge>
                        ))}
                        {farmerVegetables.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{farmerVegetables.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Price Range */}
                    {farmerListings.length > 0 && (
                      <div className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        ₹{Math.min(...farmerListings.map((l) => l.pricePerKg))} - ₹
                        {Math.max(...farmerListings.map((l) => l.pricePerKg))} per kg
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-3">
                      <Button asChild variant="outline" size="sm" className="flex-1 gap-1">
                        <a href={getPhoneUrl(farmer.phone)}>
                          <Phone className="h-4 w-4" />
                          {t('farmer.call')}
                        </a>
                      </Button>
                      {farmer.whatsapp && (
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 gap-1 bg-green-600 hover:bg-green-700"
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

                    {/* View Details */}
                    <Link
                      to={`/farmer/${farmer.id}`}
                      className="block text-center text-sm text-primary hover:underline"
                    >
                      {t('listings.viewDetails')} →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FarmersPage;

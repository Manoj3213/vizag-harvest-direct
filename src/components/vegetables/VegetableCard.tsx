import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Farmer, Vegetable, Listing, Language } from '@/types';
import { getWhatsAppUrl, getPhoneUrl } from '@/utils/location';
import { useLanguage } from '@/contexts/LanguageContext';

interface VegetableCardProps {
  listing: Listing;
  vegetable: Vegetable;
  farmer: Farmer;
  language: Language;
  distance?: number;
}

export const VegetableCard: React.FC<VegetableCardProps> = ({
  listing,
  vegetable,
  farmer,
  language,
  distance,
}) => {
  const { t } = useLanguage();

  const getUnitLabel = () => {
    switch (listing.unit) {
      case 'bunch':
        return t('listings.perBunch');
      case 'piece':
        return t('listings.perPiece');
      default:
        return t('listings.perKg');
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        {/* Vegetable Image Placeholder */}
        <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
          <span className="text-5xl">🥬</span>
          {farmer.isVerified && (
            <Badge className="absolute top-3 right-3 gap-1 bg-primary">
              <BadgeCheck className="h-3 w-3" />
              {t('farmer.verified')}
            </Badge>
          )}
        </div>

        <div className="p-4">
          {/* Vegetable Name & Price */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {vegetable.name[language]}
              </h3>
              <p className="text-sm text-muted-foreground">
                {vegetable.name.en !== vegetable.name[language] && vegetable.name.en}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary">₹{listing.pricePerKg}</div>
              <div className="text-xs text-muted-foreground">{getUnitLabel()}</div>
            </div>
          </div>

          {/* Farmer Info */}
          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {farmer.name} • {farmer.location.areaName}
            </span>
          </div>

          {/* Distance if available */}
          {distance !== undefined && (
            <div className="text-xs text-muted-foreground mb-3">
              📍 {distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`} {t('common.km')}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 gap-1"
            >
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
                  href={getWhatsAppUrl(farmer.whatsapp, vegetable.name.en)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t('farmer.whatsapp')}
                </a>
              </Button>
            )}
          </div>

          {/* View Details Link */}
          <Link
            to={`/farmer/${farmer.id}`}
            className="block mt-3 text-center text-sm text-primary hover:underline"
          >
            {t('listings.viewDetails')} →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

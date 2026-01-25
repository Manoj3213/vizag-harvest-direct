import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Sprout className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">FarmDirect</span>
            </Link>
            <p className="text-background/70 max-w-md">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/70 hover:text-background transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-background/70 hover:text-background transition-colors">
                  {t('nav.map')}
                </Link>
              </li>
              <li>
                <Link to="/vegetables" className="text-background/70 hover:text-background transition-colors">
                  {t('nav.vegetables')}
                </Link>
              </li>
              <li>
                <Link to="/farmers" className="text-background/70 hover:text-background transition-colors">
                  {t('nav.farmers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70">
                <MapPin className="h-4 w-4" />
                <span>Visakhapatnam, Andhra Pradesh</span>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Mail className="h-4 w-4" />
                <span>info@farmdirect.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/50">
          <p>© {new Date().getFullYear()} FarmDirect. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

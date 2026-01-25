import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, TrendingDown, Leaf, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { farmers, vegetables, listings } from '@/data/farmers';
import { VegetableCard } from '@/components/vegetables/VegetableCard';

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');

  // Get featured listings (first 6)
  const featuredListings = React.useMemo(() => {
    return listings.slice(0, 6).map((listing) => {
      const farmer = farmers.find((f) => f.id === listing.farmerId);
      const vegetable = vegetables.find((v) => v.id === listing.vegetableId);
      return { ...listing, farmer, vegetable };
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/vegetables?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-farm-green-light py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
              {t('hero.subtitle')}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('hero.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button type="submit" size="lg" className="px-6">
                <Search className="h-5 w-5" />
              </Button>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/vegetables">
                  <Leaf className="h-5 w-5" />
                  {t('hero.cta')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/map">
                  <MapPin className="h-5 w-5" />
                  {t('hero.mapCta')}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {farmers.length}+
              </div>
              <div className="text-sm text-muted-foreground">{t('stats.farmers')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {vegetables.length}+
              </div>
              <div className="text-sm text-muted-foreground">{t('stats.vegetables')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-muted-foreground">{t('stats.areas')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">20%</div>
              <div className="text-sm text-muted-foreground">{t('stats.savings')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title={t('features.directConnect')}
              description={t('features.directConnectDesc')}
            />
            <FeatureCard
              icon={<TrendingDown className="h-8 w-8" />}
              title={t('features.fairPrices')}
              description={t('features.fairPricesDesc')}
            />
            <FeatureCard
              icon={<Leaf className="h-8 w-8" />}
              title={t('features.freshProduce')}
              description={t('features.freshProduceDesc')}
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8" />}
              title={t('features.localSupport')}
              description={t('features.localSupportDesc')}
            />
          </div>
        </div>
      </section>

      {/* Featured Vegetables */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">{t('listings.title')}</h2>
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/vegetables">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <VegetableCard
                key={listing.id}
                listing={listing}
                vegetable={listing.vegetable!}
                farmer={listing.farmer!}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default Index;

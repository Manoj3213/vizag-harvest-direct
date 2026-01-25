import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SortAsc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { farmers, vegetables, listings, getCategoryLabel } from '@/data/farmers';
import { VegetableCard } from '@/components/vegetables/VegetableCard';
import { VegetableCategory } from '@/types';

const categories: VegetableCategory[] = [
  'leafy-greens',
  'root-vegetables',
  'gourds',
  'beans-legumes',
  'fruits-vegetables',
  'spices-herbs',
];

const VegetablesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('price-asc');

  // Get all listings with vegetable and farmer data
  const allListings = useMemo(() => {
    return listings
      .filter((l) => l.isAvailable)
      .map((listing) => {
        const farmer = farmers.find((f) => f.id === listing.farmerId);
        const vegetable = vegetables.find((v) => v.id === listing.vegetableId);
        return { ...listing, farmer, vegetable };
      })
      .filter((l) => l.farmer && l.vegetable);
  }, []);

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let result = [...allListings];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((l) => {
        const vegName =
          l.vegetable!.name.en.toLowerCase() +
          l.vegetable!.name.te.toLowerCase() +
          l.vegetable!.name.hi.toLowerCase();
        const farmerName = l.farmer!.name.toLowerCase();
        const area = l.farmer!.location.areaName.toLowerCase();
        return vegName.includes(query) || farmerName.includes(query) || area.includes(query);
      });
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((l) => l.vegetable!.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.pricePerKg - b.pricePerKg);
        break;
      case 'price-desc':
        result.sort((a, b) => b.pricePerKg - a.pricePerKg);
        break;
      case 'name':
        result.sort((a, b) =>
          a.vegetable!.name[language].localeCompare(b.vegetable!.name[language])
        );
        break;
    }

    return result;
  }, [allListings, searchQuery, selectedCategory, sortBy, language]);

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('listings.title')}</h1>
          <p className="text-muted-foreground">
            {filteredListings.length} {t('listings.available').toLowerCase()}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('hero.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('listings.filter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {getCategoryLabel(cat, language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('listings.sort')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">{t('listings.sortPrice')}</SelectItem>
              <SelectItem value="price-desc">{t('listings.sortPriceDesc')}</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <VegetableCard
                key={listing.id}
                listing={listing}
                vegetable={listing.vegetable!}
                farmer={listing.farmer!}
                language={language}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">{t('common.noResults')}</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VegetablesPage;

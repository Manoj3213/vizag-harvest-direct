import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.map': 'Map View',
    'nav.vegetables': 'Vegetables',
    'nav.farmers': 'Farmers',
    'nav.about': 'About',
    
    // Hero
    'hero.title': 'Fresh from Farm to Your Table',
    'hero.subtitle': 'Connect directly with local farmers in Visakhapatnam. Get fresh vegetables at fair prices while supporting our farming community.',
    'hero.search': 'Search for vegetables...',
    'hero.cta': 'Explore Vegetables',
    'hero.mapCta': 'View on Map',
    
    // Stats
    'stats.farmers': 'Active Farmers',
    'stats.vegetables': 'Vegetables Available',
    'stats.areas': 'Areas Covered',
    'stats.savings': 'Avg. Savings',
    
    // Features
    'features.title': 'Why FarmDirect?',
    'features.directConnect': 'Direct Connection',
    'features.directConnectDesc': 'Connect directly with farmers, no middlemen involved.',
    'features.fairPrices': 'Fair Prices',
    'features.fairPricesDesc': 'Better prices for both farmers and consumers.',
    'features.freshProduce': 'Fresh Produce',
    'features.freshProduceDesc': 'Get farm-fresh vegetables, harvested daily.',
    'features.localSupport': 'Support Local',
    'features.localSupportDesc': 'Help local farmers sustain their livelihoods.',
    
    // Listings
    'listings.title': 'Available Vegetables',
    'listings.filter': 'Filter',
    'listings.sort': 'Sort by',
    'listings.sortPrice': 'Price: Low to High',
    'listings.sortPriceDesc': 'Price: High to Low',
    'listings.sortDistance': 'Distance',
    'listings.perKg': 'per kg',
    'listings.perBunch': 'per bunch',
    'listings.perPiece': 'per piece',
    'listings.available': 'Available',
    'listings.fromFarmer': 'from',
    'listings.viewDetails': 'View Details',
    'listings.contact': 'Contact',
    
    // Map
    'map.title': 'Find Farmers Near You',
    'map.findMe': 'Find My Location',
    'map.filterVegetables': 'Filter by Vegetable',
    'map.allVegetables': 'All Vegetables',
    
    // Farmer
    'farmer.verified': 'Verified Farmer',
    'farmer.unverified': 'Pending Verification',
    'farmer.call': 'Call',
    'farmer.whatsapp': 'WhatsApp',
    'farmer.directions': 'Get Directions',
    'farmer.products': 'Available Products',
    'farmer.location': 'Farm Location',
    'farmer.about': 'About the Farm',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.noResults': 'No results found',
    'common.km': 'km away',
    'common.updated': 'Updated',
    
    // Footer
    'footer.tagline': 'Connecting farmers and consumers directly.',
    'footer.contact': 'Contact Us',
    'footer.links': 'Quick Links',
    'footer.rights': 'All rights reserved.',
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.map': 'మ్యాప్ వీక్షణ',
    'nav.vegetables': 'కూరగాయలు',
    'nav.farmers': 'రైతులు',
    'nav.about': 'గురించి',
    
    // Hero
    'hero.title': 'పొలం నుండి నేరుగా మీ ఇంటికి',
    'hero.subtitle': 'విశాఖపట్నంలో స్థానిక రైతులతో నేరుగా కనెక్ట్ అవ్వండి. మా వ్యవసాయ సమాజానికి మద్దతు ఇస్తూ తక్కువ ధరలకు తాజా కూరగాయలు పొందండి.',
    'hero.search': 'కూరగాయల కోసం వెతకండి...',
    'hero.cta': 'కూరగాయలు చూడండి',
    'hero.mapCta': 'మ్యాప్‌లో చూడండి',
    
    // Stats
    'stats.farmers': 'యాక్టివ్ రైతులు',
    'stats.vegetables': 'అందుబాటులో ఉన్న కూరగాయలు',
    'stats.areas': 'ప్రాంతాలు',
    'stats.savings': 'సగటు ఆదా',
    
    // Features
    'features.title': 'ఫార్మ్‌డైరెక్ట్ ఎందుకు?',
    'features.directConnect': 'నేరుగా కనెక్షన్',
    'features.directConnectDesc': 'రైతులతో నేరుగా కనెక్ట్ అవ్వండి, మధ్యవర్తులు లేరు.',
    'features.fairPrices': 'న్యాయమైన ధరలు',
    'features.fairPricesDesc': 'రైతులకు మరియు వినియోగదారులకు మంచి ధరలు.',
    'features.freshProduce': 'తాజా ఉత్పత్తులు',
    'features.freshProduceDesc': 'రోజూ కోసిన తాజా కూరగాయలు పొందండి.',
    'features.localSupport': 'స్థానికంగా మద్దతు',
    'features.localSupportDesc': 'స్థానిక రైతులు తమ జీవనోపాధిని కొనసాగించడానికి సహాయపడండి.',
    
    // Listings
    'listings.title': 'అందుబాటులో ఉన్న కూరగాయలు',
    'listings.filter': 'ఫిల్టర్',
    'listings.sort': 'క్రమం',
    'listings.sortPrice': 'ధర: తక్కువ నుండి ఎక్కువ',
    'listings.sortPriceDesc': 'ధర: ఎక్కువ నుండి తక్కువ',
    'listings.sortDistance': 'దూరం',
    'listings.perKg': 'కిలోకు',
    'listings.perBunch': 'కట్టకు',
    'listings.perPiece': 'ముక్కకు',
    'listings.available': 'అందుబాటులో ఉంది',
    'listings.fromFarmer': 'నుండి',
    'listings.viewDetails': 'వివరాలు చూడండి',
    'listings.contact': 'సంప్రదించండి',
    
    // Map
    'map.title': 'మీ సమీపంలోని రైతులను కనుగొనండి',
    'map.findMe': 'నా లొకేషన్ కనుగొనండి',
    'map.filterVegetables': 'కూరగాయల ద్వారా ఫిల్టర్ చేయండి',
    'map.allVegetables': 'అన్ని కూరగాయలు',
    
    // Farmer
    'farmer.verified': 'ధృవీకరించబడిన రైతు',
    'farmer.unverified': 'ధృవీకరణ పెండింగ్‌లో ఉంది',
    'farmer.call': 'కాల్ చేయండి',
    'farmer.whatsapp': 'వాట్సాప్',
    'farmer.directions': 'దిశలు పొందండి',
    'farmer.products': 'అందుబాటులో ఉన్న ఉత్పత్తులు',
    'farmer.location': 'పొలం స్థానం',
    'farmer.about': 'పొలం గురించి',
    
    // Common
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.error': 'ఏదో తప్పు జరిగింది',
    'common.noResults': 'ఫలితాలు కనుగొనబడలేదు',
    'common.km': 'కిమీ దూరంలో',
    'common.updated': 'నవీకరించబడింది',
    
    // Footer
    'footer.tagline': 'రైతులను మరియు వినియోగదారులను నేరుగా కలుపుతోంది.',
    'footer.contact': 'మమ్మల్ని సంప్రదించండి',
    'footer.links': 'త్వరిత లింక్‌లు',
    'footer.rights': 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.map': 'मानचित्र दृश्य',
    'nav.vegetables': 'सब्जियां',
    'nav.farmers': 'किसान',
    'nav.about': 'के बारे में',
    
    // Hero
    'hero.title': 'खेत से सीधे आपकी थाली तक',
    'hero.subtitle': 'विशाखापत्तनम में स्थानीय किसानों से सीधे जुड़ें। हमारे कृषि समुदाय का समर्थन करते हुए उचित मूल्यों पर ताज़ी सब्जियां प्राप्त करें।',
    'hero.search': 'सब्जियां खोजें...',
    'hero.cta': 'सब्जियां देखें',
    'hero.mapCta': 'मानचित्र पर देखें',
    
    // Stats
    'stats.farmers': 'सक्रिय किसान',
    'stats.vegetables': 'उपलब्ध सब्जियां',
    'stats.areas': 'क्षेत्र',
    'stats.savings': 'औसत बचत',
    
    // Features
    'features.title': 'फार्मडायरेक्ट क्यों?',
    'features.directConnect': 'सीधा संपर्क',
    'features.directConnectDesc': 'किसानों से सीधे जुड़ें, कोई बिचौलिया नहीं।',
    'features.fairPrices': 'उचित मूल्य',
    'features.fairPricesDesc': 'किसानों और उपभोक्ताओं दोनों के लिए बेहतर कीमतें।',
    'features.freshProduce': 'ताज़ा उत्पाद',
    'features.freshProduceDesc': 'रोज़ाना काटी गई ताज़ी सब्जियां प्राप्त करें।',
    'features.localSupport': 'स्थानीय समर्थन',
    'features.localSupportDesc': 'स्थानीय किसानों की आजीविका में मदद करें।',
    
    // Listings
    'listings.title': 'उपलब्ध सब्जियां',
    'listings.filter': 'फ़िल्टर',
    'listings.sort': 'क्रमबद्ध करें',
    'listings.sortPrice': 'मूल्य: कम से अधिक',
    'listings.sortPriceDesc': 'मूल्य: अधिक से कम',
    'listings.sortDistance': 'दूरी',
    'listings.perKg': 'प्रति किलो',
    'listings.perBunch': 'प्रति गुच्छा',
    'listings.perPiece': 'प्रति टुकड़ा',
    'listings.available': 'उपलब्ध',
    'listings.fromFarmer': 'से',
    'listings.viewDetails': 'विवरण देखें',
    'listings.contact': 'संपर्क करें',
    
    // Map
    'map.title': 'अपने पास किसान खोजें',
    'map.findMe': 'मेरा स्थान खोजें',
    'map.filterVegetables': 'सब्जी से फ़िल्टर करें',
    'map.allVegetables': 'सभी सब्जियां',
    
    // Farmer
    'farmer.verified': 'सत्यापित किसान',
    'farmer.unverified': 'सत्यापन लंबित',
    'farmer.call': 'कॉल करें',
    'farmer.whatsapp': 'व्हाट्सएप',
    'farmer.directions': 'दिशा-निर्देश प्राप्त करें',
    'farmer.products': 'उपलब्ध उत्पाद',
    'farmer.location': 'खेत का स्थान',
    'farmer.about': 'खेत के बारे में',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'कुछ गलत हो गया',
    'common.noResults': 'कोई परिणाम नहीं मिला',
    'common.km': 'किमी दूर',
    'common.updated': 'अपडेट किया गया',
    
    // Footer
    'footer.tagline': 'किसानों और उपभोक्ताओं को सीधे जोड़ना।',
    'footer.contact': 'संपर्क करें',
    'footer.links': 'त्वरित लिंक',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('farmdirect-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('farmdirect-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext'; // Path should be correct
import { fetchTomatoPrices, TomatoPrice } from '@/services/tomatoPriceService'; // Path should be correct
import TomatoPriceTable from '@/components/data/TomatoPriceTable'; // Path should be correct
import TomatoPriceFilter from '@/components/data/TomatoPriceFilter'; // Path should be correct
import ImageUploader from '@/components/ui/ImageUploader'; // Path should be correct
import Header from '@/components/layout/Header'; // Added Header

export default function TomatoPricesPage() {
  const { language, translations } = useLanguage();
  const [prices, setPrices] = useState<TomatoPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    district: '',
    market: '',
    variety: '',
    grade: '',
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchTomatoPrices(filters);
      setPrices(data);
      setIsLoading(false);
    };
    
    loadData();
  }, [filters]);

  const handleFilterChange = (newFilters: {
    district?: string;
    market?: string;
    variety?: string;
    grade?: string;
    fromDate?: string;
    toDate?: string;
  }) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-agricultural-soil mb-6">
          {translations[language].tomatoPrices}
        </h1>
        
        <div className="mb-8">
          <TomatoPriceFilter onFilterChange={handleFilterChange} />
        </div>
        
        <div className="mb-8">
          <TomatoPriceTable prices={prices} isLoading={isLoading} />
        </div>
        
        <div className="mt-16 mb-8">
          <h2 className="text-xl font-semibold text-agricultural-soil mb-4">
            {translations[language].uploadTomatoImage}
          </h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-6">
              {translations[language].uploadImageDesc}
            </p>
            <ImageUploader />
          </div>
        </div>
      </div>
    </div>
  );
}

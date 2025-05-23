'use client';

import React, { useEffect, useState } from 'react';
import { getUniqueDistricts, getUniqueMarkets } from '@/services/tomatoPriceService';
import { useLanguage } from '@/context/LanguageContext';

interface TomatoPriceFilterProps {
  onFilterChange: (filters: {
    district?: string;
    market?: string;
    variety?: string;
    grade?: string;
    fromDate?: string;
    toDate?: string;
  }) => void;
}

const TomatoPriceFilter: React.FC<TomatoPriceFilterProps> = ({ onFilterChange }) => {
  const { language, translations } = useLanguage();
  const [districts, setDistricts] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    district: '',
    market: '',
    variety: '',
    grade: '',
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    const loadDistricts = async () => {
      const districtsData = await getUniqueDistricts();
      setDistricts(districtsData);
    };
    
    loadDistricts();
  }, []);

  useEffect(() => {
    const loadMarkets = async () => {
      const marketsData = await getUniqueMarkets(filters.district || undefined);
      setMarkets(marketsData);
    };
    
    loadMarkets();
  }, [filters.district]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    const newFilters = {
      ...filters,
      [name]: value
    };
    
    // Reset market if district changes
    if (name === 'district') {
      newFilters.market = '';
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4 text-agricultural-soil">
        {translations[language].filterPrices}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translations[language].district}
          </label>
          <select
            name="district"
            value={filters.district}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agricultural-green-light"
          >
            <option value="">{translations[language].allDistricts}</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translations[language].market}
          </label>
          <select
            name="market"
            value={filters.market}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agricultural-green-light"
            disabled={!filters.district}
          >
            <option value="">{translations[language].allMarkets}</option>
            {markets.map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translations[language].variety}
          </label>
          <input
            type="text"
            name="variety"
            value={filters.variety}
            onChange={handleFilterChange}
            placeholder={translations[language].enterVariety}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agricultural-green-light"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translations[language].grade}
          </label>
          <input
            type="text"
            name="grade"
            value={filters.grade}
            onChange={handleFilterChange}
            placeholder={translations[language].enterGrade}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agricultural-green-light"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translations[language].fromDate}
          </label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agricultural-green-light"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translations[language].toDate}
          </label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agricultural-green-light"
          />
        </div>
      </div>
    </div>
  );
};

export default TomatoPriceFilter;

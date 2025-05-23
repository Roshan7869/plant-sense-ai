'use client';

import React from 'react';
import { TomatoPrice, formatPriceDate } from '@/services/tomatoPriceService';
import { useLanguage } from '@/context/LanguageContext';

interface TomatoPriceTableProps {
  prices: TomatoPrice[];
  isLoading: boolean;
}

const TomatoPriceTable: React.FC<TomatoPriceTableProps> = ({ prices, isLoading }) => {
  const { language, translations } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-agricultural-green-dark"></div>
      </div>
    );
  }

  if (!prices || prices.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        {translations[language].noData}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-agricultural-green-light">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              {translations[language].date}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              {translations[language].district}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              {translations[language].market}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              {translations[language].variety}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              {translations[language].grade}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              {translations[language].minPrice}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              {translations[language].maxPrice}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              {translations[language].modalPrice}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {prices.map((price) => (
            <tr key={price.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatPriceDate(price.price_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {price.district_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {price.market_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {price.variety}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {price.grade}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₹{price.min_price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₹{price.max_price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₹{price.modal_price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TomatoPriceTable;

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const FarmerInterface: React.FC = () => {
  const { language, translations } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-agricultural-green-dark mb-8">
        {translations[language].farmer} {translations[language].appName}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/prices" 
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-40 bg-agricultural-green-light flex items-center justify-center">
            <img 
              src="https://picsum.photos/seed/tomato/400/300" 
              alt="Tomato" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-agricultural-soil mb-2">
              {translations[language].tomatoPrices}
            </h3>
            <p className="text-gray-600">
              View current and historical tomato prices across markets
            </p>
          </div>
        </Link>
        
        {/* More feature cards can be added here */}
      </div>
    </div>
  );
};

export default FarmerInterface;


import React from 'react';
import { useInterface } from '@/context/InterfaceContext';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const InterfaceToggle: React.FC = () => {
  const { interfaceType, setInterfaceType } = useInterface();
  const { language, translations } = useLanguage();
  
  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setInterfaceType('farmer')}
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
          interfaceType === 'farmer' 
            ? "bg-agricultural-green-light text-white" 
            : "hover:bg-gray-200 text-gray-700"
        )}
        aria-label="Switch to farmer interface"
      >
        {translations[language].farmer}
      </button>
      <button
        onClick={() => setInterfaceType('business')}
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
          interfaceType === 'business' 
            ? "bg-agricultural-earth-brown text-white" 
            : "hover:bg-gray-200 text-gray-700"
        )}
        aria-label="Switch to business interface"
      >
        {translations[language].business}
      </button>
    </div>
  );
};

export default InterfaceToggle;

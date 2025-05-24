import React from 'react';
import { useInterface } from '@/context/InterfaceContext';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const InterfaceToggle: React.FC = () => {
  const { interfaceType, setInterfaceType } = useInterface();
  const { language, translations } = useLanguage();
  
  return (
    <div className="flex items-center justify-center bg-gray-100 rounded-lg p-1 w-full max-w-md shadow-sm">
      <button
        onClick={() => setInterfaceType('farmer')}
        className={cn(
          "flex-1 py-3 px-6 rounded-md text-base font-medium transition-colors duration-200 min-w-[100px] min-h-[44px]",
          interfaceType === 'farmer' 
            ? "bg-agricultural-green-light text-white shadow-md" 
            : "hover:bg-gray-200 text-gray-700"
        )}
        aria-label="Switch to farmer interface"
      >
        {translations[language].farmer}
      </button>
      <button
        onClick={() => setInterfaceType('business')}
        className={cn(
          "flex-1 py-3 px-6 rounded-md text-base font-medium transition-colors duration-200 min-w-[100px] min-h-[44px]",
          interfaceType === 'business' 
            ? "bg-agricultural-earth-brown text-white shadow-md" 
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

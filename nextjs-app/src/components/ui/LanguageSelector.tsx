import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex items-center space-x-1 bg-white rounded-md border border-gray-200 px-2 py-1">
      <Languages className="h-4 w-4 text-agricultural-soil" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
        className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-agricultural-soil"
        aria-label="Select language"
      >
        <option value="en">EN</option>
        <option value="hi">HI</option>
      </select>
    </div>
  );
};

export default LanguageSelector;

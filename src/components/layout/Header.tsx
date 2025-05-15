
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/ui/LanguageSelector';
import UserProfile from '@/components/ui/UserProfile';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { language, translations } = useLanguage();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and app name */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-agricultural-green-light rounded-full flex items-center justify-center text-white font-bold text-xl">
              KM
            </div>
            <h1 className="text-xl font-bold text-agricultural-soil hidden md:block">
              {translations[language].appName}
            </h1>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <Menu className="h-6 w-6 text-agricultural-soil" />
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <UserProfile />
            </div>
          </div>
        </div>
        
        {/* Mobile navigation - simplified for mobile */}
        <div className="md:hidden pt-3 pb-1">
          <div className="flex justify-between items-center">
            <LanguageSelector />
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

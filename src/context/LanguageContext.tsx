
import React, { createContext, useState, useContext } from 'react';

type LanguageType = 'en' | 'hi';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
  translations: Record<string, Record<string, string>>;
}

const translations = {
  en: {
    farmer: 'Farmer',
    business: 'Business',
    login: 'Login',
    profile: 'Profile',
    appName: 'Kisaan Mitra'
  },
  hi: {
    farmer: 'किसान',
    business: 'व्यापार',
    login: 'लॉगिन',
    profile: 'प्रोफाइल',
    appName: 'किसान मित्र'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('en');
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


import React, { createContext, useState, useContext, ReactNode } from 'react';

type LanguageType = 'en' | 'hi';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  translations: Translations;
}

const translations: Translations = {
  en: {
    appName: 'Kisan Mitra',
    farmer: 'Farmer',
    business: 'Business',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    tomatoPrices: 'Tomato Market Prices',
    district: 'District',
    market: 'Market',
    variety: 'Variety',
    grade: 'Grade',
    date: 'Date',
    minPrice: 'Min Price (₹/Quintal)',
    maxPrice: 'Max Price (₹/Quintal)',
    modalPrice: 'Modal Price (₹/Quintal)',
    filterPrices: 'Filter Prices',
    allDistricts: 'All Districts',
    allMarkets: 'All Markets',
    enterVariety: 'Enter variety',
    enterGrade: 'Enter grade',
    fromDate: 'From Date',
    toDate: 'To Date',
    noData: 'No price data available',
    uploadTomatoImage: 'Upload Tomato Image',
    uploadImageDesc: 'Take a photo of your tomato crop or upload an existing image',
    uploadImage: 'Upload Image',
    takePhoto: 'Take Photo',
    uploading: 'Uploading...',
    imageUploaded: 'Image Uploaded',
    imageUploadedDesc: 'Your image has been uploaded successfully',
    uploadError: 'Upload Error',
    uploadErrorDesc: 'There was an error uploading your image',
    plantDiagnosis: 'Plant Health Diagnosis',
    diagnosisDesc: 'Take a photo of your plant to diagnose any potential diseases or pests',
    analyzing: 'Analyzing...',
    newImage: 'New Image',
    backToHome: 'Back to Home',
    analysisComplete: 'Analysis Complete',
    plantHealthy: 'Your plant appears healthy. No diseases detected.',
    identifyPlantDisease: 'Identify plant diseases and get treatment recommendations'
  },
  hi: {
    appName: 'किसान मित्र',
    farmer: 'किसान',
    business: 'व्यापारी',
    profile: 'प्रोफाइल',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    tomatoPrices: 'टमाटर बाजार मूल्य',
    district: 'जिला',
    market: 'बाजार',
    variety: 'किस्म',
    grade: 'ग्रेड',
    date: 'तारीख',
    minPrice: 'न्यूनतम मूल्य (₹/क्विंटल)',
    maxPrice: 'अधिकतम मूल्य (₹/क्विंटल)',
    modalPrice: 'औसत मूल्य (₹/क्विंटल)',
    filterPrices: 'मूल्य फ़िल्टर करें',
    allDistricts: 'सभी जिले',
    allMarkets: 'सभी बाजार',
    enterVariety: 'किस्म दर्ज करें',
    enterGrade: 'ग्रेड दर्ज करें',
    fromDate: 'आरंभ तिथि',
    toDate: 'अंतिम तिथि',
    noData: 'कोई मूल्य डेटा उपलब्ध नहीं है',
    uploadTomatoImage: 'टमाटर की छवि अपलोड करें',
    uploadImageDesc: 'अपनी टमाटर फसल की तस्वीर लें या मौजूदा छवि अपलोड करें',
    uploadImage: 'छवि अपलोड करें',
    takePhoto: 'फोटो लें',
    uploading: 'अपलोड हो रहा है...',
    imageUploaded: 'छवि अपलोड की गई',
    imageUploadedDesc: 'आपकी छवि सफलतापूर्वक अपलोड कर दी गई है',
    uploadError: 'अपलोड त्रुटि',
    uploadErrorDesc: 'आपकी छवि अपलोड करने में एक त्रुटि हुई थी',
    plantDiagnosis: 'पौधे स्वास्थ्य निदान',
    diagnosisDesc: 'किसी संभावित बीमारी या कीटों का निदान करने के लिए अपने पौधे की एक तस्वीर लें',
    analyzing: 'विश्लेषण हो रहा है...',
    newImage: 'नई छवि',
    backToHome: 'होम पेज पर वापस जाएं',
    analysisComplete: 'विश्लेषण पूर्ण',
    plantHealthy: 'आपका पौधा स्वस्थ दिखाई दे रहा है। कोई बीमारी नहीं मिली।',
    identifyPlantDisease: 'पौधों की बीमारियों की पहचान करें और उपचार की सिफारिशें प्राप्त करें'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

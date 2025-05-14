
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const FarmerInterface: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-agricultural-soil mb-6">
        {language === 'en' ? 'Farmer Dashboard' : 'किसान डैशबोर्ड'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Plant Disease Diagnosis */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-agricultural-green-light">
          <h3 className="text-lg font-medium text-agricultural-soil mb-2">
            {language === 'en' ? 'Plant Disease Diagnosis' : 'पौधों का रोग निदान'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'en' 
              ? 'Upload photos of your crops to identify diseases and get treatment recommendations.' 
              : 'रोगों की पहचान करने और उपचार की सिफारिशें प्राप्त करने के लिए अपनी फसलों की तस्वीरें अपलोड करें।'}
          </p>
          <button className="px-4 py-2 bg-agricultural-green-light text-white rounded-md hover:bg-agricultural-green-dark transition-colors">
            {language === 'en' ? 'Upload Photo' : 'फोटो अपलोड करें'}
          </button>
        </div>
        
        {/* Weather Updates */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-agricultural-wheat">
          <h3 className="text-lg font-medium text-agricultural-soil mb-2">
            {language === 'en' ? 'Weather Updates' : 'मौसम अपडेट'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'en' 
              ? 'Get local weather forecasts and alerts for better crop management.' 
              : 'बेहतर फसल प्रबंधन के लिए स्थानीय मौसम का पूर्वानुमान और अलर्ट प्राप्त करें।'}
          </p>
          <button className="px-4 py-2 bg-agricultural-wheat text-agricultural-soil rounded-md hover:bg-amber-200 transition-colors">
            {language === 'en' ? 'Check Weather' : 'मौसम जाँचें'}
          </button>
        </div>
        
        {/* Market Prices */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-agricultural-earth-brown">
          <h3 className="text-lg font-medium text-agricultural-soil mb-2">
            {language === 'en' ? 'Market Prices' : 'बाजार मूल्य'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'en' 
              ? 'View current market prices for your crops and plan your sales.' 
              : 'अपनी फसलों के लिए वर्तमान बाजार मूल्य देखें और अपनी बिक्री की योजना बनाएं।'}
          </p>
          <button className="px-4 py-2 bg-agricultural-earth-brown text-white rounded-md hover:bg-agricultural-soil transition-colors">
            {language === 'en' ? 'View Prices' : 'मूल्य देखें'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerInterface;

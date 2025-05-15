
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const BusinessInterface: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-agricultural-soil mb-6">
        {language === 'en' ? 'Business Dashboard' : 'व्यापार डैशबोर्ड'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Procurement */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-agricultural-earth-brown">
          <h3 className="text-lg font-medium text-agricultural-soil mb-2">
            {language === 'en' ? 'Procurement Management' : 'खरीद प्रबंधन'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'en' 
              ? 'Manage crop procurement and connect with local farmers.' 
              : 'फसल खरीद का प्रबंधन करें और स्थानीय किसानों से जुड़ें।'}
          </p>
          <button className="px-4 py-2 bg-agricultural-earth-brown text-white rounded-md hover:bg-agricultural-soil transition-colors">
            {language === 'en' ? 'Manage Procurement' : 'खरीद प्रबंधन करें'}
          </button>
        </div>
        
        {/* Warehouse */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-agricultural-clay">
          <h3 className="text-lg font-medium text-agricultural-soil mb-2">
            {language === 'en' ? 'Warehouse Management' : 'गोदाम प्रबंधन'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'en' 
              ? 'Track inventory, manage storage, and optimize warehouse operations.' 
              : 'इन्वेंट्री ट्रैक करें, भंडारण प्रबंधित करें, और गोदाम संचालन को अनुकूलित करें।'}
          </p>
          <Link to="/prices" className="inline-block px-4 py-2 bg-agricultural-earth-brown text-white rounded-md hover:bg-agricultural-soil transition-colors">
            {language === 'en' ? 'View Market Prices' : 'बाज़ार मूल्य देखें'}
          </Link>
        </div>
        
        {/* Market Analytics */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-agricultural-green-dark">
          <h3 className="text-lg font-medium text-agricultural-soil mb-2">
            {language === 'en' ? 'Market Analytics' : 'बाजार विश्लेषिकी'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'en' 
              ? 'Access market insights, trends, and forecasts for better business decisions.' 
              : 'बेहतर व्यापारिक निर्णयों के लिए बाजार अंतर्दृष्टि, रुझान, और पूर्वानुमान देखें।'}
          </p>
          <button className="px-4 py-2 bg-agricultural-green-dark text-white rounded-md hover:bg-green-900 transition-colors">
            {language === 'en' ? 'View Analytics' : 'विश्लेषिकी देखें'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessInterface;

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Warehouse, TrendingUp, Truck, Users } from 'lucide-react';
import ChatBot from '@/components/chat/ChatBot';
import NewsSection from '@/components/news/NewsSection';

const BusinessInterface: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-agricultural-soil mb-8">
        {language === 'en' ? 'Business Dashboard' : 'व्यापार डैशबोर्ड'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Warehouse Management */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-5 w-5 text-agricultural-earth-brown" />
              {language === 'en' ? 'Warehouse' : 'गोदाम'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Manage storage and inventory tracking' 
                : 'भंडारण और इन्वेंटरी ट्रैकिंग प्रबंधन'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-agricultural-earth-brown hover:bg-agricultural-soil">
              {language === 'en' ? 'Manage Storage' : 'भंडारण प्रबंधन'}
            </Button>
          </CardContent>
        </Card>

        {/* Market Analytics */}
        <Link to="/prices">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-agricultural-green-light" />
                {language === 'en' ? 'Market Analytics' : 'बाज़ार विश्लेषण'}
              </CardTitle>
              <CardDescription>
                {language === 'en'
                  ? 'Track prices and market trends'
                  : 'कीमतों और बाज़ार के रुझान का विश्लेषण'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-agricultural-green-light hover:bg-agricultural-green-dark">
                {language === 'en' ? 'View Analytics' : 'विश्लेषण देखें'}
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* Logistics */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-500" />
              {language === 'en' ? 'Logistics' : 'परिवहन'}
            </CardTitle>
            <CardDescription>
              {language === 'en'
                ? 'Manage transportation and delivery'
                : 'परिवहन और वितरण प्रबंधन'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              {language === 'en' ? 'Plan Logistics' : 'परिवहन योजना'}
            </Button>
          </CardContent>
        </Card>

        {/* Network */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              {language === 'en' ? 'Network' : 'नेटवर्क'}
            </CardTitle>
            <CardDescription>
              {language === 'en'
                ? 'Connect with farmers and traders'
                : 'किसानों और व्यापारियों से जुड़ें'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              {language === 'en' ? 'View Network' : 'नेटवर्क देखें'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* News Section */}
      <div className="mt-12">
        <NewsSection />
      </div>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default BusinessInterface;
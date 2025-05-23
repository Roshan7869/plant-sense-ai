'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link'; // Changed from react-router-dom
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, LineChart, Leaf, CloudRain } from 'lucide-react';
import ChatBot from '@/components/chat/ChatBot';
import NewsSection from '@/components/news/NewsSection';

const FarmerInterface: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-agricultural-soil mb-8">
        {language === 'en' ? 'Welcome, Farmer!' : 'स्वागत है, किसान!'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Plant Health Card */}
        <Link href="/diagnosis"> {/* Changed to href */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-agricultural-green-light" />
                {language === 'en' ? 'Plant Health' : 'पौधों का स्वास्थ्य'}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Diagnose plant diseases and get treatment recommendations' 
                  : 'पौधों की बीमारियों का निदान करें और उपचार की सिफारिशें प्राप्त करें'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-agricultural-green-light hover:bg-agricultural-green-dark">
                <Camera className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Scan Now' : 'अभी स्कैन करें'}
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* Market Prices Card */}
        <Link href="/prices"> {/* Changed to href */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-agricultural-earth-brown" />
                {language === 'en' ? 'Market Prices' : 'बाज़ार भाव'}
              </CardTitle>
              <CardDescription>
                {language === 'en'
                  ? 'Track real-time market prices and trends'
                  : 'वास्तविक समय के बाज़ार भाव और रुझान देखें'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-agricultural-earth-brown hover:bg-agricultural-soil">
                {language === 'en' ? 'View Prices' : 'भाव देखें'}
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* Weather Updates Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-blue-500" />
              {language === 'en' ? 'Weather Updates' : 'मौसम की जानकारी'}
            </CardTitle>
            <CardDescription>
              {language === 'en'
                ? 'Get local weather forecasts and alerts'
                : 'स्थानीय मौसम की भविष्यवाणी और चेतावनियां प्राप्त करें'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              {language === 'en' ? 'Check Weather' : 'मौसम जानें'}
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

export default FarmerInterface;

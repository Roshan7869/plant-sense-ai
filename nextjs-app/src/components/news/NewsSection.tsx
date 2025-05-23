import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Cloud, Newspaper, Building } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyC-uTZhvT8saCPk5k7JSNzs6yUCaJQutwM');

interface NewsItem {
  title: string;
  description: string;
}

const NewsSection: React.FC = () => {
  const { language } = useLanguage();
  const [weather, setWeather] = useState<string>('');
  const [farmerNews, setFarmerNews] = useState<NewsItem[]>([]);
  const [govtSchemes, setGovtSchemes] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Weather
        const weatherPrompt = "Generate today's weather report for farmers in India in a concise format. Include temperature, rainfall probability, and farming advice.";
        const weatherResponse = await model.generateContent(weatherPrompt);
        setWeather(weatherResponse.response.text());

        // Farmer News
        const newsPrompt = "Generate 2 latest news updates about Indian agriculture and farming (last 24 hours). Format: Title and brief description for each.";
        const newsResponse = await model.generateContent(newsPrompt);
        const newsText = newsResponse.response.text();
        const newsItems = parseNewsItems(newsText);
        setFarmerNews(newsItems);

        // Government Schemes
        const schemesPrompt = "List 2 current government schemes or subsidies for Indian farmers. Include scheme name and brief details.";
        const schemesResponse = await model.generateContent(schemesPrompt);
        const schemesText = schemesResponse.response.text();
        const schemeItems = parseNewsItems(schemesText);
        setGovtSchemes(schemeItems);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const parseNewsItems = (text: string): NewsItem[] => {
    // Simple parser that splits text into title and description
    const items = text.split('\n\n').filter(item => item.trim());
    return items.map(item => {
      const [title, ...descParts] = item.split('\n');
      return {
        title: title.replace(/^\d+\.\s*/, ''),
        description: descParts.join(' ').trim()
      };
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-agricultural-soil mb-6">
        {language === 'en' ? 'Agricultural Updates' : 'कृषि अपडेट'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-blue-500" />
              {language === 'en' ? 'Weather Report' : 'मौसम रिपोर्ट'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse h-20 bg-gray-200 rounded" />
            ) : (
              <p className="text-gray-600">{weather}</p>
            )}
          </CardContent>
        </Card>

        {/* Farmer News Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-agricultural-green-light" />
              {language === 'en' ? 'Farming Updates' : 'कृषि समाचार'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <div className="animate-pulse h-20 bg-gray-200 rounded" />
                <div className="animate-pulse h-20 bg-gray-200 rounded" />
              </div>
            ) : (
              <div className="space-y-4">
                {farmerNews.map((news, index) => (
                  <div key={index} className="border-b pb-2 last:border-0">
                    <h4 className="font-semibold text-agricultural-soil">{news.title}</h4>
                    <p className="text-sm text-gray-600">{news.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Government Schemes Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-agricultural-earth-brown" />
              {language === 'en' ? 'Government Schemes' : 'सरकारी योजनाएं'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <div className="animate-pulse h-20 bg-gray-200 rounded" />
                <div className="animate-pulse h-20 bg-gray-200 rounded" />
              </div>
            ) : (
              <div className="space-y-4">
                {govtSchemes.map((scheme, index) => (
                  <div key={index} className="border-b pb-2 last:border-0">
                    <h4 className="font-semibold text-agricultural-soil">{scheme.title}</h4>
                    <p className="text-sm text-gray-600">{scheme.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsSection;

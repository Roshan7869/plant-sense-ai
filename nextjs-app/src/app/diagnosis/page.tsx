'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation'; // Changed from react-router-dom

const PlantDiagnosisPage: React.FC = () => {
  const { language, translations } = useLanguage();
  const router = useRouter(); // Changed from useNavigate
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setImage(e.target.result);
        simulateAnalysis();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    
    input.addEventListener('change', (e) => {
      if (e.target instanceof HTMLInputElement && e.target.files?.length) {
        const file = e.target.files[0];
        
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          if (typeof readerEvent.target?.result === 'string') {
            setImage(readerEvent.target.result);
            simulateAnalysis();
          }
        };
        reader.readAsDataURL(file);
      }
    });
    
    input.click();
  };

  const simulateAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      toast({
        title: language === 'en' ? 'Analysis Complete' : 'विश्लेषण पूर्ण',
        description: language === 'en' 
          ? 'Your plant appears healthy. No diseases detected.' 
          : 'आपका पौधा स्वस्थ दिखाई दे रहा है। कोई बीमारी नहीं मिली।',
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50"> {/* Removed pt-4, relying on layout's main padding */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6 text-agricultural-soil">
            {translations[language].plantDiagnosis}
          </h1>
          
          {!image ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="mb-4 text-gray-600">
                  {translations[language].diagnosisDesc}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={handleCameraCapture}
                  className="flex items-center justify-center gap-2 py-6 bg-agricultural-green-light hover:bg-agricultural-green-dark text-white"
                >
                  <Camera className="w-6 h-6" />
                  <span>{translations[language].takePhoto}</span>
                </Button>
                
                <label className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 py-6 bg-agricultural-earth-brown hover:bg-agricultural-soil text-white rounded-md">
                    <Upload className="w-6 h-6" />
                    <span>{translations[language].uploadImage}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-lg overflow-hidden h-64 w-full">
                <img 
                  src={image} 
                  alt="Plant" 
                  className="w-full h-full object-cover"
                />
                {analyzing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 animate-spin h-8 w-8 border-4 border-t-white border-r-transparent border-b-white border-l-transparent rounded-full mx-auto"></div>
                      <p>{translations[language].analyzing}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  variant="outline"
                  className="flex-1" 
                  onClick={() => setImage(null)}
                >
                  {translations[language].newImage}
                </Button>
                
                <Button 
                  variant="default"
                  className="flex-1 bg-agricultural-green-light hover:bg-agricultural-green-dark"
                  onClick={() => router.push('/')} // Changed to router.push
                >
                  {translations[language].backToHome}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlantDiagnosisPage;

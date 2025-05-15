
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useInterface } from '@/context/InterfaceContext';
import Header from '@/components/layout/Header';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import InterfaceToggle from '@/components/ui/InterfaceToggle';

const PlantDiagnosis: React.FC = () => {
  const { language, translations } = useLanguage();
  const { interfaceType } = useInterface();
  const navigate = useNavigate();
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
    input.onchange = (e) => handleFileChange(e as React.ChangeEvent<HTMLInputElement>);
    input.click();
  };

  const simulateAnalysis = () => {
    setAnalyzing(true);
    // Simulate analysis delay
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Prominent Interface Toggle Section */}
      <div className="w-full bg-white py-3 shadow-sm">
        <div className="container mx-auto px-4 flex justify-center">
          <InterfaceToggle />
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6 text-agricultural-soil">
            {language === 'en' ? 'Plant Health Diagnosis' : 'पौधे स्वास्थ्य निदान'}
          </h1>
          
          {!image ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="mb-4 text-gray-600">
                  {language === 'en' 
                    ? 'Take a photo of your plant to diagnose any potential diseases or pests.' 
                    : 'किसी संभावित बीमारी या कीटों का निदान करने के लिए अपने पौधे की एक तस्वीर लें।'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={handleCameraCapture}
                  className="flex items-center justify-center gap-2 py-6 bg-agricultural-green-light hover:bg-agricultural-green-dark text-white"
                >
                  <Camera className="w-6 h-6" />
                  <span>{language === 'en' ? 'Take Photo' : 'तस्वीर लें'}</span>
                </Button>
                
                <label className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 py-6 bg-agricultural-earth-brown hover:bg-agricultural-soil text-white rounded-md">
                    <Upload className="w-6 h-6" />
                    <span>{language === 'en' ? 'Upload Image' : 'छवि अपलोड करें'}</span>
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
                      <p>{language === 'en' ? 'Analyzing...' : 'विश्लेषण हो रहा है...'}</p>
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
                  {language === 'en' ? 'New Image' : 'नई छवि'}
                </Button>
                
                <Button 
                  variant="default"
                  className="flex-1 bg-agricultural-green-light hover:bg-agricultural-green-dark"
                  onClick={() => navigate('/')}
                >
                  {language === 'en' ? 'Back to Home' : 'होम पेज पर वापस जाएं'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlantDiagnosis;

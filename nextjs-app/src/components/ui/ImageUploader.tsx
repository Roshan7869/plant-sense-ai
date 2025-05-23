'use client';

import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { uploadImage, getImageUrl } from '@/services/tomatoPriceService';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  onImageUploaded?: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded }) => {
  const { language, translations } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload the image
    try {
      setIsUploading(true);
      const timestamp = new Date().getTime();
      const path = `${timestamp}_${file.name}`;
      
      const uploadedPath = await uploadImage(file, path);
      
      if (uploadedPath) {
        const publicUrl = getImageUrl(uploadedPath);
        if (onImageUploaded) {
          onImageUploaded(publicUrl);
        }
        
        toast({
          title: translations[language].imageUploaded,
          description: translations[language].imageUploadedDesc,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: translations[language].uploadError,
        description: translations[language].uploadErrorDesc,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('image-upload')?.click();
  };

  const handleCaptureClick = () => {
    document.getElementById('camera-capture')?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {previewUrl && (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full max-w-xs rounded-lg shadow-md"
          />
        </div>
      )}
      
      <div className="flex space-x-4">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <input
          type="file"
          id="camera-capture"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <button
          onClick={triggerFileInput}
          disabled={isUploading}
          className="px-4 py-2 bg-agricultural-green-light text-white rounded-md hover:bg-agricultural-green-dark transition-colors"
        >
          {isUploading ? translations[language].uploading : translations[language].uploadImage}
        </button>
        
        <button
          onClick={handleCaptureClick}
          disabled={isUploading}
          className="px-4 py-2 bg-agricultural-earth-brown text-white rounded-md hover:bg-agricultural-soil flex items-center space-x-2 transition-colors"
        >
          <Camera size={18} />
          <span>{translations[language].takePhoto}</span>
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;

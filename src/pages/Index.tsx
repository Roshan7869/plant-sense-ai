
import React from 'react';
import { InterfaceProvider } from '@/context/InterfaceContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import { useInterface } from '@/context/InterfaceContext';
import FarmerInterface from '@/components/interfaces/FarmerInterface';
import BusinessInterface from '@/components/interfaces/BusinessInterface';
import InterfaceToggle from '@/components/ui/InterfaceToggle';

// This component renders the appropriate interface based on the selected type
const InterfaceContent = () => {
  const { interfaceType } = useInterface();
  
  return (
    <main className="pt-4">
      {interfaceType === 'farmer' ? <FarmerInterface /> : <BusinessInterface />}
    </main>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <InterfaceProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          {/* Prominent Interface Toggle Section */}
          <div className="w-full bg-white py-3 shadow-sm">
            <div className="container mx-auto px-4 flex justify-center">
              <InterfaceToggle />
            </div>
          </div>
          
          <InterfaceContent />
        </div>
      </InterfaceProvider>
    </LanguageProvider>
  );
};

export default Index;

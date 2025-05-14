
import React from 'react';
import { InterfaceProvider } from '@/context/InterfaceContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import { useInterface } from '@/context/InterfaceContext';
import FarmerInterface from '@/components/interfaces/FarmerInterface';
import BusinessInterface from '@/components/interfaces/BusinessInterface';

// This component renders the appropriate interface based on the selected type
const InterfaceContent = () => {
  const { interfaceType } = useInterface();
  
  return (
    <main>
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
          <InterfaceContent />
        </div>
      </InterfaceProvider>
    </LanguageProvider>
  );
};

export default Index;

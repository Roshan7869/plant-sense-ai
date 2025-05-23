'use client'; // Crucial for hooks and event handlers

import React from 'react';
// LanguageProvider and InterfaceProvider are in layout.tsx
import Header from '@/components/layout/Header';
import { useInterface } from '@/context/InterfaceContext';
import FarmerInterface from '@/components/interfaces/FarmerInterface';
import BusinessInterface from '@/components/interfaces/BusinessInterface';
import InterfaceToggle from '@/components/ui/InterfaceToggle';

const InterfaceContent = () => {
  const { interfaceType } = useInterface(); // This hook makes InterfaceContent a client component
  return (
    <main className="pt-4">
      {interfaceType === 'farmer' ? <FarmerInterface /> : <BusinessInterface />}
    </main>
  );
};

export default function HomePage() { // Renamed from Index
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full bg-white py-3 shadow-sm">
        <div className="container mx-auto px-4 flex justify-center">
          <InterfaceToggle />
        </div>
      </div>
      <InterfaceContent />
    </div>
  );
}

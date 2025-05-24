import React, { createContext, useState, useContext } from 'react';

type InterfaceType = 'farmer' | 'business';

interface InterfaceContextType {
  interfaceType: InterfaceType;
  setInterfaceType: React.Dispatch<React.SetStateAction<InterfaceType>>;
}

const InterfaceContext = createContext<InterfaceContextType | undefined>(undefined);

export const InterfaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interfaceType, setInterfaceType] = useState<InterfaceType>('farmer');
  
  return (
    <InterfaceContext.Provider value={{ interfaceType, setInterfaceType }}>
      {children}
    </InterfaceContext.Provider>
  );
};

export const useInterface = (): InterfaceContextType => {
  const context = useContext(InterfaceContext);
  if (context === undefined) {
    throw new Error('useInterface must be used within an InterfaceProvider');
  }
  return context;
};

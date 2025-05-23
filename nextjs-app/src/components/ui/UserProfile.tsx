import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// This is a mock user for demonstration
// In a real app, this would come from an authentication system
const mockUser = {
  isLoggedIn: false,
  name: 'John Doe',
  avatar: null
};

const UserProfile: React.FC = () => {
  const { language, translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center justify-center bg-agricultural-green-dark hover:bg-agricultural-soil text-white rounded-full p-2 transition-colors duration-200"
        aria-label={mockUser.isLoggedIn ? 'View profile' : 'Login'}
      >
        <User className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          {mockUser.isLoggedIn ? (
            <>
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium">{mockUser.name}</p>
              </div>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {translations[language].profile}
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Log out
              </a>
            </>
          ) : (
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {translations[language].login}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

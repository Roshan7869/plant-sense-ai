import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Ensure this is present
import '@/index.css'; // Added import for global styles
import { LanguageProvider } from '@/context/LanguageContext'; 
import { InterfaceProvider } from '@/context/InterfaceContext'; 
import { Toaster as Sonner } from "@/components/ui/sonner"; 
import { Toaster } from "@/components/ui/toaster"; 
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from '@/components/layout/Header'; // Added import
import InterfaceToggle from '@/components/ui/InterfaceToggle'; // Added import

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kisan Mitra - Your Agricultural Assistant', // Updated title
  description: 'Empowering farmers and businesses with agricultural insights and tools.', // Updated description
};

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <LanguageProvider>
              <InterfaceProvider>
                <Header />
                <div className="w-full bg-white py-3 shadow-sm sticky top-0 z-40"> {/* Made InterfaceToggle sticky under Header */}
                  <div className="container mx-auto px-4 flex justify-center">
                    <InterfaceToggle />
                  </div>
                </div>
                <main className="pt-4">{children}</main> {/* Added main wrapper with padding */}
                <Toaster />
                <Sonner />
              </InterfaceProvider>
            </LanguageProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

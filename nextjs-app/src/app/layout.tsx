import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Ensure this is present
import { LanguageProvider } from '@/context/LanguageContext'; 
import { InterfaceProvider } from '@/context/InterfaceContext'; 
import { Toaster as Sonner } from "@/components/ui/sonner"; 
import { Toaster } from "@/components/ui/toaster"; 
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
                {children}
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

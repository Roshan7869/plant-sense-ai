import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Leaf, Mic, Camera, Send, X, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const genAI = new GoogleGenerativeAI('AIzaSyC-uTZhvT8saCPk5k7JSNzs6yUCaJQutwM');

interface Message {
  type: 'user' | 'bot';
  content: string;
  image?: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      type: 'user',
      content: input,
      image: selectedImage
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      
      let prompt = `You are an agricultural expert assistant. Analyze the following query and provide detailed advice: ${input}`;
      if (selectedImage) {
        prompt += " Also analyze the attached image for any plant health issues.";
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, {
        type: 'bot',
        content: text
      }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    }

    setIsLoading(false);
  };

  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-agricultural-green-light hover:bg-agricultural-green-dark shadow-lg"
      >
        <Leaf className="h-6 w-6 text-white" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-agricultural-soil">
              {language === 'en' ? 'Plant Health Assistant' : 'पौधा स्वास्थ्य सहायक'}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-agricultural-green-light text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Uploaded"
                      className="max-w-full h-auto rounded-lg mb-2"
                    />
                  )}
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {selectedImage && (
            <div className="p-2 border-t">
              <div className="relative w-20 h-20">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white"
                  onClick={() => setSelectedImage('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'en' ? 'Type your message...' : 'अपना संदेश टाइप करें...'}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-agricultural-green-light"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                id="image-upload"
              />
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Leaf className="h-4 w-4" />
                </label>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleCameraCapture}
              >
                <Camera className="h-4 w-4" />
              </Button>
              
              {browserSupportsSpeechRecognition && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (listening) {
                      SpeechRecognition.stopListening();
                    } else {
                      resetTranscript();
                      SpeechRecognition.startListening();
                    }
                  }}
                  className={listening ? 'bg-red-100' : ''}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                variant="default"
                size="icon"
                onClick={handleSend}
                className="bg-agricultural-green-light hover:bg-agricultural-green-dark"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
import React, { useState } from 'react';
import CameraCapture from '../components/CameraCapture';
import ConversionResult from '../components/ConversionResult';
import HeroText from '../components/HeroText';
import { useAuth } from '@clerk/clerk-react';
import { API_URL, NOTE_READER_AGENT_ID } from '../contstants';

type Step = 'capture' | 'processing' | 'result';

interface ConversionData {
  originalImage: string;
  markdown: string;
}

const NotesConverter: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('capture');
  const [conversionData, setConversionData] = useState<ConversionData | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { userId, getToken } = useAuth();

  console.log('isProcessing', isProcessing);

  const handleImageCapture = async (imageData: string) => {
    setIsProcessing(true);
    setError(null);
    setCurrentStep('processing');

    try {
      const token = await getToken();
      if (!userId || !token) {
        setError('Not authenticated. Please sign in.');
        setCurrentStep('capture');
        setIsProcessing(false);
        return;
      }
      const response = await fetch(`${API_URL}/${NOTE_READER_AGENT_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, token, image: imageData }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const markdown = await response.text();
      setConversionData({ originalImage: imageData, markdown });
      setCurrentStep('result');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError('Failed to convert image. ' + errorMsg);
      setCurrentStep('capture');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCurrentStep('capture');
    setConversionData(null);
    setError(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'capture':
        return (
          <CameraCapture onImageCapture={handleImageCapture} error={error} />
        );
      case 'processing':
        return (
          <div className="bg-white border-4 border-gray-800 rounded-3xl p-8 shadow-lg max-w-2xl mx-auto relative transform -rotate-1">
            <div className="absolute -top-3 -left-3 w-5 h-5 bg-blue-300 rounded-full border-2 border-gray-800"></div>
            <div className="absolute -top-2 -right-4 w-4 h-4 bg-yellow-300 rounded-full border-2 border-gray-800"></div>
            <div className="text-center relative">
              <div className="relative mx-auto mb-4 w-16 h-16">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-400"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-300 rounded-full border-2 border-gray-800"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 relative">
                Converting Your Notes
                <div className="absolute -bottom-1 left-12 w-20 h-1 bg-green-300 transform rotate-1"></div>
              </h2>
              <p className="text-gray-600">
                Using AI to extract text from your handwritten notes...
              </p>
              <div className="absolute -bottom-8 -right-4 w-6 h-6 bg-purple-300 border-2 border-gray-800 transform rotate-45"></div>
            </div>
          </div>
        );
      case 'result':
        return conversionData ? (
          <ConversionResult data={conversionData} onReset={handleReset} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <HeroText />

      {renderStep()}
    </div>
  );
};

export default NotesConverter;

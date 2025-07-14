import React, { useState, useRef } from 'react';
import { Camera, Copy, FileText, Upload, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import CameraCapture from './CameraCapture';
import ConversionResult from './ConversionResult';

type Step = 'capture' | 'processing' | 'result';

interface ConversionData {
  originalImage: string;
  markdown: string;
}

const NotesConverter: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('capture');
  const [conversionData, setConversionData] = useState<ConversionData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageCapture = async (imageData: string) => {
    setIsProcessing(true);
    setError(null);
    setCurrentStep('processing');

    try {
      // Simulate API call for now - replace with actual OCR service
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock conversion result
      const mockMarkdown = `# Handwritten Notes

## Meeting Notes - ${new Date().toLocaleDateString()}

### Key Points:
- Review project timeline and milestones
- Discuss budget allocation for Q2
- Identify potential risks and mitigation strategies

### Action Items:
- [ ] Follow up with stakeholders by Friday
- [ ] Prepare presentation for next week
- [ ] Update project documentation

### Next Steps:
1. Schedule follow-up meeting
2. Distribute meeting minutes
3. Begin implementation of discussed changes

---

*Note: This is a sample conversion. Replace with actual OCR service integration.*`;

      setConversionData({
        originalImage: imageData,
        markdown: mockMarkdown
      });
      
      setCurrentStep('result');
    } catch (err) {
      setError('Failed to convert image. Please try again.');
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
          <CameraCapture 
            onImageCapture={handleImageCapture}
            error={error}
          />
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
          <ConversionResult 
            data={conversionData}
            onReset={handleReset}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 relative">
          Convert Handwritten Notes to Markdown
          <div className="absolute -top-4 left-12 w-3 h-3 bg-green-300 rounded-full border-2 border-gray-800"></div>
          <div className="absolute -top-2 right-8 w-2 h-2 bg-purple-300 rounded-full border border-gray-800"></div>
        </h2>
        <p className="text-gray-600 relative">
          Capture your notes with your camera and instantly convert them to digital Markdown format
          <div className="absolute -bottom-1 left-16 w-20 h-1 bg-orange-300 transform -rotate-1"></div>
        </p>
        <div className="absolute -right-8 top-4 w-6 h-6 border-2 border-gray-800 transform rotate-12">
          <div className="w-2 h-2 bg-red-300 rounded-full absolute top-1 left-1"></div>
        </div>
      </div>

      {renderStep()}
    </div>
  );
};

export default NotesConverter;
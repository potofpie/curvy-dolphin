import React, { useState } from 'react';
import {
  Copy,
  CheckCircle,
  RotateCcw,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface ConversionResultProps {
  data: {
    originalImage: string;
    markdown: string;
  };
  onReset: () => void;
}

const ConversionResult: React.FC<ConversionResultProps> = ({
  data,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="bg-white border-4 border-gray-800 rounded-3xl p-8 shadow-lg max-w-4xl mx-auto relative transform rotate-1">
      <div className="absolute -top-3 -left-2 w-6 h-6 bg-yellow-300 rounded-full border-2 border-gray-800"></div>
      <div className="absolute -top-4 right-12 w-4 h-4 bg-pink-300 rounded-full border-2 border-gray-800"></div>
      <div className="absolute -bottom-3 -right-3 w-5 h-5 bg-blue-300 border-2 border-gray-800 transform rotate-45"></div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 relative">
          Conversion Complete
          <div className="absolute -bottom-1 left-4 w-16 h-1 bg-green-300 transform -rotate-1"></div>
        </h3>
        <button
          onClick={onReset}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-all transform hover:-rotate-1 hover:scale-105 border-2 border-gray-300 rounded-xl hover:border-gray-800 relative"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Convert Another
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-300 rounded-full border border-gray-800"></div>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="relative">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 relative">
            Original Image
            <div className="absolute -bottom-1 left-8 w-12 h-1 bg-purple-300 transform rotate-1"></div>
          </h4>
          <img
            src={data.originalImage}
            alt="Original handwritten notes"
            className="w-full rounded-2xl border-3 border-gray-800 shadow-lg transform -rotate-1"
          />
          <div className="absolute top-8 -left-2 w-4 h-4 bg-yellow-300 rounded-full border-2 border-gray-800"></div>
        </div>

        {/* Converted Markdown */}
        <div className="relative">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 relative">
            Converted Markdown
            <div className="absolute -bottom-1 left-12 w-16 h-1 bg-blue-300 transform -rotate-1"></div>
          </h4>
          <div className="bg-gray-50 rounded-2xl p-4 border-3 border-gray-800 transform rotate-1 relative">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono overflow-y-auto max-h-96">
              {data.markdown}
            </pre>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-300 rounded-full border-2 border-gray-800"></div>
          </div>
          <div className="absolute top-8 -right-2 w-3 h-3 bg-pink-300 rounded-full border-2 border-gray-800"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <button
          onClick={copyToClipboard}
          className="flex items-center px-6 py-3 bg-blue-400 text-white border-3 border-gray-800 rounded-2xl hover:bg-blue-500 transition-all transform hover:-rotate-1 hover:scale-105 shadow-lg relative"
        >
          {copied ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5 mr-2" />
              Copy to Clipboard
            </>
          )}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full border border-gray-800"></div>
        </button>

        {/* Placeholder Export Buttons */}
        <button
          disabled
          className="flex items-center px-6 py-3 bg-gray-200 text-gray-500 border-3 border-gray-400 rounded-2xl cursor-not-allowed relative transform rotate-1"
          title="Coming Soon"
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          Export to Notion
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-300 rounded-full border border-gray-400"></div>
        </button>

        <button
          disabled
          className="flex items-center px-6 py-3 bg-gray-200 text-gray-500 border-3 border-gray-400 rounded-2xl cursor-not-allowed relative transform -rotate-1"
          title="Coming Soon"
        >
          <FileText className="h-5 w-5 mr-2" />
          Export to Obsidian
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-gray-300 rounded-full border border-gray-400"></div>
        </button>
      </div>

      {/* Info Note */}
      <div className="mt-6 p-4 bg-blue-100 border-3 border-blue-400 rounded-2xl transform -rotate-1 relative">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This is a demo conversion using simulated OCR.
          For production use, integrate with services like Google Vision API,
          Azure Computer Vision, or Amazon Textract for accurate text
          extraction.
        </p>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-300 rounded-full border-2 border-blue-400"></div>
      </div>
    </div>
  );
};

export default ConversionResult;

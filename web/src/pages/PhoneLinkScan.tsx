import { Camera, FileImage,  } from "lucide-react";
// import HeroText from "../components/HeroText";
import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";

const PhoneLinkScan = () => {
// get query params
const [searchParams] = useSearchParams();
const password = searchParams.get('password');
const [isCapturing, setIsCapturing] = useState(false);
const videoRef = useRef<HTMLVideoElement>(null);
const canvasRef = useRef<HTMLCanvasElement>(null);
const [selectedImage, setSelectedImage] = useState<string | null>(null);

console.log('isCapturing', isCapturing);
console.log('password', password);
console.log('selectedImage', selectedImage);

const resetCapture = () => {
    setSelectedImage(null);
    if (isCapturing && videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setIsCapturing(false);
    }
  };

const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg');
        setSelectedImage(imageData);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setIsCapturing(false);
      }
    }
  };

const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setIsCapturing(false);
    }
  };

  return (
    <div>
      {/* <HeroText /> */}
      {/* {password} */}
      {!isCapturing && (<div className="bg-white border-4 border-gray-800 rounded-3xl p-8 shadow-lg max-w-2xl mx-auto relative transform rotate-1">
      <div className="absolute -top-3 -left-2 w-5 h-5 bg-yellow-300 rounded-full border-2 border-gray-800"></div>
      <div className="absolute -top-4 right-8 w-3 h-3 bg-pink-300 rounded-full border-2 border-gray-800"></div>
      <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-blue-300 border-2 border-gray-800 transform rotate-45"></div>

       <div className="text-center relative">
          <div className="mb-6">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <FileImage className="h-24 w-24 text-gray-400 mx-auto" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full border-2 border-gray-800"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-300 rounded-full border-2 border-gray-800"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 relative">
              Send Your Notes from your phone
              <div className="absolute -bottom-1 left-8 w-16 h-1 bg-purple-300 transform rotate-1"></div>
            </h3>
            <p className="text-gray-600">
              Take a photo of your handwritten notes or upload an existing image
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={startCamera}
              className="flex items-center justify-center px-6 py-3 bg-blue-400 text-white border-3 border-gray-800 rounded-2xl hover:bg-blue-500 transition-all transform hover:-rotate-1 hover:scale-105 shadow-lg relative"
            >
              <Camera className="h-5 w-5 mr-2" />
              Open Camera
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full border border-gray-800"></div>
            </button>

          </div>

        

        </div>
      </div> )}
      {isCapturing && (
        <div className="text-center relative">
          <div className="mb-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-w-md mx-auto rounded-2xl border-4 border-gray-800 shadow-lg transform -rotate-1"
            />
            <div className="absolute top-2 right-2 w-4 h-4 bg-red-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={captureImage}
              className="px-6 py-3 bg-blue-400 text-white border-3 border-gray-800 rounded-2xl hover:bg-blue-500 transition-all transform hover:-rotate-1 hover:scale-105 shadow-lg relative"
            >
              Capture Photo
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full border border-gray-800"></div>
            </button>
            
            <button
              onClick={resetCapture}
              className="px-6 py-3 bg-red-400 text-white border-3 border-gray-800 rounded-2xl hover:bg-red-500 transition-all transform hover:rotate-1 hover:scale-105 shadow-lg relative"
            >
              Cancel
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-pink-300 rounded-full border border-gray-800"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneLinkScan;
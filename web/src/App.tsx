import { ClerkProvider, SignIn,  SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import NotesConverter from './pages/NotesConverter';
import doodleLogo from '../doodle_agentuity.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhoneLinkScan from './pages/PhoneLinkScan';
// import random from './random.json';


const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_a2V5LXRyb2xsLTQ1LmNsZXJrLmFjY291bnRzLmRldiQ';

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}> 
      <div className="min-h-screen bg-gray-50 text-gray-900">

        <div className="container mx-auto px-4">
          <header className="flex items-center justify-between mb-8">
            <div className="flex flex-row items-center pt-8 pb-4">
          <div className="flex flex-col items-center pt-8 pb-4">
          <img src={doodleLogo} alt="Curvy Dolphin Logo" className="h-24 mb-6" />
        </div>
            <h1 className="text-3xl font-bold text-gray-800 relative">
              Notes to Markdown
              <div className="absolute -top-2 -right-8 w-6 h-6 border-2 border-gray-400 rounded-full transform rotate-12"></div>
              <div className="absolute -bottom-1 left-4 w-16 h-1 bg-yellow-300 transform -rotate-1"></div>
            </h1>
            </div>
            <SignedIn >
              <UserButton  />
            </SignedIn>
          </header>
          <SignedOut>
            <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
              <div className="text-center mb-6">
                {/* Header doodles - visible on all screens but positioned safely */}
                <div className="absolute -top-6 left-4 w-4 h-4 bg-yellow-300 rounded-full border-2 border-gray-800 hidden sm:block"></div>
                <div className="absolute -top-3 right-8 w-3 h-3 bg-pink-300 rounded-full border-2 border-gray-800"></div>
                {/* Card corner doodles */}
                <div className="absolute -top-2 -left-2 w-5 h-5 bg-blue-300 rounded-full border-2 border-gray-800"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-300 border-2 border-gray-800 transform rotate-45"></div>
                
              
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome Back
                    <div className="absolute -bottom-1 left-8 w-12 h-1 bg-purple-300 transform rotate-1 hidden sm:block"></div>
                  </h2>
                  <p className="text-gray-600 text-base relative">
                    Sign in to convert your handwritten notes to Markdown
                    <div className="absolute -bottom-1 left-16 w-8 sm:w-12 h-1 bg-blue-300 transform -rotate-1"></div>
                    <div className="hidden sm:block absolute -bottom-1 left-8 w-12 h-1 bg-blue-300 transform rotate-1"></div>
                  </p>
                </div>
                <SignIn />
                {/* Side doodles - only on larger screens */}
                <div className="absolute top-1/2 -left-4 w-3 h-3 bg-orange-300 rounded-full border-2 border-gray-800 hidden lg:block"></div>
                <div className="absolute top-1/3 -right-3 w-2 h-2 bg-red-300 rounded-full border border-gray-800 hidden lg:block"></div>
              
              {/* Bottom doodles */}
              <div className="absolute -bottom-4 left-12 w-6 h-1 bg-yellow-300 transform rotate-12 hidden sm:block"></div>
              <div className="absolute -bottom-3 right-6 w-4 h-4 border-2 border-gray-800 transform rotate-45 hidden sm:block">
                <div className="w-2 h-2 bg-pink-300 rounded-full absolute top-0.5 left-0.5"></div>
              </div>
            </div>
          </SignedOut>

          <Router>
            <Routes>
              <Route path="/phone" element={<PhoneLinkScan />} />
              <Route path="/" element={
                <SignedIn>
                  <NotesConverter />
                </SignedIn>
              } />
            </Routes>
          </Router>
        </div>
        {/* {
          random.randomString && (
            <div className="fixed bottom-0 left-0 w-full h-12 bg-gray-100 flex items-center justify-center">
              <p className="text-gray-600 text-sm">
                {random.randomString}
              </p>
            </div>
          )
        } */}
      </div>
    </ClerkProvider>
  );
}

export default App;
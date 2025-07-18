import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import NotesConverter from './pages/NotesConverter';
import SignInPage from './pages/SignInPage';
import doodleLogo from '../doodle_agentuity.png';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
          <Router>
            <Routes>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/phone" element={<PhoneLinkScan />} />
              <Route path="/" element={
                <>
                  <SignedIn>
                    <NotesConverter />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-in" replace />
                  </SignedOut>
                </>
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
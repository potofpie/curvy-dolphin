import React from 'react';
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import NotesConverter from './components/NotesConverter';

// Add your Clerk publishable key here
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_a2V5LXRyb2xsLTQ1LmNsZXJrLmFjY291bnRzLmRldiQ';

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 relative">
              Notes to Markdown
              <div className="absolute -top-2 -right-8 w-6 h-6 border-2 border-gray-400 rounded-full transform rotate-12"></div>
              <div className="absolute -bottom-1 left-4 w-16 h-1 bg-yellow-300 transform -rotate-1"></div>
            </h1>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>

          <SignedOut>
            <div className="flex items-center justify-center min-h-[60vh] px-4">
              <div className="bg-white border-4 border-gray-800 rounded-3xl p-6 sm:p-8 shadow-lg max-w-md w-full relative sm:transform sm:-rotate-1 sm:hover:rotate-1 transition-transform duration-300">
                {/* Desktop-only doodle elements */}
                <div className="hidden lg:block absolute -top-3 -left-3 w-6 h-6 bg-yellow-300 rounded-full border-2 border-gray-800"></div>
                <div className="hidden lg:block absolute -top-2 -right-4 w-4 h-4 bg-pink-300 rounded-full border-2 border-gray-800"></div>
                <div className="hidden lg:block absolute -bottom-4 -right-2 w-8 h-8 border-2 border-gray-800 rounded-lg transform rotate-45"></div>
                <div className="hidden lg:block absolute -bottom-2 left-8 w-5 h-5 border-2 border-gray-800 rounded-full bg-green-300"></div>
                
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600 text-base relative">
                    Sign in to convert your handwritten notes to Markdown
                    <div className="hidden sm:block absolute -bottom-1 left-8 w-12 h-1 bg-blue-300 transform rotate-1"></div>
                  </p>
                </div>

                            <SignIn routing="hash" />

          </SignedOut>

          <SignedIn>
            <NotesConverter />
          </SignedIn>
        </div>
      </div>
    </ClerkProvider>
  );
}

export default App;
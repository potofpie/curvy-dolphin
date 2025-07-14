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
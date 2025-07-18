import { SignedIn, UserButton } from '@clerk/clerk-react';
import doodleLogo from '../../doodle_agentuity.png';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  if (location.pathname === '/phone') {
    return <></>;
  }

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex flex-row items-center pt-8 pb-4">
        <div className="flex flex-col items-center pt-8 pb-4">
          <img
            src={doodleLogo}
            alt="Curvy Dolphin Logo"
            className="h-24 mb-6"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 relative">
          Notes to Markdown
          <div className="absolute -top-2 -right-8 w-6 h-6 border-2 border-gray-400 rounded-full transform rotate-12"></div>
          <div className="absolute -bottom-1 left-4 w-16 h-1 bg-yellow-300 transform -rotate-1"></div>
        </h1>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;

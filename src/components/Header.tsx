
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { menuItems } from '@/data/menuItems';
import DesktopNavigation from '@/components/navigation/DesktopNavigation';
import MobileMenu from '@/components/navigation/MobileMenu';
import UserMenu from '@/components/navigation/UserMenu';
import AuthButtons from '@/components/navigation/AuthButtons';
import { useAuthState } from '@/hooks/use-auth-state';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    user,
    handleSignOut
  } = useAuthState();

  useEffect(() => {
    // Play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <video
              ref={videoRef}
              src="/logo.mp4"
              muted
              loop
              playsInline
              className="h-9 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-blue-700">zerovacancy</span>
          </Link>
        </div>

        <DesktopNavigation menuItems={menuItems} />

        <div className="flex items-center space-x-4">
          {user ? <UserMenu onSignOut={handleSignOut} /> : null}
          
          <AuthButtons user={user} onSignInClick={() => setShowSignInModal(true)} />

          {/* Mobile menu button */}
          <button className="inline-flex items-center justify-center p-2.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && <MobileMenu menuItems={menuItems} user={user} onSignInClick={() => setShowSignInModal(true)} onSignOut={handleSignOut} onClose={() => setIsMenuOpen(false)} />}
      
      {/* Sign In Dialog */}
      <GlowDialog open={showSignInModal} onOpenChange={setShowSignInModal} />
    </header>
  );
};

export default Header;

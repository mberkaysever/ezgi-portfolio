import React from 'react';
import { Button } from './ui/button';
import { Mail } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-[1800px] mx-auto">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-1 group">
          <span className="text-2xl font-black tracking-tight text-black group-hover:text-gray-700 transition-colors">
            Studio
          </span>
          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
          <a href="#design" className="text-sm text-gray-700 hover:text-black transition-colors font-medium">
            Design
          </a>
          <a href="#photos" className="text-sm text-gray-700 hover:text-black transition-colors font-medium">
            Photos
          </a>
          <a href="#portfolio" className="text-sm text-gray-700 hover:text-black transition-colors font-medium">
            Portfolio
          </a>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-400 font-medium">EN</span>
            <span className="text-gray-700 font-medium">FR</span>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800 rounded-md px-5 py-2 flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105">
            <Mail className="w-4 h-4" />
            hello@studio.com
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-xl font-bold cursor-pointer">
              Portfolio
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Home
            </a>
            <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-blue-600 transition-colors cursor-pointer">
              About
            </a>
            <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Projects
            </a>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-600 hover:bg-gray-50 cursor-pointer">
              Home
            </a>
            <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-600 hover:bg-gray-50 cursor-pointer">
              About
            </a>
            <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-600 hover:bg-gray-50 cursor-pointer">
              Projects
            </a>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-600 hover:bg-gray-50 cursor-pointer">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
} 
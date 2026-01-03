
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, COLORS } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled || !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/' ? 'bg-[#003366] shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="index.html" className="flex items-center gap-2 cursor-pointer">
             <div className="w-10 h-10 bg-[#FFCC00] rounded-md flex items-center justify-center font-bold text-[#003366] text-xl">A</div>
             <span className="font-header text-xl font-extrabold tracking-tight text-white">
               AMOBYS <span className="text-[#FFCC00]">ENG.</span>
             </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-semibold hover:text-[#FFCC00] transition-colors text-white ${
                  (window.location.pathname.includes(item.href)) ? 'text-[#FFCC00] border-b-2 border-[#FFCC00]' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#003366] shadow-xl absolute top-full left-0 w-full animate-fade-in-down">
            <div className="flex flex-col p-4 space-y-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white font-semibold hover:bg-blue-800 p-3 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#002244] text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[#FFCC00] font-header text-2xl font-bold mb-4">AMOBYS ENGINEERING</h3>
            <p className="text-slate-300 max-w-sm">
              Ghana's premier engineering consultancy firm delivering world-class infrastructure solutions with integrity and technical excellence.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 border-b border-[#FFCC00] inline-block pb-1">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="services.html" className="hover:text-[#FFCC00]">Our Services</a></li>
              <li><a href="projects.html" className="hover:text-[#FFCC00]">Portfolio</a></li>
              <li><a href="about.html" className="hover:text-[#FFCC00]">Company History</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 border-b border-[#FFCC00] inline-block pb-1">Contact</h4>
            <p className="text-slate-300 text-sm">Accra, Ghana<br/>info@amobys.com.gh</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

'use client'
import { logo } from "@/public";
import Image from "next/image";
import Button from "./button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Handle intersection observer for active sections
    const sections = ["hero", "about", "process", "testimonials"];
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-20% 0px -80% 0px"
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Navigation handlers
  const handleLoginClick = () => {
    router.push('/auth?mode=login');
    if (isMenuOpen) closeMenu();
  };

  const handleRegisterClick = () => {
    router.push('/auth?mode=register');
    if (isMenuOpen) closeMenu();
  };

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#process", label: "Process" },
    { href: "#testimonials", label: "Testimonials" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="auto-spacing flex justify-between items-center relative">
        <Image 
          src={logo} 
          alt="logo" 
          width={100} 
          height={100} 
          className="transition-all duration-300" 
          style={{ width: scrolled ? '100px' : '120px', height: 'auto' }}
        />
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden z-20 focus:outline-none transition-all duration-300 hover:scale-105"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className={`w-8 h-8 flex flex-col justify-center items-center relative ${isMenuOpen ? 'text-white' : 'text-primary'}`}>
            <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 mt-1.5 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            <span className={`block w-4 h-0.5 bg-current transition-all duration-300 mt-1.5 ${isMenuOpen ? 'opacity-0' : 'ml-auto'}`}></span>
          </div>
        </button>

        {/* Mobile menu overlay */}
        <div 
          className={`fixed inset-0 bg-gradient-to-b from-primary to-primary/90 transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={closeMenu}
        ></div>

        {/* Mobile menu */}
        <div className={`fixed top-0 ${isMenuOpen ? 'right-0' : '-right-full'} h-full w-4/5 max-w-xs bg-white shadow-2xl p-8 transition-all duration-500 ease-in-out transform md:hidden z-30`}>
          <div className="flex justify-end">
            <button 
              className="text-gray-500 hover:text-primary focus:outline-none"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <ul className="flex flex-col space-y-6 mt-10">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-gray-100 pb-2">
                <Link 
                  className={`text-lg font-light block transition-all duration-300 hover:text-primary ${activeSection === link.href.substring(1) ? 'text-primary font-medium' : 'text-gray-700'}`} 
                  href={link.href} 
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-col gap-4 mt-12">
            <Button text="Login" variant="secondary" onClick={handleLoginClick} />
            <Button text="Register" variant="primary" onClick={handleRegisterClick} />
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex justify-between items-center gap-6">
          <ul className="flex justify-between items-center lg:gap-10 gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  className={`relative text-md font-light transition-all duration-300 hover:text-primary after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 after:transition-all after:duration-300 ${activeSection === link.href.substring(1) ? 'text-primary after:w-full' : ''}`} 
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-3">
            <Button text="Login" variant="secondary" onClick={handleLoginClick} />
            <Button text="Register" variant="primary" onClick={handleRegisterClick} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

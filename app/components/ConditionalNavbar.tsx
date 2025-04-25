'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on patient-dashboard routes
  if (pathname?.startsWith('/patient-dashboard') || 
      pathname?.startsWith('/doctor-dashboard') || 
      pathname?.startsWith('/admin-dashboard')) {
    return null;
  }
  
  return <Navbar />;
}
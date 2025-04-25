'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DoctorVerificationRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and is a doctor
    const userJson = localStorage.getItem('vita_current_user');
    
    if (!userJson) {
      // If no user is logged in, redirect to auth page
      router.push('/auth');
      return;
    }

    try {
      const user = JSON.parse(userJson);
      if (user.userType === 'doctor') {
        // Redirect to the actual verification page in the doctor dashboard
        router.push('/doctor-dashboard/verification');
      } else {
        // If not a doctor, redirect to appropriate dashboard
        router.push(user.userType === 'patient' ? '/patient-dashboard' : '/auth');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth');
    }
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <h2 className="mt-4 text-xl text-gray-700">Redirecting to verification...</h2>
    </div>
  );
}
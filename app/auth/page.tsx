'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AuthTabs from '@/app/auth/components/AuthTabs';
import LoginForm from '@/app/auth/components/LoginForm';
import SignupForm from '@/app/auth/components/SignupForm';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'signup' : 'login';
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode as 'login' | 'signup');
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');

  useEffect(() => {
    // Update mode if URL parameter changes
    const mode = searchParams.get('mode');
    if (mode === 'register') {
      setAuthMode('signup');
    } else if (mode === 'login') {
      setAuthMode('login');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary items-center justify-center p-12">
        <div className="relative w-full max-w-md">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <Image 
            src="/phones.png" 
            alt="Vita Health App" 
            width={500} 
            height={600} 
            className="relative z-10 drop-shadow-2xl"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-20 w-full">
            <h2 className="text-3xl font-bold mb-4">Welcome to Vita</h2>
            <p className="text-white/80">Your trusted healthcare companion</p>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:w-full sm:max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Image src="/logo.svg" alt="Vita Logo" width={120} height={40} />
          </div>

          {/* Authentication card */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <AuthTabs 
              activeTab={authMode} 
              onChangeTab={(mode: 'login' | 'signup') => setAuthMode(mode)} 
            />

            <div className="mt-8">
              {authMode === 'login' ? (
                <LoginForm />
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                      <button 
                        onClick={() => setUserType('patient')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                          userType === 'patient' 
                            ? 'bg-white text-secondary shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Patient
                      </button>
                      <button 
                        onClick={() => setUserType('doctor')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                          userType === 'doctor' 
                            ? 'bg-white text-secondary shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Doctor
                      </button>
                      <button 
                        onClick={() => setUserType('admin')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                          userType === 'admin' 
                            ? 'bg-white text-secondary shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                  <SignupForm userType={userType} />
                </>
              )}
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              {authMode === 'login' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="font-medium text-primary hover:text-secondary transition-colors"
              >
                {authMode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
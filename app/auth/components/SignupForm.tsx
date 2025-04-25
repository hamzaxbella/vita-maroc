'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '@/app/components/FormInput';
import Button from '@/app/components/button';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiUserPlus, FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';
// Fixed import paths with exact case-sensitive filenames
import PatientSignupFields from '@/app/auth/components/PatientSignupFields';
import DoctorSignupFields from '@/app/auth/components/DoctorSignupFields';

interface SignupFormProps {
  userType: 'patient' | 'doctor' | 'admin';
}

export default function SignupForm({ userType }: SignupFormProps) {
  const router = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Patient-specific fields
    address: '',
    emergencyContact: '',
    
    // Doctor-specific fields
    specialty: '',
    license: '',
    experience: '',
    location: '',
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setError('');
      setFormStep(2);
    }
  };

  const handlePrevStep = () => {
    setFormStep(1);
    setError('');
  };

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    
    setIsLoading(true);
    setError('');
    
    // If admin, no additional validation needed
    // For patient/doctor, we should validate extra fields
    if (userType === 'patient' && !formData.phone) {
      setError('Please provide a phone number');
      setIsLoading(false);
      return;
    }
    
    if (userType === 'doctor' && (!formData.specialty || !formData.license)) {
      setError('Please fill all required fields');
      setIsLoading(false);
      return;
    }
    
    // Simulate registration process
    setTimeout(() => {
      try {
        // Check if email is already in use
        const usersJson = localStorage.getItem('vita_users');
        const users = usersJson ? JSON.parse(usersJson) : [];
        
        if (users.some((user: any) => user.email === formData.email)) {
          throw new Error('Email already in use');
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          password: formData.password, // In a real app, this would be hashed
          userType,
          phone: formData.phone,
          createdAt: new Date().toISOString(),
          // Add user type specific data
          ...(userType === 'patient' && {
            address: formData.address,
            emergencyContact: formData.emergencyContact
          }),
          ...(userType === 'doctor' && {
            specialty: formData.specialty,
            license: formData.license,
            experience: formData.experience,
            location: formData.location,
            bio: formData.bio,
            isVerified: false // Doctors need approval
          })
        };
        
        // Save to local storage
        users.push(newUser);
        localStorage.setItem('vita_users', JSON.stringify(users));
        
        // Auto login
        localStorage.setItem('vita_current_user', JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          userType
        }));
        
        // Redirect based on user type
        if (userType === 'patient') {
          router.push('/patient-dashboard');
        } else if (userType === 'doctor') {
          router.push('/doctor-verification');
        } else if (userType === 'admin') {
          router.push('/admin-dashboard');
        } else {
          router.push('/');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const renderStepIndicator = () => {
    if (userType === 'admin') {
      return null; // Admin signup is a single step
    }
    
    return (
      <div className="flex items-center justify-center mb-6">
        <div className={`h-2 w-2 rounded-full ${formStep === 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
        <div className={`h-[1px] w-5 ${formStep >= 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
        <div className={`h-2 w-2 rounded-full ${formStep === 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderStepIndicator()}
      
      {error && (
        <div className="p-3 rounded-md bg-red-50 text-danger text-sm">
          {error}
        </div>
      )}
      
      {formStep === 1 ? (
        /* Step 1: Basic Info */
        <>
          <FormInput
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            icon={<FiUser />}
          />
          
          <FormInput
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            icon={<FiMail />}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              icon={<FiLock />}
            />
            
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              icon={<FiLock />}
            />
          </div>
          
          <div className="pt-2">
            <Button 
              text="Continue" 
              variant="primary" 
              onClick={handleNextStep}
            />
          </div>
        </>
      ) : (
        /* Step 2: Role-specific fields */
        <>
          {userType === 'patient' && (
            <PatientSignupFields 
              formData={formData} 
              handleChange={handleChange} 
            />
          )}
          
          {userType === 'doctor' && (
            <DoctorSignupFields 
              formData={formData} 
              handleChange={handleChange} 
            />
          )}
          
          {userType === 'admin' && (
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
              <p className="flex items-center">
                <FiUserPlus className="mr-2" />
                Admin registration requires an invitation code
              </p>
            </div>
          )}
          
          <div className="flex space-x-4 pt-2">
            <Button 
              text="Back" 
              variant="secondary" 
              onClick={handlePrevStep}
            />
            <Button 
              text={isLoading ? "Creating account..." : "Create account"} 
              variant="primary" 
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </form>
  );
}
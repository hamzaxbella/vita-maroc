'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '@/app/components/FormInput';
import Button from '@/app/components/button';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate auth - in a real app, this would be a fetch call to your API
    setTimeout(() => {
      // For demo purposes, check local storage for matching credentials
      const usersJson = localStorage.getItem('vita_users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      
      const user = users.find((u: any) => 
        u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Store current user
        localStorage.setItem('vita_current_user', JSON.stringify({
          email: user.email,
          name: user.name,
          userType: user.userType,
          id: user.id
        }));
        
        // Redirect based on user type
        if (user.userType === 'patient') {
          router.push('/patient-dashboard');
        } else if (user.userType === 'doctor') {
          router.push('/doctor-dashboard');
        } else if (user.userType === 'admin') {
          router.push('/admin-dashboard');
        } else {
          // Fallback to homepage
          router.push('/');
        }
      } else {
        setError('Invalid email or password');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-md bg-red-50 text-danger text-sm">
          {error}
        </div>
      )}
      
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

      <div className="relative">
        <FormInput
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          icon={<FiLock />}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-primary hover:text-secondary">
            Forgot password?
          </a>
        </div>
      </div>

      <div>
        <Button 
          text={isLoading ? "Logging in..." : "Log in"} 
          variant="primary" 
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
}
'use client';

import { useState } from 'react';
import FormInput from '@/app/components/FormInput';
import { FiPhone, FiMapPin, FiFileText, FiBriefcase, FiClock, FiInfo } from 'react-icons/fi';

interface DoctorSignupFieldsProps {
  formData: {
    phone: string;
    specialty: string;
    license: string;
    experience: string;
    location: string;
    bio: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function DoctorSignupFields({ formData, handleChange }: DoctorSignupFieldsProps) {
  const specialties = [
    'General Practice',
    'Pediatrics',
    'Internal Medicine',
    'Cardiology',
    'Dermatology',
    'Psychiatry',
    'Neurology',
    'Orthopedics',
    'Ophthalmology',
    'Obstetrics & Gynecology'
  ];

  return (
    <>
      <FormInput
        id="phone"
        label="Phone Number"
        type="tel"
        placeholder="+1 (234) 567-8900"
        value={formData.phone}
        onChange={handleChange}
        required
        icon={<FiPhone />}
      />

      <div className="mb-4">
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
          Medical Specialty <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FiBriefcase />
          </div>
          <select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange as any}
            required
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 transition duration-200"
          >
            <option value="">Select your specialty</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>
      
      <FormInput
        id="license"
        label="Medical License Number"
        type="text"
        placeholder="Enter your license number"
        value={formData.license}
        onChange={handleChange}
        required
        icon={<FiFileText />}
      />
      
      <FormInput
        id="experience"
        label="Years of Experience"
        type="number"
        placeholder="e.g. 5"
        value={formData.experience}
        onChange={handleChange}
        icon={<FiClock />}
      />
      
      <FormInput
        id="location"
        label="Practice Location"
        type="text"
        placeholder="City, State"
        value={formData.location}
        onChange={handleChange}
        icon={<FiMapPin />}
      />
      
      <div className="mb-4">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
          Professional Bio
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 text-gray-400">
            <FiInfo />
          </div>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell patients about your experience and approach to healthcare"
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 transition duration-200"
          ></textarea>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 p-4 rounded-md">
        <p className="text-xs text-blue-700">
          Your profile will be reviewed by our team before being published. We may contact you to verify your credentials.
        </p>
      </div>
    </>
  );
}
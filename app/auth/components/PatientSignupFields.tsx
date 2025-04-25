'use client';

import FormInput from '@/app/components/FormInput';
import { FiPhone, FiMapPin, FiUsers } from 'react-icons/fi';

interface PatientSignupFieldsProps {
  formData: {
    phone: string;
    address: string;
    emergencyContact: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function PatientSignupFields({ formData, handleChange }: PatientSignupFieldsProps) {
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
      
      <FormInput
        id="address"
        label="Home Address"
        type="text"
        placeholder="123 Main St, City, State"
        value={formData.address}
        onChange={handleChange}
        icon={<FiMapPin />}
      />
      
      <FormInput
        id="emergencyContact"
        label="Emergency Contact"
        type="text"
        placeholder="Contact Name & Phone"
        value={formData.emergencyContact}
        onChange={handleChange}
        icon={<FiUsers />}
      />

      <div className="mt-4 bg-blue-50 p-4 rounded-md">
        <p className="text-xs text-blue-700">
          Your information is secure and will only be shared with the healthcare professionals you choose to consult with.
        </p>
      </div>
    </>
  );
}
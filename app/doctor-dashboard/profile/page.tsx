'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiUpload, FiCheck, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiFileText } from 'react-icons/fi';
import Image from 'next/image';

// Import default doctor image
import doctorImg from '@/public/doctor.png';

export default function DoctorProfileSettings() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    location: '',
    address: '',
    experience: '',
    education: '',
    bio: '',
    languages: '',
    consultationFee: '',
  });
  const [savedMessage, setSavedMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load user data from localStorage on component mount
  useEffect(() => {
    try {
      const userJson = localStorage.getItem('vita_current_user');
      if (userJson) {
        const user = JSON.parse(userJson);
        setCurrentUser(user);
        
        // Populate form with user data
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          specialty: user.specialty || 'Cardiologist',
          location: user.location || 'Vita Health Center, Casablanca',
          address: user.address || '',
          experience: user.experience || '10 years',
          education: user.education || 'University of Casablanca',
          bio: user.bio || 'Dr. Sarah Johnson is a cardiologist with over 10 years of experience in treating cardiovascular diseases.',
          languages: user.languages || 'English, Arabic, French',
          consultationFee: user.consultationFee || '500',
        });
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user data in localStorage
    try {
      const userJson = localStorage.getItem('vita_current_user');
      if (userJson) {
        const user = JSON.parse(userJson);
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('vita_current_user', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        
        // Show saved message
        setSavedMessage(true);
        setTimeout(() => {
          setSavedMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
    
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-8 mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
        
        {/* Save notification */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-xl flex items-center text-success">
            <FiCheck className="mr-2" size={18} />
            <span>Your profile has been updated successfully!</span>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile picture section */}
          <div className="w-full md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4 bg-gray-100">
                <Image
                  src={doctorImg}
                  alt="Doctor profile"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                <FiUpload size={16} />
                <span>Change Photo</span>
              </button>
              
              <div className="mt-8 w-full">
                <div className="bg-primary/5 rounded-xl p-4 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">Profile Completion</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500">85% complete - Add your education details to complete your profile</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-medium text-gray-800 mb-2">License Verification</h3>
                  <div className="flex items-center text-success gap-1 mb-2">
                    <FiCheck size={16} />
                    <span className="text-sm">Verified</span>
                  </div>
                  <p className="text-xs text-gray-500">Your medical license has been verified by our team.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile form */}
          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiUser className="text-primary" />
                  <span>Personal Information</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                    <select
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      disabled={!isEditing}
                    >
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Family Medicine">Family Medicine</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Psychiatrist">Psychiatrist</option>
                      <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                      <option value="Gynecologist">Gynecologist</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Professional Details */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiFileText className="text-primary" />
                  <span>Professional Details</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                    <input
                      type="text"
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      disabled={!isEditing}
                      placeholder="Separate with commas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (MAD)</label>
                    <input
                      type="number"
                      name="consultationFee"
                      value={formData.consultationFee}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {/* Location Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiMapPin className="text-primary" />
                  <span>Location Information</span>
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Practice Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end gap-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-md transition-all flex items-center gap-2"
                    >
                      <FiSave size={18} />
                      <span>Save Changes</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-md transition-all"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

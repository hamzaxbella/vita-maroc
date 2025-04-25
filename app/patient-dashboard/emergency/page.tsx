'use client';

import { useState, useEffect } from 'react';
import { FiPhoneCall, FiMapPin, FiInfo, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function EmergencyPage() {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [emergencyNote, setEmergencyNote] = useState('');
  const [emergencySubmitted, setEmergencySubmitted] = useState(false);

  // Request location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus('loading');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationStatus('success');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationStatus('error');
        }
      );
    } else {
      setLocationStatus('error');
    }
  }, []);

  const handleEmergencyCall = () => {
    // In a real app, this would trigger an actual emergency protocol
    // For demo purposes, we'll simulate the emergency submission
    if (emergencyNote.trim() === '') {
      alert('Please describe your emergency briefly');
      return;
    }
    
    setTimeout(() => {
      setEmergencySubmitted(true);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {emergencySubmitted ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-10 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiPhoneCall size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Emergency Request Sent</h1>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Our emergency team has been notified and will contact you immediately. Please keep your phone nearby.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Your location has been shared</h3>
            {location ? (
              <p className="text-gray-500">
                Latitude: {location.lat.toFixed(6)}, Longitude: {location.lng.toFixed(6)}
              </p>
            ) : (
              <p className="text-yellow-600">Location not available</p>
            )}
          </div>
          <button 
            onClick={() => setEmergencySubmitted(false)}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition-colors"
          >
            Back to Emergency Page
          </button>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <div className="bg-danger/5 border-l-4 border-danger p-4 mb-6 rounded-r-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Emergency Services</h1>
            <p className="text-gray-600">
              Use this page in case of medical emergency that requires immediate attention.
              Our team will be notified and will contact you as soon as possible.
            </p>
          </div>

          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-danger text-white p-6">
              <h2 className="text-xl font-bold flex items-center">
                <FiPhoneCall className="mr-2" /> Emergency Call
              </h2>
              <p className="text-white/80 mt-1">
                Press the button below to request urgent medical assistance
              </p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="emergency-note" className="block text-gray-700 mb-2">
                  Briefly describe your emergency:
                </label>
                <textarea 
                  id="emergency-note"
                  className="w-full border border-gray-300 rounded-md p-3 h-32 focus:ring-danger focus:border-danger"
                  placeholder="Describe your symptoms or situation..."
                  value={emergencyNote}
                  onChange={(e) => setEmergencyNote(e.target.value)}
                ></textarea>
              </div>

              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex items-start">
                  <FiMapPin className="text-gray-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">Your Location Status</h3>
                    {locationStatus === 'loading' && (
                      <p className="text-gray-500">Determining your location...</p>
                    )}
                    {locationStatus === 'success' && (
                      <p className="text-green-600">Location detected successfully</p>
                    )}
                    {locationStatus === 'error' && (
                      <p className="text-red-600">Could not detect your location. Please allow location access or describe your location in the notes.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-sm text-gray-500 flex items-center">
                  <FiInfo className="mr-2" /> 
                  Your phone number on file will be used to contact you
                </div>
                <button
                  onClick={handleEmergencyCall}
                  className="px-6 py-3 bg-danger text-white rounded-md font-medium hover:bg-danger/90 transition-colors flex items-center justify-center"
                >
                  <FiSend className="mr-2" /> Send Emergency Request
                </button>
              </div>
            </div>
          </motion.div>

          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Alternative Emergency Contacts</h2>
            <div className="space-y-4">
              <div className="flex items-start border-b pb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <FiPhoneCall className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Emergency Hotline</h3>
                  <p className="text-gray-500 text-sm">Dial directly for immediate assistance</p>
                  <a href="tel:15" className="text-lg font-bold text-danger block mt-1">15</a>
                </div>
              </div>
              
              <div className="flex items-start border-b pb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FiPhoneCall className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Police</h3>
                  <p className="text-gray-500 text-sm">For emergency police assistance</p>
                  <a href="tel:19" className="text-lg font-bold text-primary block mt-1">19</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiPhoneCall className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Vita Support</h3>
                  <p className="text-gray-500 text-sm">Customer service for non-emergency issues</p>
                  <a href="tel:+212522123456" className="text-lg font-bold text-primary block mt-1">+212 522 123 456</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
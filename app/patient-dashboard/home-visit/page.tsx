'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiMapPin, 
  FiCalendar, 
  FiClock, 
  FiAlertCircle, 
  FiCheckCircle,
  FiHome,
  FiMessageSquare,
  FiUserPlus
} from 'react-icons/fi';

// Import doctor image
import doctorImg from '@/public/doctor.png';

export default function HomeVisit() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    visitType: 'scheduled', // 'asap' or 'scheduled'
    date: '',
    time: '',
    reason: '',
    symptoms: '',
    additionalNotes: ''
  });
  
  // Sample doctors for ASAP visits
  const [availableDoctors, setAvailableDoctors] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Practitioner',
      estimatedArrival: '15-20 min',
      rating: 4.8,
      image: '/doctor.png'
    },
    {
      id: '2',
      name: 'Dr. Ahmed Hassan',
      specialty: 'Emergency Medicine',
      estimatedArrival: '25-30 min',
      rating: 4.9,
      image: '/doctor.png'
    },
    {
      id: '3',
      name: 'Dr. Maria Garcia',
      specialty: 'Family Medicine',
      estimatedArrival: '30-35 min',
      rating: 4.7,
      image: '/doctor.png'
    }
  ]);
  
  // Time slots for scheduled visits
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];
  
  // Selected doctor for ASAP visits
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle visit type change
  const handleVisitTypeChange = (type: 'asap' | 'scheduled') => {
    setFormData(prev => ({ ...prev, visitType: type }));
  };
  
  // Handle doctor selection for ASAP visits
  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
  };

  // Go to next step
  const goToNextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!formData.address || !formData.city) {
        alert('Please fill in your address details');
        return;
      }
    }
    
    if (currentStep === 2) {
      // Validate second step
      if (formData.visitType === 'scheduled') {
        if (!formData.date || !formData.time) {
          alert('Please select a date and time for your visit');
          return;
        }
      } else if (formData.visitType === 'asap' && !selectedDoctor) {
        alert('Please select a doctor for your visit');
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Go to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Submit the home visit request
  const submitRequest = () => {
    // Validate third step
    if (!formData.reason) {
      alert('Please specify the reason for your visit');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create new home visit request in localStorage for demo purposes
      const visitData = {
        id: Date.now().toString(),
        ...formData,
        doctorId: selectedDoctor,
        status: 'pending',
        dateRequested: new Date().toISOString()
      };
      
      // Save to localStorage
      const visitsJson = localStorage.getItem('vita_home_visits');
      const visits = visitsJson ? JSON.parse(visitsJson) : [];
      visits.push(visitData);
      localStorage.setItem('vita_home_visits', JSON.stringify(visits));
      
      setIsLoading(false);
      setRequestSuccess(true);
    }, 1500);
  };
  
  // Reset form and start over
  const resetForm = () => {
    setFormData({
      address: '',
      city: '',
      visitType: 'scheduled',
      date: '',
      time: '',
      reason: '',
      symptoms: '',
      additionalNotes: ''
    });
    setSelectedDoctor(null);
    setCurrentStep(1);
    setRequestSuccess(false);
  };
  
  // Get available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      dates.push(dateString);
    }
    
    return dates;
  };
  
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Request Home Visit</h1>
      <p className="text-gray-600">Have a doctor visit you at your home or current location.</p>

      {requestSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-success/20 text-success rounded-full mx-auto flex items-center justify-center mb-4">
              <FiCheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              {formData.visitType === 'asap' ? (
                <>
                  Your urgent home visit request has been received. A doctor will be dispatched to your location as soon as possible.
                </>
              ) : (
                <>
                  Your home visit has been scheduled for {formatDate(formData.date)} at {formData.time}.
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/patient-dashboard" className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">
                Return to Dashboard
              </Link>
              <button onClick={resetForm} className="px-6 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors">
                Request Another Visit
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>
                  <FiHome size={18} />
                </div>
                <div className={`h-1 w-12 mx-2 ${currentStep > 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-primary text-white' : currentStep > 2 ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-500'}`}>
                  <FiCalendar size={18} />
                </div>
                <div className={`h-1 w-12 mx-2 ${currentStep > 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <FiMessageSquare size={18} />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={currentStep === 1 ? 'text-primary font-medium' : 'text-gray-500'}>Address</span>
              <span className={currentStep === 2 ? 'text-primary font-medium' : 'text-gray-500'}>Schedule</span>
              <span className={currentStep === 3 ? 'text-primary font-medium' : 'text-gray-500'}>Details</span>
            </div>
          </div>
          
          <div className="p-6">
            {/* Step 1: Location */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Location</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your street address"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      required
                    >
                      <option value="">Select a city</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Fez">Fez</option>
                      <option value="Tangier">Tangier</option>
                    </select>
                  </div>
                  
                  <div className="p-4 bg-primary/10 rounded-md flex items-start">
                    <FiAlertCircle className="text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm text-gray-700 ml-3">
                      Please ensure your address is accurate. The doctor will use this information to reach your location.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Schedule */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule Your Visit</h2>
                
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    className={`flex-1 py-3 px-4 text-center ${formData.visitType === 'asap' ? 'bg-primary text-white' : 'bg-gray-50'}`}
                    onClick={() => handleVisitTypeChange('asap')}
                  >
                    <div className="flex justify-center items-center mb-1">
                      <FiAlertCircle className="mr-2" />
                      Urgent (ASAP)
                    </div>
                    <p className="text-xs opacity-75">Doctor will arrive as soon as possible</p>
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 text-center ${formData.visitType === 'scheduled' ? 'bg-primary text-white' : 'bg-gray-50'}`}
                    onClick={() => handleVisitTypeChange('scheduled')}
                  >
                    <div className="flex justify-center items-center mb-1">
                      <FiCalendar className="mr-2" />
                      Scheduled
                    </div>
                    <p className="text-xs opacity-75">Choose a specific day and time</p>
                  </button>
                </div>
                
                {formData.visitType === 'asap' ? (
                  <div className="space-y-4">
                    <p className="text-gray-700">Available doctors nearby who can visit you soon:</p>
                    
                    {availableDoctors.map((doctor) => (
                      <div 
                        key={doctor.id} 
                        className={`p-4 border rounded-md ${selectedDoctor === doctor.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary'}`}
                        onClick={() => handleDoctorSelect(doctor.id)}
                      >
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                            <Image
                              src={doctorImg}
                              alt={doctor.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{doctor.name}</h3>
                            <p className="text-sm text-gray-500">{doctor.specialty}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-primary">
                              {doctor.estimatedArrival}
                            </div>
                            <div className="text-xs text-gray-500">
                              Estimated arrival
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                        {getAvailableDates().map((date) => (
                          <button
                            key={date}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, date }))}
                            className={`p-2 text-center text-sm rounded-md border ${
                              formData.date === date
                                ? 'bg-primary text-white border-primary'
                                : 'border-gray-200 hover:border-primary'
                            }`}
                          >
                            {formatDate(date)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {formData.date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Time
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, time }))}
                              className={`p-2 text-center text-sm rounded-md border ${
                                formData.time === time
                                  ? 'bg-primary text-white border-primary'
                                  : 'border-gray-200 hover:border-primary'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Step 3: Visit Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Visit Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Visit *
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      required
                    >
                      <option value="">Select reason</option>
                      <option value="General Checkup">General Checkup</option>
                      <option value="Fever / Cold / Flu">Fever / Cold / Flu</option>
                      <option value="Stomach / Digestive Issues">Stomach / Digestive Issues</option>
                      <option value="Injury / Pain">Injury / Pain</option>
                      <option value="Chronic Disease Management">Chronic Disease Management</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                      Symptoms (if any)
                    </label>
                    <textarea
                      id="symptoms"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Describe your symptoms..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes for Doctor
                    </label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Any additional information the doctor should know..."
                    ></textarea>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h3 className="font-medium text-gray-800 mb-2">Summary</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Address:</span>
                        <span className="ml-1">{formData.address}, {formData.city}</span>
                      </div>
                      {formData.visitType === 'asap' ? (
                        <div>
                          <span className="text-gray-500">Visit Type:</span>
                          <span className="ml-1">Urgent (ASAP)</span>
                        </div>
                      ) : (
                        <>
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <span className="ml-1">{formData.date && formatDate(formData.date)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Time:</span>
                            <span className="ml-1">{formData.time}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  onClick={goToPreviousStep}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <button
                  onClick={goToNextStep}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submitRequest}
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-md ${isLoading ? 'bg-gray-300' : 'bg-primary text-white hover:bg-primary/90'}`}
                >
                  {isLoading ? 'Submitting...' : 'Submit Request'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
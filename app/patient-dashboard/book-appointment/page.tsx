'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FiSearch, 
  FiMapPin, 
  FiCalendar, 
  FiClock, 
  FiFilter,
  FiStar,
  FiHeart,
  FiChevronRight,
  FiX,
  FiUser,
  FiCheck,
  FiChevronLeft
} from 'react-icons/fi';

// Import doctor image
import doctorImg from '@/public/doctor.png';

export default function BookAppointment() {
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [bookingStep, setBookingStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Sample data for doctors
  const [doctors, setDoctors] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      location: 'Vita Health Center, Casablanca',
      rating: 4.8,
      reviewCount: 124,
      available: true,
      image: '/doctor.png',
      bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience specializing in heart disease prevention and treatment.',
      education: 'Harvard Medical School',
      languages: ['English', 'French', 'Arabic'],
      availability: {
        '2025-05-01': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2025-05-02': ['09:00', '11:00', '14:00'],
        '2025-05-03': ['10:00', '14:00', '16:00']
      }
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      location: 'Online Consultation',
      rating: 4.9,
      reviewCount: 89,
      available: true,
      image: '/doctor.png',
      bio: 'Dr. Michael Chen is a dermatologist specializing in skin cancer screening, acne treatment, and cosmetic dermatology.',
      education: 'Stanford University School of Medicine',
      languages: ['English', 'Chinese', 'French'],
      availability: {
        '2025-05-01': ['13:00', '14:00', '16:00'],
        '2025-05-02': ['09:00', '10:00', '11:00', '15:00'],
        '2025-05-03': ['10:00', '11:00', '15:00', '16:00']
      }
    },
    {
      id: '3',
      name: 'Dr. Fatima Al-Zahra',
      specialty: 'General Practitioner',
      location: 'Vita Health Center, Rabat',
      rating: 4.7,
      reviewCount: 156,
      available: true,
      image: '/doctor.png',
      bio: 'Dr. Fatima Al-Zahra is a compassionate general practitioner with expertise in preventive medicine and holistic approaches to health.',
      education: 'University of Rabat Medical School',
      languages: ['Arabic', 'French', 'English'],
      availability: {
        '2025-05-01': ['09:00', '10:00', '11:00', '15:00', '16:00'],
        '2025-05-02': ['09:00', '10:00', '14:00', '15:00'],
        '2025-05-03': ['11:00', '14:00', '15:00']
      }
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedic Surgeon',
      location: 'Vita Health Center, Casablanca',
      rating: 4.9,
      reviewCount: 203,
      available: true,
      image: '/doctor.png',
      bio: 'Dr. James Wilson is an orthopedic surgeon specializing in sports medicine, joint replacements, and spinal surgeries.',
      education: 'Johns Hopkins University',
      languages: ['English', 'French'],
      availability: {
        '2025-05-01': ['10:00', '14:00'],
        '2025-05-02': ['09:00', '15:00', '16:00'],
        '2025-05-03': ['09:00', '10:00', '11:00']
      }
    },
    {
      id: '5',
      name: 'Dr. Amina Benali',
      specialty: 'Pediatrician',
      location: 'Vita Health Center, Marrakech',
      rating: 4.9,
      reviewCount: 178,
      available: true,
      image: '/doctor.png',
      bio: 'Dr. Amina Benali is a pediatrician with a special interest in child development, preventive care, and childhood nutrition.',
      education: 'University of Casablanca',
      languages: ['Arabic', 'French', 'English'],
      availability: {
        '2025-05-01': ['09:00', '10:00', '14:00', '15:00'],
        '2025-05-02': ['10:00', '11:00', '16:00'],
        '2025-05-03': ['09:00', '14:00', '15:00']
      }
    }
  ]);

  // Sample data for specialties and locations
  const specialties = [
    'All Specialties',
    'Cardiologist',
    'Dermatologist',
    'General Practitioner',
    'Orthopedic Surgeon',
    'Pediatrician',
    'Neurologist',
    'Psychiatrist',
    'Ophthalmologist',
    'Dentist'
  ];

  const locations = [
    'All Locations',
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Fes',
    'Tangier',
    'Online Consultation'
  ];

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || selectedSpecialty === 'All Specialties' || 
                            doctor.specialty === selectedSpecialty;
    const matchesLocation = !selectedLocation || selectedLocation === 'All Locations' || 
                           doctor.location.includes(selectedLocation);
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  // Handle booking submission
  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create new appointment in localStorage for demo purposes
      const appointmentData = {
        id: Date.now().toString(),
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: selectedDate,
        time: selectedTimeSlot,
        status: 'confirmed',
        location: selectedDoctor.location
      };
      
      // Save to localStorage
      const appointmentsJson = localStorage.getItem('vita_appointments');
      const appointments = appointmentsJson ? JSON.parse(appointmentsJson) : [];
      appointments.push(appointmentData);
      localStorage.setItem('vita_appointments', JSON.stringify(appointments));
      
      setIsLoading(false);
      setBookingSuccess(true);
    }, 1500);
  };

  // Reset booking process
  const resetBooking = () => {
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setBookingStep(1);
    setBookingSuccess(false);
  };

  // Function to check if a date is in the past
  const isPastDate = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString);
    return date < today;
  };

  // Available dates for appointment (next 7 days)
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Book an Appointment</h1>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center px-4 py-2 bg-primary/10 text-primary rounded-md md:hidden"
        >
          <FiFilter className="mr-2" />
          Filters
        </button>
      </div>

      {bookingSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-md p-8 text-center"
        >
          <div className="w-16 h-16 bg-success/20 text-success rounded-full mx-auto flex items-center justify-center mb-4">
            <FiCheck size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Booking Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment with {selectedDoctor.name} on {formatDate(selectedDate)} at {selectedTimeSlot} has been confirmed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.location.href = '/patient-dashboard/appointments'}
              className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              View My Appointments
            </button>
            <button
              onClick={resetBooking}
              className="px-6 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search and Filters - Left Sidebar */}
          <div className={`md:col-span-1 ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Close button for mobile */}
              <div className="flex justify-between items-center mb-4 md:hidden">
                <h3 className="font-medium">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)}>
                  <FiX size={20} />
                </button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Doctor
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Doctor name or specialty"
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              
              {/* Specialty filter */}
              <div className="mb-6">
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  id="specialty"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="">All Specialties</option>
                  {specialties.filter(s => s !== 'All Specialties').map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Location filter */}
              <div className="mb-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="">All Locations</option>
                  {locations.filter(l => l !== 'All Locations').map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Date filter */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-2">
            {bookingStep === 1 && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Available Doctors ({filteredDoctors.length})</h2>
                  
                  {filteredDoctors.length > 0 ? (
                    <div className="divide-y">
                      {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex flex-col sm:flex-row">
                            <div className="flex-shrink-0 w-20 h-20 mb-4 sm:mb-0">
                              <Image
                                src={doctorImg}
                                alt={doctor.name}
                                width={80}
                                height={80}
                                className="rounded-full object-cover"
                              />
                            </div>
                            <div className="sm:ml-6 flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                <div>
                                  <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <FiStar className="text-yellow-400" />
                                  <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                                  <span className="ml-1 text-xs text-gray-500">({doctor.reviewCount} reviews)</span>
                                </div>
                              </div>
                              
                              <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500">
                                <div className="flex items-center mr-4">
                                  <FiMapPin className="mr-1" />
                                  {doctor.location}
                                </div>
                              </div>
                              
                              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <button 
                                  onClick={() => setSelectedDoctor(doctor)}
                                  className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
                                >
                                  Book Appointment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No doctors match your criteria. Try adjusting your filters.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {bookingStep === 2 && selectedDoctor && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <button
                  onClick={() => setBookingStep(1)}
                  className="flex items-center text-primary hover:underline mb-2"
                >
                  <FiChevronLeft className="mr-1" /> Back to doctor list
                </button>
                
                {/* Doctor profile */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="flex-shrink-0 w-24 h-24 mb-4 sm:mb-0">
                      <Image
                        src={doctorImg}
                        alt={selectedDoctor.name}
                        width={96}
                        height={96}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="sm:ml-6 flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{selectedDoctor.name}</h2>
                          <p className="text-gray-500">{selectedDoctor.specialty}</p>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start mt-2 sm:mt-0">
                          <FiStar className="text-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{selectedDoctor.rating}</span>
                          <span className="ml-1 text-xs text-gray-500">({selectedDoctor.reviewCount} reviews)</span>
                        </div>
                      </div>
                      
                      <p className="mt-4 text-gray-600">{selectedDoctor.bio}</p>
                      
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Education</p>
                          <p className="text-sm">{selectedDoctor.education}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Languages</p>
                          <p className="text-sm">{selectedDoctor.languages.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Appointment selection */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Select Appointment Date & Time</h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Dates
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                      {getAvailableDates().map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`p-2 text-center text-sm rounded-md border ${
                            selectedDate === date
                              ? 'bg-primary text-white border-primary'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          {formatDate(date)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {(selectedDoctor.availability[selectedDate] || []).map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTimeSlot(time)}
                            className={`p-2 text-center text-sm rounded-md border ${
                              selectedTimeSlot === time
                                ? 'bg-primary text-white border-primary'
                                : 'border-gray-200 hover:border-primary'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                        {!selectedDoctor.availability[selectedDate] && (
                          <p className="col-span-full text-sm text-gray-500">
                            No available time slots for this date.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <button
                      onClick={() => setBookingStep(3)}
                      disabled={!selectedDate || !selectedTimeSlot}
                      className={`w-full py-3 text-center rounded-md font-medium ${
                        selectedDate && selectedTimeSlot
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {bookingStep === 3 && selectedDoctor && selectedDate && selectedTimeSlot && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <button
                  onClick={() => setBookingStep(2)}
                  className="flex items-center text-primary hover:underline mb-2"
                >
                  <FiChevronLeft className="mr-1" /> Back to appointment selection
                </button>
                
                {/* Confirmation details */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Confirm Your Appointment</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-md">
                      <FiUser className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Doctor</p>
                        <p className="font-medium">{selectedDoctor.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-gray-50 rounded-md">
                      <FiCalendar className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{formatDate(selectedDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-gray-50 rounded-md">
                      <FiClock className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{selectedTimeSlot}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-gray-50 rounded-md">
                      <FiMapPin className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{selectedDoctor.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Any information you'd like the doctor to know before the appointment..."
                    ></textarea>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      onClick={handleBookAppointment}
                      disabled={isLoading}
                      className={`w-full py-3 text-center rounded-md font-medium ${
                        isLoading
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                    >
                      {isLoading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
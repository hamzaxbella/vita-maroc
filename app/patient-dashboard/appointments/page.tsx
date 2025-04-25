'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiUser, 
  FiXCircle, 
  FiEdit2,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiFilter,
  FiSearch,
} from 'react-icons/fi';

// Import doctor image
import doctorImg from '@/public/doctor.png';

type Appointment = {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'pending';
};

export default function MyAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [cancelConfirmation, setCancelConfirmation] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample appointments if none exist
  const sampleAppointments: Appointment[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2025-05-15',
      time: '10:00',
      location: 'Vita Health Center, Casablanca',
      status: 'confirmed'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: '2025-04-02',
      time: '14:00',
      location: 'Online Consultation',
      status: 'completed'
    },
    {
      id: '3',
      doctorName: 'Dr. Fatima Al-Zahra',
      specialty: 'General Practitioner',
      date: '2025-05-21',
      time: '09:00',
      location: 'Vita Health Center, Rabat',
      status: 'confirmed'
    },
    {
      id: '4',
      doctorName: 'Dr. James Wilson',
      specialty: 'Orthopedic Surgeon',
      date: '2025-03-10',
      time: '15:30',
      location: 'Vita Health Center, Casablanca',
      status: 'completed'
    }
  ];

  useEffect(() => {
    // Load appointments from localStorage
    const loadAppointments = () => {
      try {
        const storedAppointments = localStorage.getItem('vita_appointments');
        if (storedAppointments) {
          setAppointments(JSON.parse(storedAppointments));
        } else {
          // Use sample data for demonstration
          setAppointments(sampleAppointments);
          localStorage.setItem('vita_appointments', JSON.stringify(sampleAppointments));
        }
      } catch (error) {
        console.error('Error loading appointments:', error);
        setAppointments(sampleAppointments);
      }
      setLoading(false);
    };

    loadAppointments();
  }, []);

  // Filter appointments based on tab, search, and filter
  const filteredAppointments = appointments.filter(appointment => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentDate = new Date(appointment.date);
    
    // Check if appointment is upcoming or past
    const isUpcoming = appointmentDate >= today && appointment.status !== 'cancelled' && appointment.status !== 'completed';
    const matchesTab = (activeTab === 'upcoming' && isUpcoming) || (activeTab === 'past' && !isUpcoming);
    
    // Check if matches search term
    const matchesSearch = appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if matches status filter
    const matchesFilter = filterStatus === 'all' || appointment.status === filterStatus;
    
    return matchesTab && matchesSearch && matchesFilter;
  });

  // Sort by date (upcoming: soonest first, past: most recent first)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(a.date + 'T' + a.time);
    const dateB = new Date(b.date + 'T' + b.time);
    return activeTab === 'upcoming' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle appointment cancellation
  const handleCancelAppointment = (id: string) => {
    // Update appointment status to cancelled
    const updatedAppointments = appointments.map(appointment => {
      if (appointment.id === id) {
        return { ...appointment, status: 'cancelled' as const };
      }
      return appointment;
    });
    
    setAppointments(updatedAppointments);
    localStorage.setItem('vita_appointments', JSON.stringify(updatedAppointments));
    setCancelConfirmation(null);
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
          <p className="text-gray-600 mt-1">View and manage your appointments</p>
        </div>
        
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'upcoming' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'past' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by doctor, specialty, or location"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="md:w-48">
          <div className="relative">
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Appointment List */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your appointments...</p>
        </div>
      ) : sortedAppointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <FiCalendar size={24} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No appointments found</h2>
          <p className="text-gray-500 mb-6">
            {activeTab === 'upcoming'
              ? "You don't have any upcoming appointments scheduled."
              : "You don't have any past appointments."}
          </p>
          {activeTab === 'upcoming' && (
            <a
              href="/patient-dashboard/book-appointment"
              className="inline-block px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Book an Appointment
            </a>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedAppointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start md:items-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 mr-4">
                      <Image
                        src={doctorImg}
                        alt={appointment.doctorName}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{appointment.doctorName}</h3>
                      <p className="text-gray-500">{appointment.specialty}</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getStatusBadge(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center">
                    <button
                      className="flex items-center text-gray-500 hover:text-primary"
                      onClick={() => setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)}
                    >
                      {selectedAppointment === appointment.id ? (
                        <>
                          <span className="mr-1">Less details</span>
                          <FiChevronUp />
                        </>
                      ) : (
                        <>
                          <span className="mr-1">More details</span>
                          <FiChevronDown />
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {selectedAppointment === appointment.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-4 border-t"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <FiCalendar className="mt-1 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium">{formatDate(appointment.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FiClock className="mt-1 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium">{appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FiMapPin className="mt-1 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{appointment.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FiUser className="mt-1 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Appointment ID</p>
                          <p className="font-medium">{appointment.id}</p>
                        </div>
                      </div>
                    </div>
                    
                    {activeTab === 'upcoming' && appointment.status !== 'cancelled' && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() => setCancelConfirmation(appointment.id)}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50"
                        >
                          <FiXCircle className="inline-block mr-2" />
                          Cancel Appointment
                        </button>
                        <a
                          href={`/patient-dashboard/book-appointment?reschedule=${appointment.id}`}
                          className="px-4 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary/5"
                        >
                          <FiEdit2 className="inline-block mr-2" />
                          Reschedule
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
              
              {/* Cancel Confirmation */}
              {cancelConfirmation === appointment.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-50 p-4 border-t"
                >
                  <p className="text-gray-700 mb-3">Are you sure you want to cancel this appointment?</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                    >
                      Yes, Cancel
                    </button>
                    <button
                      onClick={() => setCancelConfirmation(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300"
                    >
                      No, Keep It
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
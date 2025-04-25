'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiFilter, FiSearch, FiChevronDown, FiCheck, FiX, FiClock, FiMessageSquare, FiPhoneCall } from 'react-icons/fi';

// Import images
import patientImg from '@/public/phones.png';

// Type definitions
type Appointment = {
  id: string;
  patientName: string;
  patientId: string;
  reason: string;
  age: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'in-person' | 'video-call';
  notes?: string;
  avatar: string;
};

export default function DoctorAppointments() {
  // Sample data - in a real app, these would come from API calls
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'Emily Rodriguez',
      patientId: 'PT-3245',
      reason: 'Annual Checkup',
      age: 42,
      date: '2025-04-25',
      time: '10:30',
      status: 'confirmed',
      type: 'in-person',
      avatar: '/phones.png'
    },
    {
      id: '2',
      patientName: 'James Wilson',
      patientId: 'PT-2891',
      reason: 'Respiratory infection',
      age: 35,
      date: '2025-04-25',
      time: '14:15',
      status: 'confirmed',
      type: 'video-call',
      avatar: '/phones.png'
    },
    {
      id: '3',
      patientName: 'Sarah Johnson',
      patientId: 'PT-4502',
      reason: 'Follow-up consultation',
      age: 28,
      date: '2025-04-25',
      time: '16:45',
      status: 'pending',
      type: 'in-person',
      avatar: '/phones.png'
    },
    {
      id: '4',
      patientName: 'Michael Brown',
      patientId: 'PT-1287',
      reason: 'Blood pressure check',
      age: 53,
      date: '2025-04-26',
      time: '09:30',
      status: 'confirmed',
      type: 'in-person',
      avatar: '/phones.png'
    },
    {
      id: '5',
      patientName: 'Lisa Greene',
      patientId: 'PT-7865',
      reason: 'Vaccine consultation',
      age: 32,
      date: '2025-04-26',
      time: '11:00',
      status: 'pending',
      type: 'video-call',
      avatar: '/phones.png'
    },
    {
      id: '6',
      patientName: 'Robert Chen',
      patientId: 'PT-5431',
      reason: 'Skin condition',
      age: 45,
      date: '2025-04-26',
      time: '14:30',
      status: 'confirmed',
      type: 'in-person',
      avatar: '/phones.png'
    },
    {
      id: '7',
      patientName: 'Olivia Parker',
      patientId: 'PT-6654',
      reason: 'Prescription renewal',
      age: 37,
      date: '2025-04-27',
      time: '10:15',
      status: 'pending',
      type: 'video-call',
      avatar: '/phones.png'
    },
  ]);
  
  // Filters and states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('');
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Format time from HH:MM to more readable format
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minutes} ${period}`;
  };
  
  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'confirmed':
        return { 
          icon: <FiCheck className="text-success" />,
          text: 'Confirmed',
          color: 'text-success',
          bgColor: 'bg-success/10'
        };
      case 'pending':
        return { 
          icon: <FiClock className="text-warning" />,
          text: 'Pending',
          color: 'text-warning',
          bgColor: 'bg-warning/10'
        };
      case 'completed':
        return { 
          icon: <FiCheck className="text-primary" />,
          text: 'Completed',
          color: 'text-primary',
          bgColor: 'bg-primary/10'
        };
      case 'cancelled':
        return { 
          icon: <FiX className="text-danger" />,
          text: 'Cancelled',
          color: 'text-danger',
          bgColor: 'bg-danger/10'
        };
      default:
        return { 
          icon: <FiClock className="text-gray-500" />,
          text: 'Unknown',
          color: 'text-gray-500',
          bgColor: 'bg-gray-100'
        };
    }
  };
  
  // Get appointment type icon
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video-call':
        return <FiMessageSquare className="text-primary" />;
      case 'in-person':
        return <FiCalendar className="text-secondary" />;
      default:
        return <FiCalendar className="text-gray-500" />;
    }
  };
  
  // Filter appointments based on filters
  const filteredAppointments = appointments.filter(appointment => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    // Type filter
    const matchesType = typeFilter === 'all' || appointment.type === typeFilter;
    
    // Date filter
    const matchesDate = dateFilter === '' || appointment.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });
  
  // Group appointments by date
  const appointmentsByDate: Record<string, Appointment[]> = {};
  filteredAppointments.forEach(appointment => {
    if (!appointmentsByDate[appointment.date]) {
      appointmentsByDate[appointment.date] = [];
    }
    appointmentsByDate[appointment.date].push(appointment);
  });
  
  // Sort appointments by time within each date group
  Object.keys(appointmentsByDate).forEach(date => {
    appointmentsByDate[date].sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
  });
  
  // Sort dates
  const sortedDates = Object.keys(appointmentsByDate).sort();
  
  // Accept/Reject appointment
  const updateAppointmentStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status } 
          : appointment
      )
    );
  };
  
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Appointments</h1>
        
        {/* Filters section */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 min-w-[260px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, reason or ID..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Date filter */}
          <div className="w-full sm:w-auto">
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full sm:w-48 pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
          
          {/* Status filter */}
          <div className="w-full sm:w-auto">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className="w-full sm:w-40 pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Type filter */}
          <div className="w-full sm:w-auto">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className="w-full sm:w-44 pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors appearance-none"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="in-person">In Person</option>
                <option value="video-call">Video Call</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        {/* Display number of results */}
        <div className="text-gray-500 text-sm mb-6">
          Showing {filteredAppointments.length} of {appointments.length} appointments
        </div>

        {/* Appointments list by date */}
        {filteredAppointments.length > 0 ? (
          <div className="space-y-8">
            {sortedDates.map(date => (
              <div key={date}>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  {formatDate(date)}
                </h2>
                
                <div className="space-y-4">
                  {appointmentsByDate[date].map(appointment => {
                    const { icon, text, color, bgColor } = getStatusInfo(appointment.status);
                    return (
                      <motion.div 
                        key={appointment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="p-5">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            {/* Patient info */}
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
                                  <Image 
                                    src={patientImg} 
                                    alt={appointment.patientName}
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                  />
                                </div>
                                <div className="absolute -bottom-1 -right-1">
                                  <div className={`w-6 h-6 rounded-md ${bgColor} flex items-center justify-center`}>
                                    {icon}
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-medium text-gray-900">{appointment.patientName}</h3>
                                  <span className="text-xs text-gray-500 bg-gray-100 py-0.5 px-2 rounded-md">{appointment.patientId}</span>
                                </div>
                                <p className="text-sm text-gray-600">{appointment.reason}</p>
                                <div className="mt-1 text-xs text-gray-500">
                                  Age: {appointment.age} • {appointment.type === 'video-call' ? 'Video Call' : 'In Person'}
                                </div>
                              </div>
                            </div>
                            
                            {/* Time and status */}
                            <div className="flex flex-wrap items-center gap-4 md:gap-6">
                              {/* Type icon */}
                              <div className={`hidden md:flex w-10 h-10 rounded-lg ${appointment.type === 'video-call' ? 'bg-primary/10' : 'bg-secondary/10'} items-center justify-center`}>
                                {getTypeIcon(appointment.type)}
                              </div>
                              
                              {/* Time */}
                              <div className="text-center">
                                <div className="text-sm text-gray-500">Time</div>
                                <div className="text-lg font-medium text-gray-800">{formatTime(appointment.time)}</div>
                              </div>
                              
                              {/* Status */}
                              <div className="flex flex-col items-center">
                                <div className="text-sm text-gray-500">Status</div>
                                <div className={`mt-1 ${color} text-sm flex items-center gap-1`}>
                                  {icon}
                                  <span>{text}</span>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                {appointment.status === 'pending' && (
                                  <>
                                    <button 
                                      onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                      className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                                    >
                                      <FiX size={18} />
                                    </button>
                                    <button 
                                      onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                      className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20"
                                    >
                                      <FiCheck size={18} />
                                    </button>
                                  </>
                                )}
                                
                                {appointment.status === 'confirmed' && (
                                  <>
                                    {appointment.type === 'video-call' ? (
                                      <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-md transition-all">
                                        <FiPhoneCall className="mr-1 inline-block" /> Start Call
                                      </button>
                                    ) : (
                                      <Link 
                                        href={`/doctor-dashboard/appointments/${appointment.id}`}
                                        className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-md transition-all"
                                      >
                                        Start Session
                                      </Link>
                                    )}
                                  </>
                                )}
                                
                                {(appointment.status === 'completed' || appointment.status === 'cancelled') && (
                                  <Link 
                                    href={`/doctor-dashboard/appointments/${appointment.id}`}
                                    className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
                                  >
                                    View Details
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="bg-gray-50 rounded-full p-6">
              <FiCalendar size={40} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No appointments found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
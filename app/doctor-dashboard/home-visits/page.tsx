'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiUser, FiCalendar, FiClock, FiCheck, FiX, FiPhone, FiNavigation } from 'react-icons/fi';

// Import images for patients (using a placeholder image)
import patientImg from '@/public/phones.png';

export default function DoctorHomeVisits() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [filter, setFilter] = useState<string>('all'); // 'all', 'upcoming', 'past', 'cancelled'
  
  // Sample data for home visit requests - in a real app, this would come from API calls
  const [homeVisits, setHomeVisits] = useState([
    {
      id: '1',
      patientName: 'Robert Anderson',
      patientAge: 67,
      reason: 'Post-surgery checkup',
      address: '42 Oakwood Avenue, Apt 8B',
      distance: '2.5 miles',
      date: '2025-04-26',
      time: '10:00 AM',
      status: 'confirmed', // 'pending', 'confirmed', 'completed', 'cancelled'
      notes: 'Patient has mobility issues. Needs help with wound dressing.',
      avatar: '/phones.png'
    },
    {
      id: '2',
      patientName: 'Margaret Wilson',
      patientAge: 78,
      reason: 'Regular checkup & medication review',
      address: '17 Pine Street',
      distance: '3.1 miles',
      date: '2025-04-27',
      time: '2:30 PM',
      status: 'confirmed',
      notes: 'Patient is on multiple medications that need review.',
      avatar: '/phones.png'
    },
    {
      id: '3',
      patientName: 'Thomas Edwards',
      patientAge: 55,
      reason: 'Chronic pain management',
      address: '8 Riverside Drive',
      distance: '1.8 miles',
      date: '2025-04-25',
      time: '4:00 PM',
      status: 'pending',
      notes: '',
      avatar: '/phones.png'
    },
    {
      id: '4',
      patientName: 'Grace Thompson',
      patientAge: 82,
      reason: 'Blood pressure monitoring',
      address: '123 Elder Avenue',
      distance: '5.2 miles',
      date: '2025-04-23',
      time: '11:30 AM',
      status: 'completed',
      notes: 'Patient has been responding well to new medication.',
      avatar: '/phones.png'
    },
    {
      id: '5',
      patientName: 'Michael Reed',
      patientAge: 45,
      reason: 'Follow-up after hospitalization',
      address: '56 Maple Court',
      distance: '4.0 miles',
      date: '2025-04-22',
      time: '3:00 PM',
      status: 'cancelled',
      notes: 'Patient requested to reschedule.',
      avatar: '/phones.png'
    }
  ]);

  useEffect(() => {
    // Get current user from localStorage
    try {
      const userJson = localStorage.getItem('vita_current_user');
      if (userJson) {
        const user = JSON.parse(userJson);
        setCurrentUser(user);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }, []);

  // Filter home visits based on selected filter
  const filteredVisits = homeVisits.filter(visit => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') {
      return (visit.status === 'confirmed' || visit.status === 'pending') && 
             new Date(visit.date) >= new Date();
    }
    if (filter === 'past') return visit.status === 'completed';
    if (filter === 'cancelled') return visit.status === 'cancelled';
    return true;
  });

  // Function to accept a home visit
  const acceptVisit = (id: string) => {
    setHomeVisits(prev => prev.map(visit => 
      visit.id === id ? { ...visit, status: 'confirmed' } : visit
    ));
  };

  // Function to decline a home visit
  const declineVisit = (id: string) => {
    setHomeVisits(prev => prev.map(visit => 
      visit.id === id ? { ...visit, status: 'cancelled' } : visit
    ));
  };

  // Function to complete a home visit
  const completeVisit = (id: string) => {
    setHomeVisits(prev => prev.map(visit => 
      visit.id === id ? { ...visit, status: 'completed' } : visit
    ));
  };

  // Get status badge style based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: <FiClock size={14} />,
          text: 'Pending'
        };
      case 'confirmed':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: <FiCheck size={14} />,
          text: 'Confirmed'
        };
      case 'completed':
        return {
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          icon: <FiCheck size={14} />,
          text: 'Completed'
        };
      case 'cancelled':
        return {
          color: 'text-danger',
          bgColor: 'bg-danger/10',
          icon: <FiX size={14} />,
          text: 'Cancelled'
        };
      default:
        return {
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          icon: <FiClock size={14} />,
          text: 'Unknown'
        };
    }
  };

  // Function to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Home Visits</h1>
          <p className="text-gray-500 mt-1">Manage home visit requests and appointments</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === 'all' ? 
              'bg-primary text-white' : 
              'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Visits
          </button>
          <button 
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === 'upcoming' ? 
              'bg-primary text-white' : 
              'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === 'past' ? 
              'bg-primary text-white' : 
              'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
          <button 
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === 'cancelled' ? 
              'bg-primary text-white' : 
              'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Home visits list */}
      {filteredVisits.length > 0 ? (
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredVisits.map((visit) => {
            const statusBadge = getStatusBadge(visit.status);
            const isToday = new Date(visit.date).toDateString() === new Date().toDateString();
            const isPast = new Date(visit.date) < new Date() && visit.date !== new Date().toDateString();
            
            return (
              <motion.div 
                key={visit.id}
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6 space-y-4">
                  {/* Header with patient info and status */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden">
                          <Image
                            src={patientImg}
                            alt={visit.patientName}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-md flex items-center justify-center ${statusBadge.bgColor}`}>
                          {statusBadge.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{visit.patientName}</h3>
                        <p className="text-sm text-gray-500">{visit.patientAge} years • {visit.reason}</p>
                        <div className={`mt-2 inline-flex items-center gap-1 py-1 px-3 rounded-md text-xs ${statusBadge.bgColor} ${statusBadge.color}`}>
                          {statusBadge.icon} <span>{statusBadge.text}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Date</div>
                        <div className="flex items-center gap-1 mt-1">
                          <FiCalendar size={14} className="text-gray-400" />
                          <span className={`text-sm font-medium ${isToday ? 'text-primary' : ''}`}>
                            {isToday ? 'Today' : formatDate(visit.date)}
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Time</div>
                        <div className="flex items-center gap-1 mt-1">
                          <FiClock size={14} className="text-gray-400" />
                          <span className="text-sm font-medium">{visit.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address information */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <FiMapPin size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Address</div>
                        <div className="text-gray-800">{visit.address}</div>
                        <div className="text-sm text-gray-500 mt-1">{visit.distance} from your location</div>
                      </div>
                    </div>
                    
                    {/* Action buttons based on status */}
                    <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
                      {visit.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => declineVisit(visit.id)}
                            className="px-4 py-2 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                          >
                            Decline
                          </button>
                          <button 
                            onClick={() => acceptVisit(visit.id)}
                            className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-md transition-all text-sm"
                          >
                            Accept
                          </button>
                        </>
                      )}
                      
                      {visit.status === 'confirmed' && (
                        <>
                          <a 
                            href={`https://maps.google.com/?q=${encodeURIComponent(visit.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 flex items-center gap-2 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                          >
                            <FiNavigation size={14} />
                            Navigate
                          </a>
                          <button 
                            onClick={() => completeVisit(visit.id)}
                            className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-md transition-all text-sm"
                          >
                            Mark Complete
                          </button>
                        </>
                      )}
                      
                      {(visit.status === 'completed' || visit.status === 'cancelled') && (
                        <Link
                          href={`/doctor-dashboard/my-patients?id=${visit.id}`}
                          className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-md transition-all text-sm"
                        >
                          View Patient
                        </Link>
                      )}
                      
                      <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                        <FiPhone size={18} className="text-primary" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Notes section (if available) */}
                  {visit.notes && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500 mb-1">Notes</div>
                      <p className="text-gray-700">{visit.notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <FiMapPin size={32} className="text-primary" />
          </div>
          <h3 className="text-xl font-medium mt-6 mb-2">No home visits found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {filter === 'all' 
              ? "You don't have any home visits scheduled." 
              : `No ${filter} home visits found.`}
          </p>
        </div>
      )}
    </div>
  );
}
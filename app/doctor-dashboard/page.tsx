'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiMapPin, FiPhoneCall, FiClock, FiUser, FiCheck, FiClock as FiPending, FiX, FiChevronLeft, FiArrowRight, FiBell, FiUsers, FiActivity, FiSettings, FiInfo, FiToggleRight, FiToggleLeft } from 'react-icons/fi';

// Import images
import patientImg from '@/public/phones.png';

export default function DoctorDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAvailable, setIsAvailable] = useState(true);
  
  // Sample data - in a real app, these would come from API calls
  const [todayAppointments, setTodayAppointments] = useState([
    {
      id: '1',
      patientName: 'Emily Rodriguez',
      reason: 'Annual Checkup',
      age: 42,
      time: '10:30',
      status: 'confirmed', // 'pending', 'confirmed', 'completed', 'cancelled'
      avatar: '/phones.png'
    },
    {
      id: '2',
      patientName: 'James Wilson',
      reason: 'Respiratory infection',
      age: 35,
      time: '14:15',
      status: 'confirmed',
      avatar: '/phones.png'
    },
    {
      id: '3',
      patientName: 'Sarah Johnson',
      reason: 'Follow-up consultation',
      age: 28,
      time: '16:45',
      status: 'pending',
      avatar: '/phones.png'
    }
  ]);
  
  // Emergency requests mock data
  const [emergencyRequests, setEmergencyRequests] = useState([
    {
      id: '1',
      patientName: 'Michael Brown',
      reason: 'Severe chest pain',
      location: '42 Park Avenue, 3 miles away',
      urgency: 'high',
      requestTime: '15 minutes ago',
      avatar: '/phones.png'
    },
    {
      id: '2',
      patientName: 'Lisa Greene',
      reason: 'Allergic reaction',
      location: '17 Elm Street, 1.5 miles away',
      urgency: 'medium',
      requestTime: '32 minutes ago',
      avatar: '/phones.png'
    }
  ]);

  // Patient stats mock data
  const patientStats = [
    { name: 'Total Patients', value: '348', trend: '+12', icon: <FiUsers /> },
    { name: 'Appointments', value: '27', trend: '+5', icon: <FiCalendar /> },
    { name: 'Online Rating', value: '4.9', trend: '+0.2', icon: <FiActivity /> }
  ];

  // Notifications mock data
  const notifications = [
    { id: 1, text: 'New appointment request from Emily Rodriguez', time: '1 hour ago', type: 'appointment' },
    { id: 2, text: 'Lab results ready for patient James Wilson', time: '2 hours ago', type: 'update' },
    { id: 3, text: 'Home visit scheduled for tomorrow at 10:00', time: '3 hours ago', type: 'home-visit' }
  ];

  useEffect(() => {
    // Get user data from localStorage
    const userJson = localStorage.getItem('vita_current_user');
    if (userJson) {
      const user = JSON.parse(userJson);
      setCurrentUser(user);
    }
    
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Toggle availability status
  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    // In a real app, you would send this status to your backend
    console.log("Doctor availability status changed to:", !isAvailable);
  };

  // Animation variants for staggered entry
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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
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
          icon: <FiPending className="text-warning" />,
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
          icon: <FiPending className="text-gray-500" />,
          text: 'Unknown',
          color: 'text-gray-500',
          bgColor: 'bg-gray-100'
        };
    }
  };

  // Get urgency icon and color
  const getUrgencyInfo = (urgency: string) => {
    switch(urgency) {
      case 'high':
        return { 
          icon: <FiPhoneCall className="text-danger" />,
          text: 'High Priority',
          color: 'text-danger',
          bgColor: 'bg-danger/10'
        };
      case 'medium':
        return { 
          icon: <FiPhoneCall className="text-warning" />,
          text: 'Medium Priority',
          color: 'text-warning',
          bgColor: 'bg-warning/10'
        };
      case 'low':
        return { 
          icon: <FiPhoneCall className="text-success" />,
          text: 'Low Priority',
          color: 'text-success',
          bgColor: 'bg-success/10'
        };
      default:
        return { 
          icon: <FiPhoneCall className="text-gray-500" />,
          text: 'Unknown',
          color: 'text-gray-500',
          bgColor: 'bg-gray-100'
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Top section with greeting and availability toggle */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary rounded-3xl shadow-xl p-8 text-white"
      >
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M42.8,-68.7C54.9,-62.5,63.6,-48.8,69.2,-34.4C74.9,-20.1,77.4,-5.1,74.3,8.8C71.1,22.7,62.2,35.6,51.1,44.7C39.9,53.9,26.5,59.3,12.4,64.2C-1.6,69,-16.3,73.2,-31.3,70.5C-46.3,67.8,-61.6,58.2,-67.3,44.6C-73.1,31,-69.3,13.4,-67.8,-4.2C-66.3,-21.8,-67.1,-39.5,-59.3,-51.1C-51.4,-62.7,-34.9,-68.2,-19.5,-68.9C-4.1,-69.5,10.2,-65.3,24.8,-63C39.5,-60.7,54.5,-60.3,42.8,-68.7Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                {currentUser?.name ? (
                  <span className="text-2xl font-bold">{currentUser.name[0]}</span>
                ) : (
                  <FiUser size={28} />
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {greeting}, {currentUser?.name || 'Doctor'}!
                </h1>
                <p className="text-white/80 mt-1">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-white/70 text-sm">Local Time</div>
              <div className="text-2xl font-semibold">
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-colors">
                  <FiBell size={22} />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-danger rounded-full flex items-center justify-center text-xs">
                    {notifications.length}
                  </span>
                </button>
              </div>
              
              <button 
                onClick={toggleAvailability}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${isAvailable ? 'bg-success/90' : 'bg-gray-500'}`}
              >
                {isAvailable ? <FiToggleRight size={20} /> : <FiToggleLeft size={20} />}
                <span>{isAvailable ? 'Available' : 'Unavailable'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Patient Stats Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {patientStats.map((stat, index) => (
          <motion.div
            key={stat.name}
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-lg overflow-hidden p-6 hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-2xl ${index === 0 ? 'bg-primary/10' : index === 1 ? 'bg-secondary/10' : 'bg-success/10'}`}>
                <div className={`${index === 0 ? 'text-primary' : index === 1 ? 'text-secondary' : 'text-success'}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">{stat.name}</div>
                <div className="flex items-end">
                  <span className="text-xl font-bold">{stat.value}</span>
                  <span className="text-sm ml-2 text-success">{stat.trend}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick actions section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* View Appointments */}
          <motion.div variants={itemVariants}>
            <Link href="/doctor-dashboard/appointments" 
              className="block h-full bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="p-6 flex flex-col h-full border-b-4 border-primary relative">
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all">
                  <FiArrowRight />
                </div>
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <FiCalendar size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">View Appointments</h3>
                <p className="text-sm text-gray-500">Manage your schedule and appointments</p>
              </div>
            </Link>
          </motion.div>

          {/* Manage Patients */}
          <motion.div variants={itemVariants}>
            <Link href="/doctor-dashboard/my-patients" 
              className="block h-full bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="p-6 flex flex-col h-full border-b-4 border-secondary relative">
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all">
                  <FiArrowRight />
                </div>
                <div className="flex items-center mb-4">
                  <div className="bg-secondary/10 p-4 rounded-2xl">
                    <FiUsers size={24} className="text-secondary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">Manage Patients</h3>
                <p className="text-sm text-gray-500">View and manage your patient records</p>
              </div>
            </Link>
          </motion.div>

          {/* Update Availability */}
          <motion.div variants={itemVariants}>
            <Link href="/doctor-dashboard/availability-settings" 
              className="block h-full bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="p-6 flex flex-col h-full border-b-4 border-success relative">
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-success/10 text-success opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all">
                  <FiArrowRight />
                </div>
                <div className="flex items-center mb-4">
                  <div className="bg-success/10 p-4 rounded-2xl">
                    <FiClock size={24} className="text-success" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-success transition-colors">Set Availability</h3>
                <p className="text-sm text-gray-500">Update your working hours and availability</p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's appointments */}
        <motion.section 
          className="lg:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Today's Appointments</h2>
            <Link href="/doctor-dashboard/appointments" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors">
              View all <FiArrowRight size={16} />
            </Link>
          </div>

          {todayAppointments.length > 0 ? (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => {
                const { icon, text, color, bgColor } = getStatusInfo(appointment.status);
                return (
                  <div key={appointment.id} className="bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center overflow-hidden">
                              <Image
                                src={patientImg}
                                alt={appointment.patientName}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-md flex items-center justify-center ${bgColor}`}>
                              {icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors">
                              {appointment.patientName} <span className="text-sm text-gray-500">({appointment.age})</span>
                            </h3>
                            <p className="text-sm text-gray-500">{appointment.reason}</p>
                            <div className={`mt-2 text-sm inline-flex items-center ${color} gap-1 py-1 px-2 rounded-md ${bgColor}`}>
                              {icon} <span>{text}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-500">Time</div>
                            <div className="text-lg font-medium text-gray-800">{formatTime(appointment.time)}</div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                              <FiInfo size={18} />
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-md transition-all">
                              Start
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
              <div className="p-6 bg-primary/5 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
                <FiCalendar size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-2">No appointments today</h3>
              <p className="text-gray-500 mb-6">You don't have any scheduled appointments for today</p>
            </div>
          )}
          
          {/* Notifications Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Notifications</h2>
              <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors">
                Mark all as read <FiCheck size={16} />
              </button>
            </div>
            
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-5 hover:bg-gray-50 transition-colors flex items-start gap-4">
                    <div className={`
                      p-3 rounded-xl flex items-center justify-center flex-shrink-0
                      ${notification.type === 'appointment' ? 'bg-primary/10 text-primary' : 
                        notification.type === 'update' ? 'bg-secondary/10 text-secondary' :
                        'bg-success/10 text-success'}
                    `}>
                      {notification.type === 'appointment' ? <FiCalendar size={20} /> : 
                       notification.type === 'update' ? <FiInfo size={20} /> :
                       <FiMapPin size={20} />}
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <FiX size={16} className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Right sidebar */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Emergency Requests */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Emergency Requests</h2>
            </div>

            {emergencyRequests.length > 0 ? (
              <div className="space-y-4">
                {emergencyRequests.map((request) => {
                  const { icon, text, color, bgColor } = getUrgencyInfo(request.urgency);
                  return (
                    <div key={request.id} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-danger/20">
                      <div className="p-6 space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-danger/10 flex items-center justify-center overflow-hidden">
                              <Image
                                src={patientImg}
                                alt={request.patientName}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-md flex items-center justify-center bg-danger/20 text-danger">
                              <FiPhoneCall size={14} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900">{request.patientName}</h3>
                            <p className="text-sm text-gray-600">{request.reason}</p>
                            <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                              <FiClock size={12} />
                              <span>{request.requestTime}</span>
                            </div>
                          </div>
                          <div className={`py-1 px-3 rounded-md ${bgColor} ${color} text-xs font-medium`}>
                            {text}
                          </div>
                        </div>
                          
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FiMapPin size={14} />
                          <span className="flex-1">{request.location}</span>
                        </div>
                        
                        <div className="flex items-center justify-end space-x-3">
                          <button className="px-4 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                            Decline
                          </button>
                          <button className="px-4 py-2 text-sm bg-gradient-to-r from-danger to-danger/80 text-white rounded-xl hover:shadow-md transition-all">
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
                <div className="p-5 bg-danger/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <FiPhoneCall size={32} className="text-danger" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">No emergency requests</h3>
                <p className="text-sm text-gray-500">You don't have any emergency requests at the moment</p>
              </div>
            )}
          </div>

          {/* Availability Settings Quick Access */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Current Availability</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">Today's Schedule</div>
                <div className="text-lg font-medium text-gray-800">9:00 AM - 5:00 PM</div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Online Appointments</div>
                  <div className={`px-3 py-1 rounded-full text-xs ${isAvailable ? 'bg-success/10 text-success' : 'bg-gray-200 text-gray-600'}`}>
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Home Visits</div>
                  <div className="px-3 py-1 rounded-full text-xs bg-warning/10 text-warning">
                    Limited
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Emergency Calls</div>
                  <div className="px-3 py-1 rounded-full text-xs bg-success/10 text-success">
                    Available
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between gap-3">
                <Link href="/doctor-dashboard/availability-settings" className="flex-1 py-2 text-center text-primary border border-primary rounded-xl hover:bg-primary/5 transition-colors text-sm">
                  Edit Hours
                </Link>
                <button 
                  onClick={toggleAvailability} 
                  className={`flex-1 py-2 text-center rounded-xl text-white text-sm ${isAvailable ? 'bg-danger hover:bg-danger/90' : 'bg-success hover:bg-success/90'}`}
                >
                  {isAvailable ? 'Go Offline' : 'Go Online'}
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Home Visits */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Home Visit</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <FiMapPin size={24} className="text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium">Robert Anderson</div>
                    <div className="text-xs text-gray-500">2.5 miles away</div>
                  </div>
                </div>
                <div className="bg-primary/10 text-primary text-sm rounded-md py-1 px-3">Tomorrow</div>
              </div>
              
              <div className="text-sm text-gray-600 mb-1">Address</div>
              <div className="text-gray-800 mb-4">42 Oakwood Avenue, Apt 8B</div>
              
              <div className="flex justify-between gap-3">
                <button className="flex-1 py-2 text-center text-primary border border-primary rounded-xl hover:bg-primary/5 transition-colors text-sm">
                  Reschedule
                </button>
                <Link href="/doctor-dashboard/home-visits" className="flex-1 py-2 text-center bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-md transition-all text-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
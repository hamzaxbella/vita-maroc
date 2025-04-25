'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiMapPin, FiPhoneCall, FiClock, FiUser, FiCheck, FiClock as FiPending, FiX, FiChevronLeft, FiArrowRight, FiBell, FiHeart, FiTrendingUp, FiInfo, FiActivity } from 'react-icons/fi';

// Import images
import doctorImg from '@/public/doctor.png';
import phoneDanger from '@/public/phone-danger.svg';

export default function PatientDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Sample data - in a real app, these would come from API calls
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2025-05-01',
      time: '10:30',
      status: 'confirmed', // 'pending', 'confirmed', 'completed', 'cancelled'
      location: 'Vita Health Center, Office 302',
      avatar: '/doctor.png'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: '2025-05-10',
      time: '14:15',
      status: 'pending',
      location: 'Online Consultation',
      avatar: '/doctor.png'
    }
  ]);
  
  const [recentDoctors, setRecentDoctors] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      lastConsultation: '2 days ago',
      avatar: '/doctor.png'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      lastConsultation: '1 week ago',
      avatar: '/doctor.png'
    },
    {
      id: '3',
      name: 'Dr. Fatima Al-Zahra',
      specialty: 'General Practitioner',
      lastConsultation: '2 weeks ago',
      avatar: '/doctor.png'
    }
  ]);

  // Health stats mock data
  const healthStats = [
    { name: 'Heart Rate', value: '72', unit: 'bpm', icon: <FiHeart /> },
    { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: <FiActivity /> },
    { name: 'Steps', value: '8,425', unit: 'today', icon: <FiTrendingUp /> }
  ];

  // Notifications mock data
  const notifications = [
    { id: 1, text: 'Appointment reminder: Dr. Sarah Johnson tomorrow at 10:30', time: '1 hour ago', type: 'reminder' },
    { id: 2, text: 'Your prescription has been renewed', time: '2 days ago', type: 'info' },
    { id: 3, text: 'Medical reports are ready to view', time: '3 days ago', type: 'update' }
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

  // Format date function to display dates in a more readable format
  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(`${dateStr}T${timeStr}`);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate days remaining until appointment
  const daysUntil = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentDate = new Date(dateStr);
    appointmentDate.setHours(0, 0, 0, 0);
    
    const diffTime = appointmentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
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

  return (
    <div className="space-y-8">
      {/* Top section with greeting, stats, and time */}
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
                  {greeting}, {currentUser?.name || 'Patient'}!
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
            
            <div className="relative">
              <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-colors">
                <FiBell size={22} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-danger rounded-full flex items-center justify-center text-xs">
                  {notifications.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Health Stats Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {healthStats.map((stat, index) => (
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
              <div>
                <div className="text-sm text-gray-500">{stat.name}</div>
                <div className="text-xl font-bold">
                  {stat.value} <span className="text-sm font-normal text-gray-400">{stat.unit}</span>
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
          {/* Book Appointment */}
          <motion.div variants={itemVariants}>
            <Link href="/patient-dashboard/book-appointment" 
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
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Book Appointment</h3>
                <p className="text-sm text-gray-500">Schedule a consultation with a specialist</p>
              </div>
            </Link>
          </motion.div>

          {/* Request Home Visit */}
          <motion.div variants={itemVariants}>
            <Link href="/patient-dashboard/home-visit" 
              className="block h-full bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="p-6 flex flex-col h-full border-b-4 border-secondary relative">
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all">
                  <FiArrowRight />
                </div>
                <div className="flex items-center mb-4">
                  <div className="bg-secondary/10 p-4 rounded-2xl">
                    <FiMapPin size={24} className="text-secondary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">Request Home Visit</h3>
                <p className="text-sm text-gray-500">Get a doctor to visit you at your location</p>
              </div>
            </Link>
          </motion.div>

          {/* Emergency */}
          <motion.div variants={itemVariants}>
            <Link href="/patient-dashboard/emergency" 
              className="block h-full bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="p-6 flex flex-col h-full border-b-4 border-danger relative">
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-danger/10 text-danger opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all">
                  <FiArrowRight />
                </div>
                <div className="flex items-center mb-4">
                  <div className="bg-danger/10 p-4 rounded-2xl">
                    <FiPhoneCall size={24} className="text-danger" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-danger transition-colors">Emergency Help</h3>
                <p className="text-sm text-gray-500">Get immediate medical assistance</p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming appointments */}
        <motion.section 
          className="lg:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
            <Link href="/patient-dashboard/appointments" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors">
              View all <FiArrowRight size={16} />
            </Link>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="space-y-6">
              {upcomingAppointments.map((appointment) => {
                const { icon, text, color, bgColor } = getStatusInfo(appointment.status);
                const days = daysUntil(appointment.date);
                return (
                  <div key={appointment.id} className="bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center overflow-hidden">
                              <Image
                                src={doctorImg}
                                alt={appointment.doctorName}
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
                            <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors">{appointment.doctorName}</h3>
                            <p className="text-sm text-gray-500">{appointment.specialty}</p>
                            <div className={`mt-2 text-sm inline-flex items-center ${color} gap-1 py-1 px-2 rounded-md ${bgColor}`}>
                              {icon} <span>{text}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0 flex flex-col items-end gap-1">
                          <div className="text-sm font-medium bg-primary/5 text-primary py-1 px-3 rounded-md">{days}</div>
                          <div className="text-sm text-gray-500">{formatDate(appointment.date, appointment.time)}</div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <FiMapPin className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{appointment.location}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-3 justify-end">
                        <button className="px-4 py-2 text-sm rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                          Reschedule
                        </button>
                        <button className="px-4 py-2 text-sm bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-md transition-all">
                          View Details
                        </button>
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
              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-2">No upcoming appointments</h3>
              <p className="text-gray-500 mb-6">You don't have any scheduled appointments</p>
              <Link href="/patient-dashboard/book-appointment" className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all">
                Book Now
              </Link>
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
                      ${notification.type === 'reminder' ? 'bg-primary/10 text-primary' : 
                        notification.type === 'info' ? 'bg-secondary/10 text-secondary' :
                        'bg-success/10 text-success'}
                    `}>
                      {notification.type === 'reminder' ? <FiBell size={20} /> : 
                       notification.type === 'info' ? <FiInfo size={20} /> :
                       <FiCheck size={20} />}
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
          {/* Emergency card */}
          <div className="bg-gradient-to-br from-danger via-danger to-danger/80 rounded-3xl shadow-xl overflow-hidden text-white relative">
            <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M42.8,-68.7C54.9,-62.5,63.6,-48.8,69.2,-34.4C74.9,-20.1,77.4,-5.1,74.3,8.8C71.1,22.7,62.2,35.6,51.1,44.7C39.9,53.9,26.5,59.3,12.4,64.2C-1.6,69,-16.3,73.2,-31.3,70.5C-46.3,67.8,-61.6,58.2,-67.3,44.6C-73.1,31,-69.3,13.4,-67.8,-4.2C-66.3,-21.8,-67.1,-39.5,-59.3,-51.1C-51.4,-62.7,-34.9,-68.2,-19.5,-68.9C-4.1,-69.5,10.2,-65.3,24.8,-63C39.5,-60.7,54.5,-60.3,42.8,-68.7Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div className="p-8 relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                  <Image src={phoneDanger} alt="Emergency" width={32} height={32} />
                </div>
                <h3 className="ml-4 text-xl font-bold">Emergency Help</h3>
              </div>
              <p className="mb-6 text-white/90">
                Need immediate medical assistance? Our emergency team is available 24/7.
              </p>
              <Link href="/patient-dashboard/emergency" className="inline-block w-full py-3.5 bg-white text-danger text-center rounded-xl font-medium hover:bg-white/90 transition-colors shadow-lg">
                Call Emergency
              </Link>
            </div>
          </div>

          {/* Recently Contacted Doctors */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Recently Contacted</h2>
            </div>
            <div>
              {recentDoctors.map((doctor) => (
                <div key={doctor.id} className="p-6 hover:bg-gray-50 transition-all flex items-center gap-4 border-b border-gray-100 last:border-b-0">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden">
                    <Image
                      src={doctorImg}
                      alt={doctor.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{doctor.name}</h4>
                    <p className="text-xs text-gray-500">{doctor.specialty}</p>
                    <p className="text-xs text-gray-400 mt-1">{doctor.lastConsultation}</p>
                  </div>
                  <button className="p-3 rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
                    <FiCalendar size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 text-center">
              <Link href="/patient-dashboard/book-appointment" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center justify-center gap-1 transition-colors">
                Find more doctors <FiArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Health Tips Card */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Daily Health Tip</h3>
                <span className="bg-primary/10 text-primary text-xs rounded-md py-1 px-2">Today</span>
              </div>
              <p className="text-gray-600 mb-6">
                Regular physical activity can help reduce your risk of heart disease, improve your mental health, and boost your overall wellbeing.
              </p>
              <div className="bg-white p-3 rounded-xl flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-500">Your health score</div>
                  <div className="text-lg font-bold text-primary">87/100</div>
                </div>
                <div className="w-16 h-16 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E9ECEF"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeDasharray="87, 100"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--color-primary)" />
                        <stop offset="100%" stopColor="var(--color-secondary)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
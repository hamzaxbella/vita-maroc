'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiUsers, FiUserCheck, FiCalendar, FiAlertTriangle, 
  FiActivity, FiArrowRight, FiCheckCircle, FiClock,
  FiRefreshCw, FiTrendingUp, FiTrendingDown, FiBell,
  FiEye, FiCheck, FiX, FiFilter
} from 'react-icons/fi';

// Import images
import doctorImg from '@/public/doctor.png';

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalPatients, setTotalPatients] = useState(1248);
  const [totalDoctors, setTotalDoctors] = useState(84);
  const [appointmentsToday, setAppointmentsToday] = useState(52);
  const [emergencyCalls, setEmergencyCalls] = useState(7);
  const [pendingVerifications, setPendingVerifications] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  
  // Stats card data
  const statCards = [
    { 
      title: 'Total Patients', 
      value: totalPatients,
      change: '+12',
      isIncrease: true,
      icon: <FiUsers className="text-primary" size={20} />,
      bgColor: 'bg-primary/10',
      link: '/admin-dashboard/manage-patients'
    },
    { 
      title: 'Doctors', 
      value: totalDoctors,
      change: '+3',
      isIncrease: true,
      icon: <FiUserCheck className="text-secondary" size={20} />,
      bgColor: 'bg-secondary/10',
      link: '/admin-dashboard/manage-doctors'
    },
    { 
      title: 'Today\'s Appointments', 
      value: appointmentsToday,
      change: '+5',
      isIncrease: true,
      icon: <FiCalendar className="text-primary" size={20} />,
      bgColor: 'bg-primary/10',
      link: '/admin-dashboard/appointments'
    },
    { 
      title: 'Emergency Calls (24h)', 
      value: emergencyCalls,
      change: '-2',
      isIncrease: false,
      icon: <FiAlertTriangle className="text-danger" size={20} />,
      bgColor: 'bg-danger/10',
      link: '/admin-dashboard/emergency-calls'
    }
  ];

  const overviewStats = [
    { label: 'Doctor-Patient Ratio', value: '1:14.8', trend: '+0.3', icon: <FiActivity /> },
    { label: 'Avg. Response Time', value: '3.2 min', trend: '-0.5', icon: <FiClock /> },
    { label: 'Appointment Fill Rate', value: '92%', trend: '+2%', icon: <FiCalendar /> },
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
    
    // Load mock data for pending verifications
    const mockPendingVerifications = [
      {
        id: 'dr-1',
        name: 'Dr. Malek Hassan',
        specialty: 'Cardiologist',
        submittedAt: '2025-04-24T09:30:00',
        image: doctorImg
      },
      {
        id: 'dr-2',
        name: 'Dr. Amina Benali',
        specialty: 'Dermatologist',
        submittedAt: '2025-04-24T11:15:00',
        image: doctorImg
      },
      {
        id: 'dr-3',
        name: 'Dr. Karim Tazi',
        specialty: 'Neurologist',
        submittedAt: '2025-04-24T14:45:00',
        image: doctorImg
      }
    ];
    
    // Load mock data for recent activities
    const mockRecentActivities = [
      {
        id: 'act-1',
        type: 'new_doctor',
        message: 'New doctor registration',
        details: 'Dr. Farah Mansour - Pediatrician',
        time: '10 minutes ago'
      },
      {
        id: 'act-2',
        type: 'emergency',
        message: 'Emergency call received',
        details: 'Patient: Mohammed Alaoui - Chest pain',
        time: '25 minutes ago'
      },
      {
        id: 'act-3',
        type: 'appointment',
        message: 'Appointment completed',
        details: 'Dr. Laila Kadiri with Patient #1042',
        time: '45 minutes ago'
      },
      {
        id: 'act-4',
        type: 'verification',
        message: 'Doctor verification approved',
        details: 'Dr. Hamza El Amrani - Orthopedic Surgeon',
        time: '1 hour ago'
      },
      {
        id: 'act-5',
        type: 'home_visit',
        message: 'Home visit completed',
        details: 'Dr. Younes Benjelloun - Patient #879',
        time: '1.5 hours ago'
      }
    ];
    
    setPendingVerifications(mockPendingVerifications);
    setRecentActivities(mockRecentActivities);

    return () => clearInterval(timer);
  }, []);

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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  // Get activity icon and color based on type
  const getActivityUI = (type: string) => {
    switch(type) {
      case 'new_doctor':
        return { icon: <FiUserCheck />, bgColor: 'bg-secondary/10', textColor: 'text-secondary' };
      case 'emergency':
        return { icon: <FiAlertTriangle />, bgColor: 'bg-danger/10', textColor: 'text-danger' };
      case 'appointment':
        return { icon: <FiCalendar />, bgColor: 'bg-primary/10', textColor: 'text-primary' };
      case 'verification':
        return { icon: <FiCheckCircle />, bgColor: 'bg-secondary/10', textColor: 'text-secondary' };
      case 'home_visit':
        return { icon: <FiUsers />, bgColor: 'bg-primary/10', textColor: 'text-primary' };
      default:
        return { icon: <FiActivity />, bgColor: 'bg-gray-100', textColor: 'text-gray-600' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Top section with greeting and overview */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-r from-secondary to-primary rounded-3xl shadow-xl p-8 text-white"
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
                <span className="text-2xl font-bold">
                  {currentUser?.name ? currentUser.name[0] : 'A'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {greeting}, {currentUser?.name || 'Admin'}!
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
                    3
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            className={`bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${stat.bgColor} border border-white`}
          >
            <Link href={stat.link} className="block p-6 h-full">
              <div className="flex justify-between items-center">
                <div className="p-3 rounded-xl bg-white">
                  {stat.icon}
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 
                  ${stat.isIncrease ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                  {stat.isIncrease ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                  {stat.change}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending verifications */}
        <motion.section 
          className="lg:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Pending Doctor Verifications</h2>
            <Link href="/admin-dashboard/manage-doctors" className="text-primary hover:text-secondary text-sm font-medium flex items-center gap-1">
              View all <FiArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-md overflow-hidden">
            {pendingVerifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {pendingVerifications.map((doctor) => (
                  <div key={doctor.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-xl overflow-hidden">
                            <Image
                              src={doctor.image}
                              alt={doctor.name}
                              width={56}
                              height={56}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md flex items-center justify-center bg-amber-100 text-amber-600">
                            <FiClock size={14} />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                          <p className="text-sm text-gray-500">{doctor.specialty}</p>
                          <div className="text-xs text-gray-400 mt-1">
                            Submitted: {new Date(doctor.submittedAt).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="p-2 rounded-xl bg-red-50 text-danger hover:bg-red-100 transition-colors">
                          <FiX size={18} />
                        </button>
                        <button className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                          <FiCheck size={18} />
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-secondary transition-colors">
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-primary">
                  <FiCheckCircle size={32} />
                </div>
                <h3 className="mt-4 text-lg font-medium">All caught up!</h3>
                <p className="text-gray-500">There are no pending verifications at the moment.</p>
              </div>
            )}
          </div>

          {/* Platform overview */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Platform Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {overviewStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition-all"
                >
                  <div className={`p-3 rounded-xl inline-flex 
                    ${index === 0 ? 'bg-secondary/10 text-secondary' : 
                      index === 1 ? 'bg-primary/10 text-primary' : 
                      'bg-primary/10 text-primary'}
                  `}>
                    {stat.icon}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <div className="flex items-end">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className="ml-2 text-xs text-green-600">{stat.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Recent Activity Feed */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-sm text-primary hover:text-secondary flex items-center gap-1">
              <FiFilter size={14} /> Filter
            </button>
          </div>
          
          <div className="bg-white rounded-3xl shadow-md h-[calc(100%-2rem)]">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Activity Feed</h3>
                <Link href="#" className="text-xs text-primary hover:text-secondary">
                  View all
                </Link>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[600px] p-2">
              {recentActivities.map((activity) => {
                const { icon, bgColor, textColor } = getActivityUI(activity.type);
                return (
                  <div key={activity.id} className="p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${bgColor} ${textColor}`}>
                        {icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <button className="w-full py-2 text-center text-sm text-primary hover:text-secondary">
                Load more
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick actions section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/admin-dashboard/manage-doctors" className="group bg-gradient-to-r from-secondary to-primary rounded-3xl shadow-md p-6 text-white transition-transform hover:-translate-y-1">
            <FiUserCheck size={24} className="mb-4" />
            <h3 className="text-lg font-medium mb-1">Verify Doctors</h3>
            <p className="text-sm text-white/80">{pendingVerifications.length} pending verification{pendingVerifications.length !== 1 ? 's' : ''}</p>
          </Link>
          
          <Link href="/admin-dashboard/emergency-calls" className="group bg-gradient-to-r from-danger to-red-500 rounded-3xl shadow-md p-6 text-white transition-transform hover:-translate-y-1">
            <FiAlertTriangle size={24} className="mb-4" />
            <h3 className="text-lg font-medium mb-1">Emergency Calls</h3>
            <p className="text-sm text-white/80">View active emergencies</p>
          </Link>
          
          <Link href="/admin-dashboard/appointments" className="group bg-gradient-to-r from-primary to-secondary rounded-3xl shadow-md p-6 text-white transition-transform hover:-translate-y-1">
            <FiCalendar size={24} className="mb-4" />
            <h3 className="text-lg font-medium mb-1">Manage Appointments</h3>
            <p className="text-sm text-white/80">Review scheduling conflicts</p>
          </Link>
          
          <Link href="/admin-dashboard/analytics" className="group bg-gradient-to-r from-secondary to-primary rounded-3xl shadow-md p-6 text-white transition-transform hover:-translate-y-1">
            <FiActivity size={24} className="mb-4" />
            <h3 className="text-lg font-medium mb-1">Platform Analytics</h3>
            <p className="text-sm text-white/80">View performance metrics</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
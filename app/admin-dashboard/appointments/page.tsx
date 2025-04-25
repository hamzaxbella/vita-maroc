'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FiCalendar, FiSearch, FiFilter, FiEye, FiCheck, 
  FiX, FiDownload, FiPhone, FiMail, FiClock,
  FiMapPin, FiUser, FiAlertCircle, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

// Import images
import doctorImg from '@/public/doctor.png';
import patientImg from '@/public/phones.png';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentAppointment, setCurrentAppointment] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0
  });

  useEffect(() => {
    // Fetch appointments data
    // In a real app, this would be an API call
    const fetchAppointments = async () => {
      try {
        // Mock data for demonstration
        const mockAppointments = [
          {
            id: '1',
            patientName: 'Mohammed Alaoui',
            patientEmail: 'mohammed.a@example.com',
            patientPhone: '+212 612-345678',
            patientImage: patientImg,
            doctorName: 'Dr. Ahmed Khaled',
            doctorSpecialty: 'General Practitioner',
            doctorImage: doctorImg,
            date: '2025-05-01',
            time: '09:30',
            status: 'upcoming',
            type: 'in-person',
            location: 'Main Clinic, Casablanca',
            notes: 'Regular check-up, patient has mild hypertension',
            duration: 30 // minutes
          },
          {
            id: '2',
            patientName: 'Fatima Benjelloun',
            patientEmail: 'fatima.b@example.com',
            patientPhone: '+212 613-456789',
            patientImage: patientImg,
            doctorName: 'Dr. Laila Kadiri',
            doctorSpecialty: 'Dermatologist',
            doctorImage: doctorImg,
            date: '2025-04-30',
            time: '14:00',
            status: 'upcoming',
            type: 'in-person',
            location: 'Dermatology Clinic, Rabat',
            notes: 'Follow-up on skin condition',
            duration: 20 // minutes
          },
          {
            id: '3',
            patientName: 'Hassan Ouazzani',
            patientEmail: 'hassan.o@example.com',
            patientPhone: '+212 616-789012',
            patientImage: patientImg,
            doctorName: 'Dr. Youssef Benjelloun',
            doctorSpecialty: 'Cardiologist',
            doctorImage: doctorImg,
            date: '2025-04-28',
            time: '10:15',
            status: 'upcoming',
            type: 'virtual',
            location: 'Virtual Consultation',
            notes: 'Heart palpitations, needs ECG analysis',
            duration: 45 // minutes
          },
          {
            id: '4',
            patientName: 'Amina Labiad',
            patientEmail: 'amina.l@example.com',
            patientPhone: '+212 615-678901',
            patientImage: patientImg,
            doctorName: 'Dr. Sara Alami',
            doctorSpecialty: 'Pediatrician',
            doctorImage: doctorImg,
            date: '2025-04-20',
            time: '16:30',
            status: 'completed',
            type: 'in-person',
            location: 'Pediatric Center, Tangier',
            notes: 'Vaccination for child',
            duration: 15 // minutes
          },
          {
            id: '5',
            patientName: 'Karim Tazi',
            patientEmail: 'karim.t@example.com',
            patientPhone: '+212 614-567890',
            patientImage: patientImg,
            doctorName: 'Dr. Ahmed Khaled',
            doctorSpecialty: 'General Practitioner',
            doctorImage: doctorImg,
            date: '2025-04-15',
            time: '11:00',
            status: 'completed',
            type: 'home-visit',
            location: 'Patient home, Marrakech',
            notes: 'Patient requested home visit due to mobility issues',
            duration: 60 // minutes
          },
          {
            id: '6',
            patientName: 'Mohammed Alaoui',
            patientEmail: 'mohammed.a@example.com',
            patientPhone: '+212 612-345678',
            patientImage: patientImg,
            doctorName: 'Dr. Ahmed Khaled',
            doctorSpecialty: 'General Practitioner',
            doctorImage: doctorImg,
            date: '2025-04-10',
            time: '09:30',
            status: 'completed',
            type: 'in-person',
            location: 'Main Clinic, Casablanca',
            notes: 'Regular check-up, prescribed medication for hypertension',
            duration: 30 // minutes
          },
          {
            id: '7',
            patientName: 'Fatima Benjelloun',
            patientEmail: 'fatima.b@example.com',
            patientPhone: '+212 613-456789',
            patientImage: patientImg,
            doctorName: 'Dr. Youssef Benjelloun',
            doctorSpecialty: 'Cardiologist',
            doctorImage: doctorImg,
            date: '2025-05-05',
            time: '13:30',
            status: 'upcoming',
            type: 'in-person',
            location: 'Cardiology Department, Rabat',
            notes: 'Annual heart check-up',
            duration: 40 // minutes
          },
          {
            id: '8',
            patientName: 'Hassan Ouazzani',
            patientEmail: 'hassan.o@example.com',
            patientPhone: '+212 616-789012',
            patientImage: patientImg,
            doctorName: 'Dr. Sara Alami',
            doctorSpecialty: 'Pediatrician',
            doctorImage: doctorImg,
            date: '2025-03-20',
            time: '10:00',
            status: 'cancelled',
            type: 'in-person',
            location: 'Pediatric Center, Fez',
            notes: 'Patient cancelled due to schedule conflict',
            duration: 30 // minutes
          },
        ];

        // Calculate stats
        const totalAppointments = mockAppointments.length;
        const upcomingAppointments = mockAppointments.filter(a => a.status === 'upcoming').length;
        const completedAppointments = mockAppointments.filter(a => a.status === 'completed').length;
        const cancelledAppointments = mockAppointments.filter(a => a.status === 'cancelled').length;

        setStats({
          total: totalAppointments,
          upcoming: upcomingAppointments,
          completed: completedAppointments,
          cancelled: cancelledAppointments
        });

        setAppointments(mockAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter and sort appointments
  const filteredAppointments = appointments.filter(appointment => {
    // Apply search term filter
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    
    // Apply type filter
    const matchesType = filterType === 'all' || appointment.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a, b) => {
    // Apply sorting
    if (sortBy === 'date') {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return dateB - dateA;
    } else if (sortBy === 'patient') {
      return a.patientName.localeCompare(b.patientName);
    } else if (sortBy === 'doctor') {
      return a.doctorName.localeCompare(b.doctorName);
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const openAppointmentDetails = (appointment: any) => {
    setCurrentAppointment(appointment);
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'upcoming':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Upcoming</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Cancelled</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const getAppointmentTypeBadge = (type: string) => {
    switch(type) {
      case 'in-person':
        return <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">In-person</span>;
      case 'virtual':
        return <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">Virtual</span>;
      case 'home-visit':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Home Visit</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{type}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage all appointments across doctors and patients.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 flex items-center gap-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-secondary transition-colors">
            <FiDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-gray-100">
              <FiCalendar size={20} className="text-gray-600" />
            </div>
            <div className="text-xs text-gray-500">All Appointments</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-gray-500 mt-1">Total appointments</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-blue-100">
              <FiCalendar size={20} className="text-blue-600" />
            </div>
            <div className="text-xs text-gray-500">Upcoming</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.upcoming}</div>
            <div className="text-xs text-gray-500 mt-1">Scheduled appointments</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-green-100">
              <FiCheck size={20} className="text-green-600" />
            </div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.completed}</div>
            <div className="text-xs text-gray-500 mt-1">Completed appointments</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-red-100">
              <FiX size={20} className="text-red-600" />
            </div>
            <div className="text-xs text-gray-500">Cancelled</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.cancelled}</div>
            <div className="text-xs text-gray-500 mt-1">Cancelled appointments</div>
          </div>
        </div>
      </div>

      {/* Search and filter bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search appointments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="in-person">In-person</option>
                <option value="virtual">Virtual</option>
                <option value="home-visit">Home Visit</option>
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="patient">Sort by Patient</option>
                <option value="doctor">Sort by Doctor</option>
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Appointments table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-8 text-center">
            <FiCalendar size={40} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-gray-500 text-lg font-medium">No appointments found</h3>
            <p className="text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((appointment) => (
                    <motion.tr 
                      key={appointment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(appointment.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <FiClock className="mr-1" size={12} />
                          {appointment.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {appointment.patientImage ? (
                              <Image 
                                src={appointment.patientImage} 
                                alt={appointment.patientName} 
                                width={32} 
                                height={32}
                                className="h-8 w-8 object-cover"
                              />
                            ) : (
                              <span className="text-gray-600 font-medium">{appointment.patientName[0]}</span>
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                            <div className="text-xs text-gray-500">{appointment.patientPhone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {appointment.doctorImage ? (
                              <Image 
                                src={appointment.doctorImage} 
                                alt={appointment.doctorName} 
                                width={32} 
                                height={32}
                                className="h-8 w-8 object-cover"
                              />
                            ) : (
                              <span className="text-gray-600 font-medium">{appointment.doctorName[0]}</span>
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{appointment.doctorName}</div>
                            <div className="text-xs text-gray-500">{appointment.doctorSpecialty}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getAppointmentTypeBadge(appointment.type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(appointment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 max-w-[150px] truncate" title={appointment.location}>
                          {appointment.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => openAppointmentDetails(appointment)}
                          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                          title="View Details"
                        >
                          <FiEye size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {filteredAppointments.length > itemsPerPage && (
              <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAppointments.length)} of {filteredAppointments.length} appointments
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiChevronLeft size={18} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${currentPage === page ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Appointment details modal */}
      {showModal && currentAppointment && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="appointment-modal" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowModal(false)}
              aria-hidden="true"
            ></div>

            {/* This element centers the modal */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
            >
              {/* Modal header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Appointment Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  aria-label="Close"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-6">
                {/* Status and type */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {getStatusBadge(currentAppointment.status)}
                  {getAppointmentTypeBadge(currentAppointment.type)}
                </div>

                {/* Date and time */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-center">
                      <FiCalendar className="text-gray-500 mr-2" size={20} />
                      <div>
                        <div className="text-sm font-medium">Date</div>
                        <div className="text-lg font-semibold">
                          {new Date(currentAppointment.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FiClock className="text-gray-500 mr-2" size={20} />
                      <div>
                        <div className="text-sm font-medium">Time</div>
                        <div className="text-lg font-semibold">{currentAppointment.time} ({currentAppointment.duration} min)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patient and doctor info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Patient info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-500 mb-3">Patient</h4>
                    <div className="flex items-start">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {currentAppointment.patientImage ? (
                          <Image 
                            src={currentAppointment.patientImage} 
                            alt={currentAppointment.patientName} 
                            width={48} 
                            height={48}
                            className="h-12 w-12 object-cover"
                          />
                        ) : (
                          <span className="text-gray-600 font-medium">{currentAppointment.patientName[0]}</span>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{currentAppointment.patientName}</div>
                        <div className="text-sm flex items-center text-gray-600 mt-1">
                          <FiMail className="mr-1" size={14} />
                          {currentAppointment.patientEmail}
                        </div>
                        <div className="text-sm flex items-center text-gray-600 mt-1">
                          <FiPhone className="mr-1" size={14} />
                          {currentAppointment.patientPhone}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Doctor info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-500 mb-3">Doctor</h4>
                    <div className="flex items-start">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {currentAppointment.doctorImage ? (
                          <Image 
                            src={currentAppointment.doctorImage} 
                            alt={currentAppointment.doctorName} 
                            width={48} 
                            height={48}
                            className="h-12 w-12 object-cover"
                          />
                        ) : (
                          <span className="text-gray-600 font-medium">{currentAppointment.doctorName[0]}</span>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{currentAppointment.doctorName}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {currentAppointment.doctorSpecialty}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-500 mb-2">Location</h4>
                  <div className="flex items-start">
                    <FiMapPin className="text-gray-500 mt-0.5 mr-2" size={18} />
                    <span>{currentAppointment.location}</span>
                  </div>
                </div>

                {/* Notes */}
                {currentAppointment.notes && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-500 mb-2">Notes</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      {currentAppointment.notes}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-wrap justify-end gap-2">
                {currentAppointment.status === 'upcoming' && (
                  <>
                    <button className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium">
                      Cancel Appointment
                    </button>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
                      Reschedule
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FiUserCheck, FiSearch, FiFilter, FiEye, FiCheck, 
  FiX, FiDownload, FiMoreVertical, FiPhone, FiMail,
  FiMapPin, FiCalendar, FiAlertCircle
} from 'react-icons/fi';

// Import images
import doctorImg from '@/public/doctor.png';

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentDoctor, setCurrentDoctor] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [detailView, setDetailView] = useState('profile'); // profile, documents, history

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    rejected: 0
  });

  useEffect(() => {
    // Fetch doctors data
    // In a real app, this would be an API call
    const fetchDoctors = async () => {
      try {
        // Mock data for demonstration
        const mockDoctors = [
          {
            id: '1',
            name: 'Dr. Ahmed Khaled',
            specialty: 'Cardiologist',
            email: 'ahmed.k@example.com',
            phone: '+212 612-345678',
            location: 'Casablanca',
            status: 'active',
            rating: 4.8,
            patientCount: 124,
            joinDate: '2025-01-15',
            image: doctorImg,
            about: 'Experienced cardiologist with 10+ years of clinical practice. Specializes in preventive cardiology and heart disease management.',
            education: [
              { degree: 'MD', institution: 'Casablanca Medical School', year: '2015' },
              { degree: 'Cardiology Specialization', institution: 'Hassan II University Hospital', year: '2019' },
            ],
            documents: [
              { name: 'Medical License', status: 'verified', date: '2025-01-10' },
              { name: 'Specialty Certification', status: 'verified', date: '2025-01-10' },
              { name: 'ID Verification', status: 'verified', date: '2025-01-08' },
            ]
          },
          {
            id: '2',
            name: 'Dr. Laila Kadiri',
            specialty: 'Dermatologist',
            email: 'laila.k@example.com',
            phone: '+212 613-456789',
            location: 'Rabat',
            status: 'active',
            rating: 4.9,
            patientCount: 98,
            joinDate: '2025-02-03',
            image: doctorImg,
            about: 'Board-certified dermatologist specializing in cosmetic dermatology and skin disorders.',
            education: [
              { degree: 'MD', institution: 'Mohammed V University', year: '2016' },
              { degree: 'Dermatology Specialization', institution: 'Ibn Sina Hospital', year: '2020' },
            ],
            documents: [
              { name: 'Medical License', status: 'verified', date: '2025-02-01' },
              { name: 'Specialty Certification', status: 'verified', date: '2025-02-01' },
              { name: 'ID Verification', status: 'verified', date: '2025-01-30' },
            ]
          },
          {
            id: '3',
            name: 'Dr. Youssef Benjelloun',
            specialty: 'Pediatrician',
            email: 'youssef.b@example.com',
            phone: '+212 614-567890',
            location: 'Marrakech',
            status: 'pending',
            rating: 0,
            patientCount: 0,
            joinDate: '2025-04-20',
            image: doctorImg,
            about: 'Specialist in pediatric care with a focus on newborn care and childhood development.',
            education: [
              { degree: 'MD', institution: 'Cadi Ayyad University', year: '2018' },
              { degree: 'Pediatrics Specialization', institution: 'University Hospital Mohammed VI', year: '2023' },
            ],
            documents: [
              { name: 'Medical License', status: 'pending', date: '2025-04-20' },
              { name: 'Specialty Certification', status: 'pending', date: '2025-04-20' },
              { name: 'ID Verification', status: 'verified', date: '2025-04-19' },
            ]
          },
          {
            id: '4',
            name: 'Dr. Sara Alami',
            specialty: 'Neurologist',
            email: 'sara.a@example.com',
            phone: '+212 615-678901',
            location: 'Agadir',
            status: 'pending',
            rating: 0,
            patientCount: 0,
            joinDate: '2025-04-18',
            image: doctorImg,
            about: 'Neurologist with expertise in headache disorders, stroke management, and neurodegenerative diseases.',
            education: [
              { degree: 'MD', institution: 'Ibn Zohr University', year: '2017' },
              { degree: 'Neurology Specialization', institution: 'Hassan I University Hospital', year: '2022' },
            ],
            documents: [
              { name: 'Medical License', status: 'pending', date: '2025-04-18' },
              { name: 'Specialty Certification', status: 'pending', date: '2025-04-18' },
              { name: 'ID Verification', status: 'verified', date: '2025-04-17' },
            ]
          },
          {
            id: '5',
            name: 'Dr. Karim Tazi',
            specialty: 'Orthopedic Surgeon',
            email: 'karim.t@example.com',
            phone: '+212 616-789012',
            location: 'Tangier',
            status: 'rejected',
            rating: 0,
            patientCount: 0,
            joinDate: '2025-03-25',
            image: doctorImg,
            about: 'Orthopedic surgeon specializing in sports injuries and joint replacement procedures.',
            education: [
              { degree: 'MD', institution: 'Abdelmalek Essaâdi University', year: '2016' },
              { degree: 'Orthopedic Surgery Specialization', institution: 'Mohammed V Military Hospital', year: '2021' },
            ],
            documents: [
              { name: 'Medical License', status: 'rejected', date: '2025-03-30', reason: 'License number verification failed' },
              { name: 'Specialty Certification', status: 'verified', date: '2025-03-28' },
              { name: 'ID Verification', status: 'verified', date: '2025-03-26' },
            ]
          }
        ];

        // Calculate stats
        const totalDoctors = mockDoctors.length;
        const activeDoctors = mockDoctors.filter(doc => doc.status === 'active').length;
        const pendingDoctors = mockDoctors.filter(doc => doc.status === 'pending').length;
        const rejectedDoctors = mockDoctors.filter(doc => doc.status === 'rejected').length;

        setStats({
          total: totalDoctors,
          active: activeDoctors,
          pending: pendingDoctors,
          rejected: rejectedDoctors
        });

        setDoctors(mockDoctors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter and sort doctors
  const filteredDoctors = doctors.filter(doctor => {
    // Apply search term filter
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = filterStatus === 'all' || doctor.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    // Apply sorting
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const openDoctorDetails = (doctor: any) => {
    setCurrentDoctor(doctor);
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Pending</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const verifyDoctor = (doctorId: string) => {
    setDoctors(doctors.map(doc => 
      doc.id === doctorId 
        ? {...doc, status: 'active', documents: doc.documents.map((d: any) => ({...d, status: 'verified'}))} 
        : doc
    ));
    // In a real app, this would be an API call to update the doctor's status
    // After verification, close the modal if it was open for this doctor
    if (currentDoctor?.id === doctorId) {
      setCurrentDoctor({...currentDoctor, status: 'active', documents: currentDoctor.documents.map((d: any) => ({...d, status: 'verified'}))});
    }
  };

  const rejectDoctor = (doctorId: string) => {
    setDoctors(doctors.map(doc => 
      doc.id === doctorId 
        ? {...doc, status: 'rejected'} 
        : doc
    ));
    // In a real app, this would be an API call to update the doctor's status
    // After rejection, close the modal if it was open for this doctor
    if (currentDoctor?.id === doctorId) {
      setCurrentDoctor({...currentDoctor, status: 'rejected'});
    }
  };

  const getVerifyActionButton = (doctor: any) => {
    if (doctor.status === 'pending') {
      return (
        <div className="flex space-x-2">
          <button 
            onClick={() => rejectDoctor(doctor.id)} 
            className="p-2 rounded-xl bg-red-50 text-danger hover:bg-red-100 transition-colors"
            title="Reject"
          >
            <FiX size={18} />
          </button>
          <button 
            onClick={() => verifyDoctor(doctor.id)} 
            className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
            title="Approve"
          >
            <FiCheck size={18} />
          </button>
        </div>
      );
    } else if (doctor.status === 'rejected') {
      return (
        <button 
          onClick={() => verifyDoctor(doctor.id)} 
          className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
        >
          Reconsider
        </button>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Doctors</h1>
          <p className="text-gray-500 mt-1">View and manage doctor accounts, verify credentials, and monitor activity.</p>
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
              <FiUserCheck size={20} className="text-gray-600" />
            </div>
            <div className="text-xs text-gray-500">All Doctors</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-gray-500 mt-1">Total registered</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-green-100">
              <FiUserCheck size={20} className="text-green-600" />
            </div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.active}</div>
            <div className="text-xs text-gray-500 mt-1">Verified doctors</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-amber-100">
              <FiUserCheck size={20} className="text-amber-600" />
            </div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-xs text-gray-500 mt-1">Awaiting verification</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-red-100">
              <FiUserCheck size={20} className="text-red-600" />
            </div>
            <div className="text-xs text-gray-500">Rejected</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <div className="text-xs text-gray-500 mt-1">Failed verification</div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search doctors by name, specialty, or email" 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 min-w-[150px]">
              <FiFilter size={16} className="text-gray-400" />
              <select 
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center gap-2 min-w-[150px]">
              <span className="text-sm text-gray-500">Sort:</span>
              <select 
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="date">Join Date</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors list */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading doctors...</p>
            </div>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiUserCheck size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">No doctors found</h3>
            <p className="text-gray-500 text-center mt-2">
              No doctors match your filters. Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-xl overflow-hidden">
                          <Image 
                            src={doctor.image} 
                            alt={doctor.name} 
                            width={48} 
                            height={48} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.specialty}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <FiMapPin size={10} />
                            {doctor.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-2">
                        <FiMail size={14} className="text-gray-400" />
                        {doctor.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <FiPhone size={14} className="text-gray-400" />
                        {doctor.phone}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <FiCalendar size={10} />
                        Joined: {new Date(doctor.joinDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {doctor.status === 'active' ? (
                        <>
                          <div className="text-sm flex items-center gap-1">
                            <span className="font-medium">Rating:</span>
                            <span className="text-amber-500">{doctor.rating}</span> 
                            <span className="text-xs">/ 5.0</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Patients:</span> {doctor.patientCount}
                          </div>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">No stats available</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusBadge(doctor.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openDoctorDetails(doctor)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          title="View Details"
                        >
                          <FiEye size={18} className="text-gray-600" />
                        </button>
                        
                        {getVerifyActionButton(doctor)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Doctor details modal */}
      {showModal && currentDoctor && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Doctor Details</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Doctor basic info sidebar */}
                  <div className="md:w-1/3 space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="h-24 w-24 rounded-xl overflow-hidden mb-3">
                        <Image 
                          src={currentDoctor.image} 
                          alt={currentDoctor.name} 
                          width={96} 
                          height={96} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900">{currentDoctor.name}</h3>
                      <p className="text-sm text-gray-500">{currentDoctor.specialty}</p>
                      <div className="mt-2">
                        {getStatusBadge(currentDoctor.status)}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <FiMail size={16} className="text-primary" />
                          </div>
                          <div className="text-sm">{currentDoctor.email}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <FiPhone size={16} className="text-primary" />
                          </div>
                          <div className="text-sm">{currentDoctor.phone}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <FiMapPin size={16} className="text-primary" />
                          </div>
                          <div className="text-sm">{currentDoctor.location}</div>
                        </div>
                      </div>
                    </div>

                    {currentDoctor.status === 'pending' && (
                      <div className="flex flex-col gap-3">
                        <button 
                          onClick={() => verifyDoctor(currentDoctor.id)}
                          className="w-full py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <FiCheck size={18} />
                            Approve Doctor
                          </div>
                        </button>
                        <button 
                          onClick={() => rejectDoctor(currentDoctor.id)}
                          className="w-full py-2 bg-danger text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <FiX size={18} />
                            Reject Application
                          </div>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Detail tabs */}
                  <div className="md:w-2/3">
                    <div className="flex border-b border-gray-200 mb-6">
                      <button
                        className={`pb-3 px-4 text-sm font-medium ${detailView === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                        onClick={() => setDetailView('profile')}
                      >
                        Profile
                      </button>
                      <button
                        className={`pb-3 px-4 text-sm font-medium ${detailView === 'documents' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                        onClick={() => setDetailView('documents')}
                      >
                        Documents
                      </button>
                      <button
                        className={`pb-3 px-4 text-sm font-medium ${detailView === 'history' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                        onClick={() => setDetailView('history')}
                      >
                        Activity History
                      </button>
                    </div>

                    {/* Profile view */}
                    {detailView === 'profile' && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">About</h4>
                          <p className="text-sm text-gray-600">{currentDoctor.about}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Education & Training</h4>
                          <div className="space-y-3">
                            {currentDoctor.education.map((edu: any, index: number) => (
                              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-sm font-medium">{edu.degree}</div>
                                <div className="text-xs text-gray-500">{edu.institution}, {edu.year}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {currentDoctor.status === 'active' && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Performance</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">Rating</div>
                                <div className="text-xl font-bold flex items-center gap-1">
                                  {currentDoctor.rating}
                                  <span className="text-amber-500 text-base">★</span>
                                </div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">Total Patients</div>
                                <div className="text-xl font-bold">{currentDoctor.patientCount}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Documents view */}
                    {detailView === 'documents' && (
                      <div className="space-y-6">
                        <h4 className="text-sm font-medium text-gray-700">Verification Documents</h4>
                        <div className="space-y-4">
                          {currentDoctor.documents.map((doc: any, index: number) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-2">
                                <div className="text-sm font-medium">{doc.name}</div>
                                {doc.status === 'verified' ? (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Verified</span>
                                ) : doc.status === 'rejected' ? (
                                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Rejected</span>
                                ) : (
                                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Pending</span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 mb-3">
                                Uploaded: {new Date(doc.date).toLocaleDateString()}
                              </div>
                              
                              {/* Mock document preview - in real app would be an actual document viewer */}
                              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-gray-400 mb-2">Document Preview</div>
                                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                                    View Full Document
                                  </button>
                                </div>
                              </div>

                              {doc.reason && (
                                <div className="mt-3 p-3 bg-red-50 rounded-lg text-sm text-red-700 flex items-start gap-2">
                                  <FiAlertCircle size={16} className="mt-0.5" />
                                  <div>
                                    <div className="font-medium">Rejection Reason</div>
                                    <div>{doc.reason}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* History view */}
                    {detailView === 'history' && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-4">Activity Timeline</h4>
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <FiUserCheck size={16} className="text-primary" />
                              </div>
                              <div className="flex-1 w-px bg-gray-200 my-1"></div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Account created</div>
                              <div className="text-xs text-gray-500 mb-1">
                                {new Date(currentDoctor.joinDate).toLocaleDateString()} at {new Date(currentDoctor.joinDate).toLocaleTimeString()}
                              </div>
                              <div className="text-sm text-gray-600">
                                {currentDoctor.name} signed up as a {currentDoctor.specialty}.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                                <FiDownload size={16} className="text-secondary" />
                              </div>
                              <div className="flex-1 w-px bg-gray-200 my-1"></div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Documents uploaded</div>
                              <div className="text-xs text-gray-500 mb-1">
                                {new Date(currentDoctor.joinDate).toLocaleDateString()} at {new Date(currentDoctor.joinDate).toLocaleTimeString()}
                              </div>
                              <div className="text-sm text-gray-600">
                                {currentDoctor.documents.length} verification documents were uploaded.
                              </div>
                            </div>
                          </div>
                          
                          {currentDoctor.status !== 'pending' && (
                            <div className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full ${currentDoctor.status === 'active' ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center`}>
                                  {currentDoctor.status === 'active' ? (
                                    <FiCheck size={16} className="text-green-600" />
                                  ) : (
                                    <FiX size={16} className="text-red-600" />
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium">
                                  {currentDoctor.status === 'active' ? 'Account verified' : 'Account rejected'}
                                </div>
                                <div className="text-xs text-gray-500 mb-1">
                                  {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {currentDoctor.status === 'active' 
                                    ? 'Doctor verification completed successfully.' 
                                    : 'Doctor verification was rejected.'}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
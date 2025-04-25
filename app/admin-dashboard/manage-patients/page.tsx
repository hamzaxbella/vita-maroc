'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FiUsers, FiSearch, FiFilter, FiEye, FiCheck, 
  FiX, FiDownload, FiMoreVertical, FiPhone, FiMail,
  FiMapPin, FiCalendar, FiAlertCircle
} from 'react-icons/fi';

// Import images
import patientImg from '@/public/phones.png';

export default function ManagePatients() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [detailView, setDetailView] = useState('profile'); // profile, records, appointments

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    new: 0
  });

  useEffect(() => {
    // Fetch patients data
    // In a real app, this would be an API call
    const fetchPatients = async () => {
      try {
        // Mock data for demonstration
        const mockPatients = [
          {
            id: '1',
            name: 'Mohammed Alaoui',
            email: 'mohammed.a@example.com',
            phone: '+212 612-345678',
            location: 'Casablanca',
            status: 'active',
            joinDate: '2025-01-15',
            image: patientImg,
            age: 42,
            gender: 'Male',
            appointmentCount: 8,
            lastVisit: '2025-04-15',
            medicalRecords: [
              { date: '2025-04-15', type: 'Check-up', doctor: 'Dr. Ahmed Khaled' },
              { date: '2025-03-02', type: 'Blood Test', doctor: 'Dr. Laila Kadiri' },
            ]
          },
          {
            id: '2',
            name: 'Fatima Benjelloun',
            email: 'fatima.b@example.com',
            phone: '+212 613-456789',
            location: 'Rabat',
            status: 'active',
            joinDate: '2025-02-05',
            image: patientImg,
            age: 35,
            gender: 'Female',
            appointmentCount: 4,
            lastVisit: '2025-04-10',
            medicalRecords: [
              { date: '2025-04-10', type: 'Consultation', doctor: 'Dr. Youssef Benjelloun' },
              { date: '2025-02-22', type: 'Vaccination', doctor: 'Dr. Ahmed Khaled' },
            ]
          },
          {
            id: '3',
            name: 'Karim Tazi',
            email: 'karim.t@example.com',
            phone: '+212 614-567890',
            location: 'Marrakech',
            status: 'inactive',
            joinDate: '2024-10-12',
            image: patientImg,
            age: 28,
            gender: 'Male',
            appointmentCount: 1,
            lastVisit: '2024-10-12',
            medicalRecords: [
              { date: '2024-10-12', type: 'Initial Consultation', doctor: 'Dr. Sara Alami' },
            ]
          },
          {
            id: '4',
            name: 'Amina Labiad',
            email: 'amina.l@example.com',
            phone: '+212 615-678901',
            location: 'Tangier',
            status: 'new',
            joinDate: '2025-04-20',
            image: patientImg,
            age: 31,
            gender: 'Female',
            appointmentCount: 0,
            lastVisit: null,
            medicalRecords: []
          },
          {
            id: '5',
            name: 'Hassan Ouazzani',
            email: 'hassan.o@example.com',
            phone: '+212 616-789012',
            location: 'Fez',
            status: 'new',
            joinDate: '2025-04-18',
            image: patientImg,
            age: 45,
            gender: 'Male',
            appointmentCount: 0,
            lastVisit: null,
            medicalRecords: []
          }
        ];

        // Calculate stats
        const totalPatients = mockPatients.length;
        const activePatients = mockPatients.filter(p => p.status === 'active').length;
        const inactivePatients = mockPatients.filter(p => p.status === 'inactive').length;
        const newPatients = mockPatients.filter(p => p.status === 'new').length;

        setStats({
          total: totalPatients,
          active: activePatients,
          inactive: inactivePatients,
          new: newPatients
        });

        setPatients(mockPatients);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter and sort patients
  const filteredPatients = patients.filter(patient => {
    // Apply search term filter
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    // Apply sorting
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
    } else if (sortBy === 'appointments') {
      return b.appointmentCount - a.appointmentCount;
    }
    return 0;
  });

  const openPatientDetails = (patient: any) => {
    setCurrentPatient(patient);
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Inactive</span>;
      case 'new':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">New</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Patients</h1>
          <p className="text-gray-500 mt-1">View and manage patient accounts, medical records, and appointments.</p>
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
              <FiUsers size={20} className="text-gray-600" />
            </div>
            <div className="text-xs text-gray-500">All Patients</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-gray-500 mt-1">Total registered</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-green-100">
              <FiUsers size={20} className="text-green-600" />
            </div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.active}</div>
            <div className="text-xs text-gray-500 mt-1">Active patients</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-blue-100">
              <FiUsers size={20} className="text-blue-600" />
            </div>
            <div className="text-xs text-gray-500">New</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.new}</div>
            <div className="text-xs text-gray-500 mt-1">New registrations</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-gray-200">
              <FiUsers size={20} className="text-gray-600" />
            </div>
            <div className="text-xs text-gray-500">Inactive</div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.inactive}</div>
            <div className="text-xs text-gray-500 mt-1">Inactive accounts</div>
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
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="new">New</option>
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Date</option>
                <option value="appointments">Sort by Appointments</option>
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Patients table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="p-8 text-center">
            <FiSearch size={40} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-gray-500 text-lg font-medium">No patients found</h3>
            <p className="text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <motion.tr 
                    key={patient.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {patient.image ? (
                            <Image 
                              src={patient.image} 
                              alt={patient.name} 
                              width={40} 
                              height={40}
                              className="h-10 w-10 object-cover"
                            />
                          ) : (
                            <span className="text-gray-600 font-medium">{patient.name[0]}</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-xs text-gray-500">{patient.age} years • {patient.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.email}</div>
                      <div className="text-xs text-gray-500">{patient.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(patient.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.appointmentCount} {patient.appointmentCount === 1 ? 'visit' : 'visits'}
                      {patient.lastVisit && (
                        <div className="text-xs text-gray-400">
                          Last: {new Date(patient.lastVisit).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(patient.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => openPatientDetails(patient)}
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
        )}
      </div>

      {/* Patient details modal */}
      {showModal && currentPatient && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="patient-modal" role="dialog" aria-modal="true">
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
                <h3 className="text-lg font-medium text-gray-900">Patient Details</h3>
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
                {/* Profile header */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {currentPatient.image ? (
                      <Image 
                        src={currentPatient.image} 
                        alt={currentPatient.name} 
                        width={80} 
                        height={80}
                        className="h-20 w-20 object-cover"
                      />
                    ) : (
                      <span className="text-gray-600 text-2xl font-medium">{currentPatient.name[0]}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">{currentPatient.name}</h2>
                    <div className="mt-2 flex flex-wrap gap-2 md:gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMail className="mr-1" size={16} />
                        {currentPatient.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiPhone className="mr-1" size={16} />
                        {currentPatient.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMapPin className="mr-1" size={16} />
                        {currentPatient.location}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="flex items-center text-sm text-gray-500 mr-4">
                        <FiCalendar className="mr-1" size={16} />
                        Joined {new Date(currentPatient.joinDate).toLocaleDateString()}
                      </div>
                      {getStatusBadge(currentPatient.status)}
                    </div>
                  </div>
                </div>

                {/* Tab navigation */}
                <div className="border-b border-gray-200 mt-6">
                  <div className="flex">
                    <button
                      onClick={() => setDetailView('profile')}
                      className={`px-4 py-2 border-b-2 text-sm font-medium ${
                        detailView === 'profile'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => setDetailView('records')}
                      className={`px-4 py-2 border-b-2 text-sm font-medium ${
                        detailView === 'records'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Medical Records
                    </button>
                    <button
                      onClick={() => setDetailView('appointments')}
                      className={`px-4 py-2 border-b-2 text-sm font-medium ${
                        detailView === 'appointments'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Appointments
                    </button>
                  </div>
                </div>

                {/* Tab content */}
                <div className="mt-4">
                  {detailView === 'profile' && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500">Age</div>
                          <div className="font-medium">{currentPatient.age} years</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500">Gender</div>
                          <div className="font-medium">{currentPatient.gender}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500">Total Appointments</div>
                          <div className="font-medium">{currentPatient.appointmentCount}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500">Last Visit</div>
                          <div className="font-medium">
                            {currentPatient.lastVisit 
                              ? new Date(currentPatient.lastVisit).toLocaleDateString() 
                              : 'No visits yet'}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <h4 className="font-medium text-gray-800">Patient Actions</h4>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition-colors">
                            View Complete History
                          </button>
                          <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                            Send Message
                          </button>
                          {currentPatient.status === 'active' ? (
                            <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors">
                              Deactivate Account
                            </button>
                          ) : (
                            <button className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition-colors">
                              Activate Account
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {detailView === 'records' && (
                    <div>
                      {currentPatient.medicalRecords.length === 0 ? (
                        <div className="text-center py-6">
                          <FiAlertCircle size={40} className="mx-auto text-gray-400 mb-2" />
                          <h3 className="text-gray-500 font-medium">No medical records found</h3>
                          <p className="text-gray-400 text-sm">This patient has no medical records yet</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {currentPatient.medicalRecords.map((record: any, index: number) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                              <div>
                                <div className="font-medium">{record.type}</div>
                                <div className="text-sm text-gray-500">{record.doctor}</div>
                                <div className="text-xs text-gray-400">{new Date(record.date).toLocaleDateString()}</div>
                              </div>
                              <button className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg">
                                <FiEye size={18} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {detailView === 'appointments' && (
                    <div>
                      {currentPatient.appointmentCount === 0 ? (
                        <div className="text-center py-6">
                          <FiCalendar size={40} className="mx-auto text-gray-400 mb-2" />
                          <h3 className="text-gray-500 font-medium">No appointments found</h3>
                          <p className="text-gray-400 text-sm">This patient has no appointments yet</p>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <FiCalendar size={40} className="mx-auto text-gray-400 mb-2" />
                          <h3 className="text-gray-500 font-medium">Appointment history available</h3>
                          <p className="text-gray-400 text-sm">Patient has {currentPatient.appointmentCount} visits</p>
                          <button className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-secondary transition-colors">
                            View Appointment History
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-wrap justify-end gap-2">
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
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiFilter, FiChevronDown, FiUser, FiClock, FiFileText, FiPhone, FiCalendar, FiMessageSquare } from 'react-icons/fi';

// Import images
import patientImg from '@/public/phones.png';

// Type definitions
type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  lastVisit: string;
  visits: number;
  phone: string;
  email: string;
  medicalConditions?: string[];
  medications?: string[];
  avatar: string;
};

export default function MyPatients() {
  // Sample data - in a real app, this would come from an API
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'PT-3245',
      name: 'Emily Rodriguez',
      age: 42,
      gender: 'female',
      lastVisit: '2025-04-20',
      visits: 5,
      phone: '(555) 123-4567',
      email: 'emily.r@example.com',
      medicalConditions: ['Hypertension', 'Allergies'],
      medications: ['Amlodipine', 'Cetirizine'],
      avatar: '/phones.png'
    },
    {
      id: 'PT-2891',
      name: 'James Wilson',
      age: 35,
      gender: 'male',
      lastVisit: '2025-04-19',
      visits: 2,
      phone: '(555) 987-6543',
      email: 'jwilson@example.com',
      medicalConditions: ['Asthma'],
      medications: ['Albuterol'],
      avatar: '/phones.png'
    },
    {
      id: 'PT-4502',
      name: 'Sarah Johnson',
      age: 28,
      gender: 'female',
      lastVisit: '2025-04-15',
      visits: 1,
      phone: '(555) 234-5678',
      email: 'sarahj@example.com',
      avatar: '/phones.png'
    },
    {
      id: 'PT-1287',
      name: 'Michael Brown',
      age: 53,
      gender: 'male',
      lastVisit: '2025-04-10',
      visits: 8,
      phone: '(555) 876-5432',
      email: 'mbrown@example.com',
      medicalConditions: ['Type 2 Diabetes', 'Hypertension'],
      medications: ['Metformin', 'Lisinopril'],
      avatar: '/phones.png'
    },
    {
      id: 'PT-7865',
      name: 'Lisa Greene',
      age: 32,
      gender: 'female',
      lastVisit: '2025-04-05',
      visits: 3,
      phone: '(555) 345-6789',
      email: 'lisa.g@example.com',
      medicalConditions: ['Migraine'],
      medications: ['Sumatriptan'],
      avatar: '/phones.png'
    },
    {
      id: 'PT-5431',
      name: 'Robert Chen',
      age: 45,
      gender: 'male',
      lastVisit: '2025-03-30',
      visits: 4,
      phone: '(555) 765-4321',
      email: 'rchen@example.com',
      medicalConditions: ['GERD', 'Anxiety'],
      medications: ['Omeprazole', 'Buspirone'],
      avatar: '/phones.png'
    },
  ]);

  // Filters and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('lastVisit');
  const [filterGender, setFilterGender] = useState('all');
  
  // Format date helper function
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Filter and sort patients
  const filteredPatients = patients
    .filter(patient => {
      // Filter by search term (name, email, or ID)
      const matchesSearch = searchTerm === '' || 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase());
        
      // Filter by gender
      const matchesGender = filterGender === 'all' || patient.gender === filterGender;
      
      return matchesSearch && matchesGender;
    })
    .sort((a, b) => {
      // Sort by selected criterion
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lastVisit':
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        case 'visits':
          return b.visits - a.visits;
        case 'age':
          return b.age - a.age;
        default:
          return 0;
      }
    });
  
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Patients</h1>
        
        {/* Filters and search */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 min-w-[260px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or ID..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Sort by */}
          <div className="w-full sm:w-auto">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className="w-full sm:w-44 pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="lastVisit">Last Visit</option>
                <option value="name">Name</option>
                <option value="visits">Most Visits</option>
                <option value="age">Age</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Filter by gender */}
          <div className="w-full sm:w-auto">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className="w-full sm:w-40 pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors appearance-none"
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        {/* Number of results */}
        <div className="text-gray-500 text-sm mb-6">
          Showing {filteredPatients.length} of {patients.length} patients
        </div>
        
        {/* Patient cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPatients.map((patient) => (
            <motion.div 
              key={patient.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Patient photo and basic info */}
                <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-2">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
                    <Image 
                      src={patientImg} 
                      alt={patient.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col md:items-center">
                    <div className="md:mt-3 text-gray-500 text-xs md:text-sm">Patient ID</div>
                    <div className="font-medium">{patient.id}</div>
                  </div>
                </div>
                
                {/* Patient details */}
                <div className="flex-1 space-y-4">
                  {/* Name and actions */}
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                      <div className="text-sm text-gray-500">
                        {patient.age} years • {patient.gender[0].toUpperCase() + patient.gender.slice(1)}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href={`/doctor-dashboard/appointments/new?patient=${patient.id}`} className="p-2 rounded-lg text-success border border-success/20 bg-success/10 hover:bg-success/20 transition-colors">
                        <FiCalendar size={18} />
                      </Link>
                      <Link href={`tel:${patient.phone}`} className="p-2 rounded-lg text-primary border border-primary/20 bg-primary/10 hover:bg-primary/20 transition-colors">
                        <FiPhone size={18} />
                      </Link>
                      <Link href={`/doctor-dashboard/my-patients/${patient.id}`} className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-md transition-all">
                        View Profile
                      </Link>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FiClock size={16} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Last Visit</div>
                        <div className="text-sm font-medium">{formatDate(patient.lastVisit)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                        <FiCalendar size={16} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Total Visits</div>
                        <div className="text-sm font-medium">{patient.visits}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-success/10 text-success">
                        <FiMessageSquare size={16} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Contact</div>
                        <div className="text-sm font-medium truncate max-w-[150px]">{patient.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Medical conditions and medications */}
                  {(patient.medicalConditions || patient.medications) && (
                    <div className="pt-3 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {patient.medicalConditions && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <FiFileText className="text-gray-400" />
                              <h4 className="text-sm font-medium text-gray-700">Medical Conditions</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {patient.medicalConditions.map((condition, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                  {condition}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {patient.medications && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <FiFileText className="text-gray-400" />
                              <h4 className="text-sm font-medium text-gray-700">Medications</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {patient.medications.map((medication, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                  {medication}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredPatients.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="bg-gray-50 rounded-full p-6">
              <FiUser size={40} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No patients found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { FiAlertTriangle, FiFilter, FiSearch, FiPhone, FiCalendar, FiUser, FiMapPin, FiClock, FiInfo, FiCheck, FiX } from 'react-icons/fi';

interface EmergencyCall {
  id: string;
  patientName: string;
  patientId: string;
  timestamp: string;
  status: 'pending' | 'dispatched' | 'completed' | 'cancelled';
  location: string;
  contactNumber: string;
  description: string;
  responder?: string;
}

export default function EmergencyCallsLog() {
  const [emergencyCalls, setEmergencyCalls] = useState<EmergencyCall[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<EmergencyCall[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCall, setSelectedCall] = useState<EmergencyCall | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  // Fetch emergency calls data
  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchEmergencyCalls = async () => {
      try {
        // Simulating API call with mock data
        setTimeout(() => {
          const mockCalls: EmergencyCall[] = [
            {
              id: '1001',
              patientName: 'John Smith',
              patientId: 'P5001',
              timestamp: '2025-04-25T09:30:00',
              status: 'completed',
              location: '123 Main St, Cityville',
              contactNumber: '+1 (555) 123-4567',
              description: 'Patient experiencing chest pain and shortness of breath',
              responder: 'Dr. Sarah Johnson'
            },
            {
              id: '1002',
              patientName: 'Emma Davis',
              patientId: 'P5002',
              timestamp: '2025-04-25T10:15:00',
              status: 'dispatched',
              location: '456 Oak Ave, Townsburg',
              contactNumber: '+1 (555) 987-6543',
              description: 'Severe allergic reaction, possible anaphylaxis',
              responder: 'Dr. Michael Chen'
            },
            {
              id: '1003',
              patientName: 'Robert Wilson',
              patientId: 'P5003',
              timestamp: '2025-04-25T11:45:00',
              status: 'pending',
              location: '789 Pine Rd, Villageton',
              contactNumber: '+1 (555) 456-7890',
              description: 'Elderly patient fell and cannot get up, possible hip fracture',
            },
            {
              id: '1004',
              patientName: 'Sofia Martinez',
              patientId: 'P5004',
              timestamp: '2025-04-24T14:20:00',
              status: 'completed',
              location: '321 Elm Blvd, Suburbville',
              contactNumber: '+1 (555) 789-0123',
              description: 'Child with high fever and convulsions',
              responder: 'Dr. James Wilson'
            },
            {
              id: '1005',
              patientName: 'David Thompson',
              patientId: 'P5005',
              timestamp: '2025-04-24T16:55:00',
              status: 'cancelled',
              location: '654 Maple Ln, Downtown',
              contactNumber: '+1 (555) 234-5678',
              description: 'Accidental call, patient is fine',
            },
            {
              id: '1006',
              patientName: 'Linda Garcia',
              patientId: 'P5006',
              timestamp: '2025-04-24T18:10:00',
              status: 'completed',
              location: '987 Cedar St, Metropolis',
              contactNumber: '+1 (555) 345-6789',
              description: 'Diabetic emergency, patient unconscious',
              responder: 'Dr. Emily Rodriguez'
            },
            {
              id: '1007',
              patientName: 'Thomas Brown',
              patientId: 'P5007',
              timestamp: '2025-04-23T08:40:00',
              status: 'completed',
              location: '753 Birch Dr, Countryside',
              contactNumber: '+1 (555) 567-8901',
              description: 'Severe migraine with vision impairment',
              responder: 'Dr. Robert Lee'
            },
            {
              id: '1008',
              patientName: 'Patricia Moore',
              patientId: 'P5008',
              timestamp: '2025-04-23T13:25:00',
              status: 'completed',
              location: '159 Walnut Ave, Riverside',
              contactNumber: '+1 (555) 678-9012',
              description: 'Suspected stroke, facial drooping and slurred speech',
              responder: 'Dr. Amanda Parker'
            },
          ];
          
          setEmergencyCalls(mockCalls);
          setFilteredCalls(mockCalls);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching emergency calls:', error);
        setLoading(false);
      }
    };

    fetchEmergencyCalls();
  }, []);

  // Filter calls based on search term and status filter
  useEffect(() => {
    let result = emergencyCalls;
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(call => call.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(call => 
        call.patientName.toLowerCase().includes(term) || 
        call.patientId.toLowerCase().includes(term) || 
        call.location.toLowerCase().includes(term) ||
        call.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredCalls(result);
  }, [searchTerm, statusFilter, emergencyCalls]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'dispatched':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Open call details modal
  const openCallDetails = (call: EmergencyCall) => {
    setSelectedCall(call);
    setIsDetailModalOpen(true);
  };

  // Close call details modal
  const closeCallDetails = () => {
    setSelectedCall(null);
    setIsDetailModalOpen(false);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FiAlertTriangle className="mr-2 text-red-500" />
          Emergency Calls Log
        </h1>
        <p className="text-gray-600 mt-1">
          Monitor and manage emergency call requests from patients
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search calls..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="dispatched">Dispatched</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {filteredCalls.length} of {emergencyCalls.length} calls
        </div>
      </div>

      {/* Emergency Calls Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-primary mb-2"></div>
            <p className="text-gray-600">Loading emergency calls...</p>
          </div>
        ) : filteredCalls.length === 0 ? (
          <div className="p-6 text-center">
            <FiAlertTriangle className="mx-auto text-gray-400 h-12 w-12 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No emergency calls found</h3>
            <p className="text-gray-600 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responder</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <FiUser className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{call.patientName}</div>
                          <div className="text-sm text-gray-500">{call.patientId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiClock className="mr-1.5 h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{formatDate(call.timestamp)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiMapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900 truncate max-w-[200px]">{call.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(call.status)}`}>
                        {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {call.responder || 'Not assigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-primary-700 hover:text-primary-900 font-medium"
                        onClick={() => openCallDetails(call)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Call Details Modal */}
      {isDetailModalOpen && selectedCall && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeCallDetails}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                  onClick={closeCallDetails}
                >
                  <span className="sr-only">Close</span>
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FiAlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Emergency Call Details
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiUser className="mr-2 h-4 w-4" />
                        <span className="font-medium text-gray-700">Patient:</span>
                        <span className="ml-1">{selectedCall.patientName} ({selectedCall.patientId})</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-2 h-4 w-4" />
                        <span className="font-medium text-gray-700">Date & Time:</span>
                        <span className="ml-1">{formatDate(selectedCall.timestamp)}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiPhone className="mr-2 h-4 w-4" />
                        <span className="font-medium text-gray-700">Contact:</span>
                        <span className="ml-1">{selectedCall.contactNumber}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMapPin className="mr-2 h-4 w-4" />
                        <span className="font-medium text-gray-700">Location:</span>
                        <span className="ml-1">{selectedCall.location}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start text-sm text-gray-500">
                        <FiInfo className="mr-2 h-4 w-4 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-700">Description:</span>
                          <p className="mt-1">{selectedCall.description}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCheck className="mr-2 h-4 w-4" />
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className={`ml-1 px-2 py-1 text-xs leading-4 font-semibold rounded-full ${getStatusBadge(selectedCall.status)}`}>
                          {selectedCall.status.charAt(0).toUpperCase() + selectedCall.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {selectedCall.responder && (
                      <div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FiUser className="mr-2 h-4 w-4" />
                          <span className="font-medium text-gray-700">Responding Physician:</span>
                          <span className="ml-1">{selectedCall.responder}</span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      {selectedCall.status === 'pending' && (
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Dispatch Response Team
                        </button>
                      )}
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={closeCallDetails}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { FiUser, FiPhone, FiMapPin, FiMail, FiLock, FiSave, FiFile, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ProfileSettings() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [healthRecords, setHealthRecords] = useState<Array<{id: string, name: string, date: string, type: string}>>([]);

  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    bloodType: '',
    allergies: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('vita_current_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
      
      // Get users from localStorage to find full user data
      const usersData = localStorage.getItem('vita_users');
      if (usersData) {
        const users = JSON.parse(usersData);
        const fullUserData = users.find((user: any) => user.email === parsedUser.email);
        
        if (fullUserData) {
          setPersonalInfo({
            name: fullUserData.name || '',
            email: fullUserData.email || '',
            phone: fullUserData.phone || '',
            address: fullUserData.address || '',
            emergencyContact: fullUserData.emergencyContact || '',
            emergencyPhone: fullUserData.emergencyPhone || '',
            bloodType: fullUserData.bloodType || '',
            allergies: fullUserData.allergies || '',
          });
        }
      }
      
      // Demo health records
      setHealthRecords([
        {
          id: '1',
          name: 'Annual Physical Exam',
          date: '2025-02-15',
          type: 'PDF'
        },
        {
          id: '2',
          name: 'Blood Test Results',
          date: '2025-01-23',
          type: 'PDF'
        },
        {
          id: '3',
          name: 'Vaccination Record',
          date: '2024-11-05',
          type: 'PDF'
        }
      ]);
    }
    
    setLoading(false);
  }, []);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const savePersonalInfo = () => {
    setSaveStatus('saving');
    
    setTimeout(() => {
      try {
        // Get all users
        const usersData = localStorage.getItem('vita_users');
        if (usersData) {
          const users = JSON.parse(usersData);
          
          // Find and update the current user
          const updatedUsers = users.map((user: any) => {
            if (user.email === currentUser.email) {
              return {
                ...user,
                name: personalInfo.name,
                phone: personalInfo.phone,
                address: personalInfo.address,
                emergencyContact: personalInfo.emergencyContact,
                emergencyPhone: personalInfo.emergencyPhone,
                bloodType: personalInfo.bloodType,
                allergies: personalInfo.allergies,
              };
            }
            return user;
          });
          
          // Save back to localStorage
          localStorage.setItem('vita_users', JSON.stringify(updatedUsers));
          
          // Update current user
          const updatedCurrentUser = {
            ...currentUser,
            name: personalInfo.name,
          };
          localStorage.setItem('vita_current_user', JSON.stringify(updatedCurrentUser));
          setCurrentUser(updatedCurrentUser);
          
          setSaveStatus('success');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
        setSaveStatus('error');
      }
      
      // Reset status after showing success/error message
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }, 1000);
  };
  
  const changePassword = () => {
    setSaveStatus('saving');
    
    // Password validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      setSaveStatus('idle');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      setSaveStatus('idle');
      return;
    }
    
    setTimeout(() => {
      try {
        // Get all users
        const usersData = localStorage.getItem('vita_users');
        if (usersData) {
          const users = JSON.parse(usersData);
          
          // Find the current user
          const currentUserData = users.find((user: any) => user.email === currentUser.email);
          
          if (currentUserData && currentUserData.password === passwordData.currentPassword) {
            // Update password
            const updatedUsers = users.map((user: any) => {
              if (user.email === currentUser.email) {
                return {
                  ...user,
                  password: passwordData.newPassword,
                };
              }
              return user;
            });
            
            // Save back to localStorage
            localStorage.setItem('vita_users', JSON.stringify(updatedUsers));
            
            setSaveStatus('success');
            setPasswordData({
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            });
          } else {
            alert('Current password is incorrect');
            setSaveStatus('error');
          }
        }
      } catch (error) {
        console.error('Error changing password:', error);
        setSaveStatus('error');
      }
      
      // Reset status after showing success/error message
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }, 1000);
  };
  
  const uploadHealthRecord = () => {
    // In a real app, this would handle file uploads
    alert('This feature would upload health records in a real application');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="flex border-b">
          <button
            className={`px-6 py-4 focus:outline-none ${
              activeTab === 'personal' ? 'bg-primary text-white' : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Information
          </button>
          <button
            className={`px-6 py-4 focus:outline-none ${
              activeTab === 'password' ? 'bg-primary text-white' : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
          <button
            className={`px-6 py-4 focus:outline-none ${
              activeTab === 'health' ? 'bg-primary text-white' : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('health')}
          >
            Health Records
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'personal' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={personalInfo.email}
                      disabled
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="address">
                    Home Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMapPin className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={personalInfo.address}
                      onChange={handlePersonalInfoChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="emergencyContact">
                    Emergency Contact Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={personalInfo.emergencyContact}
                      onChange={handlePersonalInfoChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="emergencyPhone">
                    Emergency Contact Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={personalInfo.emergencyPhone}
                      onChange={handlePersonalInfoChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Medical Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="bloodType">
                      Blood Type
                    </label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      value={personalInfo.bloodType}
                      onChange={handlePersonalInfoChange as any}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="allergies">
                      Allergies
                    </label>
                    <textarea
                      id="allergies"
                      name="allergies"
                      value={personalInfo.allergies}
                      onChange={handlePersonalInfoChange}
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="List any allergies you have"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={savePersonalInfo}
                  disabled={saveStatus === 'saving'}
                  className={`px-6 py-2 rounded-md text-white font-medium ${
                    saveStatus === 'saving' ? 'bg-gray-400' : 'bg-primary hover:bg-primary/90'
                  } transition-colors flex items-center`}
                >
                  {saveStatus === 'saving' ? (
                    <>Saving <div className="ml-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
                  ) : (
                    <><FiSave className="mr-2" /> Save Changes</>
                  )}
                </button>
              </div>
              
              {saveStatus === 'success' && (
                <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-md flex items-center">
                  <FiCheck className="mr-2" /> Your profile has been updated successfully
                </div>
              )}
              
              {saveStatus === 'error' && (
                <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-md flex items-center">
                  <FiAlertCircle className="mr-2" /> There was an error updating your profile
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'password' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto space-y-6"
            >
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={changePassword}
                  disabled={saveStatus === 'saving'}
                  className={`px-6 py-2 rounded-md text-white font-medium ${
                    saveStatus === 'saving' ? 'bg-gray-400' : 'bg-primary hover:bg-primary/90'
                  } transition-colors flex items-center`}
                >
                  {saveStatus === 'saving' ? (
                    <>Updating <div className="ml-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
                  ) : (
                    <><FiSave className="mr-2" /> Update Password</>
                  )}
                </button>
              </div>
              
              {saveStatus === 'success' && (
                <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-md flex items-center">
                  <FiCheck className="mr-2" /> Your password has been updated successfully
                </div>
              )}
              
              {saveStatus === 'error' && (
                <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-md flex items-center">
                  <FiAlertCircle className="mr-2" /> There was an error updating your password
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'health' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="border-b pb-6 mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Upload New Record</h3>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <input
                      type="file"
                      id="health-record"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted file types: PDF, JPG, PNG (max 10MB)
                    </p>
                  </div>
                  <button
                    onClick={uploadHealthRecord}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center"
                  >
                    <FiFile className="mr-2" /> Upload
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Your Health Records</h3>
                
                {healthRecords.length > 0 ? (
                  <div className="space-y-4">
                    {healthRecords.map((record) => (
                      <div key={record.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-4">
                            <FiFile className="text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{record.name}</h4>
                            <p className="text-sm text-gray-500">
                              Uploaded on {new Date(record.date).toLocaleDateString()} • {record.type}
                            </p>
                          </div>
                        </div>
                        <button className="text-primary hover:text-primary/80">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <FiFile className="mx-auto mb-3 text-gray-400 text-3xl" />
                    <p className="text-gray-500">No health records uploaded yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
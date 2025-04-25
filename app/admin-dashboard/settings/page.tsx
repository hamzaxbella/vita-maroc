'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiSettings, FiUsers, FiLock, FiBell,
  FiGlobe, FiToggleRight, FiCheckSquare, FiRadio,
  FiSave, FiPlus, FiTrash2, FiEdit2, FiRefreshCw, FiInfo
} from 'react-icons/fi';

export default function SettingsPage() {
  // Tab state
  const [activeTab, setActiveTab] = useState('general');
  
  // Role management state
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', permissions: ['all'], users: 2 },
    { id: 2, name: 'Doctor Manager', permissions: ['manage_doctors', 'view_analytics'], users: 3 },
    { id: 3, name: 'Patient Manager', permissions: ['manage_patients', 'view_analytics'], users: 4 },
    { id: 4, name: 'Support Staff', permissions: ['view_appointments', 'manage_emergencies'], users: 6 },
  ]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    emergencyAlerts: true,
    marketingEmails: false,
    appointmentReminders: true,
    systemUpdates: true,
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: 90, // days
    sessionTimeout: 30, // minutes
    loginAttempts: 5,
  });

  // Platform settings
  const [platformSettings, setPlatformSettings] = useState({
    maintenanceMode: false,
    allowNewRegistrations: true,
    automaticDoctorApproval: false,
    emergencyResponseThreshold: 5, // minutes
    appointmentCancellationWindow: 24, // hours
    systemTimeZone: 'UTC',
  });

  // Helper for setting card
  const SettingCard = ({ title, description, children }: any) => (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-4 text-sm">{description}</p>}
      {children}
    </div>
  );

  // Toggle switch component
  const ToggleSwitch = ({ enabled, onChange, label }: any) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${
          enabled ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div>
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">Platform Settings</h1>
        <p className="text-gray-600 mt-1">Configure system settings and user permissions</p>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm mb-6"
      >
        <div className="flex flex-wrap border-b">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'general'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <FiSettings className="inline-block mr-2" />
            General
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'roles'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <FiUsers className="inline-block mr-2" />
            User Roles
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'notifications'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <FiBell className="inline-block mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'security'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <FiLock className="inline-block mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'advanced'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <FiGlobe className="inline-block mr-2" />
            Advanced
          </button>
        </div>
      </motion.div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SettingCard 
              title="Platform Configuration" 
              description="Basic settings for the Vita platform"
            >
              <div className="space-y-4">
                <ToggleSwitch 
                  label="Allow new user registrations" 
                  enabled={platformSettings.allowNewRegistrations}
                  onChange={(value: boolean) => setPlatformSettings({...platformSettings, allowNewRegistrations: value})}
                />
                
                <ToggleSwitch 
                  label="Maintenance mode" 
                  enabled={platformSettings.maintenanceMode}
                  onChange={(value: boolean) => setPlatformSettings({...platformSettings, maintenanceMode: value})}
                />

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-700">System timezone</span>
                  <select 
                    className="rounded-md border border-gray-300 px-3 py-1.5 focus:border-primary focus:outline-none"
                    value={platformSettings.systemTimeZone}
                    onChange={(e) => setPlatformSettings({...platformSettings, systemTimeZone: e.target.value})}
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Asia/Dubai">GST (UAE)</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center">
                  <FiSave className="mr-2" />
                  Save Settings
                </button>
              </div>
            </SettingCard>
            
            <SettingCard 
              title="Appointment Settings" 
              description="Configure how appointments are handled"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-700">Cancellation window (hours)</span>
                  <input 
                    type="number" 
                    className="w-24 rounded-md border border-gray-300 px-3 py-1.5 focus:border-primary focus:outline-none"
                    value={platformSettings.appointmentCancellationWindow}
                    onChange={(e) => setPlatformSettings({...platformSettings, appointmentCancellationWindow: parseInt(e.target.value)})}
                    min="1"
                    max="72"
                  />
                </div>
                
                <ToggleSwitch 
                  label="Automatic doctor approval" 
                  enabled={platformSettings.automaticDoctorApproval}
                  onChange={(value: boolean) => setPlatformSettings({...platformSettings, automaticDoctorApproval: value})}
                />

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-700">Emergency response threshold (minutes)</span>
                  <input 
                    type="number" 
                    className="w-24 rounded-md border border-gray-300 px-3 py-1.5 focus:border-primary focus:outline-none"
                    value={platformSettings.emergencyResponseThreshold}
                    onChange={(e) => setPlatformSettings({...platformSettings, emergencyResponseThreshold: parseInt(e.target.value)})}
                    min="1"
                    max="30"
                  />
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center">
                  <FiSave className="mr-2" />
                  Save Settings
                </button>
              </div>
            </SettingCard>
            
            <SettingCard
              title="Branding Settings"
              description="Manage your platform branding"
            >
              <div className="space-y-4">
                <div className="py-3">
                  <label className="block text-gray-700 mb-2">Platform Name</label>
                  <input 
                    type="text" 
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 focus:border-primary focus:outline-none"
                    defaultValue="Vita"
                  />
                </div>
                
                <div className="py-3">
                  <label className="block text-gray-700 mb-2">Logo</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                      <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
                    </div>
                    <button className="text-primary hover:text-primary-dark flex items-center">
                      <FiEdit2 className="mr-1" size={16} />
                      <span>Update</span>
                    </button>
                  </div>
                </div>
                
                <div className="py-3">
                  <label className="block text-gray-700 mb-2">Favicon</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                      <img src="/favicon.ico" alt="Favicon" className="w-6 h-6" />
                    </div>
                    <button className="text-primary hover:text-primary-dark flex items-center">
                      <FiEdit2 className="mr-1" size={16} />
                      <span>Update</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center">
                  <FiSave className="mr-2" />
                  Save Branding
                </button>
              </div>
            </SettingCard>
          </motion.div>
        </div>
      )}

      {/* User Roles */}
      {activeTab === 'roles' && (
        <div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SettingCard 
              title="User Roles & Permissions" 
              description="Manage roles and what they can access"
            >
              <div className="mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Permissions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Users
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {roles.map((role) => (
                        <tr key={role.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-800">{role.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.map((permission) => (
                                <span 
                                  key={permission}
                                  className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                                >
                                  {permission === 'all' ? 'All Permissions' : permission.replace('_', ' ')}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-700">{role.users}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <FiEdit2 size={18} />
                            </button>
                            {role.name !== 'Super Admin' && (
                              <button className="text-red-600 hover:text-red-900">
                                <FiTrash2 size={18} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 pt-4">
                  <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center">
                    <FiPlus className="mr-2" />
                    Add New Role
                  </button>
                </div>
              </div>
            </SettingCard>

            <SettingCard
              title="Permission Management"
              description="Define which actions are available for each role"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-2">Doctor Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_view_doctors" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_view_doctors" className="ml-2 text-gray-700">View doctors</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_approve_doctors" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_approve_doctors" className="ml-2 text-gray-700">Approve/reject doctors</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_edit_doctors" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_edit_doctors" className="ml-2 text-gray-700">Edit doctor profiles</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_suspend_doctors" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_suspend_doctors" className="ml-2 text-gray-700">Suspend doctor accounts</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-2">Patient Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_view_patients" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_view_patients" className="ml-2 text-gray-700">View patients</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_edit_patients" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_edit_patients" className="ml-2 text-gray-700">Edit patient profiles</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_deactivate_patients" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_deactivate_patients" className="ml-2 text-gray-700">Deactivate patient accounts</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_view_records" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_view_records" className="ml-2 text-gray-700">View medical records</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium mb-2">Appointment Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_view_appointments" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_view_appointments" className="ml-2 text-gray-700">View appointments</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_edit_appointments" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_edit_appointments" className="ml-2 text-gray-700">Edit appointments</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_cancel_appointments" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_cancel_appointments" className="ml-2 text-gray-700">Cancel appointments</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm_reschedule" className="h-4 w-4 text-primary focus:ring-primary rounded" />
                      <label htmlFor="perm_reschedule" className="ml-2 text-gray-700">Reschedule appointments</label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center">
                    <FiSave className="mr-2" />
                    Save Permissions
                  </button>
                </div>
              </div>
            </SettingCard>
          </motion.div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SettingCard 
              title="Notification Preferences" 
              description="Configure how and when notifications are sent"
            >
              <div className="space-y-4">
                <ToggleSwitch 
                  label="Email notifications" 
                  enabled={notifications.emailNotifications}
                  onChange={(value: boolean) => setNotifications({...notifications, emailNotifications: value})}
                />
                
                <ToggleSwitch 
                  label="SMS notifications" 
                  enabled={notifications.smsNotifications}
                  onChange={(value: boolean) => setNotifications({...notifications, smsNotifications: value})}
                />
                
                <ToggleSwitch 
                  label="Emergency alerts" 
                  enabled={notifications.emergencyAlerts}
                  onChange={(value: boolean) => setNotifications({...notifications, emergencyAlerts: value})}
                />
                
                <ToggleSwitch 
                  label="Marketing emails" 
                  enabled={notifications.marketingEmails}
                  onChange={(value: boolean) => setNotifications({...notifications, marketingEmails: value})}
                />
                
                <ToggleSwitch 
                  label="Appointment reminders" 
                  enabled={notifications.appointmentReminders}
                  onChange={(value: boolean) => setNotifications({...notifications, appointmentReminders: value})}
                />
                
                <ToggleSwitch 
                  label="System update notifications" 
                  enabled={notifications.systemUpdates}
                  onChange={(value: boolean) => setNotifications({...notifications, systemUpdates: value})}
                />
              </div>

              <div className="mt-6 border-t pt-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center">
                  <FiSave className="mr-2" />
                  Save Notification Settings
                </button>
              </div>
            </SettingCard>
            
            <SettingCard 
              title="Email Templates" 
              description="Customize email notifications sent to users"
            >
              <div className="space-y-4">
                <div className="py-3">
                  <label className="block text-gray-700 mb-2">Appointment Confirmation Template</label>
                  <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                    <p className="text-sm text-gray-600">
                      Hello [Patient Name],<br /><br />
                      This email confirms your appointment with Dr. [Doctor Name] on [Date] at [Time].<br /><br />
                      Location: [Location/Virtual]<br />
                      Type: [Appointment Type]<br /><br />
                      If you need to reschedule, please do so at least [X] hours in advance.<br /><br />
                      Thank you,<br />
                      The Vita Team
                    </p>
                  </div>
                  <button className="mt-2 text-primary flex items-center text-sm">
                    <FiEdit2 className="mr-1" size={14} />
                    <span>Edit Template</span>
                  </button>
                </div>
                
                <div className="py-3">
                  <label className="block text-gray-700 mb-2">Emergency Alert Template</label>
                  <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                    <p className="text-sm text-gray-600">
                      EMERGENCY ALERT<br /><br />
                      Patient: [Patient Name]<br />
                      Contact: [Phone Number]<br />
                      Location: [Coordinates/Address]<br /><br />
                      Please respond immediately. This is an emergency situation requiring immediate medical attention.
                    </p>
                  </div>
                  <button className="mt-2 text-primary flex items-center text-sm">
                    <FiEdit2 className="mr-1" size={14} />
                    <span>Edit Template</span>
                  </button>
                </div>

                <div className="py-3">
                  <label className="block text-gray-700 mb-2">Doctor Verification Template</label>
                  <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                    <p className="text-sm text-gray-600">
                      Hello Dr. [Doctor Name],<br /><br />
                      Congratulations! Your account and medical credentials have been verified successfully. You are now an active doctor on the Vita platform.<br /><br />
                      You can now:<br />
                      - Set your availability<br />
                      - Accept appointments<br />
                      - Respond to emergency calls<br /><br />
                      Welcome aboard!<br />
                      The Vita Team
                    </p>
                  </div>
                  <button className="mt-2 text-primary flex items-center text-sm">
                    <FiEdit2 className="mr-1" size={14} />
                    <span>Edit Template</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center">
                  <FiSave className="mr-2" />
                  Save Email Templates
                </button>
              </div>
            </SettingCard>
          </motion.div>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SettingCard 
              title="Authentication Settings" 
              description="Manage how users authenticate with the platform"
            >
              <div className="space-y-4">
                <ToggleSwitch 
                  label="Two-factor authentication (recommended)" 
                  enabled={securitySettings.twoFactorAuth}
                  onChange={(value: boolean) => setSecuritySettings({...securitySettings, twoFactorAuth: value})}
                />
                
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-700">Password expiry (days)</span>
                  <input 
                    type="number" 
                    className="w-24 rounded-md border border-gray-300 px-3 py-1.5 focus:border-primary focus:outline-none"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
                    min="0"
                    max="365"
                  />
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-700">Session timeout (minutes)</span>
                  <input 
                    type="number" 
                    className="w-24 rounded-md border border-gray-300 px-3 py-1.5 focus:border-primary focus:outline-none"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                    min="5"
                    max="120"
                  />
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-700">Maximum login attempts</span>
                  <input 
                    type="number" 
                    className="w-24 rounded-md border border-gray-300 px-3 py-1.5 focus:border-primary focus:outline-none"
                    value={securitySettings.loginAttempts}
                    onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: parseInt(e.target.value)})}
                    min="3"
                    max="10"
                  />
                </div>

                <div className="py-3">
                  <label className="block text-gray-700 mb-2">Password policy</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="pass_uppercase" className="h-4 w-4 text-primary focus:ring-primary rounded" checked />
                      <label htmlFor="pass_uppercase" className="ml-2 text-gray-700">Require uppercase letters</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="pass_lowercase" className="h-4 w-4 text-primary focus:ring-primary rounded" checked />
                      <label htmlFor="pass_lowercase" className="ml-2 text-gray-700">Require lowercase letters</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="pass_numbers" className="h-4 w-4 text-primary focus:ring-primary rounded" checked />
                      <label htmlFor="pass_numbers" className="ml-2 text-gray-700">Require numbers</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="pass_special" className="h-4 w-4 text-primary focus:ring-primary rounded" checked />
                      <label htmlFor="pass_special" className="ml-2 text-gray-700">Require special characters</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="pass_min_length" className="h-4 w-4 text-primary focus:ring-primary rounded" checked />
                      <label htmlFor="pass_min_length" className="ml-2 text-gray-700">Minimum length: 8 characters</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center">
                  <FiSave className="mr-2" />
                  Save Security Settings
                </button>
              </div>
            </SettingCard>

            <SettingCard 
              title="Data Protection" 
              description="Manage how data is stored, processed and protected"
            >
              <div className="space-y-4">
                <ToggleSwitch 
                  label="Enable data encryption at rest" 
                  enabled={true}
                  onChange={() => {}}
                />
                
                <ToggleSwitch 
                  label="Keep audit logs of all system access" 
                  enabled={true}
                  onChange={() => {}}
                />
                
                <ToggleSwitch 
                  label="Automatic sensitive data masking" 
                  enabled={true}
                  onChange={() => {}}
                />
                
                <div className="py-3">
                  <label className="block text-gray-700 mb-2">Data Retention Period</label>
                  <select className="rounded-md border border-gray-300 px-3 py-1.5 focus:border-primary focus:outline-none">
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="5" selected>5 years</option>
                    <option value="7">7 years</option>
                    <option value="0">Indefinitely</option>
                  </select>
                  <p className="mt-1 text-gray-500 text-sm">Medical records will be stored according to legal requirements.</p>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center">
                  <FiSave className="mr-2" />
                  Save Data Protection Settings
                </button>
              </div>
            </SettingCard>
          </motion.div>
        </div>
      )}

      {/* Advanced Settings */}
      {activeTab === 'advanced' && (
        <div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SettingCard 
              title="API Configuration" 
              description="Manage API keys and integrations"
            >
              <div className="space-y-4">
                <div className="py-3">
                  <label className="block text-gray-700 mb-2">API Access</label>
                  <ToggleSwitch 
                    label="Enable API access" 
                    enabled={true}
                    onChange={() => {}}
                  />
                </div>
                
                <div className="py-3">
                  <label className="block text-gray-700 mb-2">API Keys</label>
                  <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Production API Key</span>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2 font-mono text-sm">•••••••••••••••••••</span>
                        <button className="text-primary hover:text-primary-dark">
                          <FiRefreshCw size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Test API Key</span>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2 font-mono text-sm">•••••••••••••••••••</span>
                        <button className="text-primary hover:text-primary-dark">
                          <FiRefreshCw size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-gray-500 text-xs">Regenerating API keys will invalidate existing keys immediately.</p>
                </div>
                
                <div className="py-3">
                  <label className="block text-gray-700 mb-2">Webhook URL</label>
                  <input 
                    type="text" 
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 focus:border-primary focus:outline-none"
                    placeholder="https://your-server.com/webhook"
                  />
                  <p className="mt-1 text-gray-500 text-xs">Events will be sent to this URL in real-time.</p>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center">
                  <FiSave className="mr-2" />
                  Save API Settings
                </button>
              </div>
            </SettingCard>

            <SettingCard 
              title="Third-Party Integrations" 
              description="Connect with external services"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">SMS Gateway</h4>
                    <p className="text-sm text-gray-500">Connect to send SMS notifications</p>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm">
                    Configure
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">Payment Processor</h4>
                    <p className="text-sm text-gray-500">Connect to handle payments</p>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm">
                    Configure
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">Google Maps</h4>
                    <p className="text-sm text-gray-500">Configure for location services</p>
                  </div>
                  <button className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-md text-sm">
                    Connected
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">Video Conferencing</h4>
                    <p className="text-sm text-gray-500">For virtual appointments</p>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm">
                    Configure
                  </button>
                </div>
              </div>
            </SettingCard>

            <SettingCard 
              title="System Maintenance" 
              description="Database management and system updates"
            >
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex items-start">
                    <FiInfo className="text-yellow-500 mt-0.5 mr-2" size={18} />
                    <div>
                      <p className="font-medium text-yellow-700">Note</p>
                      <p className="text-sm text-yellow-600">
                        These are advanced settings that can affect the entire platform. 
                        Please use with caution and consider scheduling maintenance during off-peak hours.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="py-3">
                  <button className="mb-3 flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    <FiRefreshCw className="mr-2" />
                    Clear System Cache
                  </button>
                  
                  <button className="mb-3 flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    <FiRefreshCw className="mr-2" />
                    Optimize Database
                  </button>
                  
                  <button className="mb-3 flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    <FiRefreshCw className="mr-2" />
                    Run System Diagnostics
                  </button>
                  
                  <button className="flex items-center px-4 py-2 bg-red-50 border border-red-300 rounded-md text-red-700 hover:bg-red-100">
                    <FiRefreshCw className="mr-2" />
                    Restart Application Services
                  </button>
                </div>
                
                <div className="py-3">
                  <label className="block text-gray-700 mb-2">Database Backup Schedule</label>
                  <select className="rounded-md border border-gray-300 px-3 py-1.5 focus:border-primary focus:outline-none mb-2">
                    <option value="daily">Daily</option>
                    <option value="weekly" selected>Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <p className="text-gray-500 text-xs">Last backup: April 24, 2025 at 2:30 AM</p>
                </div>
              </div>
            </SettingCard>
          </motion.div>
        </div>
      )}
    </div>
  );
}
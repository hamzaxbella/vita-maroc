'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiTrash2, FiPlus, FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';

// Days of the week for the schedule
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Time slots for selection
const timeSlots: string[] = [];
for (let hour = 7; hour <= 22; hour++) {
  const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  timeSlots.push(`${hourFormatted}:00 ${ampm}`);
  timeSlots.push(`${hourFormatted}:30 ${ampm}`);
}

// Interface for schedule entry
interface ScheduleEntry {
  day: string;
  isAvailable: boolean;
  timeSlots: {
    start: string;
    end: string;
  }[];
}

export default function AvailabilitySettings() {
  // State for the weekly schedule
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(
    daysOfWeek.map(day => ({
      day,
      isAvailable: ['Saturday', 'Sunday'].includes(day) ? false : true,
      timeSlots: ['Saturday', 'Sunday'].includes(day) 
        ? []
        : [{ start: '9:00 AM', end: '5:00 PM' }]
    }))
  );
  
  const [timeOffDates, setTimeOffDates] = useState<string[]>([]);
  const [newTimeOffDate, setNewTimeOffDate] = useState('');
  
  const [lunchBreaks, setLunchBreaks] = useState<{day: string, start: string, end: string}[]>(
    daysOfWeek.filter(day => !['Saturday', 'Sunday'].includes(day)).map(day => ({
      day,
      start: '12:00 PM',
      end: '1:00 PM'
    }))
  );
  
  const [appointmentDuration, setAppointmentDuration] = useState(30); // in minutes
  const [bufferTime, setBufferTime] = useState(10); // in minutes
  const [savedMessage, setSavedMessage] = useState(false);
  
  // Load saved schedule from local storage on component mount
  useEffect(() => {
    const savedSchedule = localStorage.getItem('doctor_schedule');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
    
    const savedTimeOff = localStorage.getItem('doctor_time_off');
    if (savedTimeOff) {
      setTimeOffDates(JSON.parse(savedTimeOff));
    }
    
    const savedLunchBreaks = localStorage.getItem('doctor_lunch_breaks');
    if (savedLunchBreaks) {
      setLunchBreaks(JSON.parse(savedLunchBreaks));
    }
    
    const savedAppointmentDuration = localStorage.getItem('doctor_appointment_duration');
    if (savedAppointmentDuration) {
      setAppointmentDuration(parseInt(savedAppointmentDuration));
    }
    
    const savedBufferTime = localStorage.getItem('doctor_buffer_time');
    if (savedBufferTime) {
      setBufferTime(parseInt(savedBufferTime));
    }
  }, []);

  // Toggle day availability
  const toggleDayAvailability = (dayIndex: number) => {
    setSchedule(prev => {
      const updated = [...prev];
      updated[dayIndex] = {
        ...updated[dayIndex],
        isAvailable: !updated[dayIndex].isAvailable,
        timeSlots: !updated[dayIndex].isAvailable 
          ? [{ start: '9:00 AM', end: '5:00 PM' }] 
          : []
      };
      return updated;
    });
  };

  // Update time slot
  const updateTimeSlot = (dayIndex: number, slotIndex: number, field: 'start' | 'end', value: string) => {
    setSchedule(prev => {
      const updated = [...prev];
      updated[dayIndex].timeSlots[slotIndex][field] = value;
      return updated;
    });
  };

  // Add new time slot to a day
  const addTimeSlot = (dayIndex: number) => {
    setSchedule(prev => {
      const updated = [...prev];
      updated[dayIndex].timeSlots.push({ 
        start: '9:00 AM', 
        end: '5:00 PM' 
      });
      return updated;
    });
  };

  // Remove time slot from a day
  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    setSchedule(prev => {
      const updated = [...prev];
      updated[dayIndex].timeSlots.splice(slotIndex, 1);
      return updated;
    });
  };
  
  // Add time off date
  const addTimeOffDate = () => {
    if (newTimeOffDate && !timeOffDates.includes(newTimeOffDate)) {
      setTimeOffDates(prev => [...prev, newTimeOffDate]);
      setNewTimeOffDate('');
    }
  };
  
  // Remove time off date
  const removeTimeOffDate = (index: number) => {
    setTimeOffDates(prev => prev.filter((_, i) => i !== index));
  };
  
  // Update lunch break
  const updateLunchBreak = (dayIndex: number, field: 'start' | 'end', value: string) => {
    const day = daysOfWeek[dayIndex];
    setLunchBreaks(prev => {
      const existing = prev.findIndex(lunch => lunch.day === day);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing][field] = value;
        return updated;
      } else {
        return [...prev, { day, start: field === 'start' ? value : '12:00 PM', end: field === 'end' ? value : '1:00 PM' }];
      }
    });
  };
  
  // Save all settings
  const saveSettings = () => {
    localStorage.setItem('doctor_schedule', JSON.stringify(schedule));
    localStorage.setItem('doctor_time_off', JSON.stringify(timeOffDates));
    localStorage.setItem('doctor_lunch_breaks', JSON.stringify(lunchBreaks));
    localStorage.setItem('doctor_appointment_duration', appointmentDuration.toString());
    localStorage.setItem('doctor_buffer_time', bufferTime.toString());
    
    // Show saved message
    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
    }, 3000);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-8 mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Availability Settings</h1>
        
        {/* Save notification */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-xl flex items-center text-success">
            <FiCheckCircle className="mr-2" size={18} />
            <span>Your availability settings have been saved successfully!</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-10">
          {schedule.map((day, dayIndex) => (
            <div 
              key={day.day} 
              className={`bg-white border rounded-xl p-4 transition-all ${
                day.isAvailable ? 'border-primary/30 shadow-sm' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-800">{day.day}</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={day.isAvailable}
                    onChange={() => toggleDayAvailability(dayIndex)}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              {day.isAvailable && (
                <div className="space-y-3">
                  {day.timeSlots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <select 
                          value={slot.start}
                          onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'start', e.target.value)}
                          className="block w-full text-xs py-1.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        >
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        <span className="text-xs text-gray-500">to</span>
                        <select 
                          value={slot.end}
                          onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'end', e.target.value)}
                          className="block w-full text-xs py-1.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        >
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      
                      {day.timeSlots.length > 1 && (
                        <button
                          onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                          className="text-xs text-danger hover:text-danger/70 flex items-center"
                        >
                          <FiTrash2 size={12} className="mr-1" /> Remove
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <button 
                    onClick={() => addTimeSlot(dayIndex)}
                    className="w-full text-xs flex items-center justify-center py-1 px-2 text-primary border border-primary/30 rounded-md hover:bg-primary/5"
                  >
                    <FiPlus size={12} className="mr-1" /> Add Time Slot
                  </button>
                </div>
              )}
              
              {!day.isAvailable && (
                <div className="py-2 text-center text-xs text-gray-500">
                  Not Available
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Appointment Durations */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <FiClock className="mr-2 text-primary" size={20} /> Appointment Settings
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Appointment Duration
                </label>
                <select
                  value={appointmentDuration}
                  onChange={(e) => setAppointmentDuration(parseInt(e.target.value))}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buffer Time Between Appointments
                </label>
                <select
                  value={bufferTime}
                  onChange={(e) => setBufferTime(parseInt(e.target.value))}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value={0}>No buffer</option>
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lunch Breaks
                </label>
                
                {daysOfWeek.filter(day => schedule.find(s => s.day === day)?.isAvailable).map((day, dayIndex) => {
                  const daySchedule = schedule.findIndex(s => s.day === day);
                  const lunchBreak = lunchBreaks.find(b => b.day === day);
                  
                  return (
                    <div key={day} className="mb-3 p-3 border border-gray-100 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">{day}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <select 
                          value={lunchBreak?.start || '12:00 PM'}
                          onChange={(e) => updateLunchBreak(daySchedule, 'start', e.target.value)}
                          className="block w-full text-xs py-1.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        >
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        <span className="text-xs text-gray-500">to</span>
                        <select 
                          value={lunchBreak?.end || '1:00 PM'}
                          onChange={(e) => updateLunchBreak(daySchedule, 'end', e.target.value)}
                          className="block w-full text-xs py-1.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        >
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Time Off */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <FiCalendar className="mr-2 text-primary" size={20} /> Time Off & Vacations
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Day Off or Vacation
                </label>
                <div className="flex">
                  <input
                    type="date"
                    value={newTimeOffDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewTimeOffDate(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-l-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                  <button
                    onClick={addTimeOffDate}
                    className="px-4 bg-primary text-white rounded-r-md hover:bg-primary/90"
                  >
                    <FiPlus size={18} />
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Upcoming Time Off</h4>
                {timeOffDates.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No scheduled time off</p>
                ) : (
                  <div className="max-h-60 overflow-y-auto">
                    {timeOffDates
                      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                      .map((date, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="text-sm">
                            {new Date(date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <button
                            onClick={() => removeTimeOffDate(index)}
                            className="text-danger hover:text-danger/70"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={saveSettings}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center"
          >
            <FiSave className="mr-2" size={18} /> Save Availability Settings
          </button>
        </div>
      </motion.div>
    </div>
  );
}
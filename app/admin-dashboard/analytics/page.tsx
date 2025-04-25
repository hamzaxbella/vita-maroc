'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar, FiUsers, FiUserCheck, FiAlertTriangle,
  FiTrendingUp, FiTrendingDown, FiFilter, FiDownload,
  FiBarChart2, FiPieChart, FiActivity, FiRefreshCw
} from 'react-icons/fi';
import dynamic from 'next/dynamic';

// Dynamically import charts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AnalyticsPage() {
  // State for date filters
  const [dateRange, setDateRange] = useState('last30days');
  const [isLoading, setIsLoading] = useState(true);

  // Data states
  const [patientStats, setPatientStats] = useState({
    total: 1248,
    growth: 12.5,
    active: 876,
    new: 68
  });

  const [doctorStats, setDoctorStats] = useState({
    total: 84,
    growth: 8.3,
    active: 72,
    verificationPending: 5
  });

  const [appointmentStats, setAppointmentStats] = useState({
    total: 3256,
    completed: 2890,
    cancelled: 278,
    noShow: 88
  });

  const [emergencyStats, setEmergencyStats] = useState({
    total: 187,
    resolved: 172,
    avgResponseTime: '3.2 min'
  });

  // Chart configurations
  const patientGrowthOptions = {
    chart: {
      id: 'patient-growth',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    stroke: {
      curve: 'smooth' as 'smooth',
      width: 3
    },
    colors: ['#4F46E5'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['#818CF8'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.2
      }
    }
  };

  const patientGrowthSeries = [
    {
      name: 'Patients',
      data: [985, 1042, 1105, 1186, 1220, 1248]
    }
  ];

  const appointmentDistributionOptions = {
    chart: {
      id: 'appointment-distribution',
      toolbar: {
        show: false
      }
    },
    labels: ['Regular Checkup', 'Specialist Consultation', 'Emergency', 'Home Visit', 'Follow-up'],
    colors: ['#4F46E5', '#818CF8', '#FB7185', '#34D399', '#FBBF24'],
    legend: {
      position: 'bottom' as 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom' as 'bottom'
        }
      }
    }]
  };

  const appointmentDistributionSeries = [45, 25, 10, 12, 8];

  const emergencyTrendsOptions = {
    chart: {
      id: 'emergency-trends',
      toolbar: {
        show: false
      },
      type: 'bar' as 'bar'
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    colors: ['#FB7185'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '70%',
      }
    }
  };

  const emergencyTrendsSeries = [
    {
      name: 'Emergency Calls',
      data: [8, 12, 7, 9, 11, 15, 6]
    }
  ];

  const doctorPatientRatioOptions = {
    chart: {
      id: 'doctor-patient-ratio',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ['Cardiology', 'Pediatrics', 'Dermatology', 'Neurology', 'Orthopedics']
    },
    colors: ['#34D399', '#4F46E5'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [3, 3],
      curve: 'straight' as 'straight'
    },
    legend: {
      position: 'top' as 'top'
    },
    markers: {
      size: 5
    }
  };

  const doctorPatientRatioSeries = [
    {
      name: 'Doctors',
      type: 'column',
      data: [12, 8, 7, 5, 9]
    },
    {
      name: 'Patients',
      type: 'line',
      data: [240, 185, 115, 92, 175]
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dateRange]);

  const handleDateRangeChange = (range: string) => {
    setIsLoading(true);
    setDateRange(range);
  };

  // Helper for stats cards with trending indicators
  const StatCard = ({ title, value, change, isIncrease, icon }: any) => (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-full bg-primary/10">{icon}</div>
        {change && (
          <div className={`flex items-center text-xs font-medium ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
            {isIncrease ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
            {change}%
          </div>
        )}
      </div>
      <h3 className="mt-4 text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
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
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Track key metrics and performance indicators</p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-2">
          <FiFilter className="text-primary" />
          <span className="text-gray-700 font-medium">Filter by:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleDateRangeChange('last7days')}
            className={`px-4 py-2 text-sm rounded-md ${dateRange === 'last7days' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Last 7 days
          </button>
          <button 
            onClick={() => handleDateRangeChange('last30days')}
            className={`px-4 py-2 text-sm rounded-md ${dateRange === 'last30days' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Last 30 days
          </button>
          <button 
            onClick={() => handleDateRangeChange('last90days')}
            className={`px-4 py-2 text-sm rounded-md ${dateRange === 'last90days' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Last 90 days
          </button>
          <button 
            onClick={() => handleDateRangeChange('thisYear')}
            className={`px-4 py-2 text-sm rounded-md ${dateRange === 'thisYear' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            This Year
          </button>
        </div>

        <button className="flex items-center space-x-1 text-primary hover:text-primary-dark">
          <FiDownload size={18} />
          <span className="text-sm font-medium">Export Data</span>
        </button>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6"
      >
        <StatCard 
          title="Total Patients" 
          value={patientStats.total} 
          change={patientStats.growth.toFixed(1)} 
          isIncrease={true} 
          icon={<FiUsers className="text-primary" size={20} />} 
        />
        <StatCard 
          title="Total Doctors" 
          value={doctorStats.total} 
          change={doctorStats.growth.toFixed(1)} 
          isIncrease={true} 
          icon={<FiUserCheck className="text-secondary" size={20} />} 
        />
        <StatCard 
          title="Appointments (Month)" 
          value={appointmentStats.total} 
          change="4.8" 
          isIncrease={true} 
          icon={<FiCalendar className="text-primary" size={20} />} 
        />
        <StatCard 
          title="Emergency Calls" 
          value={emergencyStats.total} 
          change="2.3" 
          isIncrease={false} 
          icon={<FiAlertTriangle className="text-danger" size={20} />} 
        />
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Patient Growth Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <FiTrendingUp className="mr-2 text-primary" />
              Patient Growth
            </h3>
            <button className="text-gray-400 hover:text-primary">
              <FiRefreshCw size={18} />
            </button>
          </div>
          <div className="h-64">
            {!isLoading && typeof window !== 'undefined' && (
              <Chart
                options={patientGrowthOptions}
                series={patientGrowthSeries}
                type="area"
                height="100%"
              />
            )}
            {isLoading && (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Appointment Distribution Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <FiPieChart className="mr-2 text-secondary" />
              Appointment Distribution
            </h3>
            <button className="text-gray-400 hover:text-primary">
              <FiRefreshCw size={18} />
            </button>
          </div>
          <div className="h-64">
            {!isLoading && typeof window !== 'undefined' && (
              <Chart
                options={appointmentDistributionOptions}
                series={appointmentDistributionSeries}
                type="pie"
                height="100%"
              />
            )}
            {isLoading && (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Emergency Calls Trend */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <FiAlertTriangle className="mr-2 text-danger" />
              Emergency Call Trends
            </h3>
            <button className="text-gray-400 hover:text-primary">
              <FiRefreshCw size={18} />
            </button>
          </div>
          <div className="h-64">
            {!isLoading && typeof window !== 'undefined' && (
              <Chart
                options={emergencyTrendsOptions}
                series={emergencyTrendsSeries}
                type="bar"
                height="100%"
              />
            )}
            {isLoading && (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Doctor-Patient Ratio */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <FiActivity className="mr-2 text-primary" />
              Doctor-Patient Ratio by Specialty
            </h3>
            <button className="text-gray-400 hover:text-primary">
              <FiRefreshCw size={18} />
            </button>
          </div>
          <div className="h-64">
            {!isLoading && typeof window !== 'undefined' && (
              <Chart
                options={doctorPatientRatioOptions}
                series={doctorPatientRatioSeries}
                type="line"
                height="100%"
              />
            )}
            {isLoading && (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Key Performance Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow-sm p-5 mb-6"
      >
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <FiBarChart2 className="mr-2 text-secondary" />
          Key Performance Indicators
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Appointment Success Rate</div>
            <div className="mt-2 text-xl font-semibold">{((appointmentStats.completed / appointmentStats.total) * 100).toFixed(1)}%</div>
            <div className="mt-1 text-xs text-green-500 flex items-center">
              <FiTrendingUp className="mr-1" /> 2.4% from last month
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Avg. Emergency Response</div>
            <div className="mt-2 text-xl font-semibold">{emergencyStats.avgResponseTime}</div>
            <div className="mt-1 text-xs text-green-500 flex items-center">
              <FiTrendingUp className="mr-1" /> 0.3 min faster
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Doctor Verification Rate</div>
            <div className="mt-2 text-xl font-semibold">{((doctorStats.active / doctorStats.total) * 100).toFixed(1)}%</div>
            <div className="mt-1 text-xs text-green-500 flex items-center">
              <FiTrendingUp className="mr-1" /> 3.7% from last month
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Patient Satisfaction</div>
            <div className="mt-2 text-xl font-semibold">4.8/5</div>
            <div className="mt-1 text-xs text-green-500 flex items-center">
              <FiTrendingUp className="mr-1" /> 0.2 from last month
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">No-Show Rate</div>
            <div className="mt-2 text-xl font-semibold">{((appointmentStats.noShow / appointmentStats.total) * 100).toFixed(1)}%</div>
            <div className="mt-1 text-xs text-red-500 flex items-center">
              <FiTrendingDown className="mr-1" /> 0.5% worse
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Summary & Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg shadow-sm p-5"
      >
        <h3 className="text-lg font-medium text-gray-800 mb-3">Analytics Summary</h3>
        <div className="text-gray-600 space-y-2">
          <p>
            <span className="font-medium text-primary">Patient Growth:</span> Steady increase with a 12.5% growth rate in the last 30 days.
          </p>
          <p>
            <span className="font-medium text-primary">Doctor Onboarding:</span> 8.3% increase in verified doctors, with 5 pending verifications.
          </p>
          <p>
            <span className="font-medium text-primary">Appointment Trends:</span> Regular checkups comprise the majority (45%) of appointments, followed by specialist consultations (25%).
          </p>
          <p>
            <span className="font-medium text-primary">Emergency Services:</span> Weekend days show higher emergency call volumes, with an average response time of 3.2 minutes.
          </p>
          <p className="font-medium mt-4">
            Recommended Actions:
          </p>
          <ul className="list-disc list-inside">
            <li>Focus on reducing no-show rates through improved reminders</li>
            <li>Consider adding more doctors to high patient-ratio specialties</li>
            <li>Increase weekend emergency staff to handle higher call volumes</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
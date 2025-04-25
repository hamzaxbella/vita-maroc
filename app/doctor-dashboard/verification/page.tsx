'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiCheckCircle, FiAlertTriangle, FiClock, FiFileText, FiUpload, FiRefreshCw } from 'react-icons/fi';

// Import assets
import doctorImg from '@/public/doctor.png';

const verificationSteps = [
  {
    title: 'Submit your medical license',
    description: 'Upload a clear photo or scan of your valid medical license',
    icon: <FiFileText className="text-primary" size={24} />,
    status: 'pending', // 'pending', 'completed', 'rejected'
  },
  {
    title: 'Professional verification',
    description: 'Our team verifies your credentials with medical boards',
    icon: <FiCheckCircle className="text-primary" size={24} />,
    status: 'pending',
  },
  {
    title: 'Background check',
    description: 'Standard verification of professional history',
    icon: <FiAlertTriangle className="text-primary" size={24} />,
    status: 'pending',
  },
  {
    title: 'Final approval',
    description: 'Final review and account activation',
    icon: <FiClock className="text-primary" size={24} />,
    status: 'pending',
  },
];

export default function DoctorVerification() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'in-review', 'approved', 'rejected'
  const router = useRouter();
  
  useEffect(() => {
    // Get user data from localStorage
    const userJson = localStorage.getItem('vita_current_user');
    if (userJson) {
      const user = JSON.parse(userJson);
      setCurrentUser(user);
      
      // In a real app, you would fetch the verification status from your API
      // For demo purposes, we'll simulate a pending verification
      setVerificationStatus('pending');
    } else {
      // If no user, redirect to login
      router.push('/auth');
    }
  }, [router]);

  // Simulate file upload process
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            
            // Update local storage to indicate verification is in progress
            if (currentUser) {
              try {
                const usersJson = localStorage.getItem('vita_users');
                if (usersJson) {
                  const users = JSON.parse(usersJson);
                  const updatedUsers = users.map((u: any) => {
                    if (u.email === currentUser.email && u.userType === 'doctor') {
                      return { 
                        ...u, 
                        verificationStatus: 'in-review',
                        licenseSubmitted: true,
                        licenseSubmittedAt: new Date().toISOString()
                      };
                    }
                    return u;
                  });
                  localStorage.setItem('vita_users', JSON.stringify(updatedUsers));
                }
              } catch (error) {
                console.error('Error updating user verification status:', error);
              }
            }
            
            setVerificationStatus('in-review');
            
            // Update the first step status
            const updatedSteps = [...verificationSteps];
            updatedSteps[0] = { ...updatedSteps[0], status: 'completed' };
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  // Get verification status icon and color
  const getStatusUI = () => {
    switch(verificationStatus) {
      case 'pending':
        return {
          icon: <FiClock size={40} className="text-warning" />,
          title: 'Verification Required',
          description: 'Your account requires verification before you can access the full dashboard',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning'
        };
      case 'in-review':
        return {
          icon: <FiRefreshCw size={40} className="text-primary" />,
          title: 'In Review',
          description: "'We're reviewing your information. This typically takes 1-3 business days'",
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary'
        };
      case 'approved':
        return {
          icon: <FiCheckCircle size={40} className="text-success" />,
          title: 'Verification Complete!',
          description: 'Your account has been verified. You can now access all features',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success'
        };
      case 'rejected':
        return {
          icon: <FiAlertTriangle size={40} className="text-danger" />,
          title: 'Verification Failed',
          description: 'There was an issue with your verification. Please check details below',
          color: 'text-danger',
          bgColor: 'bg-danger/10',
          borderColor: 'border-danger'
        };
      default:
        return {
          icon: <FiClock size={40} className="text-warning" />,
          title: 'Verification Required',
          description: 'Your account requires verification before you can access the full dashboard',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning'
        };
    }
  };

  const status = getStatusUI();

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`border-l-4 ${status.borderColor} bg-white rounded-3xl shadow-xl p-8 mb-8`}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className={`w-24 h-24 rounded-full ${status.bgColor} flex items-center justify-center`}>
            {status.icon}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className={`text-2xl font-bold ${status.color} mb-2`}>{status.title}</h1>
            <p className="text-gray-600">{status.description}</p>
            
            {verificationStatus === 'approved' && (
              <Link 
                href="/doctor-dashboard"
                className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <motion.div 
          className="md:col-span-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Verification Process</h2>
            
            {/* Verification Steps */}
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {verificationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-12"
                >
                  {/* Vertical timeline line */}
                  {index < verificationSteps.length - 1 && (
                    <div className="absolute left-[1.40rem] top-10 bottom-0 w-0.5 bg-gray-200" />
                  )}
                  
                  {/* Step dot */}
                  <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center
                                 ${step.status === 'completed' ? 'bg-success/10' : step.status === 'rejected' ? 'bg-danger/10' : 'bg-primary/10'}`}>
                    {step.icon}
                  </div>
                  
                  {/* Step content */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{step.title}</h3>
                    <p className="mt-1 text-gray-600 text-sm">{step.description}</p>
                    
                    {/* Special handling for first step if pending */}
                    {index === 0 && verificationStatus === 'pending' && (
                      <div className="mt-4">
                        <label
                          htmlFor="license-upload"
                          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl border ${isUploading ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'} transition-colors`}
                        >
                          <FiUpload size={18} />
                          <span>{isUploading ? 'Uploading...' : 'Upload License'}</span>
                          <input
                            id="license-upload"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                          />
                        </label>
                        
                        {/* Upload progress bar */}
                        {isUploading && (
                          <div className="mt-2">
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }} 
                              />
                            </div>
                            <div className="mt-1 text-xs text-gray-500 text-right">
                              {uploadProgress}%
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Status badge */}
                    <div className="mt-2">
                      {step.status === 'completed' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                          Completed
                        </span>
                      ) : step.status === 'rejected' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger/10 text-danger">
                          Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {verificationStatus === 'in-review' && (
              <div className="mt-8 p-4 border border-primary/20 bg-primary/5 rounded-xl">
                <p className="text-sm text-gray-700">
                  Your documents have been submitted and are currently under review. You'll receive email notification once the verification is complete.
                </p>
              </div>
            )}
            
            {verificationStatus === 'rejected' && (
              <div className="mt-8 p-4 border border-danger/20 bg-danger/5 rounded-xl">
                <p className="text-sm text-gray-700">
                  Your verification couldn't be completed. Please review the feedback and resubmit the required documents.
                </p>
                <button className="mt-3 px-4 py-2 bg-danger text-white rounded-lg text-sm">
                  View Details
                </button>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Info card */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-gradient-to-b from-primary/5 to-secondary/5 rounded-3xl shadow-lg p-8 h-full">
            <div className="flex justify-center mb-6">
              <Image
                src={doctorImg}
                alt="Doctor verification"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Why verification is important</h3>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                At Vita, we prioritize patient safety and trust. Our verification process ensures that all medical professionals on our platform are qualified and licensed.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-success">
                    <FiCheckCircle size={18} />
                  </div>
                  <p className="text-sm text-gray-700">
                    Builds patient trust and confidence in the platform
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-success">
                    <FiCheckCircle size={18} />
                  </div>
                  <p className="text-sm text-gray-700">
                    Ensures compliance with healthcare regulations
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-success">
                    <FiCheckCircle size={18} />
                  </div>
                  <p className="text-sm text-gray-700">
                    Protects both patients and practitioners
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Need help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is available to assist with your verification process.
                </p>
                <Link
                  href="mailto:support@vita-health.com"
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiHome, FiUsers, FiCalendar, FiAlertTriangle, 
  FiSettings, FiMenu, FiX, FiLogOut, FiActivity,
  FiSliders, FiUserCheck, FiBarChart2, FiTrendingUp
} from 'react-icons/fi';

// Import logo
import logo from '@/public/logo.svg';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Get current user from localStorage on component mount
    try {
      const userJson = localStorage.getItem('vita_current_user');
      if (!userJson) {
        // If no user found, redirect to login
        router.push('/auth');
        return;
      }

      const user = JSON.parse(userJson);
      if (user.userType !== 'admin') {
        // If not an admin, redirect to appropriate dashboard or login
        router.push('/auth');
        return;
      }

      setCurrentUser(user);
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }, [router]);

  // Navigation items based on APPARCHITECTURE.md
  const navItems = [
    { name: 'Dashboard', href: '/admin-dashboard', icon: <FiHome size={20} /> },
    { name: 'Manage Patients', href: '/admin-dashboard/manage-patients', icon: <FiUsers size={20} /> },
    { name: 'Manage Doctors', href: '/admin-dashboard/manage-doctors', icon: <FiUserCheck size={20} /> },
    { name: 'Appointments', href: '/admin-dashboard/appointments', icon: <FiCalendar size={20} /> },
    { name: 'Emergency Calls', href: '/admin-dashboard/emergency-calls', icon: <FiAlertTriangle size={20} /> },
    { name: 'Analytics', href: '/admin-dashboard/analytics', icon: <FiBarChart2 size={20} /> },
    { name: 'Settings', href: '/admin-dashboard/settings', icon: <FiSettings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('vita_current_user');
    router.push('/');
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Mobile navbar */}
      <div className="lg:hidden fixed top-0 z-30 w-full bg-white shadow-md flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <Link href="/admin-dashboard" className="flex items-center">
            <Image src={logo} alt="Vita Logo" width={30} height={30} />
            <span className="ml-2 font-bold text-primary">Vita Admin</span>
          </Link>
        </div>
        
        {currentUser && (
          <div className="text-sm font-medium">{currentUser.name}</div>
        )}
      </div>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 
                  transform transition-transform duration-300 ease-in-out
                  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                  lg:translate-x-0 lg:static`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header with logo */}
          <div className="h-16 flex items-center justify-center border-b px-4">
            <Link href="/admin-dashboard" className="flex items-center">
              <Image src={logo} alt="Vita Logo" width={35} height={35} />
              <span className="ml-2 text-xl font-semibold text-primary">Vita Admin</span>
            </Link>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all
                                ${isActive 
                                  ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                                  : 'text-gray-700 hover:bg-gray-100'
                                }`}
                    >
                      <span className={`mr-3 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                        {item.icon}
                      </span>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User section */}
          {currentUser && (
            <div className="p-4 border-t">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'A'}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium">{currentUser.name || 'Admin User'}</div>
                  <div className="text-xs text-gray-500 truncate">{currentUser.email || 'admin@vita.com'}</div>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="mt-3 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-primary to-secondary hover:shadow-md transition-all"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
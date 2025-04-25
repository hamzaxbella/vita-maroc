'use client';

import React from 'react';

interface AuthTabsProps {
  activeTab: 'login' | 'signup';
  onChangeTab: (tab: 'login' | 'signup') => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onChangeTab }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex -mb-px">
        <button
          onClick={() => onChangeTab('login')}
          className={`mr-8 py-4 text-sm font-medium border-b-2 ${
            activeTab === 'login'
              ? 'border-secondary text-secondary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } transition-all focus:outline-none`}
        >
          Log in
        </button>
        <button
          onClick={() => onChangeTab('signup')}
          className={`py-4 text-sm font-medium border-b-2 ${
            activeTab === 'signup'
              ? 'border-secondary text-secondary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } transition-all focus:outline-none`}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default AuthTabs;
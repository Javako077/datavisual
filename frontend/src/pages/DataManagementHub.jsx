import { useState } from 'react';
import { SalesDataManagement, PerformanceMetricsManagement, UserMetricsManagement } from './DataManagement';

export const DataManagementHub = () => {
  const [activeTab, setActiveTab] = useState('sales');

  const tabs = [
    { id: 'sales', label: 'Sales Data', component: SalesDataManagement },
    { id: 'performance', label: 'Performance Metrics', component: PerformanceMetricsManagement },
    { id: 'userMetrics', label: 'User Metrics', component: UserMetricsManagement }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Data Management</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};
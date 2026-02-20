import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedAreaChart } from '../components/charts/AreaChart';
import { AnimatedLineChart } from '../components/charts/LineChart';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { mockData } from '../data/mockData';

export const UserAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <LoadingSkeleton type="chart" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingSkeleton type="chart" />
          <LoadingSkeleton type="chart" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        User Analytics
      </h1>

      {/* User Activity Overview */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          User Activity Overview
        </h3>
        <AnimatedAreaChart
          data={data.userAnalytics}
          areas={[
            { dataKey: 'activeUsers', color: '#3b82f6', name: 'Active Users' },
            { dataKey: 'newUsers', color: '#10b981', name: 'New Users' },
            { dataKey: 'returningUsers', color: '#f59e0b', name: 'Returning Users' }
          ]}
          height={400}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New vs Returning Users */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            New vs Returning Users
          </h3>
          <AnimatedLineChart
            data={data.userAnalytics}
            lines={[
              { dataKey: 'newUsers', color: '#10b981', name: 'New Users' },
              { dataKey: 'returningUsers', color: '#8b5cf6', name: 'Returning Users' }
            ]}
          />
        </div>

        {/* User Engagement Metrics */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Engagement Metrics
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-400">Average Session Duration</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">4.2 min</p>
              <p className="text-sm text-green-600">+12% from last week</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">Pages per Session</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">3.7</p>
              <p className="text-sm text-green-600">+8% from last week</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Bounce Rate</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">32.5%</p>
              <p className="text-sm text-red-600">-2.1% from last week</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Demographics */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          User Demographics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">65%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Desktop Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">28%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Mobile Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">7%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tablet Users</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
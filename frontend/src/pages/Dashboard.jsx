import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, ShoppingCart, TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { AnimatedLineChart } from '../components/charts/LineChart';
import { AnimatedBarChart } from '../components/charts/BarChart';
import { AnimatedPieChart } from '../components/charts/PieChart';
import { AnimatedAreaChart } from '../components/charts/AreaChart';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { mockData, generateTimeSeriesData } from '../data/mockData';

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using mock data for now
        setData(mockData);
        setTimeSeriesData(generateTimeSeriesData(30));
      } catch (error) {
        console.error('Error loading data:', error);
        setData(mockData);
        setTimeSeriesData(generateTimeSeriesData(30));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChartClick = (data, index) => {
    console.log('Chart clicked:', data, index);
    // Implement drill-down functionality
  };

  const downloadCSV = () => {
    const csvData = mockData.salesData.map(item => 
      `${item.month},${item.sales},${item.revenue},${item.target}`
    ).join('\n');
    
    const blob = new Blob([`Month,Sales,Revenue,Target\n${csvData}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-data.csv';
    a.click();
  };

  if (loading) {
    return (
      <div className="p-8 space-y-8">
        <LoadingSkeleton type="card" count={4} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LoadingSkeleton type="chart" />
          <LoadingSkeleton type="chart" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <div className="text-center">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 space-y-8 min-h-screen"
    >
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gradient mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Here's what's happening with your business today.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={data.kpis.totalRevenue}
          growth={data.kpis.revenueGrowth}
          icon={DollarSign}
          format="currency"
        />
        <KPICard
          title="Total Users"
          value={data.kpis.totalUsers}
          growth={data.kpis.userGrowth}
          icon={Users}
        />
        <KPICard
          title="Total Sales"
          value={data.kpis.totalSales}
          growth={data.kpis.salesGrowth}
          icon={ShoppingCart}
        />
        <KPICard
          title="Conversion Rate"
          value={data.kpis.conversionRate}
          growth={data.kpis.conversionGrowth}
          icon={TrendingUp}
          format="percentage"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sales Performance
                </h3>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Last 12 months</span>
            </div>
            <AnimatedLineChart
              data={data.salesData}
              lines={[
                { dataKey: 'sales', color: '#3b82f6', name: 'Sales' },
                { dataKey: 'target', color: '#10b981', name: 'Target' }
              ]}
              onPointClick={handleChartClick}
            />
          </div>
        </motion.div>

        {/* Revenue by Month */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Monthly Revenue
                </h3>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">This year</span>
            </div>
            <AnimatedBarChart
              data={data.salesData}
              bars={[
                { dataKey: 'revenue', color: '#8b5cf6', name: 'Revenue' }
              ]}
              onBarClick={handleChartClick}
            />
          </div>
        </motion.div>

        {/* Regional Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sales by Region
                </h3>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Global</span>
            </div>
            <AnimatedPieChart
              data={data.regionData}
              onSegmentClick={handleChartClick}
            />
          </div>
        </motion.div>

        {/* User Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  User Activity
                </h3>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</span>
            </div>
            <AnimatedAreaChart
              data={timeSeriesData}
              areas={[
                { dataKey: 'users', color: '#f59e0b', name: 'Users' }
              ]}
              onAreaClick={handleChartClick}
            />
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.performanceMetrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="p-6 glass rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{metric.metric}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}{metric.unit}
              </p>
              <p className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit} from last week
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, Filter } from 'lucide-react';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { mockData } from '../data/mockData';

export const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('month');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = data?.salesData.sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aVal === 'string') {
      return aVal.localeCompare(bVal) * modifier;
    }
    return (aVal - bVal) * modifier;
  });

  const filteredData = sortedData?.filter(item =>
    item.month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const csvData = filteredData.map(item => 
      `${item.month},${item.sales},${item.revenue},${item.target}`
    ).join('\n');
    
    const blob = new Blob([`Month,Sales,Revenue,Target\n${csvData}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales-report.csv';
    a.click();
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <LoadingSkeleton type="table" count={10} />
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reports
        </h1>
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by month..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Filter className="w-4 h-4" />
            <span>Showing {filteredData?.length} of {data?.salesData.length} records</span>
          </div>
        </div>
      </div>

      {/* Sales Data Table */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Sales Performance Report
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th 
                  className="px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => handleSort('month')}
                >
                  Month {sortField === 'month' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => handleSort('sales')}
                >
                  Sales {sortField === 'sales' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => handleSort('revenue')}
                >
                  Revenue {sortField === 'revenue' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => handleSort('target')}
                >
                  Target {sortField === 'target' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3">Performance</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((item, index) => {
                const performance = ((item.sales / item.target) * 100).toFixed(1);
                const isAboveTarget = item.sales >= item.target;
                
                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {item.month}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {item.sales.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      ${item.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {item.target.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isAboveTarget 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {performance}%
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Performance Table */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Category Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Sales</th>
                <th className="px-6 py-3">Growth</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.categoryData.map((category, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {category.category}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    ${category.sales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${
                      category.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {category.growth >= 0 ? '+' : ''}{category.growth}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.growth >= 0 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {category.growth >= 0 ? 'Growing' : 'Declining'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedLineChart } from '../components/charts/LineChart';
import { AnimatedBarChart } from '../components/charts/BarChart';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { mockData } from '../data/mockData';

export const SalesAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCategoryData = selectedCategory
    ? data?.categoryData.filter(item => 
        item.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    : data?.categoryData;

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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sales Analytics
        </h1>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home & Garden</option>
          <option value="sports">Sports</option>
          <option value="books">Books</option>
        </select>
      </div>

      {/* Sales vs Target */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Sales vs Target Performance
        </h3>
        <AnimatedLineChart
          data={data.salesData}
          lines={[
            { dataKey: 'sales', color: '#3b82f6', name: 'Actual Sales' },
            { dataKey: 'target', color: '#ef4444', name: 'Target' }
          ]}
          height={400}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Revenue
          </h3>
          <AnimatedBarChart
            data={data.salesData}
            bars={[
              { dataKey: 'revenue', color: '#10b981', name: 'Revenue' }
            ]}
          />
        </div>

        {/* Category Performance */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Category Performance
          </h3>
          <div className="space-y-4">
            {filteredCategoryData?.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {category.category}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ${category.sales.toLocaleString()} sales
                  </p>
                </div>
                <div className={`text-sm font-medium ${
                  category.growth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {category.growth >= 0 ? '+' : ''}{category.growth}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
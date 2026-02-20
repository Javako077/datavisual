import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sun, Moon, Download, Filter, Calendar, Bell, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const TopNavbar = ({ onSearch, onDateFilter, onCategoryFilter, onDownload }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass border-b border-white/20 dark:border-gray-700/30 px-6 py-4 sticky top-0 z-30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 flex-1">
          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search analytics..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 glass rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="px-4 py-2 glass rounded-lg">
              <span className="text-xs text-gray-500 dark:text-gray-400">Active Users</span>
              <p className="text-sm font-bold text-green-600 dark:text-green-400">2,847</p>
            </div>
            <div className="px-4 py-2 glass rounded-lg">
              <span className="text-xs text-gray-500 dark:text-gray-400">Revenue</span>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">$45.2K</p>
            </div>
          </div>

          {/* Filters */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Filters</span>
            </button>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-80 glass rounded-2xl shadow-2xl p-6 z-50"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Filter Options
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date Range
                    </label>
                    <select
                      onChange={(e) => onDateFilter?.(e.target.value)}
                      className="w-full p-3 glass rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="1y">Last year</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      onChange={(e) => onCategoryFilter?.(e.target.value)}
                      className="w-full p-3 glass rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="">All Categories</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="home">Home & Garden</option>
                      <option value="sports">Sports</option>
                      <option value="books">Books</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full btn-primary mt-4"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onDownload}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button className="p-3 glass rounded-xl hover:bg-white/20 transition-all duration-300 relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <button className="p-3 glass rounded-xl hover:bg-white/20 transition-all duration-300">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={() => {
              logout();
              toast.success('Logged out successfully');
            }}
            className="p-3 glass rounded-xl hover:bg-red-500/20 transition-all duration-300 text-red-600 dark:text-red-400"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-3 glass rounded-xl hover:bg-white/20 transition-all duration-300 relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </motion.div>
          </button>
        </div>
      </div>
    </motion.header>
  );
};
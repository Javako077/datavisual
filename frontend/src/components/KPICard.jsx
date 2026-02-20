import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

export const KPICard = ({ title, value, growth, icon: Icon, format = 'number' }) => {
  const formatValue = (val) => {
    if (format === 'currency') return `$${val.toLocaleString()}`;
    if (format === 'percentage') return `${val}%`;
    return val.toLocaleString();
  };

  const isPositive = growth >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="card p-6 relative overflow-hidden group"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Sparkle effect */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="w-4 h-4 text-yellow-400" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
            isPositive 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(growth)}%</span>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gradient mb-2">
            {formatValue(value)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {isPositive ? 'Increased' : 'Decreased'} from last period
          </p>
        </div>
      </div>
    </motion.div>
  );
};
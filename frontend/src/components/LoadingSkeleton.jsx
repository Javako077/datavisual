import { motion } from 'framer-motion';

export const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === 'card') {
    return (
      <div className="space-y-4">
        {skeletons.map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-6"
          >
            <div className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card p-6"
      >
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </motion.div>
    );
  }

  if (type === 'table') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card p-6"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          {skeletons.map((i) => (
            <div key={i} className="flex space-x-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return null;
};
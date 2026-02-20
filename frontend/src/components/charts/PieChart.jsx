import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{data.name}</p>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Value: {data.value}%
        </p>
        <p className="text-sm text-green-600 dark:text-green-400">
          Sales: {data.sales?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export const AnimatedPieChart = ({ data, height = 300, onSegmentClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onClick={onSegmentClick}
            className="cursor-pointer"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
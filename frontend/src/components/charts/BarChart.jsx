import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const AnimatedBarChart = ({ data, bars, height = 300, onBarClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="month" 
            className="text-xs text-gray-600 dark:text-gray-400"
          />
          <YAxis className="text-xs text-gray-600 dark:text-gray-400" />
          <Tooltip content={<CustomTooltip />} />
          {bars.map((bar, index) => (
            <Bar
              key={index}
              dataKey={bar.dataKey}
              fill={bar.color}
              radius={[4, 4, 0, 0]}
              onClick={onBarClick}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
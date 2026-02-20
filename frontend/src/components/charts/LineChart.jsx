import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

export const AnimatedLineChart = ({ data, lines, height = 300, onPointClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="month" 
            className="text-xs text-gray-600 dark:text-gray-400"
          />
          <YAxis className="text-xs text-gray-600 dark:text-gray-400" />
          <Tooltip content={<CustomTooltip />} />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              strokeWidth={2}
              dot={{ fill: line.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: line.color, strokeWidth: 2 }}
              onClick={onPointClick}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
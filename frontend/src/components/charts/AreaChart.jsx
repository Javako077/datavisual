import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

export const AnimatedAreaChart = ({ data, areas, height = 300, onAreaClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {areas.map((area, index) => (
              <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={area.color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={area.color} stopOpacity={0.1}/>
              </linearGradient>
            ))}
          </defs>
          <XAxis 
            dataKey="date" 
            className="text-xs text-gray-600 dark:text-gray-400"
          />
          <YAxis className="text-xs text-gray-600 dark:text-gray-400" />
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <Tooltip content={<CustomTooltip />} />
          {areas.map((area, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={area.dataKey}
              stroke={area.color}
              fillOpacity={1}
              fill={`url(#gradient-${index})`}
              onClick={onAreaClick}
              className="cursor-pointer"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
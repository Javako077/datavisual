export const mockData = {
  kpis: {
    totalRevenue: 2847392,
    totalUsers: 45672,
    totalSales: 12847,
    conversionRate: 3.24,
    revenueGrowth: 12.5,
    userGrowth: 8.3,
    salesGrowth: -2.1,
    conversionGrowth: 5.7
  },
  
  salesData: [
    { month: 'Jan', sales: 4000, revenue: 240000, target: 220000 },
    { month: 'Feb', sales: 3000, revenue: 180000, target: 200000 },
    { month: 'Mar', sales: 5000, revenue: 300000, target: 280000 },
    { month: 'Apr', sales: 4500, revenue: 270000, target: 250000 },
    { month: 'May', sales: 6000, revenue: 360000, target: 320000 },
    { month: 'Jun', sales: 5500, revenue: 330000, target: 300000 },
    { month: 'Jul', sales: 7000, revenue: 420000, target: 380000 },
    { month: 'Aug', sales: 6500, revenue: 390000, target: 360000 },
    { month: 'Sep', sales: 8000, revenue: 480000, target: 440000 },
    { month: 'Oct', sales: 7500, revenue: 450000, target: 420000 },
    { month: 'Nov', sales: 9000, revenue: 540000, target: 500000 },
    { month: 'Dec', sales: 8500, revenue: 510000, target: 480000 }
  ],

  userAnalytics: [
    { date: '2024-01-01', newUsers: 120, activeUsers: 1200, returningUsers: 800 },
    { date: '2024-01-02', newUsers: 150, activeUsers: 1350, returningUsers: 900 },
    { date: '2024-01-03', newUsers: 180, activeUsers: 1530, returningUsers: 1020 },
    { date: '2024-01-04', newUsers: 200, activeUsers: 1730, returningUsers: 1150 },
    { date: '2024-01-05', newUsers: 170, activeUsers: 1900, returningUsers: 1280 },
    { date: '2024-01-06', newUsers: 220, activeUsers: 2120, returningUsers: 1420 },
    { date: '2024-01-07', newUsers: 250, activeUsers: 2370, returningUsers: 1580 }
  ],

  regionData: [
    { name: 'North America', value: 35, sales: 15000, color: '#3b82f6' },
    { name: 'Europe', value: 28, sales: 12000, color: '#10b981' },
    { name: 'Asia Pacific', value: 22, sales: 9500, color: '#f59e0b' },
    { name: 'Latin America', value: 10, sales: 4200, color: '#ef4444' },
    { name: 'Middle East', value: 5, sales: 2100, color: '#8b5cf6' }
  ],

  categoryData: [
    { category: 'Electronics', sales: 25000, growth: 15.2 },
    { category: 'Clothing', sales: 18000, growth: 8.7 },
    { category: 'Home & Garden', sales: 12000, growth: -3.1 },
    { category: 'Sports', sales: 9500, growth: 22.4 },
    { category: 'Books', sales: 6500, growth: 5.8 }
  ],

  performanceMetrics: [
    { metric: 'Page Load Time', value: 2.3, unit: 's', trend: 'down', change: -0.2 },
    { metric: 'Bounce Rate', value: 32.5, unit: '%', trend: 'down', change: -2.1 },
    { metric: 'Session Duration', value: 4.2, unit: 'min', trend: 'up', change: 0.8 },
    { metric: 'Pages per Session', value: 3.7, unit: '', trend: 'up', change: 0.3 }
  ]
};

export const generateTimeSeriesData = (days = 30) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 50000) + 20000,
      users: Math.floor(Math.random() * 2000) + 500,
      orders: Math.floor(Math.random() * 500) + 100,
      conversion: (Math.random() * 5 + 2).toFixed(2)
    });
  }
  
  return data;
};
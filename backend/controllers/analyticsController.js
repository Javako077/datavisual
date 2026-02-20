const SalesData = require('../models/SalesData');
const UserMetrics = require('../models/UserMetrics');
const PerformanceMetrics = require('../models/PerformanceMetrics');

const getSalesAnalytics = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', region, category, startDate, endDate } = req.query;
    
    const filter = {};
    if (region) filter.region = region;
    if (category) filter.category = category;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const sales = await SalesData.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SalesData.countDocuments(filter);

    res.json({
      success: true,
      data: sales,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const filter = {};
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const userMetrics = await UserMetrics.find(filter).sort({ date: -1 });
    res.json({ success: true, data: userMetrics });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPerformanceAnalytics = async (req, res) => {
  try {
    const { kpiName } = req.query;
    
    const filter = {};
    if (kpiName) filter.kpiName = kpiName;

    const performance = await PerformanceMetrics.find(filter).sort({ timestamp: -1 });
    res.json({ success: true, data: performance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const exportSalesCSV = async (req, res) => {
  try {
    const sales = await SalesData.find({}).sort({ date: -1 });
    
    const csvData = sales.map(sale => ({
      date: sale.date.toISOString().split('T')[0],
      region: sale.region,
      category: sale.category,
      revenue: sale.revenue,
      units: sale.units
    }));

    const csv = [
      'Date,Region,Category,Revenue,Units',
      ...csvData.map(row => `${row.date},${row.region},${row.category},${row.revenue},${row.units}`)
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=sales_data.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSalesAnalytics, getUserAnalytics, getPerformanceAnalytics, exportSalesCSV };
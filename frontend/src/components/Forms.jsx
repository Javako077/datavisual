import { useState } from 'react';

export const SalesDataForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: initialData?.date?.split('T')[0] || '',
    region: initialData?.region || '',
    category: initialData?.category || '',
    revenue: initialData?.revenue || '',
    units: initialData?.units || '',
    target: initialData?.target || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Region</label>
        <select
          value={formData.region}
          onChange={(e) => setFormData({...formData, region: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select Region</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia Pacific">Asia Pacific</option>
          <option value="Latin America">Latin America</option>
          <option value="Middle East">Middle East</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home & Garden">Home & Garden</option>
          <option value="Sports">Sports</option>
          <option value="Books">Books</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Revenue</label>
        <input
          type="number"
          value={formData.revenue}
          onChange={(e) => setFormData({...formData, revenue: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Units</label>
        <input
          type="number"
          value={formData.units}
          onChange={(e) => setFormData({...formData, units: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target</label>
        <input
          type="number"
          value={formData.target}
          onChange={(e) => setFormData({...formData, target: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export const PerformanceMetricsForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    kpiName: initialData?.kpiName || '',
    value: initialData?.value || '',
    unit: initialData?.unit || '',
    trend: initialData?.trend || 'stable',
    change: initialData?.change || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">KPI Name</label>
        <input
          type="text"
          value={formData.kpiName}
          onChange={(e) => setFormData({...formData, kpiName: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Value</label>
        <input
          type="number"
          step="0.01"
          value={formData.value}
          onChange={(e) => setFormData({...formData, value: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Unit</label>
        <input
          type="text"
          value={formData.unit}
          onChange={(e) => setFormData({...formData, unit: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trend</label>
        <select
          value={formData.trend}
          onChange={(e) => setFormData({...formData, trend: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="up">Up</option>
          <option value="down">Down</option>
          <option value="stable">Stable</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Change</label>
        <input
          type="number"
          step="0.01"
          value={formData.change}
          onChange={(e) => setFormData({...formData, change: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export const UserMetricsForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: initialData?.date?.split('T')[0] || '',
    activeUsers: initialData?.activeUsers || '',
    newUsers: initialData?.newUsers || '',
    returningUsers: initialData?.returningUsers || '',
    churnRate: initialData?.churnRate || '',
    sessionDuration: initialData?.sessionDuration || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Active Users</label>
        <input
          type="number"
          value={formData.activeUsers}
          onChange={(e) => setFormData({...formData, activeUsers: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Users</label>
        <input
          type="number"
          value={formData.newUsers}
          onChange={(e) => setFormData({...formData, newUsers: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Returning Users</label>
        <input
          type="number"
          value={formData.returningUsers}
          onChange={(e) => setFormData({...formData, returningUsers: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Churn Rate (%)</label>
        <input
          type="number"
          step="0.01"
          value={formData.churnRate}
          onChange={(e) => setFormData({...formData, churnRate: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Session Duration (seconds)</label>
        <input
          type="number"
          value={formData.sessionDuration}
          onChange={(e) => setFormData({...formData, sessionDuration: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};
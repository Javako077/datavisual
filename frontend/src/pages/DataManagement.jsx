import { DataTable } from '../components/DataTable';
import { SalesDataForm, PerformanceMetricsForm, UserMetricsForm } from '../components/Forms';
import { apiService } from '../services/api';

export const SalesDataManagement = () => {
  const columns = [
    { key: 'date', label: 'Date', render: (value) => new Date(value).toLocaleDateString() },
    { key: 'region', label: 'Region' },
    { key: 'category', label: 'Category' },
    { key: 'revenue', label: 'Revenue', render: (value) => `$${value.toLocaleString()}` },
    { key: 'units', label: 'Units' },
    { key: 'target', label: 'Target', render: (value) => `$${value.toLocaleString()}` }
  ];

  return (
    <DataTable
      title="Sales Data"
      columns={columns}
      apiService={apiService.salesData}
      FormComponent={SalesDataForm}
    />
  );
};

export const PerformanceMetricsManagement = () => {
  const columns = [
    { key: 'kpiName', label: 'KPI Name' },
    { key: 'value', label: 'Value' },
    { key: 'unit', label: 'Unit' },
    { key: 'trend', label: 'Trend', render: (value) => (
      <span className={`px-2 py-1 rounded text-xs ${
        value === 'up' ? 'bg-green-100 text-green-800' :
        value === 'down' ? 'bg-red-100 text-red-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {value}
      </span>
    )},
    { key: 'change', label: 'Change' },
    { key: 'timestamp', label: 'Timestamp', render: (value) => new Date(value).toLocaleString() }
  ];

  return (
    <DataTable
      title="Performance Metrics"
      columns={columns}
      apiService={apiService.performanceMetrics}
      FormComponent={PerformanceMetricsForm}
    />
  );
};

export const UserMetricsManagement = () => {
  const columns = [
    { key: 'date', label: 'Date', render: (value) => new Date(value).toLocaleDateString() },
    { key: 'activeUsers', label: 'Active Users' },
    { key: 'newUsers', label: 'New Users' },
    { key: 'returningUsers', label: 'Returning Users' },
    { key: 'churnRate', label: 'Churn Rate', render: (value) => `${value}%` },
    { key: 'sessionDuration', label: 'Session Duration', render: (value) => `${Math.round(value/60)}m` }
  ];

  return (
    <DataTable
      title="User Metrics"
      columns={columns}
      apiService={apiService.userMetrics}
      FormComponent={UserMetricsForm}
    />
  );
};
import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const DataTable = ({ 
  title, 
  columns, 
  apiService, 
  FormComponent, 
  canCreate = true, 
  canEdit = true, 
  canDelete = true 
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  useEffect(() => {
    fetchData();
  }, [pagination.page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAll({
        page: pagination.page,
        limit: pagination.limit
      });
      setData(response.data.data);
      setPagination(prev => ({ ...prev, ...response.data.pagination }));
    } catch (error) {
      toast.error('Error fetching data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await apiService.create(formData);
      toast.success('Item created successfully');
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating item');
      console.error('Error creating item:', error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await apiService.update(editItem._id, formData);
      toast.success('Item updated successfully');
      setShowForm(false);
      setEditItem(null);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating item');
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await apiService.delete(id);
        toast.success('Item deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Error deleting item');
        console.error('Error deleting item:', error);
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {canCreate && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <PlusIcon className="w-4 h-4" />
            Add New
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {column.label}
                </th>
              ))}
              {(canEdit || canDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item) => (
              <tr key={item._id}>
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                {(canEdit || canDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {canEdit && (
                        <button
                          onClick={() => {
                            setEditItem(item);
                            setShowForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= pagination.pages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {editItem ? 'Edit' : 'Create'} {title.slice(0, -1)}
            </h2>
            <FormComponent
              initialData={editItem}
              onSubmit={editItem ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditItem(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
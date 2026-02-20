import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';
import { SalesAnalytics } from './pages/SalesAnalytics';
import { UserAnalytics } from './pages/UserAnalytics';
import { Reports } from './pages/Reports';
import { DataManagementHub } from './pages/DataManagementHub';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const handleSearch = (term) => {
    console.log('Search:', term);
  };

  const handleDateFilter = (range) => {
    console.log('Date filter:', range);
  };

  const handleCategoryFilter = (category) => {
    console.log('Category filter:', category);
  };

  const handleDownload = () => {
    console.log('Download triggered');
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-0 lg:ml-72">
            <TopNavbar
              onSearch={handleSearch}
              onDateFilter={handleDateFilter}
              onCategoryFilter={handleCategoryFilter}
              onDownload={handleDownload}
            />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/sales" element={<SalesAnalytics />} />
                <Route path="/users" element={<UserAnalytics />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/data-management" element={<DataManagementHub />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
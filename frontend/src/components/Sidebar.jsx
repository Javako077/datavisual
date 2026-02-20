import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  FileText, 
  Menu,
  X,
  Zap,
  Database
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', color: 'from-blue-500 to-cyan-500' },
  { path: '/sales', icon: TrendingUp, label: 'Sales Analytics', color: 'from-green-500 to-emerald-500' },
  { path: '/users', icon: Users, label: 'User Analytics', color: 'from-purple-500 to-pink-500' },
  { path: '/reports', icon: FileText, label: 'Reports', color: 'from-orange-500 to-red-500' },
  { path: '/data-management', icon: Database, label: 'Data Management', color: 'from-indigo-500 to-purple-500' },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 glass rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen || window.innerWidth >= 1020 ? 0 : -280 }}
        transition={{ duration: 0.3, type: "spring", damping: 25 }}
        className="fixed top-0 left-0 z-40 w-72 h-screen glass border-r border-white/20 dark:border-gray-700/30 lg:block"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10 dark:border-gray-700/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                Analytics
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dashboard 
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20' 
                        : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-white/20'
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 glass rounded-xl">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              © 2024 Analytics Dashboard
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
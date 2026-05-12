import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CheckCircle2,
  Sparkles,
  Settings,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: CheckCircle2, label: 'Validation', path: '/validation' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-[68px] h-screen flex flex-col items-center py-5 border-r border-border bg-background/80 backdrop-blur-xl shrink-0">
      {/* Logo */}
      <Link to="/" className="mb-8 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent-indigo/20 flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-all">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-1.5 flex-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className="relative group"
              title={label}
            >
              <motion.div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.03]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2 : 1.5} />
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute -left-[18px] w-[3px] h-5 bg-primary rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>

              {/* Tooltip */}
              <div className="absolute left-14 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-surface-raised border border-border rounded-lg text-xs font-medium text-text-primary opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom settings */}
      <button className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-text-secondary hover:bg-white/[0.03] transition-all" title="Settings">
        <Settings className="w-[18px] h-[18px]" strokeWidth={1.5} />
      </button>
    </aside>
  );
};

export default Sidebar;

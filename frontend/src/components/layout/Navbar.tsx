import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Library, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel rounded-none border-t-0 border-x-0 border-slate-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              EduGraph AI
            </span>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Library className="w-4 h-4" />
              <span>Ingestion</span>
            </Link>
            
            <Link 
              to="/validation" 
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                location.pathname === '/validation' 
                  ? 'text-primary' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Validation</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

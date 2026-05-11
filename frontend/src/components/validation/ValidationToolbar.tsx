import { CheckCircle2, XCircle, AlertCircle, List } from 'lucide-react';

interface Props {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
}

const ValidationToolbar = ({ total, approved, rejected, pending }: Props) => {
  const progress = total > 0 ? ((approved + rejected) / total) * 100 : 0;

  return (
    <div className="glass-panel p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <List className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-slate-200">{total}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Total Topics</p>
          </div>
        </div>
        
        <div className="w-px h-8 bg-slate-700"></div>
        
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-success" />
          <div>
            <p className="text-sm font-semibold text-slate-200">{approved}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Approved</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <XCircle className="w-5 h-5 text-danger" />
          <div>
            <p className="text-sm font-semibold text-slate-200">{rejected}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Rejected</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <div>
            <p className="text-sm font-semibold text-slate-200">{pending}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Pending</p>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-64">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Progress</span>
          <span className="font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ValidationToolbar;

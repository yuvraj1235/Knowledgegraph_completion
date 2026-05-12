import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, BarChart3 } from 'lucide-react';

interface Props {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
}

const ValidationToolbar = ({ total, approved, rejected, pending }: Props) => {
  const progress = total > 0 ? ((approved + rejected) / total) * 100 : 0;

  const stats = [
    { icon: BarChart3, label: 'Total', value: total, color: 'text-text-secondary' },
    { icon: CheckCircle2, label: 'Approved', value: approved, color: 'text-success' },
    { icon: XCircle, label: 'Rejected', value: rejected, color: 'text-danger' },
    { icon: Clock, label: 'Pending', value: pending, color: 'text-warning' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} strokeWidth={1.5} />
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-semibold text-text-primary">{stat.value}</span>
              <span className="text-[10px] text-text-muted uppercase tracking-wider">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full sm:w-40">
        <div className="flex justify-between text-[10px] mb-1.5">
          <span className="text-text-muted uppercase tracking-wider">Progress</span>
          <span className="text-text-secondary font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary/80 to-success/80 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ValidationToolbar;

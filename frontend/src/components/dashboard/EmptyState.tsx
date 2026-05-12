import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

const EmptyState = ({ icon, title, description }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-border flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-text-secondary mb-1">{title}</h3>
      <p className="text-xs text-text-muted max-w-[240px] leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default EmptyState;

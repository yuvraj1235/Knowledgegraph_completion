import { motion } from 'framer-motion';
import type { Topic } from '../../types/topic';
import { ChevronRight } from 'lucide-react';

interface Props {
  topic: Topic;
  index: number;
}

const TopicCard = ({ topic, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="glass-card glass-card-hover p-4 group"
    >
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-lg bg-accent-indigo/10 border border-accent-indigo/10 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-[10px] font-semibold text-accent-indigo">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-text-primary leading-snug mb-1">{topic.title}</h4>
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">{topic.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {topic.subtopics.slice(0, 3).map((sub, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] text-text-muted bg-white/[0.03] border border-border rounded-md px-2 py-0.5">
                <ChevronRight className="w-2.5 h-2.5" />
                {sub.title}
              </span>
            ))}
            {topic.subtopics.length > 3 && (
              <span className="text-[10px] text-text-muted bg-white/[0.02] border border-border rounded-md px-2 py-0.5">
                +{topic.subtopics.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;

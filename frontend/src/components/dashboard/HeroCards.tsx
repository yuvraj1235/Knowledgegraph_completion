import { motion } from 'framer-motion';
import { Upload, Brain, CheckCircle2, Network } from 'lucide-react';
import { useTopicStore } from '../../store/topicStore';

const HeroCards = () => {
  const { topics, transcript } = useTopicStore();
  const approvedCount = topics.filter(t => t.status === 'approved').length;

  const cards = [
    {
      icon: Upload,
      title: 'Upload PDF',
      description: 'Ingest educational material',
      value: transcript ? '1 Document' : 'None',
      accent: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
      dotColor: transcript ? 'bg-success' : 'bg-text-muted',
    },
    {
      icon: Brain,
      title: 'AI Extraction',
      description: 'Topics extracted by GPT-4o',
      value: `${topics.length} Topics`,
      accent: 'from-accent-indigo/10 to-accent-indigo/5',
      iconColor: 'text-accent-indigo',
      dotColor: topics.length > 0 ? 'bg-success' : 'bg-text-muted',
    },
    {
      icon: CheckCircle2,
      title: 'Validation',
      description: 'Topics reviewed and approved',
      value: `${approvedCount}/${topics.length}`,
      accent: 'from-success/10 to-success/5',
      iconColor: 'text-success',
      dotColor: approvedCount === topics.length && topics.length > 0 ? 'bg-success' : 'bg-warning',
    },
    {
      icon: Network,
      title: 'Knowledge Graph',
      description: 'Visual knowledge structure',
      value: approvedCount > 0 ? 'Ready' : 'Pending',
      accent: 'from-accent-violet/10 to-accent-violet/5',
      iconColor: 'text-accent-violet',
      dotColor: approvedCount > 0 ? 'bg-success' : 'bg-text-muted',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.35, ease: 'easeOut' }}
          className="glass-card glass-card-hover p-4 cursor-default group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center border border-white/5`}>
              <card.icon className={`w-4 h-4 ${card.iconColor}`} strokeWidth={1.5} />
            </div>
            <span className={`w-2 h-2 rounded-full ${card.dotColor} mt-1`} />
          </div>
          <h3 className="text-sm font-medium text-text-primary mb-0.5">{card.title}</h3>
          <p className="text-xs text-text-muted mb-3 leading-relaxed">{card.description}</p>
          <p className="text-lg font-semibold text-text-primary tracking-tight">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroCards;

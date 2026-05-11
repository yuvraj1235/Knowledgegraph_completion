import type { Topic } from '../../types/topic';
import { ChevronRight } from 'lucide-react';

interface Props {
  topic: Topic;
}

const TopicCard = ({ topic }: Props) => {
  return (
    <div className="bg-surface border border-slate-700/50 rounded-xl p-5 hover:border-primary/50 transition-colors shadow-lg">
      <h4 className="text-lg font-semibold text-slate-100 mb-2">{topic.title}</h4>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{topic.summary}</p>
      
      <div className="space-y-2">
        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subtopics</h5>
        {topic.subtopics.map((sub, idx) => (
          <div key={idx} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-start space-x-2">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <h6 className="text-sm font-medium text-slate-300">{sub.title}</h6>
                <p className="text-xs text-slate-500 mt-1">{sub.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicCard;

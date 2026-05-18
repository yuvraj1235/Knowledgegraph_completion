import { CheckCircle2, Compass, PlayCircle, Layers } from 'lucide-react';

export interface PathNode {
  target_topic: { id: string; title: string };
  subtopics_to_learn: Array<{ id: string; title: string; description: string }>;
  related_exploration: Array<{
    topic_id: string;
    topic_title: string;
    subtopic_id: string;
    subtopic_title: string;
  }>;
}

interface Props {
  path: PathNode;
  onComplete?: (id: string) => void;
}

const LearningPathCard = ({ path, onComplete }: Props) => {
  return (
    <div className="glass-panel p-6 mb-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-primary/10"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">
            Target Goal
          </span>
          <h2 className="text-2xl font-bold text-white flex items-center">
            {path.target_topic.title}
          </h2>
        </div>
        <button className="btn-primary flex items-center space-x-2 text-sm">
          <PlayCircle className="w-4 h-4" />
          <span>Start Learning</span>
        </button>
      </div>

      <div className="space-y-6 relative">
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-700"></div>
        
        {path.subtopics_to_learn.length > 0 && (
          <div className="relative pl-10">
            <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-slate-800 border-2 border-primary flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-3">Required Prerequisites</h3>
            <div className="grid gap-3">
              {path.subtopics_to_learn.map((sub) => (
                <div key={sub.id} className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg flex justify-between items-center group/item hover:border-primary/30 transition-colors">
                  <div>
                    <h4 className="font-medium text-slate-200">{sub.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">{sub.description}</p>
                  </div>
                  <button 
                    onClick={() => onComplete?.(sub.id)}
                    className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-500 hover:text-success hover:border-success hover:bg-success/10 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {path.related_exploration.length > 0 && (
          <div className="relative pl-10 pt-4">
            <div className="absolute left-0 top-5 w-8 h-8 rounded-full bg-slate-800 border-2 border-accent-violet flex items-center justify-center">
              <Compass className="w-4 h-4 text-accent-violet" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-3">Related Exploration</h3>
            <div className="grid gap-3">
              {path.related_exploration.map((rel, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg flex justify-between items-center group/item hover:border-accent-violet/30 transition-colors">
                  <div>
                    <h4 className="font-medium text-slate-200">{rel.subtopic_title}</h4>
                    <p className="text-sm text-slate-400 mt-1">From: {rel.topic_title}</p>
                  </div>
                  <button 
                    onClick={() => onComplete?.(rel.subtopic_id)}
                    className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-500 hover:text-success hover:border-success hover:bg-success/10 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPathCard;

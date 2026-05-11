import UploadPanel from '../components/dashboard/UploadPanel';
import TranscriptViewer from '../components/dashboard/TranscriptViewer';
import TopicCard from '../components/dashboard/TopicCard';
import { useTopicStore } from '../store/topicStore';
import { Network } from 'lucide-react';

const Dashboard = () => {
  const { topics, transcript } = useTopicStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Knowledge Ingestion</h1>
        <p className="text-slate-400 mt-2">Upload your educational material to extract key topics and concepts.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <UploadPanel />
          <TranscriptViewer />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-700/50 pb-4">
            <Network className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-slate-100">Extracted Knowledge</h2>
          </div>
          
          {!transcript && topics.length === 0 ? (
            <div className="glass-panel p-8 text-center text-slate-500 h-[400px] flex flex-col items-center justify-center">
              <Network className="w-12 h-12 mb-4 opacity-50" />
              <p>No knowledge extracted yet.</p>
              <p className="text-sm mt-2">Process a document to see the knowledge graph structure here.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[850px] overflow-y-auto pr-2">
              {topics.map((topic, index) => (
                <TopicCard key={index} topic={topic} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

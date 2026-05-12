import EditableTopicCard from '../components/validation/EditableTopicCard';
import ValidationToolbar from '../components/validation/ValidationToolbar';
import KnowledgeGraph from '../components/graph/KnowledgeGraph';
import { useTopicStore } from '../store/topicStore';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const ValidationDashboard = () => {
  const { topics, getApprovedTopics } = useTopicStore();
  const [showGraph, setShowGraph] = useState(false);

  const approvedCount = topics.filter(t => t.status === 'approved').length;
  const rejectedCount = topics.filter(t => t.status === 'rejected').length;
  const pendingCount = topics.filter(t => t.status === 'pending').length;

  if (topics.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-12 inline-block">
          <AlertCircle className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-200 mb-2">No Topics to Validate</h2>
          <p className="text-slate-400 mb-6">You need to ingest a document first.</p>
          <a href="/" className="btn-primary">Go to Ingestion</a>
        </div>
      </div>
    );
  }

  const allValidated = pendingCount === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex flex-col h-[calc(100vh-4rem)]">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Knowledge Validation</h1>
          <p className="text-slate-400 mt-2">Review, edit, and approve extracted topics before generating the graph.</p>
        </div>

        {allValidated && (
          <button
            onClick={() => setShowGraph(!showGraph)}
            className={`btn-${showGraph ? 'secondary' : 'primary'} flex items-center space-x-2`}
          >
            <span>{showGraph ? 'Back to Review' : 'View Knowledge Graph'}</span>
          </button>
        )}
      </header>

      {!showGraph && (
        <ValidationToolbar
          total={topics.length}
          approved={approvedCount}
          rejected={rejectedCount}
          pending={pendingCount}
        />
      )}

      {showGraph ? (
        <div className="flex-1 glass-panel overflow-hidden relative border-primary/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <KnowledgeGraph topics={getApprovedTopics()} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-8">
          {topics.map((topic, index) => (
            <EditableTopicCard
              key={index}
              topic={topic}
              index={index}
            />
          ))}
        </div>
      )}

      {allValidated && !showGraph && (
        <div className="glass-panel p-6 bg-success/10 border-success/30 flex items-center justify-between animate-pulse">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-8 h-8 text-success" />
            <div>
              <h3 className="font-bold text-success">Validation Complete</h3>
              <p className="text-sm text-slate-300">All topics have been reviewed. You can now generate the knowledge graph.</p>
            </div>
          </div>
          <button
            onClick={() => setShowGraph(true)}
            className="btn-success"
          >
            Generate Graph
          </button>
        </div>
      )}
    </div>
  );
};

export default ValidationDashboard;

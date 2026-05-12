import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EditableTopicCard from '../components/validation/EditableTopicCard';
import ValidationToolbar from '../components/validation/ValidationToolbar';
import KnowledgeGraph from '../components/graph/KnowledgeGraph';
import EmptyState from '../components/dashboard/EmptyState';
import { useTopicStore } from '../store/topicStore';
import { CheckCircle2, AlertCircle, Network, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ValidationDashboard = () => {
  const { topics, getApprovedTopics } = useTopicStore();
  const [showGraph, setShowGraph] = useState(false);

  const approvedCount = topics.filter(t => t.status === 'approved').length;
  const rejectedCount = topics.filter(t => t.status === 'rejected').length;
  const pendingCount = topics.filter(t => t.status === 'pending').length;

  if (topics.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col items-center justify-center min-h-[60vh]">
        <EmptyState
          icon={<AlertCircle className="w-5 h-5 text-text-muted" strokeWidth={1.5} />}
          title="No topics to validate"
          description="Upload a document first to extract topics for validation."
        />
        <Link to="/" className="btn-ghost text-xs mt-4 gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Ingestion
        </Link>
      </div>
    );
  }

  const allValidated = pendingCount === 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-5 flex flex-col h-[calc(100vh-56px)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-end justify-between"
      >
        <div>
          <h1 className="text-xl font-semibold text-text-primary tracking-tight">
            {showGraph ? 'Knowledge Graph' : 'Validation'}
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            {showGraph
              ? 'Interactive visualization of your approved knowledge structure.'
              : 'Review, edit, and approve extracted topics.'}
          </p>
        </div>

        {allValidated && (
          <button
            onClick={() => setShowGraph(!showGraph)}
            className={showGraph ? 'btn-ghost text-xs' : 'btn-primary text-xs'}
          >
            {showGraph ? (
              <><ArrowLeft className="w-3.5 h-3.5" /> Back to Review</>
            ) : (
              <><Sparkles className="w-3.5 h-3.5" /> View Graph</>
            )}
          </button>
        )}
      </motion.div>

      {/* Toolbar */}
      {!showGraph && (
        <ValidationToolbar total={topics.length} approved={approvedCount} rejected={rejectedCount} pending={pendingCount} />
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {showGraph ? (
          <motion.div
            key="graph"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="flex-1 glass-card overflow-hidden"
          >
            <KnowledgeGraph topics={getApprovedTopics()} />
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 overflow-y-auto flex-1 pb-4 content-start"
          >
            {topics.map((topic, index) => (
              <EditableTopicCard key={index} topic={topic} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion banner */}
      {allValidated && !showGraph && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-4 border-success/10 flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">All topics reviewed</p>
              <p className="text-xs text-text-muted">Generate the knowledge graph to visualize your results.</p>
            </div>
          </div>
          <button onClick={() => setShowGraph(true)} className="btn-success text-xs">
            <Network className="w-3.5 h-3.5" /> Generate Graph
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ValidationDashboard;

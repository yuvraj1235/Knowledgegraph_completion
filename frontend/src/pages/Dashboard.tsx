import { motion } from 'framer-motion';
import HeroCards from '../components/dashboard/HeroCards';
import UploadPanel from '../components/dashboard/UploadPanel';
import TranscriptViewer from '../components/dashboard/TranscriptViewer';
import TopicCard from '../components/dashboard/TopicCard';
import EmptyState from '../components/dashboard/EmptyState';
import LoadingSkeleton from '../components/dashboard/LoadingSkeleton';
import { useTopicStore } from '../store/topicStore';
import { Brain, Network } from 'lucide-react';

const Dashboard = () => {
  const { topics, isLoading } = useTopicStore();

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-xl font-semibold text-text-primary tracking-tight">Knowledge Ingestion</h1>
        <p className="text-sm text-text-muted mt-0.5">Upload educational material and extract structured knowledge.</p>
      </motion.div>

      {/* Hero Cards */}
      <HeroCards />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left Column: Upload + Transcript */}
        <div className="lg:col-span-2 space-y-5">
          <UploadPanel />
          <TranscriptViewer />
        </div>

        {/* Right Column: Extracted Topics */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.35 }}
            className="glass-card flex flex-col h-full"
          >
            <div className="px-5 py-3.5 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                <h3 className="text-sm font-medium text-text-primary">Extracted Knowledge</h3>
              </div>
              {topics.length > 0 && (
                <span className="text-[10px] font-medium text-text-muted bg-white/[0.03] border border-border rounded-md px-2 py-0.5">
                  {topics.length} topics
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 max-h-[620px]">
              {isLoading ? (
                <LoadingSkeleton />
              ) : topics.length > 0 ? (
                topics.map((topic, i) => (
                  <TopicCard key={i} topic={topic} index={i} />
                ))
              ) : (
                <EmptyState
                  icon={<Network className="w-5 h-5 text-text-muted" strokeWidth={1.5} />}
                  title="No knowledge extracted"
                  description="Upload a PDF document to begin extracting topics and building your knowledge graph."
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

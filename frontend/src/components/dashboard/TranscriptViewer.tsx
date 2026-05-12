import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useTopicStore } from '../../store/topicStore';

const TranscriptViewer = () => {
  const { transcript } = useTopicStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.35 }}
      className="glass-card flex flex-col h-[420px]"
    >
      <div className="px-5 py-3.5 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
          <h3 className="text-sm font-medium text-text-primary">Transcript</h3>
        </div>
        {transcript && (
          <span className="text-[10px] font-medium text-text-muted bg-white/[0.03] border border-border rounded-md px-2 py-0.5">
            {transcript.length.toLocaleString()} chars
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {transcript ? (
          <p className="text-[13px] leading-relaxed text-text-secondary font-light whitespace-pre-wrap tracking-wide">
            {transcript}
          </p>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-border flex items-center justify-center">
              <FileText className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm text-text-muted">No transcript yet</p>
              <p className="text-xs text-text-muted/60 mt-0.5">Upload a PDF to view extracted text</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TranscriptViewer;

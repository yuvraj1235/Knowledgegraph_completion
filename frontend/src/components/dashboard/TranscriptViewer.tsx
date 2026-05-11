import { FileText } from 'lucide-react';
import { useTopicStore } from '../../store/topicStore';

const TranscriptViewer = () => {
  const { transcript } = useTopicStore();

  if (!transcript) {
    return (
      <div className="glass-panel p-6 h-[400px] flex flex-col items-center justify-center text-slate-500">
        <FileText className="w-12 h-12 mb-4 opacity-50" />
        <p>No transcript available.</p>
        <p className="text-sm">Upload a PDF to see the extracted text here.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel h-[600px] flex flex-col">
      <div className="p-4 border-b border-slate-700/50 flex items-center space-x-2">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Document Transcript</h3>
      </div>
      <div className="p-6 overflow-y-auto flex-1 font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
        {transcript}
      </div>
    </div>
  );
};

export default TranscriptViewer;

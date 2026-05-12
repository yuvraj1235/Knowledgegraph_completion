import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { useTopicStore } from '../../store/topicStore';
import api from '../../api/axios';
import type { IngestionResponse } from '../../types/topic';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UploadPanel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { setLoading, isLoading, setTranscript, setTopics, transcript } = useTopicStore();
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const processFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are supported.');
      return;
    }

    setFileName(file.name);
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post<IngestionResponse>('/ingest', formData);
      setTranscript(response.data.transcript);
      setTopics(response.data.extracted_topics.topics);
      toast.success('Topics extracted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Upload failed');
      setFileName(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) await processFile(e.dataTransfer.files[0]);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) await processFile(e.target.files[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.35 }}
      className="glass-card overflow-hidden"
    >
      <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
        <UploadCloud className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
        <h3 className="text-sm font-medium text-text-primary">Document Upload</h3>
      </div>

      <div className="p-5">
        <div
          className={`relative border border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer min-h-[180px] ${
            dragActive
              ? 'border-primary/40 bg-primary/[0.03]'
              : 'border-border hover:border-border-hover hover:bg-white/[0.01]'
          } ${isLoading ? 'pointer-events-none opacity-60' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isLoading && fileInputRef.current?.click()}
        >
          <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleChange} />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Analyzing document…</p>
                  <p className="text-xs text-text-muted mt-1">Extracting topics with GPT-4o</p>
                </div>
              </motion.div>
            ) : transcript ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-success" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Document processed</p>
                  <p className="text-xs text-text-muted mt-1 truncate max-w-[200px]">{fileName}</p>
                </div>
                <button className="btn-ghost text-xs mt-2" onClick={(e) => { e.stopPropagation(); navigate('/validation'); }}>
                  Review Topics →
                </button>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-border flex items-center justify-center">
                  <FileText className="w-5 h-5 text-text-muted" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Drop PDF here</p>
                  <p className="text-xs text-text-muted mt-1">or click to browse</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadPanel;

import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';
import { useTopicStore } from '../../store/topicStore';
import api from '../../api/axios';
import type { IngestionResponse } from '../../types/topic';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UploadPanel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { setLoading, isLoading, setTranscript, setTopics } = useTopicStore();
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post<IngestionResponse>('/ingest', formData);
      setTranscript(response.data.transcript);
      setTopics(response.data.extracted_topics.topics);
      toast.success("Successfully extracted topics!");
      navigate('/validation');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "An error occurred during upload");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  return (
    <div className="glass-panel p-8 flex flex-col items-center justify-center min-h-[300px]">
      <div 
        className={`w-full max-w-xl p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
          dragActive 
            ? 'border-primary bg-primary/10' 
            : 'border-slate-600 bg-surface/50 hover:bg-surface'
        } ${isLoading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
      >
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="application/pdf" 
          className="hidden" 
          onChange={handleChange}
        />
        
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <div className="text-center">
              <p className="text-lg font-medium text-slate-200">Analyzing Document...</p>
              <p className="text-sm text-slate-400">Extracting topics and subtopics with GPT-4o</p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-slate-700/50 p-4 rounded-full mb-4">
              <UploadCloud className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Educational PDF</h3>
            <p className="text-slate-400 text-center mb-6 max-w-sm">
              Drag and drop your document here, or click to browse. We will automatically extract the knowledge structure.
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <FileText className="w-4 h-4" />
              <span>Supports only PDF</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadPanel;

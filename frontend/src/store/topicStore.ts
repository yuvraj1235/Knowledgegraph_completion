import { create } from 'zustand';
import type { Topic } from '../types/topic';

interface TopicWithStatus extends Topic {
  status: 'approved' | 'rejected' | 'pending';
}

interface TopicState {
  transcript: string;
  topics: TopicWithStatus[];
  isLoading: boolean;
  setTranscript: (transcript: string) => void;
  setTopics: (topics: Topic[]) => void;
  setLoading: (loading: boolean) => void;
  updateTopicStatus: (index: number, status: 'approved' | 'rejected' | 'pending') => void;
  updateTopic: (index: number, topic: Topic) => void;
  getApprovedTopics: () => Topic[];
  reset: () => void;
}

export const useTopicStore = create<TopicState>((set, get) => ({
  transcript: '',
  topics: [],
  isLoading: false,
  setTranscript: (transcript) => set({ transcript }),
  setTopics: (topics) => set({ 
    topics: topics.map(t => ({ ...t, status: 'pending' })) 
  }),
  setLoading: (isLoading) => set({ isLoading }),
  updateTopicStatus: (index, status) => set((state) => {
    const newTopics = [...state.topics];
    newTopics[index] = { ...newTopics[index], status: status };
    return { topics: newTopics };
  }),
  updateTopic: (index, topic) => set((state) => {
    const newTopics = [...state.topics];
    newTopics[index] = { ...newTopics[index], ...topic };
    return { topics: newTopics };
  }),
  getApprovedTopics: () => get().topics.filter(t => t.status === 'approved'),
  reset: () => set({ transcript: '', topics: [], isLoading: false }),
}));

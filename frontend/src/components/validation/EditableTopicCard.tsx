import { useState } from 'react';
import type { Topic } from '../../types/topic';
import { useTopicStore } from '../../store/topicStore';
import { Check, X, Edit2, Save, Trash2, Plus, Loader2 } from 'lucide-react';
import { jsonApi } from '../../api/axios';

interface Props {
  topic: Topic;
  index: number;
}

const EditableTopicCard = ({ topic, index }: Props) => {
  const { updateTopic, updateTopicStatus } = useTopicStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [editedTopic, setEditedTopic] = useState<Topic>({ ...topic });

  const handleSave = () => {
    updateTopic(index, editedTopic);
    setIsEditing(false);
  };

  const statusColors = {
    pending: 'border-slate-700 bg-surface',
    approved: 'border-success/50 bg-success/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    rejected: 'border-danger/50 bg-danger/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
  };

  const handleApprove = async () => {
    if (topic.status === 'approved') return;
    setIsApproving(true);
    try {
      await jsonApi.post('/approve-topic', topic);
      updateTopicStatus(index, 'approved');
    } catch (error) {
      console.error('Failed to approve topic', error);
      alert('Failed to approve topic. See console for details.');
    } finally {
      setIsApproving(false);
    }
  };

  if (isEditing) {
    return (
      <div className={`rounded-xl p-5 border ${statusColors[topic.status || 'pending']} flex flex-col h-full`}>
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-primary">Editing Topic</h4>
          <button onClick={handleSave} className="text-success hover:text-emerald-400 p-1 bg-success/20 rounded">
            <Save className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Title</label>
            <input
              value={editedTopic.title}
              onChange={(e) => setEditedTopic({ ...editedTopic, title: e.target.value })}
              className="w-full bg-slate-800/50 border border-slate-600 rounded p-2 text-sm text-slate-200 focus:border-primary outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 mb-1 block">Summary</label>
            <textarea
              value={editedTopic.summary}
              onChange={(e) => setEditedTopic({ ...editedTopic, summary: e.target.value })}
              className="w-full bg-slate-800/50 border border-slate-600 rounded p-2 text-sm text-slate-200 focus:border-primary outline-none h-20 resize-none"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs text-slate-500 block">Subtopics</label>
              <button
                onClick={() => setEditedTopic({
                  ...editedTopic,
                  subtopics: [...editedTopic.subtopics, { title: 'New Subtopic', description: 'Description' }]
                })}
                className="text-xs text-primary flex items-center hover:underline"
              >
                <Plus className="w-3 h-3 mr-1" /> Add
              </button>
            </div>

            <div className="max-h-[150px] overflow-y-auto space-y-2 pr-1">
              {editedTopic.subtopics.map((sub, sIdx) => (
                <div key={sIdx} className="bg-slate-800/80 p-2 rounded border border-slate-700 relative group">
                  <button
                    onClick={() => setEditedTopic({
                      ...editedTopic,
                      subtopics: editedTopic.subtopics.filter((_, i) => i !== sIdx)
                    })}
                    className="absolute top-1 right-1 text-slate-500 hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <input
                    value={sub.title}
                    onChange={(e) => {
                      const newSubs = [...editedTopic.subtopics];
                      newSubs[sIdx].title = e.target.value;
                      setEditedTopic({ ...editedTopic, subtopics: newSubs });
                    }}
                    className="w-full bg-transparent text-sm font-medium text-slate-300 mb-1 outline-none border-b border-transparent focus:border-primary/50"
                  />
                  <input
                    value={sub.description}
                    onChange={(e) => {
                      const newSubs = [...editedTopic.subtopics];
                      newSubs[sIdx].description = e.target.value;
                      setEditedTopic({ ...editedTopic, subtopics: newSubs });
                    }}
                    className="w-full bg-transparent text-xs text-slate-400 outline-none border-b border-transparent focus:border-primary/50"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-5 border transition-all ${statusColors[topic.status || 'pending']} flex flex-col h-full hover:scale-[1.02] duration-200`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-semibold text-slate-100 pr-4">{topic.title}</h4>
        <button
          onClick={() => setIsEditing(true)}
          className="text-slate-500 hover:text-primary transition-colors mt-1"
          title="Edit Topic"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3">{topic.summary}</p>

      <div className="mb-6 flex-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {topic.subtopics.length} Subtopics
        </span>
        <div className="flex flex-wrap gap-1 mt-2">
          {topic.subtopics.slice(0, 3).map((sub, idx) => (
            <span key={idx} className="text-[10px] px-2 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
              {sub.title}
            </span>
          ))}
          {topic.subtopics.length > 3 && (
            <span className="text-[10px] px-2 py-1 bg-slate-800 text-slate-400 rounded-full border border-slate-700">
              +{topic.subtopics.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-4 border-t border-slate-700/50">
        <button
          onClick={handleApprove}
          disabled={isApproving}
          className={`flex-1 py-2 rounded-lg flex justify-center items-center space-x-1 font-medium transition-colors ${topic.status === 'approved'
            ? 'bg-success text-white shadow-lg shadow-emerald-500/20'
            : 'bg-slate-800 text-slate-400 hover:bg-success/20 hover:text-success'
            } disabled:opacity-50`}
        >
          {isApproving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          <span>{isApproving ? 'Approving...' : 'Approve'}</span>
        </button>

        <button
          onClick={() => updateTopicStatus(index, 'rejected')}
          className={`flex-1 py-2 rounded-lg flex justify-center items-center space-x-1 font-medium transition-colors ${topic.status === 'rejected'
            ? 'bg-danger text-white shadow-lg shadow-red-500/20'
            : 'bg-slate-800 text-slate-400 hover:bg-danger/20 hover:text-danger'
            }`}
        >
          <X className="w-4 h-4" />
          <span>Reject</span>
        </button>
      </div>
    </div>
  );
};

export default EditableTopicCard;

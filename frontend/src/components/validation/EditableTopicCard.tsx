import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Topic } from '../../types/topic';
import { useTopicStore } from '../../store/topicStore';
import { Check, X, Pencil, Save, Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react';

interface Props {
  topic: Topic;
  index: number;
}

const EditableTopicCard = ({ topic, index }: Props) => {
  const { updateTopic, updateTopicStatus } = useTopicStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedTopic, setEditedTopic] = useState<Topic>({ ...topic });

  const handleSave = () => {
    updateTopic(index, editedTopic);
    setIsEditing(false);
  };

  const statusStyles = {
    pending: 'border-border',
    approved: 'border-success/20 bg-success/[0.02]',
    rejected: 'border-danger/20 bg-danger/[0.02]',
  };

  const statusBadge = {
    pending: { color: 'text-text-muted bg-white/[0.03] border-border', label: 'Pending' },
    approved: { color: 'text-success bg-success/10 border-success/10', label: 'Approved' },
    rejected: { color: 'text-danger bg-danger/10 border-danger/10', label: 'Rejected' },
  };

  const currentStatus = topic.status || 'pending';
  const badge = statusBadge[currentStatus];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={`glass-card transition-all duration-300 ${statusStyles[currentStatus]}`}
    >
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            <div className="w-5 h-5 rounded-md bg-accent-indigo/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[9px] font-bold text-accent-indigo">{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  value={editedTopic.title}
                  onChange={(e) => setEditedTopic({ ...editedTopic, title: e.target.value })}
                  className="w-full bg-transparent text-sm font-medium text-text-primary border-b border-border-hover pb-1 outline-none focus:border-primary/40"
                />
              ) : (
                <h4 className="text-sm font-medium text-text-primary leading-snug truncate">{topic.title}</h4>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${badge.color}`}>
              {badge.label}
            </span>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-text-muted hover:text-text-secondary hover:bg-white/[0.03] transition-all"
            >
              {isEditing ? <Save className="w-3 h-3" onClick={handleSave} /> : <Pencil className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Summary */}
        {isEditing ? (
          <textarea
            value={editedTopic.summary}
            onChange={(e) => setEditedTopic({ ...editedTopic, summary: e.target.value })}
            className="w-full bg-white/[0.02] border border-border rounded-lg p-2.5 text-xs text-text-secondary resize-none h-16 outline-none focus:border-border-hover mt-1"
          />
        ) : (
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2 ml-7.5">{topic.summary}</p>
        )}

        {/* Subtopics toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 mt-3 ml-7 text-[11px] text-text-muted hover:text-text-secondary transition-colors"
        >
          {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          {topic.subtopics.length} subtopics
        </button>
      </div>

      {/* Collapsible Subtopics */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-1.5 ml-7">
              {(isEditing ? editedTopic : topic).subtopics.map((sub, sIdx) => (
                <div key={sIdx} className="bg-white/[0.02] rounded-lg p-2.5 border border-border group relative">
                  {isEditing ? (
                    <div className="space-y-1.5">
                      <input
                        value={sub.title}
                        onChange={(e) => {
                          const subs = [...editedTopic.subtopics];
                          subs[sIdx] = { ...subs[sIdx], title: e.target.value };
                          setEditedTopic({ ...editedTopic, subtopics: subs });
                        }}
                        className="w-full bg-transparent text-xs font-medium text-text-primary outline-none border-b border-transparent focus:border-border-hover pb-0.5"
                      />
                      <input
                        value={sub.description}
                        onChange={(e) => {
                          const subs = [...editedTopic.subtopics];
                          subs[sIdx] = { ...subs[sIdx], description: e.target.value };
                          setEditedTopic({ ...editedTopic, subtopics: subs });
                        }}
                        className="w-full bg-transparent text-[11px] text-text-muted outline-none"
                      />
                      <button
                        onClick={() => setEditedTopic({
                          ...editedTopic,
                          subtopics: editedTopic.subtopics.filter((_, i) => i !== sIdx),
                        })}
                        className="absolute top-2 right-2 text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs font-medium text-text-secondary">{sub.title}</p>
                      <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">{sub.description}</p>
                    </>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => setEditedTopic({
                    ...editedTopic,
                    subtopics: [...editedTopic.subtopics, { title: 'New subtopic', description: 'Description' }],
                  })}
                  className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 transition-colors pt-1"
                >
                  <Plus className="w-3 h-3" /> Add subtopic
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center border-t border-border">
        <button
          onClick={() => updateTopicStatus(index, 'approved')}
          className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium transition-all rounded-bl-2xl ${
            currentStatus === 'approved'
              ? 'bg-success/10 text-success'
              : 'text-text-muted hover:text-success hover:bg-success/[0.03]'
          }`}
        >
          <Check className="w-3.5 h-3.5" /> Approve
        </button>
        <div className="w-px h-8 bg-border" />
        <button
          onClick={() => updateTopicStatus(index, 'rejected')}
          className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium transition-all rounded-br-2xl ${
            currentStatus === 'rejected'
              ? 'bg-danger/10 text-danger'
              : 'text-text-muted hover:text-danger hover:bg-danger/[0.03]'
          }`}
        >
          <X className="w-3.5 h-3.5" /> Reject
        </button>
      </div>
    </motion.div>
  );
};

export default EditableTopicCard;

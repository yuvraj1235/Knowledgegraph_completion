import React from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { Topic } from '../../types/topic';

interface Props {
  topics: Topic[];
}

const KnowledgeGraph = ({ topics }: Props) => {
  // Transform topics into ReactFlow nodes and edges
  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];

  let yOffset = 0;

  // Central Root Node
  const rootNodeId = 'root';
  initialNodes.push({
    id: rootNodeId,
    type: 'input',
    data: { label: 'Knowledge Base' },
    position: { x: 400, y: 50 },
    style: {
      background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      padding: '12px 20px',
      boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)'
    }
  });

  topics.forEach((topic, tIdx) => {
    const topicId = `t-${tIdx}`;

    // Topic Node
    initialNodes.push({
      id: topicId,
      data: { label: topic.title },
      position: { x: 200 + (tIdx % 3) * 300, y: 200 + Math.floor(tIdx / 3) * 200 },
      style: {
        background: '#1e293b',
        color: '#e2e8f0',
        border: '1px solid #06b6d4',
        borderRadius: '8px',
        padding: '10px 15px',
        width: 180,
      }
    });

    // Edge from root to topic
    initialEdges.push({
      id: `e-${rootNodeId}-${topicId}`,
      source: rootNodeId,
      target: topicId,
      animated: true,
      style: { stroke: '#06b6d4', strokeWidth: 2 },
    });

    // Subtopic Nodes
    topic.subtopics.forEach((sub, sIdx) => {
      const subId = `s-${tIdx}-${sIdx}`;
      const px = 100 + (tIdx % 3) * 300 + (sIdx % 2 === 0 ? -100 : 100);
      const py = 300 + Math.floor(tIdx / 3) * 200 + Math.floor(sIdx / 2) * 80;

      initialNodes.push({
        id: subId,
        data: { label: sub.title },
        position: { x: px, y: py },
        style: {
          background: '#0f172a',
          color: '#cbd5e1',
          border: '1px solid #475569',
          borderRadius: '4px',
          padding: '8px',
          fontSize: '12px',
          width: 140,
        }
      });

      // Edge from topic to subtopic
      initialEdges.push({
        id: `e-${topicId}-${subId}`,
        source: topicId,
        target: subId,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#475569',
        },
        style: { stroke: '#475569' },
      });
    });
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-full min-h-[600px] bg-background rounded-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#334155" gap={20} size={1} />
        <Controls className="bg-surface border-slate-700 fill-slate-300" />
      </ReactFlow>
    </div>
  );
};

export default KnowledgeGraph;

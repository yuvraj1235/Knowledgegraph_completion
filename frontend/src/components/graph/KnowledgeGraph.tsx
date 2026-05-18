import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { Topic } from '../../types/topic';

interface Props {
  topics: Topic[];
}

const KnowledgeGraph = ({ topics }: Props) => {
  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];

  // Root node
  initialNodes.push({
    id: 'root',
    type: 'input',
    data: { label: 'Knowledge Base' },
    position: { x: 400, y: 30 },
    style: {
      background: 'rgba(103, 232, 249, 0.08)',
      color: '#67e8f9',
      border: '1px solid rgba(103, 232, 249, 0.2)',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      padding: '10px 20px',
      boxShadow: '0 0 20px rgba(103, 232, 249, 0.06)',
    },
  });

  topics.forEach((topic, tIdx) => {
    const topicId = `t-${tIdx}`;
    const cols = Math.min(topics.length, 4);
    const col = tIdx % cols;
    const row = Math.floor(tIdx / cols);
    const xSpacing = 260;
    const xOffset = (cols - 1) * xSpacing / 2;

    initialNodes.push({
      id: topicId,
      data: { label: topic.title },
      position: { x: col * xSpacing - xOffset + 400, y: 150 + row * 200 },
      style: {
        background: 'rgba(6, 182, 212, 0.1)',
        color: '#22d3ee', // cyan
        border: '1px solid rgba(6, 182, 212, 0.4)',
        borderRadius: '12px',
        fontSize: '11px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        padding: '10px 16px',
        width: 180,
        boxShadow: '0 4px 20px rgba(6, 182, 212, 0.15)',
      },
      title: topic.summary || topic.title, // hover tooltip
    });

    initialEdges.push({
      id: `e-root-${topicId}`,
      source: 'root',
      target: topicId,
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'rgba(103, 232, 249, 0.2)', strokeWidth: 1.5 },
    });

    topic.subtopics.forEach((sub, sIdx) => {
      const subId = `s-${tIdx}-${sIdx}`;
      const subX = col * xSpacing - xOffset + 400 + (sIdx % 2 === 0 ? -90 : 90);
      const subY = 270 + row * 200 + Math.floor(sIdx / 2) * 60;

      initialNodes.push({
        id: subId,
        data: { label: sub.title },
        position: { x: subX, y: subY },
        style: {
          background: 'rgba(99, 102, 241, 0.1)',
          color: '#818cf8', // indigo
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '8px',
          fontSize: '10px',
          fontFamily: 'Inter, sans-serif',
          padding: '6px 12px',
          width: 140,
        },
        title: sub.description || sub.title, // hover tooltip
      });

      initialEdges.push({
        id: `e-${topicId}-${subId}`,
        source: topicId,
        target: subId,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(99, 102, 241, 0.5)' },
        style: { stroke: 'rgba(99, 102, 241, 0.3)', strokeWidth: 1 },
      });
    });

    // Simulate a similar edge for demonstration
    if (tIdx > 0) {
      initialEdges.push({
        id: `e-sim-${tIdx-1}-${tIdx}`,
        source: `t-${tIdx-1}`,
        target: topicId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: 'rgba(168, 85, 247, 0.6)', strokeWidth: 2, strokeDasharray: '5,5' }, // purple similar edge
        label: 'SIMILAR_TO',
        labelStyle: { fill: '#a855f7', fontSize: 10, fontWeight: 700 },
        labelBgStyle: { fill: 'rgba(0,0,0,0.8)' },
      });
    }
  });

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-full min-h-[500px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(255,255,255,0.03)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default KnowledgeGraph;

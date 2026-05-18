import { useState, useEffect } from 'react';
import { jsonApi } from '../api/axios';
import LearningPathCard, { type PathNode } from '../components/recommendation/LearningPath';
import { Loader2, Zap, BrainCircuit } from 'lucide-react';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<PathNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId] = useState('user-123'); // Demo user id

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await jsonApi.get(`/recommend/${userId}`);
      setRecommendations(response.data.recommended_path || []);
    } catch (error) {
      console.error('Failed to fetch recommendations', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = (id: string) => {
    // Optimistic UI update or API call to mark as known
    console.log('Marked as known:', id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center">
            <BrainCircuit className="w-8 h-8 mr-3 text-primary" />
            AI Learning Paths
          </h1>
          <p className="text-slate-400 mt-2">
            Personalized recommendations based on the semantic knowledge graph.
          </p>
        </div>
        <button
          onClick={fetchRecommendations}
          disabled={isLoading}
          className="btn-secondary flex items-center space-x-2"
        >
          <Zap className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
          <p>Generating personalized learning paths...</p>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="space-y-6">
          {recommendations.map((path, idx) => (
            <LearningPathCard 
              key={idx} 
              path={path} 
              onComplete={handleComplete} 
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center flex flex-col items-center">
          <BrainCircuit className="w-16 h-16 text-slate-600 mb-4" />
          <h2 className="text-xl font-bold text-slate-200 mb-2">No Recommendations Yet</h2>
          <p className="text-slate-400 mb-6 max-w-md">
            We need more data in the knowledge graph to generate personalized paths. Try approving more topics in the validation dashboard.
          </p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;

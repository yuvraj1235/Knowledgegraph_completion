const LoadingSkeleton = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="glass-card p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-white/[0.03]" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-white/[0.04] rounded-md w-3/5" />
              <div className="h-3 bg-white/[0.03] rounded-md w-4/5" />
              <div className="flex gap-1.5 mt-3">
                <div className="h-5 bg-white/[0.02] rounded-md w-16" />
                <div className="h-5 bg-white/[0.02] rounded-md w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

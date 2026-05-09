import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="glass rounded-3xl p-6 animate-pulse border border-gray-800">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-800" />
        <div className="flex-1">
          <div className="h-5 bg-gray-800 rounded-lg w-3/4 mb-2" />
          <div className="h-3 bg-gray-800 rounded-lg w-1/2" />
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="h-6 bg-gray-800 rounded-full w-16" />
        <div className="h-6 bg-gray-800 rounded-full w-16" />
      </div>
      
      <div className="space-y-2 mb-8">
        <div className="h-3 bg-gray-800 rounded-lg w-full" />
        <div className="h-3 bg-gray-800 rounded-lg w-5/6" />
      </div>
      
      <div className="h-12 bg-gray-800 rounded-xl w-full" />
    </div>
  );
};

export default SkeletonCard;

import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/5 dark:shadow-none p-8">
      <div className="flex items-center gap-6 mb-10 animate-pulse">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-full w-3/4" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-1/2" />
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-8 animate-pulse">
        <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl w-24" />
        <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl w-24" />
      </div>
      
      <div className="space-y-3 mb-10 animate-pulse">
        <div className="h-4 bg-slate-50 dark:bg-slate-800/50 rounded-full w-full" />
        <div className="h-4 bg-slate-50 dark:bg-slate-800/50 rounded-full w-5/6" />
      </div>
      
      <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-[1.5rem] w-full animate-pulse" />
    </div>
  );
};

export default SkeletonCard;

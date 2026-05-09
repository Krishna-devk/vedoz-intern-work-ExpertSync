import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Expert } from '@expertsync/shared';

interface ExpertCardProps {
  expert: Expert;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert }) => {
  return (
    <div className="bg-(--card) border border-(--card-border) rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 group hover:-translate-y-3 shadow-2xl shadow-blue-900/5 dark:shadow-none hover:shadow-blue-500/10">
      <div className="p-8">
        <div className="flex items-center gap-6 mb-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <img 
              src={expert.avatar} 
              alt={expert.name} 
              className="relative w-20 h-20 rounded-3xl object-cover border-4 border-slate-50 dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white dark:border-slate-900 rounded-2xl p-0.5 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight leading-tight">{expert.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <p className="text-[10px] text-blue-600 dark:text-blue-500 font-black uppercase tracking-widest">{expert.category}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-5 py-2 rounded-2xl border border-slate-100 dark:border-transparent transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-black text-slate-900 dark:text-slate-200">{expert.rating}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-5 py-2 rounded-2xl border border-slate-100 dark:border-transparent transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-black text-slate-900 dark:text-slate-200">{expert.experience} Yrs</span>
          </div>
        </div>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-10 line-clamp-2 leading-relaxed font-semibold">
          {expert.bio}
        </p>
        
        <Link 
          to={`/expert/${expert._id}`} 
          className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-black py-5 rounded-3xl transition-all shadow-xl shadow-slate-900/10 dark:shadow-blue-500/20 active:scale-[0.98] group/btn"
        >
          <span>Reserve Session</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
};

export default ExpertCard;

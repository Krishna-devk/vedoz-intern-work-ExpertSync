import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Briefcase } from 'lucide-react';
import type { Expert } from '@expertsync/shared';

interface ExpertCardProps {
  expert: Expert;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert }) => {
  return (
    <div className="glass rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img 
              src={expert.avatar} 
              alt={expert.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-800 group-hover:border-blue-500 transition-all duration-500"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0B0F19] rounded-full"></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{expert.name}</h3>
            <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">{expert.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6 text-xs font-semibold text-gray-400">
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-200">{expert.rating}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-gray-200">{expert.experience} Yrs</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed">
          {expert.bio}
        </p>
        
        <Link 
          to={`/expert/${expert._id}`} 
          className="w-full inline-block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/10 active:scale-95"
        >
          View Availability
        </Link>
      </div>
    </div>
  );
};

export default ExpertCard;

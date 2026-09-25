import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PavilionId, PAVILIONS } from './PavilionNavigation';
import { ArrowRight, Sparkles, Volume2 } from 'lucide-react';

interface PavilionPortalGridProps {
  onSelectPavilion: (id: PavilionId) => void;
  activePavilion: PavilionId;
}

export const PavilionPortalGrid: React.FC<PavilionPortalGridProps> = ({
  onSelectPavilion,
  activePavilion
}) => {
  const { t } = useLanguage();

  return (
    <div className="py-8 bg-[#F5EFE6] border-b border-[#E6D9C8]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Prompt */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-[#843E1F] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Exhibition Pavilions · प्रदर्शनी कक्ष</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#24211D]">
              Explore Without Endless Scrolling
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5A4E] mt-0.5">
              Select any curated pavilion to step directly into that room with zero scroll fatigue.
            </p>
          </div>
        </div>

        {/* 5-Card Interactive Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {PAVILIONS.map((pavilion) => {
            const isSelected = activePavilion === pavilion.id;
            const Icon = pavilion.icon;

            return (
              <button
                key={pavilion.id}
                onClick={() => {
                  onSelectPavilion(pavilion.id);
                  const el = document.getElementById('pavilion-stage');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#3B2616] text-[#FBF9F5] border-[#3B2616] shadow-md ring-2 ring-[#843E1F]'
                    : 'bg-[#FAF6F0] text-[#3B2E24] border-[#DECDBB] hover:bg-[#F0E6D8] hover:border-[#843E1F]/50 hover:shadow-sm'
                }`}
              >
                {/* Decorative Accent Top Bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1" 
                  style={{ backgroundColor: isSelected ? '#E6A060' : pavilion.accentColor }} 
                />

                <div>
                  {/* Room Number & Icon */}
                  <div className="flex items-center justify-between mb-3 pt-1">
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-[#843E1F] text-white' : 'bg-[#EAE0D2] text-[#6B5A4E]'
                    }`}>
                      ROOM {pavilion.roomNumber}
                    </span>
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/10 text-[#E6A060]' : 'bg-[#F2ECE2] text-[#843E1F]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <h4 className={`font-serif text-base font-bold leading-snug group-hover:text-[#843E1F] transition-colors ${
                    isSelected ? 'text-white' : 'text-[#24211D]'
                  }`}>
                    {t(pavilion.badgeKey, pavilion.badgeFallback)}
                  </h4>

                  <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${
                    isSelected ? 'text-[#D4B598]' : 'text-[#6B5A4E]'
                  }`}>
                    {t(pavilion.descriptionKey, pavilion.descriptionFallback)}
                  </p>
                </div>

                {/* Bottom Callout */}
                <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                  isSelected ? 'border-white/20 text-[#E6A060]' : 'border-[#E6D9C8] text-[#843E1F]'
                }`}>
                  <span>Enter Room</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { ComputedMilestoneBadge } from '../data/milestonesData';
import { BadgeVisualEmblem } from './BadgeVisualEmblem';
import { soundscape } from '../utils/soundscape';
import { Sparkles, Trophy, CheckCircle, ArrowRight } from 'lucide-react';

interface BadgeUnlockModalProps {
  newBadges: ComputedMilestoneBadge[];
  onClose: () => void;
  onViewAllMilestones: () => void;
}

export const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({
  newBadges,
  onClose,
  onViewAllMilestones
}) => {
  useEffect(() => {
    // Play celebratory earthen singing bowl chime
    soundscape.playMilestoneChime();
  }, []);

  if (newBadges.length === 0) return null;

  const primaryBadge = newBadges[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#FAF2EB] border-3 border-[#843E1F] rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-6 overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Golden Rays Background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#D97706]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#843E1F]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#843E1F] text-[#FAF2EB] text-xs uppercase tracking-widest font-bold rounded-full shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FCD34D] animate-spin" />
          <span>New Practice Milestone Unlocked!</span>
        </div>

        {/* Badge Visual with Pulsing Glow */}
        <div className="flex justify-center py-2 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-[#843E1F]/10 animate-ping" />
          </div>
          <BadgeVisualEmblem
            iconType={primaryBadge.iconType}
            tier={primaryBadge.tier}
            isUnlocked={true}
            size="xl"
            animate={true}
          />
        </div>

        {/* Badge Name & Hindi Subtitle */}
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#24211D]">
            {primaryBadge.name}
          </h3>
          <div className="text-base font-semibold text-[#843E1F]">
            {primaryBadge.hindiName}
          </div>
          <p className="text-xs text-[#786657] italic">
            &ldquo;{primaryBadge.tagline}&rdquo;
          </p>
        </div>

        {/* Criteria & Description */}
        <div className="bg-[#F4ECE1] border border-[#DFCBB5] rounded-xl p-4 text-xs text-[#4A3D33] space-y-2">
          <div className="flex items-center justify-center gap-1.5 font-bold text-[#2D7A4D]">
            <CheckCircle className="w-4 h-4" />
            <span>{primaryBadge.criteriaLabel}</span>
          </div>
          <p className="leading-relaxed">
            {primaryBadge.description}
          </p>
        </div>

        {/* Cultural Wisdom Proverb */}
        <p className="text-xs italic text-[#6B5A4E] leading-relaxed border-t border-b border-[#E6D9C8] py-2.5">
          {primaryBadge.culturalWisdom}
        </p>

        {/* If multiple badges unlocked together */}
        {newBadges.length > 1 && (
          <div className="text-xs text-[#843E1F] font-bold">
            + {newBadges.length - 1} other digital badge(s) earned today!
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onViewAllMilestones();
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-[#843E1F] hover:bg-[#6B3019] rounded-xl shadow-md transition-colors"
          >
            <Trophy className="w-4 h-4" />
            <span>Open Badge Showcase</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-3 text-xs font-semibold text-[#6B5A4E] hover:text-[#24211D] bg-[#EAE0D2] rounded-xl transition-colors"
          >
            Keep Logging
          </button>
        </div>

      </div>
    </div>
  );
};

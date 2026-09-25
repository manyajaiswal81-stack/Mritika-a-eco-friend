import React, { useState } from 'react';
import { ComputedMilestoneBadge } from '../data/milestonesData';
import { BadgeVisualEmblem } from './BadgeVisualEmblem';
import { soundscape } from '../utils/soundscape';
import { 
  X, 
  CheckCircle, 
  Lock, 
  Share2, 
  Volume2, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Copy, 
  Check 
} from 'lucide-react';

interface BadgeDetailModalProps {
  badge: ComputedMilestoneBadge | null;
  onClose: () => void;
  onLogClick?: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  onClose,
  onLogClick
}) => {
  const [copied, setCopied] = useState(false);

  if (!badge) return null;

  const handleShare = () => {
    const text = badge.isUnlocked
      ? `🌱 I just earned the "${badge.name} (${badge.hindiName})" Digital Milestone Badge on the Mrittika Soil Ledger for vernacular zero-waste living! Check it out and log your daily practices to protect Mother Earth.`
      : `🌱 I'm tracking towards the "${badge.name}" Digital Badge on the Mrittika Soil Ledger (${badge.currentCount}/${badge.targetCount} ${badge.metricUnit}). Join the zero-waste daily movement!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const playSound = () => {
    soundscape.playMilestoneChime();
  };

  const getTierBadgeStyle = () => {
    switch (badge.tier) {
      case 'pinnacle':
        return 'bg-[#843E1F] text-[#FAF2EB] border-[#843E1F]';
      case 'diamond':
        return 'bg-[#059669] text-white border-[#059669]';
      case 'gold':
        return 'bg-[#D97706] text-white border-[#D97706]';
      case 'silver':
        return 'bg-[#64748B] text-white border-[#64748B]';
      case 'bronze':
      default:
        return 'bg-[#92400E] text-white border-[#92400E]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#FBF9F5] border-2 border-[#843E1F]/30 rounded-2xl shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Pattern Banner */}
        <div className="h-24 bg-gradient-to-r from-[#FAF0E6] via-[#F4E3D2] to-[#EBD5C0] border-b border-[#E0CEBC] relative flex items-center justify-center px-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/70 text-[#6B5A4E] hover:text-[#24211D] hover:bg-white transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Floating Emblem Centered on the Boundary */}
          <div className="absolute -bottom-10 flex justify-center">
            <BadgeVisualEmblem
              iconType={badge.iconType}
              tier={badge.tier}
              isUnlocked={badge.isUnlocked}
              size="lg"
              animate={badge.isUnlocked}
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="pt-14 pb-6 px-6 sm:px-8 space-y-5">
          
          {/* Badge Title & Status */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className={`px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full border ${getTierBadgeStyle()}`}>
                {badge.tier} Tier
              </span>
              <span className="text-xs text-[#8C7A6D] uppercase tracking-wider font-semibold">
                {badge.category} Milestone
              </span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#24211D]">
              {badge.name}
            </h3>

            <div className="text-sm font-medium text-[#843E1F] flex items-center justify-center gap-1.5">
              <span>{badge.hindiName}</span>
              <span aria-hidden="true">·</span>
              <span className="italic text-[#786657] font-normal">{badge.tagline}</span>
            </div>
          </div>

          {/* Unlocked / In-Progress Status Banner */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
            badge.isUnlocked
              ? 'bg-[#EAF5EF] border-[#A7D7B9] text-[#1E4D34]'
              : 'bg-[#F5EFE6] border-[#DCCBB7] text-[#6B5A4E]'
          }`}>
            <div className="flex items-center gap-2.5">
              {badge.isUnlocked ? (
                <div className="p-1.5 bg-[#2D7A4D] text-white rounded-full">
                  <CheckCircle className="w-4 h-4" />
                </div>
              ) : (
                <div className="p-1.5 bg-[#A08E80] text-white rounded-full">
                  <Lock className="w-4 h-4" />
                </div>
              )}
              <div>
                <div className="text-xs font-bold">
                  {badge.isUnlocked ? 'Officially Awarded & Verified' : 'Milestone In Progress'}
                </div>
                <div className="text-[11px] opacity-80">
                  {badge.isUnlocked 
                    ? 'Recorded permanently in your civic soil ledger' 
                    : `Current progress: ${badge.currentCount} / ${badge.targetCount} ${badge.metricUnit}`}
                </div>
              </div>
            </div>

            {badge.isUnlocked && (
              <button
                onClick={playSound}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white text-[#1E4D34] hover:bg-[#E2F0E7] border border-[#A7D7B9] rounded-lg transition-colors"
                title="Hear celebratory chime"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Chime</span>
              </button>
            )}
          </div>

          {/* Progress Bar (especially for locked/in-progress) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#786657]">
              <span>Requirement: <strong>{badge.criteriaLabel}</strong></span>
              <span className="font-semibold tabular-nums text-[#843E1F]">
                {badge.progressPercent}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#EAE0D2] rounded-full overflow-hidden p-0.5 border border-[#DECDBB]">
              <div 
                className="h-full bg-gradient-to-r from-[#843E1F] to-[#2D4A3E] rounded-full transition-all duration-500"
                style={{ width: `${badge.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#FAF4EB] border border-[#E8DACB] rounded-xl p-4 space-y-2">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#843E1F] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Badge Significance</span>
            </div>
            <p className="text-xs sm:text-sm text-[#4A3D33] leading-relaxed">
              {badge.description}
            </p>
          </div>

          {/* Cultural Ecological Wisdom Quote */}
          <div className="border-l-3 border-[#843E1F] pl-3 py-1 bg-[#F5EFE6]/50 rounded-r-lg">
            <p className="text-xs italic text-[#5C4D41] leading-relaxed">
              {badge.culturalWisdom}
            </p>
          </div>

          {/* Perk / Recognition */}
          <div className="flex items-start gap-2.5 text-xs text-[#6B5A4E]">
            <Sparkles className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#24211D]">Steward Recognition: </strong>
              <span>{badge.perkReward}</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-[#E6D9C8] flex items-center justify-between gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#843E1F] hover:bg-[#F2E6D8] border border-[#D9C4AF] rounded-xl transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-700">Copied Certificate!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Milestone</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              {!badge.isUnlocked && onLogClick && (
                <button
                  onClick={() => {
                    onClose();
                    onLogClick();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#843E1F] hover:bg-[#6B3019] rounded-xl transition-colors shadow-xs"
                >
                  Log Practice Now
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#6B5A4E] hover:text-[#24211D] bg-[#F2ECE2] rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

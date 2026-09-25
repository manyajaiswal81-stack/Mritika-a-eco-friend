import React from 'react';
import { 
  BadgeTier, 
  BadgeIconType 
} from '../data/milestonesData';
import { 
  Sprout, 
  Flame, 
  Shield, 
  Trophy, 
  Award, 
  Leaf, 
  Sparkles, 
  Heart, 
  Zap, 
  Lock
} from 'lucide-react';

interface BadgeVisualEmblemProps {
  iconType: BadgeIconType;
  tier: BadgeTier;
  isUnlocked: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export const BadgeVisualEmblem: React.FC<BadgeVisualEmblemProps> = ({
  iconType,
  tier,
  isUnlocked,
  size = 'md',
  className = '',
  animate = false
}) => {
  // Dimensions
  const sizeMap = {
    sm: { container: 'w-10 h-10', icon: 'w-4 h-4', ring: 'p-1', star: 'w-2.5 h-2.5' },
    md: { container: 'w-16 h-16', icon: 'w-7 h-7', ring: 'p-1.5', star: 'w-3 h-3' },
    lg: { container: 'w-24 h-24', icon: 'w-10 h-10', ring: 'p-2', star: 'w-4 h-4' },
    xl: { container: 'w-32 h-32', icon: 'w-14 h-14', ring: 'p-2.5', star: 'w-5 h-5' }
  };

  const currentSize = sizeMap[size];

  // Tier Colors & Gradients
  const getTierStyles = () => {
    if (!isUnlocked) {
      return {
        outerBorder: 'border-[#DECDBB] bg-[#EAE0D2]/60 text-[#A08E80]',
        innerBg: 'bg-[#DFD4C5]/50 border-[#CEBEAC]',
        glow: '',
        accentRing: 'stroke-[#CEBEAC]'
      };
    }

    switch (tier) {
      case 'pinnacle':
        return {
          outerBorder: 'border-[#843E1F] bg-gradient-to-br from-[#FAF0E6] via-[#F3DECA] to-[#E2BEA2] text-[#843E1F] shadow-md shadow-[#843E1F]/20',
          innerBg: 'bg-gradient-to-tr from-[#843E1F] to-[#5C2711] text-[#FAF2EB] border-[#D98E68]',
          glow: 'ring-4 ring-[#843E1F]/20',
          accentRing: 'stroke-[#843E1F]'
        };
      case 'diamond':
        return {
          outerBorder: 'border-[#059669] bg-gradient-to-br from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0] text-[#059669] shadow-md shadow-[#059669]/20',
          innerBg: 'bg-gradient-to-tr from-[#059669] to-[#065F46] text-[#ECFDF5] border-[#6EE7B7]',
          glow: 'ring-4 ring-[#059669]/20',
          accentRing: 'stroke-[#059669]'
        };
      case 'gold':
        return {
          outerBorder: 'border-[#D97706] bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] text-[#B45309] shadow-md shadow-[#D97706]/20',
          innerBg: 'bg-gradient-to-tr from-[#D97706] to-[#92400E] text-[#FFFBEB] border-[#FCD34D]',
          glow: 'ring-4 ring-[#D97706]/20',
          accentRing: 'stroke-[#D97706]'
        };
      case 'silver':
        return {
          outerBorder: 'border-[#64748B] bg-gradient-to-br from-[#F8FAFC] via-[#E2E8F0] to-[#CBD5E1] text-[#334155] shadow-sm',
          innerBg: 'bg-gradient-to-tr from-[#64748B] to-[#334155] text-[#F8FAFC] border-[#94A3B8]',
          glow: 'ring-2 ring-[#64748B]/20',
          accentRing: 'stroke-[#64748B]'
        };
      case 'bronze':
      default:
        return {
          outerBorder: 'border-[#92400E] bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#E4D1B9] text-[#78350F] shadow-sm',
          innerBg: 'bg-gradient-to-tr from-[#92400E] to-[#632908] text-[#FEF3C7] border-[#D69E2E]',
          glow: 'ring-2 ring-[#92400E]/15',
          accentRing: 'stroke-[#92400E]'
        };
    }
  };

  const styles = getTierStyles();

  const renderIcon = () => {
    if (!isUnlocked) {
      return <Lock className={currentSize.icon} />;
    }

    switch (iconType) {
      case 'flame':
        return <Flame className={currentSize.icon} />;
      case 'shield':
        return <Shield className={currentSize.icon} />;
      case 'trophy':
        return <Trophy className={currentSize.icon} />;
      case 'award':
        return <Award className={currentSize.icon} />;
      case 'leaf':
        return <Leaf className={currentSize.icon} />;
      case 'sparkles':
        return <Sparkles className={currentSize.icon} />;
      case 'heart':
        return <Heart className={currentSize.icon} />;
      case 'zap':
        return <Zap className={currentSize.icon} />;
      case 'pottery':
        return (
          <svg className={currentSize.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 6h10" />
            <path d="M6 6c0 5 2 7 6 7s6-2 6-7" />
            <path d="M12 13v4" />
            <path d="M8 21h8" />
            <path d="M10 17h4" />
          </svg>
        );
      case 'sprout':
      default:
        return <Sprout className={currentSize.icon} />;
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${currentSize.container} ${className}`}>
      {/* Outer Decorative Shape with Octagonal / Circular Vernacular Ring */}
      <div 
        className={`w-full h-full rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${styles.outerBorder} ${styles.glow} ${animate && isUnlocked ? 'animate-pulse' : ''}`}
        style={{ transform: 'rotate(0deg)' }}
      >
        {/* Inner Medal Disc */}
        <div className={`w-[82%] h-[82%] rounded-xl flex items-center justify-center border ${styles.innerBg} transition-transform duration-300 hover:scale-105 shadow-inner`}>
          {renderIcon()}
        </div>

        {/* Small corner decorative stars / studs for unlocked badges */}
        {isUnlocked && (
          <>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-current opacity-80" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-current opacity-80" />
          </>
        )}
      </div>
    </div>
  );
};

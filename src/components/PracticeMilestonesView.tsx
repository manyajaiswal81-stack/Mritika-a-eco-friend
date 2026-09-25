import React, { useState } from 'react';
import { 
  ComputedMilestoneBadge, 
  MilestoneSummaryStats, 
  BadgeCategory 
} from '../data/milestonesData';
import { BadgeVisualEmblem } from './BadgeVisualEmblem';
import { BadgeDetailModal } from './BadgeDetailModal';
import { 
  Flame, 
  Trophy, 
  Award, 
  CheckCircle, 
  Lock, 
  Sparkles, 
  Calendar, 
  PlusCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sprout, 
  Droplets,
  Share2
} from 'lucide-react';

interface PracticeMilestonesViewProps {
  badges: ComputedMilestoneBadge[];
  stats: MilestoneSummaryStats;
  onOpenLogModal: () => void;
}

export const PracticeMilestonesView: React.FC<PracticeMilestonesViewProps> = ({
  badges,
  stats,
  onOpenLogModal
}) => {
  const [selectedBadge, setSelectedBadge] = useState<ComputedMilestoneBadge | null>(null);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked' | 'streak' | 'impact' | 'diversity'>('all');

  // Filtered badges
  const filteredBadges = badges.filter(b => {
    if (filter === 'unlocked') return b.isUnlocked;
    if (filter === 'locked') return !b.isUnlocked;
    if (filter === 'streak') return b.category === 'streak';
    if (filter === 'impact') return b.category === 'impact';
    if (filter === 'diversity') return b.category === 'diversity';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner: Daily Logging Streak & Commitment Command Center */}
      <div className="bg-gradient-to-br from-[#FAF0E6] via-[#F5E8D9] to-[#EBD7C4] border-2 border-[#843E1F]/25 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#DECDBB]">
          
          {/* Main Streak Highlight */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#843E1F]">
              <Flame className="w-4 h-4 text-[#D97706] animate-pulse" />
              <span>Daily Vernacular Practice Habit Engine</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#24211D]">
                {stats.currentStreak} Day{stats.currentStreak === 1 ? '' : 's'} Active Streak
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#843E1F]/10 text-[#843E1F] font-semibold">
                Best: {stats.longestStreak} Days
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5C4D41] max-w-xl leading-relaxed">
              {stats.hasLoggedToday ? (
                <span className="text-[#1E4D34] font-medium flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#2D7A4D] shrink-0" />
                  Today&apos;s practice is safely recorded in the soil ledger! Your streak is burning bright.
                </span>
              ) : (
                <span className="text-[#843E1F] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
                  You haven&apos;t logged today yet! Record a chai kulhar, neem datun, or bio-compost to extend your streak.
                </span>
              )}
            </p>
          </div>

          {/* Quick Actions & Unlocked Tally */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-[#FAF2EB] border border-[#DECDBB] rounded-xl px-4 py-3 text-center min-w-[130px]">
              <div className="text-xs text-[#8C7A6D] font-medium">Badges Earned</div>
              <div className="text-2xl font-serif font-bold text-[#24211D] tabular-nums">
                {stats.unlockedCount} <span className="text-sm font-normal text-[#8C7A6D]">/ {stats.totalBadges}</span>
              </div>
              <div className="text-[10px] text-[#2D7A4D] font-semibold mt-0.5">
                {stats.overallProgressPercent}% Completed
              </div>
            </div>

            <button
              onClick={onOpenLogModal}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-[#843E1F] hover:bg-[#6B3019] rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Today&apos;s Practice</span>
            </button>
          </div>
        </div>

        {/* 7-Day Calendar Streak Dots Bar */}
        <div className="mt-6 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-bold text-[#4A3D33] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#843E1F]" />
              <span>Past 7 Days Consistency Tracker</span>
            </span>
            <span className="text-[11px] text-[#786657]">
              Every verified entry counts towards Earth Protector & Zero-Waste Warrior
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {stats.streakDaysList.map((day) => (
              <div
                key={day.date}
                className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                  day.isLogged
                    ? 'bg-[#EBF5EF] border-[#A7D7B9] text-[#1E4D34] shadow-2xs'
                    : day.isToday
                    ? 'bg-[#FFF9F2] border-2 border-dashed border-[#843E1F] text-[#843E1F]'
                    : 'bg-[#F2ECE2]/60 border-[#DECDBB] text-[#8C7A6D]'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider mb-1">
                  {day.dayLabel}
                </div>
                <div className="text-xs font-semibold tabular-nums mb-1">
                  {day.dayNum}
                </div>
                <div className="flex justify-center">
                  {day.isLogged ? (
                    <div className="w-5 h-5 rounded-full bg-[#2D7A4D] text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                  ) : day.isToday ? (
                    <div className="w-5 h-5 rounded-full bg-[#843E1F]/15 text-[#843E1F] flex items-center justify-center text-[10px] font-bold">
                      +
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#DECDBB]/40 text-[#A08E80] flex items-center justify-center text-[10px]">
                      ·
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Milestone Spotlight Pill */}
        {stats.nextMilestone && (
          <div className="mt-6 p-4 bg-[#F5EFE6] border border-[#DFCBB5] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BadgeVisualEmblem
                iconType={stats.nextMilestone.iconType}
                tier={stats.nextMilestone.tier}
                isUnlocked={false}
                size="sm"
              />
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#843E1F]">
                  Next Goal in Reach
                </div>
                <div className="text-sm font-serif font-bold text-[#24211D]">
                  {stats.nextMilestone.name} ({stats.nextMilestone.hindiName})
                </div>
                <div className="text-xs text-[#6B5A4E]">
                  {stats.nextMilestone.criteriaLabel} · Current: <strong>{stats.nextMilestone.currentCount}</strong> / {stats.nextMilestone.targetCount} {stats.nextMilestone.metricUnit}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:w-36">
                <div className="w-full h-2 bg-[#DECDBB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#843E1F] rounded-full transition-all duration-300"
                    style={{ width: `${stats.nextMilestone.progressPercent}%` }}
                  />
                </div>
                <div className="text-right text-[10px] font-semibold text-[#843E1F] mt-0.5">
                  {stats.nextMilestone.progressPercent}% to unlock
                </div>
              </div>

              <button
                onClick={() => setSelectedBadge(stats.nextMilestone)}
                className="text-xs font-semibold text-[#843E1F] hover:text-[#6B3019] underline whitespace-nowrap"
              >
                Inspect
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#E6D9C8]">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#F2ECE2] rounded-xl border border-[#DECDBB]">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                : 'text-[#6B5A4E] hover:text-[#24211D]'
            }`}
          >
            All Badges ({badges.length})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'unlocked'
                ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                : 'text-[#6B5A4E] hover:text-[#24211D]'
            }`}
          >
            Earned ({stats.unlockedCount})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'locked'
                ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                : 'text-[#6B5A4E] hover:text-[#24211D]'
            }`}
          >
            In Progress ({badges.length - stats.unlockedCount})
          </button>
          <button
            onClick={() => setFilter('streak')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'streak'
                ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                : 'text-[#6B5A4E] hover:text-[#24211D]'
            }`}
          >
            Streaks &amp; Habits
          </button>
          <button
            onClick={() => setFilter('impact')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'impact'
                ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                : 'text-[#6B5A4E] hover:text-[#24211D]'
            }`}
          >
            Eco-Impact
          </button>
          <button
            onClick={() => setFilter('diversity')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'diversity'
                ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                : 'text-[#6B5A4E] hover:text-[#24211D]'
            }`}
          >
            Heritage Mastery
          </button>
        </div>

        <div className="text-xs text-[#786657]">
          Showing {filteredBadges.length} practice milestones
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group shadow-2xs hover:shadow-md ${
              badge.isUnlocked
                ? 'bg-[#FAF4EB] border-[#DECDBB] hover:border-[#843E1F]'
                : 'bg-[#F5EFE6]/70 border-[#E2D4C3] hover:border-[#B39F8D] opacity-90'
            }`}
          >
            <div className="space-y-4">
              
              {/* Header: Tier & Category */}
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  badge.isUnlocked
                    ? 'bg-[#843E1F]/10 text-[#843E1F]'
                    : 'bg-[#DECDBB] text-[#786657]'
                }`}>
                  {badge.tier} Tier
                </span>

                {badge.isUnlocked ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#2D7A4D]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#8C7A6D]">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
              </div>

              {/* Emblem & Titles */}
              <div className="flex items-start gap-3.5">
                <BadgeVisualEmblem
                  iconType={badge.iconType}
                  tier={badge.tier}
                  isUnlocked={badge.isUnlocked}
                  size="md"
                  animate={badge.isUnlocked}
                />
                
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h4 className="text-base font-serif font-bold text-[#24211D] group-hover:text-[#843E1F] transition-colors truncate">
                    {badge.name}
                  </h4>
                  <div className="text-xs font-semibold text-[#843E1F]">
                    {badge.hindiName}
                  </div>
                  <div className="text-[11px] text-[#786657] italic truncate">
                    {badge.tagline}
                  </div>
                </div>
              </div>

              {/* Requirement Description */}
              <p className="text-xs text-[#5C4D41] line-clamp-2 leading-relaxed">
                {badge.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px] text-[#786657]">
                  <span>Progress: {badge.currentCount} / {badge.targetCount} {badge.metricUnit}</span>
                  <span className="font-semibold text-[#843E1F]">{badge.progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#E6D9C8] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      badge.isUnlocked 
                        ? 'bg-gradient-to-r from-[#843E1F] to-[#2D7A4D]' 
                        : 'bg-[#843E1F]/70'
                    }`}
                    style={{ width: `${badge.progressPercent}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Footer card action */}
            <div className="pt-4 mt-4 border-t border-[#E8DACB] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#8C7A6D]">
                {badge.category === 'streak' ? 'Daily Streak' : badge.category === 'impact' ? 'Eco-Impact' : 'Heritage'}
              </span>
              <span className="font-semibold text-[#843E1F] group-hover:underline flex items-center gap-1">
                <span>View Details</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Long-Term Commitment Philosophy Section */}
      <div className="bg-[#FAF2EB] border border-[#E6D5C4] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#843E1F]">
          <Sprout className="w-4 h-4 text-[#2D7A4D]" />
          <span>The Power of Consistent Daily Soil Stewardship</span>
        </div>

        <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#24211D]">
          Why Daily Logging Creates Real Ecological Reversal
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <h5 className="font-serif font-bold text-sm text-[#24211D] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#843E1F] text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Neuro-Habit Formation</span>
            </h5>
            <p className="text-xs text-[#5C4D41] leading-relaxed">
              Consistently logging unglazed kulhars or neem datuns for 14 days re-wires everyday consumer impulse from disposable convenience to organic rhythm.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-serif font-bold text-sm text-[#24211D] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#2D7A4D] text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Direct Artisan Economics</span>
            </h5>
            <p className="text-xs text-[#5C4D41] leading-relaxed">
              Every day you opt for a terracotta cup or leaf platter, money goes straight to village kumhars and tribal sal-leaf gatherers instead of multinational plastics.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-serif font-bold text-sm text-[#24211D] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Groundwater Safeguarding</span>
            </h5>
            <p className="text-xs text-[#5C4D41] leading-relaxed">
              30 days of persistent soapnut laundry and datun brushing stops an estimated 2.4 million synthetic microplastics from ever reaching municipal river basins.
            </p>
          </div>
        </div>
      </div>

      {/* Badge Detail Inspection Modal */}
      {selectedBadge && (
        <BadgeDetailModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
          onLogClick={onOpenLogModal}
        />
      )}

    </div>
  );
};

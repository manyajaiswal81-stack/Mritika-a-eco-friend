import { JournalEntry } from './journalData';

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'pinnacle';
export type BadgeCategory = 'streak' | 'impact' | 'diversity' | 'legacy';
export type BadgeIconType = 
  | 'sprout' 
  | 'flame' 
  | 'shield' 
  | 'trophy' 
  | 'award' 
  | 'leaf' 
  | 'sparkles' 
  | 'heart' 
  | 'zap' 
  | 'pottery';

export interface MilestoneBadgeConfig {
  id: string;
  name: string;
  hindiName: string;
  category: BadgeCategory;
  tier: BadgeTier;
  iconType: BadgeIconType;
  tagline: string;
  description: string;
  criteriaLabel: string;
  targetCount: number;
  metricUnit: string;
  culturalWisdom: string;
  perkReward: string;
  accentColor: string;
}

export interface ComputedMilestoneBadge extends MilestoneBadgeConfig {
  currentCount: number;
  progressPercent: number;
  isUnlocked: boolean;
  unlockedDate?: string;
}

export interface DayStreakItem {
  date: string;
  dayLabel: string; // 'Mon', 'Tue', etc.
  dayNum: number;
  isLogged: boolean;
  isToday: boolean;
}

export interface MilestoneSummaryStats {
  currentStreak: number;
  longestStreak: number;
  hasLoggedToday: boolean;
  streakDaysList: DayStreakItem[];
  totalBadges: number;
  unlockedCount: number;
  overallProgressPercent: number;
  nextMilestone: ComputedMilestoneBadge | null;
  totalPlasticAvoided: number;
  totalCompostKg: number;
  totalMicroplasticsAvoided: number;
  uniquePracticesLogged: number;
}

export const MILESTONE_DEFINITIONS: MilestoneBadgeConfig[] = [
  {
    id: 'seedling-scribe',
    name: 'Seedling Scribe',
    hindiName: 'अंकुरण सूत्र',
    category: 'streak',
    tier: 'bronze',
    iconType: 'sprout',
    tagline: 'The First Clay Step',
    description: 'Log your very first vernacular biodegradable practice to initiate your personal Soil Ledger.',
    criteriaLabel: 'Log 1 verified practice',
    targetCount: 1,
    metricUnit: 'entry',
    culturalWisdom: '“A banyan tree sheltering a whole village begins as a single mustard-sized seed returned to moist loam.” — Ancient Agro-Proverb',
    perkReward: 'Permanent Civic Soil Ledger Registration & Daily Habit Counter',
    accentColor: '#3B7A57'
  },
  {
    id: 'daily-custodian',
    name: 'Daily Custodian',
    hindiName: 'दैनिक संरक्षक',
    category: 'streak',
    tier: 'silver',
    iconType: 'flame',
    tagline: 'Tri-Sunrise Persistence',
    description: 'Maintain an active 3-day continuous daily logging streak without skipping a sunrise.',
    criteriaLabel: '3 consecutive days logged',
    targetCount: 3,
    metricUnit: 'days streak',
    culturalWisdom: '“A vow practiced for three uninterrupted dawns moves from deliberate effort into sacred instinct.”',
    perkReward: 'Golden Amber Streak Flame display on your personal profile',
    accentColor: '#D97706'
  },
  {
    id: 'soil-guardian',
    name: 'Soil Guardian',
    hindiName: 'मृत्तिका रक्षक',
    category: 'streak',
    tier: 'gold',
    iconType: 'shield',
    tagline: 'Sapta-Dina Weekly Cycle',
    description: 'Sustain an unbroken 7-day daily zero-waste streak, completing a full lunar and solar cycle.',
    criteriaLabel: '7 consecutive days logged',
    targetCount: 7,
    metricUnit: 'days streak',
    culturalWisdom: '“Seven days of clay and leaf dining cleanses the household of petroleum disposables and heals the local soil microbiome.”',
    perkReward: 'Verified Soil Guardian Emblem & Highlighted Community Map Node',
    accentColor: '#B45309'
  },
  {
    id: 'earth-protector',
    name: 'Earth Protector',
    hindiName: 'भूमि रक्षक',
    category: 'streak',
    tier: 'diamond',
    iconType: 'award',
    tagline: 'Fortnight of Devotion',
    description: 'Awarded for unwavering commitment: sustain a 14-day consecutive daily logging streak of vernacular living.',
    criteriaLabel: '14 consecutive days logged',
    targetCount: 14,
    metricUnit: 'days streak',
    culturalWisdom: '“Bhoomi Rakshak honors Prithvi (Mother Earth) by ensuring every vessel and fiber returns without toxicity.” — Atharva Veda, Bhumi Sukta',
    perkReward: 'Digital High-Honor Patron Certificate & Emerald Diamond Seal',
    accentColor: '#059669'
  },
  {
    id: 'zero-waste-warrior',
    name: 'Zero-Waste Warrior',
    hindiName: 'शून्य-अपशिष्ट योद्धा',
    category: 'streak',
    tier: 'pinnacle',
    iconType: 'trophy',
    tagline: 'Legendary 30-Day Stewardship',
    description: 'The pinnacle milestone: maintain a 30-day unbroken daily streak or displace 50+ single-use plastic items permanently.',
    criteriaLabel: '30 consecutive days or 50 items avoided',
    targetCount: 30,
    metricUnit: 'days streak',
    culturalWisdom: '“True warriorhood in our era is not fighting with weapons, but safeguarding the water, soil, and breath of our grandchildren.”',
    perkReward: 'Pinnacle Surya Master Crest & Honorary Citizen of the Soil status',
    accentColor: '#843E1F'
  },
  {
    id: 'plastic-diverter',
    name: 'Plastic Diverter',
    hindiName: 'प्लास्टिक निरोधक',
    category: 'impact',
    tier: 'silver',
    iconType: 'zap',
    tagline: 'Shielding Landfills',
    description: 'Directly prevent 20 single-use plastic cups, sachets, or toothbrushes from polluting municipal soil.',
    criteriaLabel: '20 plastic items diverted',
    targetCount: 20,
    metricUnit: 'items avoided',
    culturalWisdom: '“Every kulhar and pattal chosen spares 500 years of petrochemical breakdown in sacred riverbeds.”',
    perkReward: 'High-Impact Plastic Interceptor Badge',
    accentColor: '#2563EB'
  },
  {
    id: 'humus-alchemist',
    name: 'Humus Alchemist',
    hindiName: 'उर्वरक निर्माता',
    category: 'impact',
    tier: 'gold',
    iconType: 'leaf',
    tagline: 'Turning Waste into Wealth',
    description: 'Return over 1.5 kilograms of wholesome organic matter (leaf platters, clay silt, neem fibers) back to garden soils.',
    criteriaLabel: '1,500 grams of humus returned',
    targetCount: 1500,
    metricUnit: 'grams returned',
    culturalWisdom: '“That which leaves the earth must nourish the earth. Humus is the living bridge between death and new harvest.”',
    perkReward: 'Living Soil Nutrient Seal & Bio-Return Ribbon',
    accentColor: '#16A34A'
  },
  {
    id: 'aquifer-defender',
    name: 'Aquifer Defender',
    hindiName: 'जल रक्षक',
    category: 'impact',
    tier: 'diamond',
    iconType: 'sparkles',
    tagline: 'Guardians of Underground Waters',
    description: 'Prevent 500,000 synthetic microplastic fibers from flushing through domestic drains into groundwater.',
    criteriaLabel: '500,000 microplastics spared',
    targetCount: 500000,
    metricUnit: 'particles blocked',
    culturalWisdom: '“Reetha and datun clean without silent synthetic poisons. Pure greywater feeds the tree that feeds the birds.”',
    perkReward: 'Sacred Water Wellspring Digital Medal',
    accentColor: '#0284C7'
  },
  {
    id: 'sevenfold-steward',
    name: 'Sevenfold Steward',
    hindiName: 'सप्त-रीति साधक',
    category: 'diversity',
    tier: 'gold',
    iconType: 'heart',
    tagline: 'Holistic Heritage Mastery',
    description: 'Log at least 4 diverse vernacular practice categories across dining, hygiene, hydration, and organic disposal.',
    criteriaLabel: '4 distinct categories practiced',
    targetCount: 4,
    metricUnit: 'categories',
    culturalWisdom: '“Integration of clay, leaf, twig, seed, and jute creates a completely self-sustaining household sanctuary.”',
    perkReward: 'Pan-Indian Traditional Ecology Master Shield',
    accentColor: '#7C3AED'
  },
  {
    id: 'terracotta-companion',
    name: 'Terracotta Companion',
    hindiName: 'कुम्हार सहयात्री',
    category: 'diversity',
    tier: 'bronze',
    iconType: 'pottery',
    tagline: 'Alluvial Earth Communion',
    description: 'Enjoy and return 5 unglazed river-clay kulhars or matka refills, supporting village artisans.',
    criteriaLabel: '5 terracotta uses logged',
    targetCount: 5,
    metricUnit: 'clay actions',
    culturalWisdom: '“When you drink from unglazed clay, you drink from the hands of Prajapati and the sacred dust of Gangetic plains.”',
    perkReward: 'Ancient Potter Guild Patron Ribbon',
    accentColor: '#A16207'
  }
];

// Helper to normalize dates to YYYY-MM-DD
export function formatDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Calculate streaks, weekly calendar dots, and badge statuses
export function calculateMilestones(entries: JournalEntry[]): {
  badges: ComputedMilestoneBadge[];
  stats: MilestoneSummaryStats;
} {
  // 1. Gather all unique dates where user logged entries
  const uniqueDatesSet = new Set<string>();
  let totalPlastic = 0;
  let totalCompost = 0;
  let totalMicroplastics = 0;
  const categoriesSet = new Set<string>();
  let terracottaCount = 0;

  entries.forEach(e => {
    if (e.date) uniqueDatesSet.add(e.date);
    totalPlastic += e.estimatedPlasticAvoided || 0;
    totalCompost += e.estimatedCompostGrams || 0;
    totalMicroplastics += e.estimatedMicroplasticsPrevented || 0;
    if (e.practiceCategory) {
      categoriesSet.add(e.practiceCategory);
      if (e.practiceCategory === 'kulhar' || e.practiceCategory === 'matka') {
        terracottaCount += e.count || 1;
      }
    }
  });

  const todayStr = formatDateKey(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDateKey(yesterday);

  const hasLoggedToday = uniqueDatesSet.has(todayStr);

  // 2. Compute current unbroken streak
  let currentStreak = 0;
  let checkDate = new Date();

  // If today not logged yet, start checking from yesterday to see if streak is still alive!
  if (!hasLoggedToday) {
    if (uniqueDatesSet.has(yesterdayStr)) {
      checkDate = yesterday;
    } else {
      // Streak broken
      currentStreak = 0;
    }
  }

  if (hasLoggedToday || uniqueDatesSet.has(yesterdayStr)) {
    while (true) {
      const dateKey = formatDateKey(checkDate);
      if (uniqueDatesSet.has(dateKey)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // 3. Compute longest streak in history
  const sortedDates = Array.from(uniqueDatesSet).sort();
  let longestStreak = 0;
  let tempStreak = 0;
  let prevTimestamp: number | null = null;

  sortedDates.forEach(dStr => {
    const parts = dStr.split('-').map(Number);
    const currTime = new Date(parts[0], parts[1] - 1, parts[2]).getTime();

    if (prevTimestamp === null) {
      tempStreak = 1;
    } else {
      const diffDays = Math.round((currTime - prevTimestamp) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }
    prevTimestamp = currTime;
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
  });

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  // 4. Build 7-day streak calendar dots (Day -6 to Today)
  const streakDaysList: DayStreakItem[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = formatDateKey(d);
    streakDaysList.push({
      date: dStr,
      dayLabel: dayNames[d.getDay()],
      dayNum: d.getDate(),
      isLogged: uniqueDatesSet.has(dStr),
      isToday: dStr === todayStr
    });
  }

  // 5. Evaluate all badges
  const computedBadges: ComputedMilestoneBadge[] = MILESTONE_DEFINITIONS.map(badge => {
    let currentVal = 0;
    let unlocked = false;

    switch (badge.id) {
      case 'seedling-scribe':
        currentVal = entries.length;
        unlocked = currentVal >= 1;
        break;

      case 'daily-custodian':
        currentVal = currentStreak;
        unlocked = currentStreak >= 3 || longestStreak >= 3;
        break;

      case 'soil-guardian':
        currentVal = currentStreak;
        unlocked = currentStreak >= 7 || longestStreak >= 7;
        break;

      case 'earth-protector':
        currentVal = currentStreak;
        unlocked = currentStreak >= 14 || longestStreak >= 14;
        break;

      case 'zero-waste-warrior':
        // 30 days streak OR 50+ plastic items
        currentVal = Math.max(currentStreak, longestStreak);
        unlocked = currentVal >= 30 || totalPlastic >= 50;
        break;

      case 'plastic-diverter':
        currentVal = totalPlastic;
        unlocked = totalPlastic >= badge.targetCount;
        break;

      case 'humus-alchemist':
        currentVal = totalCompost;
        unlocked = totalCompost >= badge.targetCount;
        break;

      case 'aquifer-defender':
        currentVal = totalMicroplastics;
        unlocked = totalMicroplastics >= badge.targetCount;
        break;

      case 'sevenfold-steward':
        currentVal = categoriesSet.size;
        unlocked = categoriesSet.size >= badge.targetCount;
        break;

      case 'terracotta-companion':
        currentVal = terracottaCount;
        unlocked = terracottaCount >= badge.targetCount;
        break;

      default:
        currentVal = 0;
        unlocked = false;
        break;
    }

    const progressPercent = Math.min(100, Math.round((currentVal / badge.targetCount) * 100));

    return {
      ...badge,
      currentCount: currentVal,
      progressPercent,
      isUnlocked: unlocked,
      unlockedDate: unlocked ? 'Awarded' : undefined
    };
  });

  const unlockedCount = computedBadges.filter(b => b.isUnlocked).length;
  const overallProgressPercent = Math.round((unlockedCount / computedBadges.length) * 100);

  // Find next closest milestone to unlock
  const lockedBadges = computedBadges
    .filter(b => !b.isUnlocked)
    .sort((a, b) => b.progressPercent - a.progressPercent);

  const nextMilestone = lockedBadges.length > 0 ? lockedBadges[0] : null;

  return {
    badges: computedBadges,
    stats: {
      currentStreak,
      longestStreak,
      hasLoggedToday,
      streakDaysList,
      totalBadges: computedBadges.length,
      unlockedCount,
      overallProgressPercent,
      nextMilestone,
      totalPlasticAvoided: totalPlastic,
      totalCompostKg: Number((totalCompost / 1000).toFixed(2)),
      totalMicroplasticsAvoided: totalMicroplastics,
      uniquePracticesLogged: categoriesSet.size
    }
  };
}

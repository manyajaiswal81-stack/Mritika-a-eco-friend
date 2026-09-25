import React, { useState, useMemo } from 'react';
import { 
  JournalEntry, 
  CommunityEcoNode, 
  SEED_COMMUNITY_NODES, 
  INITIAL_USER_JOURNAL_ENTRIES 
} from '../data/journalData';
import { 
  calculateMilestones, 
  ComputedMilestoneBadge 
} from '../data/milestonesData';
import { JournalChart } from './JournalChart';
import { PracticeMilestonesView } from './PracticeMilestonesView';
import { BadgeUnlockModal } from './BadgeUnlockModal';
import { useLanguage } from '../context/LanguageContext';
import { SectionVoiceButton } from './SectionVoiceButton';
import { 
  BookOpen, 
  PlusCircle, 
  MapPin, 
  Sprout, 
  Trash2, 
  Droplets, 
  Award, 
  Calendar, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  X,
  Compass,
  Sparkles,
  Flame,
  ArrowRight
} from 'lucide-react';

const JOURNAL_STORAGE_KEY = 'mrittika_user_journal_entries_v1';

export const PersonalJournalAndMap: React.FC = () => {
  const { t } = useLanguage();

  // Active Tab: 'journal', 'milestones', or 'communityMap'
  const [activeTab, setActiveTab] = useState<'journal' | 'milestones' | 'communityMap'>('journal');

  // Newly unlocked badges modal queue
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<ComputedMilestoneBadge[]>([]);

  // Journal Entries state with localStorage persistence
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
      const stored = localStorage.getItem(JOURNAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_USER_JOURNAL_ENTRIES;
    } catch {
      return INITIAL_USER_JOURNAL_ENTRIES;
    }
  });

  // Calculate dynamic practice milestones, streaks, and badges
  const milestoneState = useMemo(() => calculateMilestones(entries), [entries]);

  // Modal for new journal entry
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [practiceCategory, setPracticeCategory] = useState<JournalEntry['practiceCategory']>('kulhar');
  const [practiceName, setPracticeName] = useState('Chai in Clay Kulhar');
  const [count, setCount] = useState<number>(1);
  const [locationCity, setLocationCity] = useState('');
  const [locationState, setLocationState] = useState('');
  const [notes, setNotes] = useState('');
  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Selected Community Node for map inspection
  const [selectedNode, setSelectedNode] = useState<CommunityEcoNode | null>(SEED_COMMUNITY_NODES[0]);

  // Quick preset mappings
  const handleCategoryChange = (cat: JournalEntry['practiceCategory']) => {
    setPracticeCategory(cat);
    switch (cat) {
      case 'kulhar':
        setPracticeName('Chai in Unglazed Clay Kulhar');
        break;
      case 'pattal':
        setPracticeName('Sal / Banana Leaf Dining Platter');
        break;
      case 'datun':
        setPracticeName('Neem / Babool Medicinal Datun Twig');
        break;
      case 'reetha':
        setPracticeName('Reetha Soapnut Greywater Laundry / Wash');
        break;
      case 'jute':
        setPracticeName('Jute / Cotton Breathable Bag Reused');
        break;
      case 'matka':
        setPracticeName('Terracotta Matka Evaporative Water Drinking');
        break;
      case 'compost':
        setPracticeName('Backyard Organic Mulch / Soil Return');
        break;
      default:
        setPracticeName('Local Vernacular Biodegradable Practice');
        break;
    }
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!practiceName.trim()) return;

    // Environmental metrics calculations
    let plasticAvoided = count;
    let compostGrams = count * 50;
    let microplasticsPrevented = count * 25000;

    if (practiceCategory === 'reetha') {
      microplasticsPrevented = count * 350000;
      plasticAvoided = count;
    } else if (practiceCategory === 'datun') {
      microplasticsPrevented = count * 15000;
      compostGrams = count * 25;
    } else if (practiceCategory === 'kulhar') {
      compostGrams = count * 80;
    }

    const newEntry: JournalEntry = {
      id: `entry-${Date.now()}`,
      date: entryDate,
      timestamp: Date.now(),
      practiceCategory,
      practiceName: practiceName.trim(),
      count: Number(count) || 1,
      notes: notes.trim(),
      locationCity: locationCity.trim() || 'My Hometown',
      locationState: locationState.trim() || 'India',
      estimatedPlasticAvoided: plasticAvoided,
      estimatedCompostGrams: compostGrams,
      estimatedMicroplasticsPrevented: microplasticsPrevented
    };

    // Snapshot previously unlocked badges
    const prevMilestones = calculateMilestones(entries);
    const previouslyUnlockedIds = new Set(
      prevMilestones.badges.filter(b => b.isUnlocked).map(b => b.id)
    );

    const updated = [newEntry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage fallback
    }

    // Check if new entry triggered any fresh badge unlocks!
    const nextMilestones = calculateMilestones(updated);
    const freshlyUnlocked = nextMilestones.badges.filter(
      b => b.isUnlocked && !previouslyUnlockedIds.has(b.id)
    );

    if (freshlyUnlocked.length > 0) {
      setNewlyUnlockedBadges(freshlyUnlocked);
    }

    // Reset fields
    setNotes('');
    setIsModalOpen(false);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage fallback
    }
  };

  // Cumulative personal lifetime stats
  const totalPlasticItems = useMemo(() => {
    return entries.reduce((acc, curr) => acc + (curr.estimatedPlasticAvoided || 0), 0);
  }, [entries]);

  const totalCompostKg = useMemo(() => {
    const totalGrams = entries.reduce((acc, curr) => acc + (curr.estimatedCompostGrams || 0), 0);
    return (totalGrams / 1000).toFixed(2);
  }, [entries]);

  const totalMicroplasticsMillions = useMemo(() => {
    const count = entries.reduce((acc, curr) => acc + (curr.estimatedMicroplasticsPrevented || 0), 0);
    return (count / 1000000).toFixed(2);
  }, [entries]);

  return (
    <section id="personal-journal" className="py-16 md:py-24 bg-[#FBF9F5] border-b border-[#EDE2D4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-[#8C7A6D]">
            <span className="flex items-center gap-1.5 text-[#843E1F] font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              {t('journal.badge', 'Personal Soil Ledger & Community Map')}
            </span>
            <span aria-hidden="true">·</span>
            <span>Civic Ecological Progress</span>
          </div>

          <SectionVoiceButton sectionId="personal-journal" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E6D9C8]">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#24211D]">
              {t('journal.title', 'Your Personal Adoption Journal & Living Community Map')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
              Every unglazed kulhar chai, every banana leaf banquet, and every neem twig replaces persistent synthetic waste. 
              Track your daily personal milestones and explore collective zero-waste hubs thriving across India.
            </p>
          </div>

          {/* Toggle between Personal Journal, Practice Milestones, and Community Map */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F2ECE2] rounded-xl border border-[#DECDBB]">
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'journal'
                  ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#24211D]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('journal.tabLedger', 'Personal Soil Ledger')}</span>
            </button>

            <button
              onClick={() => setActiveTab('milestones')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'milestones'
                  ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#24211D]'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{t('journal.tabMilestones', 'Practice Milestones')}</span>
              <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                activeTab === 'milestones'
                  ? 'bg-[#843E1F] text-white'
                  : 'bg-[#DECDBB] text-[#5C4D41]'
              }`}>
                {milestoneState.stats.unlockedCount}/{milestoneState.stats.totalBadges}
              </span>
              {milestoneState.stats.currentStreak > 0 && (
                <span className="flex items-center text-[10px] text-[#D97706] font-bold">
                  🔥{milestoneState.stats.currentStreak}d
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('communityMap')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'communityMap'
                  ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#24211D]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t('journal.tabMap', 'Community Impact Map')}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PERSONAL JOURNAL */}
        {activeTab === 'journal' && (
          <div className="space-y-10">
            
            {/* Top Scoreboard: Personal Cumulative Dividends */}
            <div className="bg-[#FAF2EB] border-2 border-[#843E1F]/20 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8D4C4]">
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#843E1F]">
                    Personal Ecological Ledger
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#24211D] mt-0.5">
                    Your Real-Time Cumulative Soil Impact
                  </h3>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#843E1F] hover:bg-[#6B3019] rounded-xl shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t('journal.logToday', 'Log Today\'s Practice')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#FBF9F5] border border-[#E6D9C8] rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#843E1F] mb-1">
                    <Trash2 className="w-4 h-4" />
                    <span>{t('journal.plasticDiverted', 'Plastic Disposables Diverted')}</span>
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#24211D] tabular-nums">
                    {totalPlasticItems}
                  </div>
                  <div className="text-[11px] text-[#786657] mt-0.5">
                    Polystyrene cups, toothbrushes & wrappers kept out of landfills.
                  </div>
                </div>

                <div className="p-4 bg-[#FBF9F5] border border-[#E6D9C8] rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D4A3E] mb-1">
                    <Sprout className="w-4 h-4" />
                    <span>{t('journal.humusReturned', 'Fertile Humus Returned')}</span>
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#2D4A3E] tabular-nums">
                    {totalCompostKg} kg
                  </div>
                  <div className="text-[11px] text-[#786657] mt-0.5">
                    Crushed clay minerals and plant cellulose enriching garden earth.
                  </div>
                </div>

                <div className="p-4 bg-[#FBF9F5] border border-[#E6D9C8] rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D4A3E] mb-1">
                    <Droplets className="w-4 h-4" />
                    <span>{t('journal.microplasticsAvoided', 'Microplastics Prevented')}</span>
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#2D4A3E] tabular-nums">
                    {totalMicroplasticsMillions}M
                  </div>
                  <div className="text-[11px] text-[#786657] mt-0.5">
                    Micro-particles blocked from washing into local drinking aquifers.
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('milestones')}
                  className="p-4 bg-[#FBF9F5] border border-[#E6D9C8] hover:border-[#843E1F] rounded-xl cursor-pointer transition-all group"
                  title="Click to view all Practice Milestones"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#843E1F]">
                      <Award className="w-4 h-4" />
                      <span>{t('journal.loggedMilestones', 'Logged Milestones')}</span>
                    </div>
                    <span className="text-[10px] text-[#843E1F] font-bold group-hover:underline">View Badges →</span>
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#24211D] tabular-nums">
                    {entries.length} Entries
                  </div>
                  <div className="text-[11px] text-[#786657] mt-0.5">
                    {milestoneState.stats.unlockedCount} of {milestoneState.stats.totalBadges} digital badges earned.
                  </div>
                </div>
              </div>

              {/* Practice Milestones & Daily Streak Spotlight Strip */}
              <div className="mt-5 p-4 bg-[#F2E7DC] border border-[#DECDBB] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#843E1F] text-[#FAF2EB] rounded-lg text-xs font-bold shadow-2xs">
                    <Flame className="w-4 h-4 text-[#FCD34D] animate-pulse" />
                    <span>{milestoneState.stats.currentStreak} Day{milestoneState.stats.currentStreak === 1 ? '' : 's'} Active Streak</span>
                  </div>

                  <div className="text-xs text-[#5C4D41]">
                    {milestoneState.stats.nextMilestone ? (
                      <span>
                        Next Goal: <strong className="text-[#843E1F]">{milestoneState.stats.nextMilestone.name}</strong> ({milestoneState.stats.nextMilestone.progressPercent}% completed)
                      </span>
                    ) : (
                      <span className="text-[#2D7A4D] font-bold">
                        🌟 All {milestoneState.stats.totalBadges} Practice Milestones Achieved!
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('milestones')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#843E1F] hover:text-[#5C2711] transition-colors self-start md:self-auto"
                >
                  <span>Explore Badges &amp; Streaks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Progress Chart Over Time */}
            <JournalChart entries={entries} />

            {/* List of Entries */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#24211D]">
                  Recorded Daily Milestones
                </h3>
                <span className="text-xs text-[#786657]">
                  Showing all {entries.length} personal entries
                </span>
              </div>

              {entries.length === 0 ? (
                <div className="text-center py-16 bg-[#F5EFE6] border border-[#DECDBB] rounded-2xl p-8 space-y-3">
                  <BookOpen className="w-8 h-8 text-[#843E1F] mx-auto opacity-50" />
                  <h4 className="font-serif text-lg font-bold text-[#24211D]">No journal records yet</h4>
                  <p className="text-xs text-[#6B5A4E] max-w-sm mx-auto">
                    Take your first step: drink tea in an unglazed kulhar, brush with neem datun, or use reetha soapberries.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#843E1F] hover:bg-[#6B3019] rounded-lg transition-colors"
                  >
                    Log First Practice Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl p-5 hover:border-[#843E1F] transition-all flex flex-col justify-between group shadow-2xs"
                    >
                      <div>
                        {/* Date and Location */}
                        <div className="flex items-center justify-between text-xs text-[#786657] mb-2">
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#843E1F]" />
                            <span>{entry.date}</span>
                          </span>
                          <span className="flex items-center gap-1 text-[11px] truncate max-w-[140px]">
                            <MapPin className="w-3 h-3 text-[#8C7A6D]" />
                            <span>{entry.locationCity}, {entry.locationState}</span>
                          </span>
                        </div>

                        <h4 className="text-base font-serif font-bold text-[#24211D] group-hover:text-[#843E1F] transition-colors">
                          {entry.practiceName}
                        </h4>

                        <div className="text-xs text-[#843E1F] font-semibold mt-0.5 mb-3">
                          Quantity: {entry.count} {entry.count === 1 ? 'unit' : 'units'}
                        </div>

                        {entry.notes && (
                          <p className="text-xs text-[#594B40] leading-relaxed italic bg-[#FBF9F5] p-3 rounded-lg border border-[#E6D9C8] mb-4">
                            &ldquo;{entry.notes}&rdquo;
                          </p>
                        )}

                        {/* Impact Pill Metrics */}
                        <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] text-[#4A3D33] py-2 border-t border-b border-[#DECDBB] mb-3">
                          <div className="p-1 bg-[#EAE0D2] rounded">
                            <span className="block font-bold text-[#843E1F]">-{entry.estimatedPlasticAvoided}</span>
                            <span>Plastic</span>
                          </div>
                          <div className="p-1 bg-[#E4EFE8] rounded">
                            <span className="block font-bold text-[#2D4A3E]">+{entry.estimatedCompostGrams}g</span>
                            <span>Soil Humus</span>
                          </div>
                          <div className="p-1 bg-[#EAE0D2] rounded">
                            <span className="block font-bold text-[#2D4A3E] truncate">
                              {(entry.estimatedMicroplasticsPrevented / 1000).toFixed(0)}k
                            </span>
                            <span>Microplastics</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#2D4A3E] flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>100% Decomposed</span>
                        </span>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-[11px] text-[#8C7A6D] hover:text-[#843E1F] transition-colors p-1"
                          title="Remove journal milestone"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: PRACTICE MILESTONES & DIGITAL BADGES */}
        {activeTab === 'milestones' && (
          <PracticeMilestonesView
            badges={milestoneState.badges}
            stats={milestoneState.stats}
            onOpenLogModal={() => setIsModalOpen(true)}
          />
        )}

        {/* TAB 3: COMMUNITY ECO-NODES MAP */}
        {activeTab === 'communityMap' && (
          <div className="space-y-8">
            <div className="bg-[#FAF2EB] border-2 border-[#843E1F]/20 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#843E1F]">
                    National Zero-Waste Network
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#24211D] mt-0.5">
                    Active Artisan Hubs & Community Zero-Waste Guilds
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#6B5A4E]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#843E1F] inline-block animate-ping" />
                    <strong>{SEED_COMMUNITY_NODES.length} Active Hubs</strong>
                  </span>
                  <span className="text-[#8C7A6D]">·</span>
                  <span>11,000+ Documented Daily Practitioners</span>
                </div>
              </div>

              {/* Map & Detail Split Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Stylized Visual Interactive India Map Board */}
                <div className="lg:col-span-7 bg-[#F4EDE2] border border-[#DECDBB] rounded-2xl p-6 relative overflow-hidden min-h-[440px] flex flex-col justify-between">
                  <div className="text-xs text-[#786657] font-serif italic mb-2">
                    Select any regional node to examine community plastic diversion and local potter/weaver cooperatives:
                  </div>

                  {/* Stylized Geographic Map Canvas with Interactive Pin Points */}
                  <div className="relative w-full h-80 sm:h-96 bg-[#EDE3D4] rounded-xl border border-[#DFD0BE] overflow-hidden flex items-center justify-center">
                    
                    {/* Subtle Contour Silhouette background */}
                    <div className="absolute inset-0 opacity-15 flex items-center justify-center font-serif text-8xl font-black text-[#843E1F] select-none pointer-events-none">
                      INDIA
                    </div>

                    {/* Regional Geo Compass lines */}
                    <div className="absolute inset-0 pointer-events-none border border-dashed border-[#D5C2AD] m-4 rounded-lg opacity-40" />

                    {/* Map Pins */}
                    {SEED_COMMUNITY_NODES.map((node) => {
                      const isSelected = selectedNode?.id === node.id;
                      return (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          style={{
                            left: `${node.coords.x}%`,
                            top: `${node.coords.y}%`
                          }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-10`}
                          title={`${node.city}, ${node.state}`}
                        >
                          <div className={`relative flex items-center justify-center ${isSelected ? 'scale-125' : 'hover:scale-110'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all ${
                              isSelected 
                                ? 'bg-[#843E1F] text-white ring-4 ring-[#843E1F]/30 ring-offset-1' 
                                : 'bg-[#2D4A3E] text-white hover:bg-[#843E1F]'
                            }`}>
                              <MapPin className="w-3.5 h-3.5" />
                            </div>
                            
                            {/* Floating City Label */}
                            <span className={`absolute top-7 px-2 py-0.5 text-[10px] font-semibold rounded whitespace-nowrap shadow-xs transition-colors pointer-events-none ${
                              isSelected 
                                ? 'bg-[#24211D] text-white' 
                                : 'bg-[#FBF9F5] text-[#3B2616] group-hover:bg-[#843E1F] group-hover:text-white'
                            }`}>
                              {node.city}
                            </span>
                          </div>
                        </button>
                      );
                    })}

                    <div className="absolute bottom-3 left-3 bg-[#FBF9F5]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] text-[#786657] border border-[#DECDBB]">
                      Lat/Long Calibrated Indian Hubs
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-[#786657] flex items-center justify-between">
                    <span>Click any point on the map to view verified community guild metrics</span>
                    <span className="font-semibold text-[#843E1F]">Active: {selectedNode?.city || 'Varanasi'}</span>
                  </div>
                </div>

                {/* Selected Node Deep-Dive Card */}
                {selectedNode && (
                  <div className="lg:col-span-5 bg-[#FBF9F5] border border-[#DECDBB] rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#843E1F] mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{selectedNode.region} Region · {selectedNode.state}</span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-[#24211D]">
                        {selectedNode.city} Hub
                      </h3>
                      <div className="text-xs text-[#6B5A4E] mt-0.5">
                        Prominent Tradition: <strong className="text-[#3B2616]">{selectedNode.topPractice}</strong>
                      </div>
                    </div>

                    {/* Stat Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl">
                        <div className="flex items-center gap-1.5 font-semibold text-[#843E1F] mb-0.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>Active Citizens</span>
                        </div>
                        <div className="text-xl font-serif font-bold text-[#24211D] tabular-nums">
                          {selectedNode.activePractioners.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-[#786657]">Daily local participants</div>
                      </div>

                      <div className="p-3 bg-[#EAF2EC] border border-[#CFDFD3] rounded-xl">
                        <div className="flex items-center gap-1.5 font-semibold text-[#2D4A3E] mb-0.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Monthly Diverted</span>
                        </div>
                        <div className="text-xl font-serif font-bold text-[#1C3328] tabular-nums">
                          {selectedNode.monthlyPlasticDivertedKg.toLocaleString()} kg
                        </div>
                        <div className="text-[10px] text-[#3E5246]">Single-use plastic averted</div>
                      </div>
                    </div>

                    {/* Partner Guild */}
                    <div className="p-4 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl space-y-1 text-xs text-[#594B40]">
                      <span className="font-semibold text-[#3B2616] block text-[11px] uppercase tracking-wider">
                        Local Artisan Cooperative / Guild:
                      </span>
                      <p className="font-medium text-[#24211D]">
                        {selectedNode.localArtisanCollective}
                      </p>
                    </div>

                    {/* Ground Testimonial */}
                    <div className="p-4 bg-[#FAF2EB] border border-[#E8D4C4] rounded-xl space-y-1 text-xs text-[#594B40]">
                      <span className="font-semibold text-[#843E1F] block text-[11px] uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ground Dispatch</span>
                      </span>
                      <p className="font-serif italic text-sm text-[#3B2616] leading-relaxed">
                        &ldquo;{selectedNode.recentTestimonial}&rdquo;
                      </p>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => {
                        setLocationCity(selectedNode.city);
                        setLocationState(selectedNode.state);
                        setActiveTab('journal');
                        setIsModalOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#843E1F] hover:bg-[#6B3019] rounded-xl transition-colors shadow-xs"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Log a Milestone in {selectedNode.city}</span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal: New Journal Log Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} aria-hidden="true" />

          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="journal-modal-title"
            className="relative z-10 w-full max-w-lg bg-[#FBF9F5] border border-[#D9C4B0] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#E6D9C8] pb-4 mb-6">
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#843E1F]">
                  Log Soil Adoption
                </div>
                <h3 id="journal-modal-title" className="text-xl font-serif font-bold text-[#24211D]">
                  Document Today&apos;s Biodegradable Practice
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-[#6B5A4E] hover:text-[#24211D] hover:bg-[#F2EBE0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-4">
              
              {/* Practice Category Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  Which ancient practice did you use today? *
                </label>
                <select
                  value={practiceCategory}
                  onChange={(e) => handleCategoryChange(e.target.value as JournalEntry['practiceCategory'])}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                  required
                >
                  <option value="kulhar">Clay Kulhar (Tea / Lassi / Water cup)</option>
                  <option value="pattal">Pattal / Dona (Sal, Banana, or Areca Leaf Plate)</option>
                  <option value="datun">Neem / Babool Datun Twig</option>
                  <option value="reetha">Reetha (Soapberry laundry or hair wash)</option>
                  <option value="jute">Jute or Khadi Cotton Bag</option>
                  <option value="matka">Matka / Surahi Earthen Water Drinking</option>
                  <option value="compost">Garden Organic Soil Return / Mulching</option>
                  <option value="other">Other Vernacular Bio-Material</option>
                </select>
              </div>

              {/* Title / Description */}
              <div>
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  Activity Name / Designation *
                </label>
                <input
                  type="text"
                  value={practiceName}
                  onChange={(e) => setPracticeName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                  required
                />
              </div>

              {/* Quantity and Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                    Units / Servings Count *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                    required
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, Varanasi, Madurai"
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maharashtra, UP"
                    value={locationState}
                    onChange={(e) => setLocationState(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                  />
                </div>
              </div>

              {/* Reflection Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  Personal Reflection / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Where did you get it? How did it feel? Did you crush or compost it afterwards?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F] resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#E6D9C8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#6B5A4E] hover:text-[#24211D] bg-[#F5EFE6] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#843E1F] hover:bg-[#6B3019] rounded-lg transition-colors shadow-xs"
                >
                  Record into Soil Ledger
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Newly Unlocked Badge Celebration Modal */}
      {newlyUnlockedBadges.length > 0 && (
        <BadgeUnlockModal
          newBadges={newlyUnlockedBadges}
          onClose={() => setNewlyUnlockedBadges([])}
          onViewAllMilestones={() => {
            setNewlyUnlockedBadges([]);
            setActiveTab('milestones');
          }}
        />
      )}

    </section>
  );
};

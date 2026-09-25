import React, { useState, useMemo, useEffect } from 'react';
import { REGIONS_DATA, RegionInfo, RegionalPractice } from '../data/regionalData';
import { ContributePracticeModal } from './ContributePracticeModal';
import { useLanguage } from '../context/LanguageContext';
import { SectionVoiceButton } from './SectionVoiceButton';
import { MapPin, Search, Sprout, ArrowRight, X, Compass, CheckCircle2, ShieldCheck, PlusCircle } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'mrittika_user_contributed_practices_v1';

export const RegionalExplorer: React.FC = () => {
  const { t } = useLanguage();
  const [selectedRegionId, setSelectedRegionId] = useState<RegionInfo['id']>('south');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDetailPractice, setActiveDetailPractice] = useState<RegionalPractice | null>(null);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState<boolean>(false);

  // User-contributed practices loaded from localStorage
  const [userPractices, setUserPractices] = useState<RegionalPractice[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleAddPractice = (newPractice: RegionalPractice) => {
    const updated = [newPractice, ...userPractices];
    setUserPractices(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Local storage fallback
    }
    // Also switch to the region of the added practice
    setSelectedRegionId(newPractice.regionId);
  };

  const activeRegion = useMemo(() => {
    return REGIONS_DATA.find(r => r.id === selectedRegionId) || REGIONS_DATA[0];
  }, [selectedRegionId]);

  // Combined practices: Seed data + user-contributed practices for this region
  const allPracticesForActiveRegion = useMemo(() => {
    const userForRegion = userPractices.filter(p => p.regionId === selectedRegionId);
    return [...userForRegion, ...activeRegion.practices];
  }, [userPractices, selectedRegionId, activeRegion]);

  // All distinct states across all practices in this active region
  const allStatesInActiveRegion = useMemo(() => {
    const statesSet = new Set<string>(activeRegion.statesIncluded);
    allPracticesForActiveRegion.forEach(p => statesSet.add(p.state));
    return Array.from(statesSet);
  }, [activeRegion, allPracticesForActiveRegion]);

  // Filtered practices in the active region or across search
  const displayedPractices = useMemo(() => {
    return allPracticesForActiveRegion.filter(practice => {
      const matchesState = stateFilter === 'all' || practice.state.toLowerCase().includes(stateFilter.toLowerCase());
      const matchesSearch = 
        searchQuery.trim() === '' ||
        practice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.localName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.script.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.state.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesState && matchesSearch;
    });
  }, [allPracticesForActiveRegion, stateFilter, searchQuery]);

  return (
    <section id="regional-explorer" className="py-16 md:py-24 bg-[#FAF7F0] border-b border-[#EDE2D4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-[#8C7A6D]">
            <span className="flex items-center gap-1.5 text-[#843E1F] font-semibold">
              <Compass className="w-3.5 h-3.5" />
              {t('regional.badge', 'Regional Biomes & Traditions')}
            </span>
            <span aria-hidden="true">·</span>
            <span>Geographic Material Heritage</span>
          </div>

          <SectionVoiceButton sectionId="regional-explorer" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E6D9C8]">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#24211D]">
              {t('regional.title', 'Explore Biodegradable Traditions by Indian Region')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
              India&apos;s ecological material practices evolved in response to local micro-climates. 
              Browse authentic indigenous traditions by state, or contribute a practice from your own community.
            </p>
          </div>

          {/* Action Row: Search & Add Practice Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#8C7A6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="regional-search"
                type="text"
                placeholder="Search state, leaf, clay..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#24211D] bg-[#FBF9F5] border border-[#D9C8B5] rounded-xl focus:outline-none focus:border-[#843E1F] focus:ring-1 focus:ring-[#843E1F]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6D] hover:text-[#24211D]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsContributeModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#843E1F] hover:bg-[#6B3019] rounded-xl transition-colors whitespace-nowrap shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('regional.addPractice', 'Add Your Region\'s Practice')}</span>
            </button>
          </div>
        </div>

        {/* Region Selector Pills / Tab Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {REGIONS_DATA.map((region) => {
            const isSelected = selectedRegionId === region.id;
            const regionUserCount = userPractices.filter(p => p.regionId === region.id).length;
            const totalCount = region.practices.length + regionUserCount;

            return (
              <button
                key={region.id}
                onClick={() => {
                  setSelectedRegionId(region.id);
                  setStateFilter('all');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#3B2616] text-[#FBF9F5] border-[#3B2616] shadow-md ring-1 ring-[#3B2616]'
                    : 'bg-[#F5EFE6] text-[#594B40] border-[#E6D9C8] hover:bg-[#EAE0D2] hover:border-[#D9C8B5]'
                }`}
              >
                <div>
                  <div className={`text-[10px] uppercase tracking-wider font-semibold ${isSelected ? 'text-[#D3B197]' : 'text-[#8C7A6D]'}`}>
                    {region.hindiName.split(' ')[0]}
                  </div>
                  <div className="font-serif text-sm font-bold mt-0.5 leading-snug">
                    {region.name.split(' ')[0]} {region.name.split(' ')[1] || ''}
                  </div>
                </div>
                <div className={`text-[11px] mt-2 font-medium flex items-center justify-between ${isSelected ? 'text-[#E6D2C2]' : 'text-[#786657]'}`}>
                  <span>{totalCount} Practices</span>
                  {regionUserCount > 0 && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#843E1F] text-white rounded">
                      +{regionUserCount} user
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Region Context Banner */}
        <div className="bg-[#F5EFE6] border border-[#DECDBB] rounded-2xl p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#EAE0D2] text-[#843E1F] text-xs font-semibold uppercase tracking-wider">
                  {activeRegion.hindiName}
                </span>
                <span className="text-xs text-[#786657] font-medium">
                  States: {activeRegion.statesIncluded.join(', ')}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#24211D]">
                {activeRegion.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#594B40] leading-relaxed">
                {activeRegion.bannerHighlight}
              </p>

              {/* Climate and Keystone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#594B40]">
                <div className="p-3 bg-[#FBF9F5] border border-[#E6D9C8] rounded-lg">
                  <strong className="text-[#3B2616] block font-semibold mb-0.5">Regional Ecology & Climate:</strong>
                  <span>{activeRegion.climateProfile}</span>
                </div>
                <div className="p-3 bg-[#FBF9F5] border border-[#E6D9C8] rounded-lg">
                  <strong className="text-[#3B2616] block font-semibold mb-0.5">Primary Natural Materials:</strong>
                  <span>{activeRegion.primaryEcoMaterials.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Filter by Specific State inside this Region */}
            <div className="lg:col-span-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <label htmlFor="state-filter-select" className="text-xs uppercase tracking-wider font-semibold text-[#843E1F] block mb-2">
                  Filter by Specific State:
                </label>
                <select
                  id="state-filter-select"
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium text-[#24211D] bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                >
                  <option value="all">All States ({allStatesInActiveRegion.length} territories)</option>
                  {allStatesInActiveRegion.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <p className="text-[11px] text-[#786657] mt-2 leading-relaxed">
                  Select a state to zoom into locally endemic biodegradable materials and tribal crafts.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E6D9C8] flex items-center justify-between text-xs text-[#6B5A4E]">
                <span>Documented Traditions:</span>
                <span className="font-serif font-bold text-sm text-[#843E1F] tabular-nums">{displayedPractices.length}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Practices Cards Grid for Selected Region */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {displayedPractices.map((practice) => {
            const isUserAdded = practice.id.startsWith('user-practice-');
            return (
              <article
                key={practice.id}
                className="bg-[#FBF9F5] border border-[#DECDBB] rounded-xl p-6 hover:border-[#843E1F] hover:shadow-sm transition-all duration-200 flex flex-col justify-between group relative"
              >
                {isUserAdded && (
                  <div className="absolute top-3 right-3 text-[10px] font-semibold bg-[#E4EFE8] text-[#2D4A3E] px-2 py-0.5 rounded-full border border-[#CDE0D4] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Community Added</span>
                  </div>
                )}

                <div>
                  {/* State Tag & Script */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#843E1F]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{practice.state}</span>
                    </div>
                    {practice.script && (
                      <span className="text-xs font-serif italic text-[#786657] bg-[#F5EFE6] px-2 py-0.5 rounded">
                        {practice.script}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-serif font-bold text-[#24211D] group-hover:text-[#843E1F] transition-colors">
                    {practice.name}
                  </h4>
                  {practice.localName && (
                    <div className="text-xs text-[#8C7A6D] font-medium mb-3">
                      Local name: <span className="italic text-[#594B40]">{practice.localName}</span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-[#594B40] leading-relaxed mb-4">
                    {practice.description}
                  </p>

                  {/* Key specs highlight */}
                  <div className="space-y-2 p-3 bg-[#F5EFE6] rounded-lg border border-[#E6D9C8] text-xs text-[#594B40] mb-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-[#3B2616]">Raw Material:</span>
                      <span className="text-right text-[#6B5A4E]">{practice.material}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2 border-t border-[#DECDBB] pt-1.5">
                      <span className="font-semibold text-[#3B2616]">Soil Return:</span>
                      <span className="text-right font-medium text-[#2D4A3E] flex items-center gap-1">
                        <Sprout className="w-3.5 h-3.5" />
                        <span>{practice.degradeDays} days into fertile humus</span>
                      </span>
                    </div>
                  </div>

                  {practice.highlight && (
                    <div className="text-xs text-[#6B5A4E] italic bg-[#FAF2EB] border border-[#E8D4C4] p-2.5 rounded-lg mb-4">
                      &ldquo;{practice.highlight}&rdquo;
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-3 border-t border-[#DECDBB] flex items-center justify-between">
                  <span className="text-[11px] text-[#786657]">
                    Community: <strong className="text-[#3B2616] font-medium">{practice.traditionalCommunities ? practice.traditionalCommunities.split(' ')[0] : 'Rural Artisans'}</strong>
                  </span>
                  <button
                    onClick={() => setActiveDetailPractice(practice)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#843E1F] hover:text-[#6B3019] transition-colors"
                  >
                    <span>Examine Practice Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {displayedPractices.length === 0 && (
          <div className="text-center py-16 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl space-y-3">
            <Compass className="w-8 h-8 text-[#843E1F] mx-auto opacity-60" />
            <h4 className="font-serif text-lg font-bold text-[#24211D]">No practices match your filter in this region</h4>
            <p className="text-xs text-[#6B5A4E] max-w-sm mx-auto">
              Know of a traditional biodegradable leaf, clay vessel, or natural fiber practice from this state? Be the first to record it.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => { setStateFilter('all'); setSearchQuery(''); }}
                className="px-4 py-2 text-xs font-medium text-[#6B5A4E] border border-[#D3B197] rounded-lg hover:bg-[#EAE0D2] transition-colors"
              >
                Reset Search Filters
              </button>
              <button
                onClick={() => setIsContributeModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#843E1F] rounded-lg hover:bg-[#6B3019] transition-colors shadow-xs"
              >
                Add Practice Now
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Regional Practice Detailed Modal */}
      {activeDetailPractice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setActiveDetailPractice(null)} aria-hidden="true" />

          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="regional-modal-title"
            className="relative z-10 w-full max-w-2xl bg-[#FBF9F5] border border-[#D9C4B0] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E6D9C8] pb-4">
              <div className="flex items-center gap-2 text-xs text-[#786657]">
                <MapPin className="w-3.5 h-3.5 text-[#843E1F]" />
                <span className="font-semibold text-[#843E1F] uppercase tracking-wider">{activeDetailPractice.state}</span>
                {activeDetailPractice.script && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-serif italic">{activeDetailPractice.script}</span>
                  </>
                )}
              </div>
              <button
                onClick={() => setActiveDetailPractice(null)}
                aria-label="Close regional practice dialog"
                className="p-1 rounded-lg text-[#6B5A4E] hover:text-[#24211D] hover:bg-[#F2EBE0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title */}
            <div>
              <h3 id="regional-modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#24211D]">
                {activeDetailPractice.name}
              </h3>
              {activeDetailPractice.localName && (
                <div className="text-xs text-[#8C7A6D] mt-1">
                  Vernacular Designation: <strong className="text-[#3B2616]">{activeDetailPractice.localName}</strong>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-[#594B40] leading-relaxed">
              {activeDetailPractice.description}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl">
                <span className="text-[#8C7A6D] font-semibold block mb-0.5">Botanical / Mineral Source:</span>
                <span className="text-[#24211D] font-medium">{activeDetailPractice.botanicalOrEarthenSource}</span>
              </div>
              <div className="p-3 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl">
                <span className="text-[#8C7A6D] font-semibold block mb-0.5">Traditional Custodians:</span>
                <span className="text-[#24211D] font-medium">{activeDetailPractice.traditionalCommunities}</span>
              </div>
              <div className="p-3 bg-[#EDF4EE] border border-[#CFE0D2] rounded-xl">
                <span className="text-[#2D4A3E] font-semibold block mb-0.5">Decomposition Timeline:</span>
                <span className="text-[#1C3328] font-bold text-sm">{activeDetailPractice.degradeDays} Days to Pure Earth</span>
              </div>
              <div className="p-3 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl">
                <span className="text-[#8C7A6D] font-semibold block mb-0.5">Functional Lifespan:</span>
                <span className="text-[#24211D] font-medium">{activeDetailPractice.lifespan}</span>
              </div>
            </div>

            {/* Ecological Impact Statement */}
            {activeDetailPractice.highlight && (
              <div className="p-4 bg-[#FAF2EB] border border-[#E6CEBE] rounded-xl space-y-1.5 text-xs text-[#594B40]">
                <div className="flex items-center gap-1.5 font-semibold text-[#843E1F]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ecological Highlight</span>
                </div>
                <p className="leading-relaxed font-serif italic text-sm text-[#3B2616]">
                  &ldquo;{activeDetailPractice.highlight}&rdquo;
                </p>
              </div>
            )}

            {/* Modern Status */}
            {activeDetailPractice.modernRevivalStatus && (
              <div className="p-4 bg-[#F2F8F4] border border-[#D0DEC8] rounded-xl text-xs text-[#3E5246] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#2D4A3E]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Modern Revival Status</span>
                </div>
                <p className="leading-relaxed">
                  {activeDetailPractice.modernRevivalStatus}
                </p>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveDetailPractice(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#3B2616] hover:bg-[#24211D] rounded-lg transition-colors"
              >
                Close Record
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Contribute Practice Form Modal */}
      <ContributePracticeModal
        isOpen={isContributeModalOpen}
        onClose={() => setIsContributeModalOpen(false)}
        onAddPractice={handleAddPractice}
        defaultRegionId={selectedRegionId}
      />

    </section>
  );
};


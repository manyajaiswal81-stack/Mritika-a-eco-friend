import React, { useState } from 'react';
import { PRACTICES_DATA, Practice } from '../data/practicesData';
import { ArrowUpRight, Sparkles, Sprout, AlertTriangle, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionVoiceButton } from './SectionVoiceButton';

interface PracticesArchiveProps {
  onSelectPractice: (practice: Practice) => void;
}

type CategoryFilter = 'all' | 'dining' | 'hygiene' | 'architecture' | 'textiles' | 'storage';

export const PracticesArchive: React.FC<PracticesArchiveProps> = ({ onSelectPractice }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPractices = PRACTICES_DATA.filter(practice => {
    const matchesCategory = activeCategory === 'all' || practice.category === activeCategory;
    const matchesSearch = practice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          practice.devanagari.includes(searchQuery) ||
                          practice.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          practice.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="practices" className="py-16 md:py-24 bg-[#FBF9F5] border-b border-[#EDE2D4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-[#8C7A6D]">
            <span>02. Curated Accession</span>
            <span aria-hidden="true">·</span>
            <span>{t('practices.badge', 'Traditional Biodegradable Solutions')}</span>
          </div>

          <SectionVoiceButton sectionId="practices-archive" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E6D9C8]">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#24211D]">
              {t('practices.title', 'Eight Timeless Bio-Materials of India')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
              Examine each ancient practice, its botanical/earthen composition, biochemical decay mechanism, 
              and how it replaces contemporary petrochemical polluters.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <label htmlFor="practice-search" className="sr-only">Search practices or materials</label>
            <input
              id="practice-search"
              type="text"
              placeholder="Search by leaf, clay, twig, neem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#24211D] bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F] focus:ring-1 focus:ring-[#843E1F]"
            />
          </div>
        </div>

        {/* Filter Segmented Control Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'all', label: 'All Traditions' },
            { id: 'dining', label: 'Dining & Vessels' },
            { id: 'hygiene', label: 'Hygiene & Cleansing' },
            { id: 'architecture', label: 'Vernacular Architecture' },
            { id: 'textiles', label: 'Textiles & Packaging' },
            { id: 'storage', label: 'Thermal Storage' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as CategoryFilter)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === tab.id
                  ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                  : 'bg-[#F2EBE0] text-[#6B5A4E] hover:bg-[#EAE0D2] hover:text-[#3B2616]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Practice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPractices.map((practice) => (
            <article
              key={practice.id}
              className="bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl overflow-hidden hover:border-[#B8673E] hover:shadow-md transition-all duration-200 flex flex-col group cursor-pointer"
              onClick={() => onSelectPractice(practice)}
            >
              {/* Card Image */}
              <div className="relative h-52 overflow-hidden bg-[#EAE0D2]">
                <img
                  src={practice.image}
                  alt={practice.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#24211D]/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
                  {practice.devanagari}
                </div>
                <div className="absolute bottom-3 right-3 bg-[#FBF9F5]/90 backdrop-blur-xs text-[#24211D] text-xs font-semibold px-2.5 py-1 rounded shadow-xs flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-[#2D4A3E]" />
                  <span>Degrades in <span className="tabular-nums font-bold text-[#843E1F]">{practice.soilReturnDays}</span> days</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Zero-Pill Clean Metadata */}
                <div className="flex items-center gap-2 text-xs text-[#786657] mb-2 font-medium">
                  <span className="capitalize">{practice.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{practice.antiquity}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#24211D] group-hover:text-[#843E1F] transition-colors flex items-center justify-between">
                  <span>{practice.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8C7A6D] group-hover:text-[#843E1F] transition-colors" />
                </h3>

                <p className="mt-2 text-xs text-[#6B5A4E] leading-relaxed line-clamp-3">
                  {practice.tagline}
                </p>

                {/* Primary Raw Materials (Unboxed) */}
                <div className="mt-4 pt-4 border-t border-[#E5D7C5]">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C7A6D] mb-1.5 flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    <span>Raw Natural Matrix</span>
                  </div>
                  <div className="text-xs text-[#4A3D33] line-clamp-1">
                    {practice.materials.join(' · ')}
                  </div>
                </div>

                {/* Modern Polluter Counterpart Alert */}
                <div className="mt-3.5 p-3 rounded-lg bg-[#EFE4D6] border border-[#E0D0BE] text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[#843E1F] mb-0.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Replaces Modern Synthetic</span>
                  </div>
                  <div className="text-[#594B40] text-[11px] leading-snug">
                    {practice.syntheticCounterpart} (persists <span className="tabular-nums font-semibold">{practice.syntheticLifespan}</span>)
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-5 pt-3 border-t border-[#E5D7C5] flex items-center justify-between text-xs font-semibold text-[#843E1F] group-hover:text-[#6B3019]">
                  <span>Examine Archival Record</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPractices.length === 0 && (
          <div className="text-center py-16 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl">
            <Sparkles className="w-8 h-8 text-[#843E1F] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-bold text-[#24211D]">No matching practice found</h3>
            <p className="text-xs text-[#6B5A4E] mt-1 max-w-sm mx-auto">
              Try searching for &quot;leaf&quot;, &quot;mitti&quot;, &quot;neem&quot;, &quot;jute&quot;, or reset your category filter.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs font-medium text-[#843E1F] border border-[#D3B197] rounded-lg hover:bg-[#EAE0D2] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Sprout, ShieldCheck, Clock, ChevronDown, ChevronUp, BookOpen, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionVoiceButton } from './SectionVoiceButton';
import { AppTabId } from './AppNavigationTabs';

interface HeroProps {
  onExploreClick: () => void;
  onNavigateToTab?: (id: AppTabId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onNavigateToTab }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <section className="relative pt-6 pb-6 md:pt-8 md:pb-8 border-b border-[#EDE2D4] bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header Chapter Index & Read Aloud Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 text-xs tracking-widest uppercase font-medium text-[#8C7A6D]">
            <span className="font-serif italic capitalize text-sm text-[#843E1F] font-bold">मृत्तिका · Mrittika</span>
            <span aria-hidden="true">·</span>
            <span>{t('hero.tagline', 'Zero-Waste Vernacular Science')}</span>
          </div>

          <div className="flex items-center gap-2">
            <SectionVoiceButton sectionId="hero" />
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#843E1F] hover:text-[#5E2B14] bg-[#FAF2EB] hover:bg-[#F2ECE2] rounded-lg border border-[#E8D4C4] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isExpanded ? 'Compact View / संक्षिप्त दृश्य' : 'Read History & Photos / विस्तार से'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Compact Core Headline & Summary */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#24211D] leading-tight">
              {t('hero.title', 'Ancient Indian Biodegradable Practices')}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-[#594B40] leading-relaxed">
              {t('hero.subtitle', 'For thousands of years, Indian civilization engineered everyday life with materials that dissolve gracefully back into the earth—alluvial clay kulhars, stitched leaf platters, neem datun, and soil-enriching farm mulches.')}
            </p>
          </div>

          {/* Quick Vedic Axiom Pill */}
          <div className="bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl px-4 py-2.5 shrink-0 self-start lg:self-auto text-xs text-[#594B40] max-w-sm">
            <div className="font-serif italic font-bold text-[#843E1F] text-xs">
              &ldquo;यथा भूमिस्तथा सर्वं, यन्मृत्तिका तल्लीनम्&rdquo;
            </div>
            <div className="text-[11px] text-[#786657] mt-0.5">
              Born of the earth, returning to earth without a single trace of plastic.
            </div>
          </div>
        </div>

        {/* Expanded Deep Historical View (Only appears when user toggles it) */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-[#EDE2D4] space-y-6 transition-all duration-300">
            {/* Hero Marquee Image with Editorial Framing */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E3D5C3] shadow-sm group">
              <img
                src="/src/assets/images/hero_ancient_biodegradable_1790313418657.jpg"
                alt="Ancient Indian biodegradable materials including handcrafted unglazed terracotta kulhars, fresh stitched sal leaf pattals, and neem datun twigs"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201813]/85 via-[#201813]/25 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <div className="max-w-2xl text-white">
                  <span className="text-xs uppercase tracking-widest font-medium text-[#E6D2C2]">
                    Material Taxonomy
                  </span>
                  <h2 className="text-lg sm:text-2xl font-serif text-white font-medium mt-1">
                    Earthen Terracotta, Forest Leaves, Bast Jute & Bitter Medicinal Botanicals
                  </h2>
                  <p className="mt-1.5 text-xs text-[#F3E8DF] leading-relaxed hidden sm:block">
                    Alluvial river silt wicks acidity; Sal leaves shield hot meals with natural cutin wax; Neem bark disinfects teeth without synthetic microplastics.
                  </p>
                </div>
              </div>
            </div>

            {/* Operational Curatorial Utility Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 pb-3 border-t border-b border-[#EDE2D4] text-xs text-[#6B5A4E]">
              <div className="flex items-center gap-2 py-1">
                <Clock className="w-4 h-4 text-[#843E1F] shrink-0" />
                <span>
                  <strong className="text-[#3B2616] font-semibold">{t('stats.stat1Label', 'Antiquity Span')}:</strong> {t('stats.stat1Desc', 'Harappan (~2500 BCE) to Living Folk Traditions')}
                </span>
              </div>
              <div className="flex items-center gap-2 py-1">
                <Sprout className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                <span>
                  <strong className="text-[#3B2616] font-semibold">{t('stats.stat2Label', 'Decomposition Cycle')}:</strong> {t('stats.stat2Desc', '3 to 90 Days into Fertile Humus')}
                </span>
              </div>
              <div className="flex items-center gap-2 py-1">
                <ShieldCheck className="w-4 h-4 text-[#843E1F] shrink-0" />
                <span>
                  <strong className="text-[#3B2616] font-semibold">{t('stats.stat3Label', 'Toxicity Footprint')}:</strong> {t('stats.stat3Desc', '0% Microplastics · 0% Chemical Leaching')}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};


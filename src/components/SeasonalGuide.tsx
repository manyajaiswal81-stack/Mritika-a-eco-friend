import React, { useState } from 'react';
import { SEASONS_DATA, SeasonalCycle, getCurrentIndianSeason } from '../data/seasonalData';
import { Calendar, Sun, CloudRain, Wind, Sparkles, Sprout, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionVoiceButton } from './SectionVoiceButton';
import { SeasonalNotificationControl } from './SeasonalNotificationControl';
import { HarvestAlertBanner } from './HarvestAlertBanner';
import { HarvestAlertPayload } from '../utils/harvestNotifications';

export const SeasonalGuide: React.FC = () => {
  const { t } = useLanguage();
  const currentSeason = getCurrentIndianSeason();
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>(currentSeason.id);
  const [activeHarvestAlert, setActiveHarvestAlert] = useState<HarvestAlertPayload | null>(null);

  const activeSeason = SEASONS_DATA.find(s => s.id === selectedSeasonId) || currentSeason;
  const isCurrentActive = activeSeason.id === currentSeason.id;

  const getSeasonIcon = (id: string) => {
    switch (id) {
      case 'varsha':
        return <CloudRain className="w-4 h-4 text-[#2D4A3E]" />;
      case 'grishma':
        return <Sun className="w-4 h-4 text-[#B8673E]" />;
      case 'vasant':
        return <Sparkles className="w-4 h-4 text-[#843E1F]" />;
      case 'sharad':
      case 'hemant':
        return <Wind className="w-4 h-4 text-[#785E49]" />;
      case 'shishir':
      default:
        return <Calendar className="w-4 h-4 text-[#4A3D33]" />;
    }
  };

  return (
    <section id="seasonal-guide" className="py-16 md:py-24 bg-[#F5EFE6] border-b border-[#EDE2D4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-[#8C7A6D]">
            <span className="flex items-center gap-1.5 text-[#843E1F] font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              {t('seasonal.badge', 'Vedic Ritu Chakra · Agricultural Harvest Cycles')}
            </span>
            <span aria-hidden="true">·</span>
            <span>Harvest Cycles & Bio-Material Availability</span>
          </div>

          <SectionVoiceButton sectionId="seasonal-guide" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E6D9C8]">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#24211D]">
              {t('seasonal.title', 'Seasonal Eco-Guide: Living in Rhythm with Indian Harvests')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
              In ancient India, zero-waste practices were not static—they changed seamlessly with the six Vedic seasons (*Shad Ritu*). 
              From monsoon banana leaves and post-harvest jute bags to summer vetiver screens and winter willow wicker, 
              discover which biodegradable materials align with India&apos;s current agricultural rhythms.
            </p>
          </div>

          {/* Current Real-Time Season Badge */}
          <div className="bg-[#FAF2EB] border-2 border-[#843E1F]/30 rounded-xl p-4 shrink-0 flex items-center gap-3 shadow-xs">
            <div className="p-2.5 rounded-lg bg-[#EAE0D2] text-[#843E1F]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-[#843E1F]">
                Active Indian Ritu Right Now
              </div>
              <div className="font-serif text-base font-bold text-[#24211D]">
                {currentSeason.rituName.split(' ')[0]} {currentSeason.rituName.split(' ')[1]} ({currentSeason.devanagari})
              </div>
              <div className="text-[11px] text-[#786657]">
                Cycle: <strong className="text-[#3B2616]">{currentSeason.agriculturalCropCycle}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Persistent Regional Harvest Notification Engine */}
        <SeasonalNotificationControl
          currentSeason={currentSeason}
          onTriggerAlert={(alert) => setActiveHarvestAlert(alert)}
          onSelectSeason={(seasonId) => setSelectedSeasonId(seasonId)}
        />

        {/* 6 Ritu Season Picker Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {SEASONS_DATA.map((season) => {
            const isSelected = selectedSeasonId === season.id;
            const isLive = season.id === currentSeason.id;
            return (
              <button
                key={season.id}
                onClick={() => setSelectedSeasonId(season.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#3B2616] text-[#FBF9F5] border-[#3B2616] shadow-sm ring-1 ring-[#3B2616]'
                    : 'bg-[#FBF9F5] text-[#594B40] border-[#DECDBB] hover:bg-[#EAE0D2]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-[#D3B197]' : 'text-[#8C7A6D]'}`}>
                      {season.monthsEnglish.split(' ')[0]} - {season.monthsEnglish.split(' ')[2]}
                    </span>
                    {isLive && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#843E1F] text-white">
                        LIVE
                      </span>
                    )}
                  </div>
                  <div className="font-serif text-sm font-bold truncate">
                    {season.rituName.split(' ')[0]} {season.rituName.split(' ')[1]}
                  </div>
                </div>

                <div className={`text-[11px] mt-2 font-medium flex items-center gap-1.5 ${isSelected ? 'text-[#E6D2C2]' : 'text-[#786657]'}`}>
                  {getSeasonIcon(season.id)}
                  <span className="truncate">{season.agriculturalCropCycle}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Season Banner & Overview */}
        <div className="bg-[#FBF9F5] border border-[#DECDBB] rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#EAE0D2] text-[#843E1F] text-xs font-semibold uppercase tracking-wider">
                  {activeSeason.devanagari} · {activeSeason.indianCalendarMonths}
                </span>
                <span className="text-xs text-[#786657] font-medium bg-[#F2ECE2] px-2.5 py-1 rounded">
                  Agricultural Stage: <strong>{activeSeason.agriculturalCropCycle}</strong>
                </span>
                {isCurrentActive && (
                  <span className="text-xs text-[#2D4A3E] font-semibold bg-[#E4EFE8] px-2.5 py-1 rounded flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Synchronized with Current Calendar</span>
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#24211D]">
                {activeSeason.rituName}
              </h3>

              <p className="text-xs sm:text-sm text-[#594B40] leading-relaxed">
                <strong>Climatic Conditions:</strong> {activeSeason.climateCondition}
              </p>

              {/* Culinary & Ritual Footnotes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#594B40]">
                <div className="p-3 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl space-y-1">
                  <strong className="text-[#3B2616] font-semibold block">Seasonal Tableware & Dining:</strong>
                  <p className="leading-relaxed">{activeSeason.culinaryTablewareGuide}</p>
                </div>
                <div className="p-3 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl space-y-1">
                  <strong className="text-[#3B2616] font-semibold block">Living Eco-Ritual Tradition:</strong>
                  <p className="leading-relaxed">{activeSeason.ecoRitualTradition}</p>
                </div>
              </div>
            </div>

            {/* Quick Summary Pill on the Right */}
            <div className="lg:col-span-4 bg-[#FAF2EB] border border-[#E8D5C4] rounded-xl p-5 space-y-3 text-xs text-[#594B40]">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#843E1F] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Agricultural Harvest Rhythms</span>
              </div>
              <p className="leading-relaxed">
                During this ritu, rural farms and forest canopies naturally generate organic fibers and agricultural byproducts ready for circular use without industrial energy.
              </p>
              <div className="pt-2 border-t border-[#E0D0BF] flex items-center justify-between text-[#843E1F] font-semibold">
                <span>Recommended Bio-Materials</span>
                <span className="font-serif text-base">{activeSeason.recommendedMaterials.length} Seasonal Practices</span>
              </div>
            </div>

          </div>
        </div>

        {/* Recommended Bio-Materials Cards for Active Season */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeSeason.recommendedMaterials.map((rec, idx) => (
            <div
              key={idx}
              className="bg-[#FBF9F5] border border-[#DECDBB] rounded-xl p-6 hover:border-[#843E1F] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-[#843E1F] mb-1">
                  Material 0{idx + 1}
                </div>
                <h4 className="text-lg font-serif font-bold text-[#24211D] mb-1">
                  {rec.material}
                </h4>
                <div className="text-xs text-[#8C7A6D] mb-3">
                  Practice: <strong className="text-[#594B40] font-medium">{rec.practiceName}</strong>
                </div>

                {/* Practical Guidance */}
                <p className="text-xs text-[#594B40] leading-relaxed mb-4">
                  {rec.usageGuidance}
                </p>

                <div className="space-y-2 p-3 bg-[#F5EFE6] rounded-lg border border-[#E6D9C8] text-xs text-[#594B40]">
                  <div>
                    <span className="font-semibold text-[#3B2616] block text-[11px] mb-0.5">Agricultural & Forest Context:</span>
                    <span className="leading-snug block">{rec.harvestContext}</span>
                  </div>
                  <div className="pt-1.5 border-t border-[#DECDBB]">
                    <span className="font-semibold text-[#2D4A3E] block text-[11px] mb-0.5 flex items-center gap-1">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>Soil & Compost Reintegration:</span>
                    </span>
                    <span className="leading-snug block">{rec.soilBenefit}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DECDBB] flex items-center justify-between text-[11px] text-[#786657]">
                <span>Origin: <strong className="text-[#3B2616] font-medium">{rec.botanicalOrEarthenOrigin.split(' ')[0]}</strong></span>
                <span className="font-serif italic text-[#843E1F]">100% Biodegradable</span>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Harvest Cycle Alert Banner / Toast */}
        <HarvestAlertBanner
          alert={activeHarvestAlert}
          onDismiss={() => setActiveHarvestAlert(null)}
          onSelectSeason={(id) => setSelectedSeasonId(id)}
        />

      </div>
    </section>
  );
};

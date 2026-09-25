import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Wheat, 
  BookOpen, 
  Compass, 
  Layers, 
  Beaker, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  LayoutGrid
} from 'lucide-react';

export type PavilionId = 'practices' | 'farmers' | 'ledger' | 'seasonal-regional' | 'lab';

export interface Pavilion {
  id: PavilionId;
  roomNumber: string;
  icon: React.ElementType;
  badgeKey: string;
  badgeFallback: string;
  titleKey: string;
  titleFallback: string;
  accentColor: string;
  descriptionKey: string;
  descriptionFallback: string;
}

export const PAVILIONS: Pavilion[] = [
  {
    id: 'practices',
    roomNumber: '01',
    icon: Layers,
    badgeKey: 'nav.practices',
    badgeFallback: 'Living Practices',
    titleKey: 'practices.title',
    titleFallback: 'The 8 Core Living Practices & Botanical Herbarium',
    accentColor: '#843E1F',
    descriptionKey: 'practices.badge',
    descriptionFallback: 'Unglazed clay kulhar, leaf pattals, neem datun & Vedic 5 elements'
  },
  {
    id: 'farmers',
    roomNumber: '02',
    icon: Wheat,
    badgeKey: 'nav.forFarmers',
    badgeFallback: 'For Farmers (कृषि)',
    titleKey: 'farmer.title',
    titleFallback: 'Traditional Biodegradable Farm Practices',
    accentColor: '#2D4A3E',
    descriptionKey: 'farmer.badge',
    descriptionFallback: 'Zero-burn paddy straw mulching & multi-lingual voice guide'
  },
  {
    id: 'ledger',
    roomNumber: '03',
    icon: BookOpen,
    badgeKey: 'nav.soilLedger',
    badgeFallback: 'Soil Ledger & Milestones',
    titleKey: 'journal.title',
    titleFallback: 'Personal Adoption Journal, Practice Milestones & Community Map',
    accentColor: '#843E1F',
    descriptionKey: 'journal.badge',
    descriptionFallback: 'Daily logging streaks, Earth Protector badges, humus metrics & community hubs'
  },
  {
    id: 'seasonal-regional',
    roomNumber: '04',
    icon: Compass,
    badgeKey: 'nav.byRegion',
    badgeFallback: 'Seasons & Regions',
    titleKey: 'regional.title',
    titleFallback: 'Shad-Ritu Harvest Calendar & 6 Indian Biomes',
    accentColor: '#785E49',
    descriptionKey: 'seasonal.badge',
    descriptionFallback: 'Harvest cycle timings, vernacular materials & state archives'
  },
  {
    id: 'lab',
    roomNumber: '05',
    icon: Beaker,
    badgeKey: 'simulator.badge',
    badgeFallback: 'Science & Impact Lab',
    titleKey: 'simulator.title',
    titleFallback: '500-Year Soil Decomposition Chamber & Eco Calculator',
    accentColor: '#3B2616',
    descriptionKey: 'calc.badge',
    descriptionFallback: 'Interactive comparative sandbox & household transition math'
  }
];

interface PavilionNavigationProps {
  activePavilion: PavilionId;
  onSelectPavilion: (id: PavilionId) => void;
  viewMode: 'pavilion' | 'continuous';
  onToggleViewMode: () => void;
}

export const PavilionNavigation: React.FC<PavilionNavigationProps> = ({
  activePavilion,
  onSelectPavilion,
  viewMode,
  onToggleViewMode
}) => {
  const { t } = useLanguage();

  const currentIndex = PAVILIONS.findIndex(p => p.id === activePavilion);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + PAVILIONS.length) % PAVILIONS.length;
    onSelectPavilion(PAVILIONS[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % PAVILIONS.length;
    onSelectPavilion(PAVILIONS[nextIdx].id);
  };

  return (
    <div className="sticky top-18 z-30 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#E6D9C8] py-3 px-4 sm:px-6 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Pavilion Switcher Pills with Room Index */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-[#8C7A6D] mr-2 shrink-0">
            <LayoutGrid className="w-3.5 h-3.5 text-[#843E1F]" />
            <span>Pavilions:</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {PAVILIONS.map((pavilion, idx) => {
              const isActive = activePavilion === pavilion.id && viewMode === 'pavilion';
              const Icon = pavilion.icon;
              return (
                <button
                  key={pavilion.id}
                  onClick={() => {
                    if (viewMode === 'continuous') onToggleViewMode();
                    onSelectPavilion(pavilion.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-[#3B2616] text-[#FBF9F5] border-[#3B2616] shadow-sm ring-1 ring-[#3B2616]'
                      : 'bg-[#FAF6F0] text-[#594B40] border-[#DECDBB] hover:bg-[#EAE0D2] hover:text-[#24211D]'
                  }`}
                >
                  <span className={`text-[10px] font-mono px-1 rounded ${
                    isActive ? 'bg-[#843E1F] text-white' : 'bg-[#EAE0D2] text-[#786657]'
                  }`}>
                    {pavilion.roomNumber}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E6A060]' : 'text-[#843E1F]'}`} />
                  <span>{t(pavilion.badgeKey, pavilion.badgeFallback)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Next/Prev & View Mode Switcher */}
        <div className="flex items-center justify-between md:justify-end gap-2 shrink-0">
          
          {/* Navigation Controls in Pavilion mode */}
          {viewMode === 'pavilion' && (
            <div className="flex items-center gap-1 bg-[#FAF6F0] border border-[#DECDBB] rounded-xl p-1">
              <button
                onClick={handlePrev}
                aria-label="Previous Pavilion"
                className="p-1.5 text-[#594B40] hover:text-[#24211D] hover:bg-[#EAE0D2] rounded-lg transition-colors"
                title="Previous Pavilion (Room)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="text-xs font-mono font-medium px-2 text-[#786657]">
                {currentIndex + 1} / {PAVILIONS.length}
              </span>

              <button
                onClick={handleNext}
                aria-label="Next Pavilion"
                className="p-1.5 text-[#594B40] hover:text-[#24211D] hover:bg-[#EAE0D2] rounded-lg transition-colors"
                title="Next Pavilion (Room)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mode Switcher: Compact Pavilion Mode vs Full Continuous Scroll */}
          <button
            onClick={onToggleViewMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              viewMode === 'continuous'
                ? 'bg-[#843E1F] text-white border-[#843E1F]'
                : 'bg-[#FAF6F0] text-[#6B5A4E] border-[#DECDBB] hover:text-[#24211D] hover:bg-[#EAE0D2]'
            }`}
            title={viewMode === 'pavilion' ? 'Switch to continuous scrolling view' : 'Switch back to curated room-by-room pavilion view'}
          >
            {viewMode === 'pavilion' ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#843E1F]" />
                <span className="hidden sm:inline">Continuous Scroll Mode</span>
                <span className="sm:hidden">All</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-white" />
                <span>Pavilion Mode (Zero Scroll)</span>
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
};

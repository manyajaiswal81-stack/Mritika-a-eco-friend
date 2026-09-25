import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Wheat, 
  BookOpen, 
  Layers, 
  Calendar, 
  Compass, 
  Beaker,
  Sparkles
} from 'lucide-react';

export type AppTabId = 'farmers' | 'ledger' | 'practices' | 'seasonal' | 'regional' | 'science';

export interface AppTab {
  id: AppTabId;
  labelKey: string;
  defaultLabel: string;
  hindiLabel: string;
  icon: React.ElementType;
  color: string;
}

export const APP_TABS: AppTab[] = [
  {
    id: 'farmers',
    labelKey: 'nav.forFarmers',
    defaultLabel: 'Farmers Guide',
    hindiLabel: 'किसान सलाह',
    icon: Wheat,
    color: '#2D4A3E'
  },
  {
    id: 'ledger',
    labelKey: 'nav.soilLedger',
    defaultLabel: 'Soil Ledger & Chart',
    hindiLabel: 'डायरी व चार्ट',
    icon: BookOpen,
    color: '#843E1F'
  },
  {
    id: 'practices',
    labelKey: 'nav.practices',
    defaultLabel: '8 Earthen Practices',
    hindiLabel: '8 पद्धतियां',
    icon: Layers,
    color: '#843E1F'
  },
  {
    id: 'seasonal',
    labelKey: 'nav.seasonalGuide',
    defaultLabel: 'Seasonal Harvests',
    hindiLabel: 'ऋतु चक्र',
    icon: Calendar,
    color: '#785E49'
  },
  {
    id: 'regional',
    labelKey: 'nav.byRegion',
    defaultLabel: 'Regional Map',
    hindiLabel: 'क्षेत्रीय मानचित्र',
    icon: Compass,
    color: '#785E49'
  },
  {
    id: 'science',
    labelKey: 'simulator.badge',
    defaultLabel: 'Soil vs Plastic Lab',
    hindiLabel: 'अपघटन विज्ञान',
    icon: Beaker,
    color: '#3B2616'
  }
];

interface AppNavigationTabsProps {
  activeTab: AppTabId;
  onSelectTab: (id: AppTabId) => void;
}

export const AppNavigationTabs: React.FC<AppNavigationTabsProps> = ({
  activeTab,
  onSelectTab
}) => {
  const { t, currentLanguage } = useLanguage();

  return (
    <>
      {/* Sticky Desktop & Tablet Tab Bar */}
      <div className="sticky top-0 z-30 bg-[#FAF5EE]/95 backdrop-blur-md border-b border-[#DECDBB] py-2 px-3 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none py-1">
          <div className="flex items-center gap-1.5 w-full justify-start sm:justify-center">
            {APP_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border shrink-0 ${
                    isActive
                      ? 'bg-[#3B2616] text-[#FBF9F5] border-[#3B2616] shadow-sm scale-102'
                      : 'bg-[#F2ECE2] text-[#594B40] border-[#DECDBB] hover:bg-[#EAE0D2] hover:text-[#24211D]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E6A060]' : 'text-[#843E1F]'}`} />
                  <span>
                    {currentLanguage === 'hi' 
                      ? tab.hindiLabel 
                      : t(tab.labelKey, tab.defaultLabel)}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6A060]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Bar for Mobile (Instant thumb access, 0 scrolling) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#2D2118] text-[#F3ECE2] border-t border-[#433225] py-2 px-2 shadow-2xl">
        <div className="grid grid-cols-6 gap-1">
          {APP_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all ${
                  isActive
                    ? 'text-[#E6A060] font-bold bg-[#3E2F23]'
                    : 'text-[#C9B9A6] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E6A060]' : 'text-[#C9B9A6]'}`} />
                <span className="text-[10px] truncate max-w-[52px] mt-0.5 font-medium leading-tight">
                  {tab.hindiLabel.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

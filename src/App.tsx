/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { GlobalVoiceAndLanguageBar } from './components/GlobalVoiceAndLanguageBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppNavigationTabs, AppTabId, APP_TABS } from './components/AppNavigationTabs';
import { FarmerAdvisorySection } from './components/FarmerAdvisorySection';
import { PersonalJournalAndMap } from './components/PersonalJournalAndMap';
import { SeasonalGuide } from './components/SeasonalGuide';
import { RegionalExplorer } from './components/RegionalExplorer';
import { PracticesArchive } from './components/PracticesArchive';
import { DecompositionSimulator } from './components/DecompositionSimulator';
import { ImpactCalculator } from './components/ImpactCalculator';
import { BotanicalMatrix } from './components/BotanicalMatrix';
import { PanchaMahabhutas } from './components/PanchaMahabhutas';
import { PracticeModal } from './components/PracticeModal';
import { PracticeFinderQuizModal } from './components/PracticeFinderQuizModal';
import { Footer } from './components/Footer';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Practice } from './data/practicesData';
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize2 } from 'lucide-react';

export default function App() {
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AppTabId>('farmers');
  const [viewMode, setViewMode] = useState<'app' | 'continuous'>('app');

  const handleSelectTab = (id: AppTabId) => {
    setActiveTab(id);
    if (viewMode === 'continuous') {
      const el = document.getElementById(
        id === 'farmers' ? 'farmer-advisory' :
        id === 'ledger' ? 'personal-journal' :
        id === 'practices' ? 'practices' :
        id === 'seasonal' ? 'seasonal-guide' :
        id === 'regional' ? 'regional-explorer' : 'soil-simulator'
      );
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentTabIndex = APP_TABS.findIndex(t => t.id === activeTab);

  const handleNextTab = () => {
    const nextIdx = (currentTabIndex + 1) % APP_TABS.length;
    handleSelectTab(APP_TABS[nextIdx].id);
  };

  const handlePrevTab = () => {
    const prevIdx = (currentTabIndex - 1 + APP_TABS.length) % APP_TABS.length;
    handleSelectTab(APP_TABS[prevIdx].id);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#24211D] selection:bg-[#E6D5C3] selection:text-[#3B2616] pb-14 md:pb-0">
        
        {/* Global Multi-lingual Language Selector & Real-Time Audio Voice Bar */}
        <GlobalVoiceAndLanguageBar />

        {/* 3-Zone Sticky Navigation */}
        <Navbar 
          onOpenQuiz={() => setIsQuizOpen(true)}
          onNavigateToTab={handleSelectTab}
        />

        {/* Compact, Zero-Scroll Curatorial Hero Banner */}
        <Hero 
          onExploreClick={() => handleSelectTab('practices')}
          onNavigateToTab={handleSelectTab}
        />

        {/* Easy Interactive Feature Switcher Bar (Zero-Scroll Controller) */}
        <AppNavigationTabs 
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
        />

        {/* Main Exhibition Stage */}
        <main id="app-stage" className="flex-grow">
          
          {/* APP / ZERO-SCROLL MODE (Default: Displays ONLY the active feature) */}
          {viewMode === 'app' ? (
            <div>
              {/* Feature Navigator Breadcrumb & Next/Prev Controls */}
              <div className="bg-[#FAF2EB] border-b border-[#E6D9C8] py-2.5 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white bg-[#843E1F] px-2 py-0.5 rounded text-[10px]">
                      VIEW {currentTabIndex + 1} OF {APP_TABS.length}
                    </span>
                    <span className="font-serif font-bold text-sm sm:text-base text-[#24211D]">
                      {APP_TABS[currentTabIndex].defaultLabel} · {APP_TABS[currentTabIndex].hindiLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevTab}
                      aria-label="Previous Feature"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#DECDBB] bg-[#F5EFE6] text-[#594B40] hover:text-[#24211D] hover:bg-[#EAE0D2] font-semibold text-xs transition-colors"
                      title="Previous feature"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                    <button
                      onClick={handleNextTab}
                      aria-label="Next Feature"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#843E1F] bg-[#843E1F] text-white hover:bg-[#6B3019] font-semibold text-xs transition-colors shadow-xs"
                      title="Next feature"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode('continuous')}
                      className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#DECDBB] bg-[#FAF6F0] text-[#786657] hover:text-[#24211D] text-xs transition-colors"
                      title="Switch to full page scroll mode"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Full Page</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 1. Farmer Agro-Ecological Voice Advisory */}
              {activeTab === 'farmers' && (
                <div className="animate-in fade-in duration-200">
                  <FarmerAdvisorySection />
                </div>
              )}

              {/* 2. Personal Soil Ledger, Adoption Chart & Community Map */}
              {activeTab === 'ledger' && (
                <div className="animate-in fade-in duration-200">
                  <PersonalJournalAndMap />
                </div>
              )}

              {/* 3. The 8 Core Living Practices & Botanical Herbarium */}
              {activeTab === 'practices' && (
                <div className="animate-in fade-in duration-200">
                  <PracticesArchive onSelectPractice={(practice) => setSelectedPractice(practice)} />
                  <BotanicalMatrix />
                  <PanchaMahabhutas />
                </div>
              )}

              {/* 4. Agricultural Harvest Cycle & Seasonal Guide */}
              {activeTab === 'seasonal' && (
                <div className="animate-in fade-in duration-200">
                  <SeasonalGuide />
                </div>
              )}

              {/* 5. Regional Biodegradable Practices Explorer & Map */}
              {activeTab === 'regional' && (
                <div className="animate-in fade-in duration-200">
                  <RegionalExplorer />
                </div>
              )}

              {/* 6. Comparative 500-Year Soil Sandbox & Impact Calculator */}
              {activeTab === 'science' && (
                <div className="animate-in fade-in duration-200">
                  <DecompositionSimulator />
                  <ImpactCalculator />
                </div>
              )}

              {/* Bottom Quick-Jump Strip */}
              <div className="py-6 bg-[#F5EFE6] border-t border-[#DECDBB] text-center">
                <div className="max-w-xl mx-auto px-6 flex items-center justify-center gap-3">
                  <button
                    onClick={handleNextTab}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs text-white bg-[#843E1F] hover:bg-[#6B3019] transition-colors shadow-xs"
                  >
                    <span>Next: {APP_TABS[(currentTabIndex + 1) % APP_TABS.length].defaultLabel}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('continuous')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs text-[#594B40] hover:text-[#24211D] bg-[#EAE0D2] transition-colors"
                  >
                    <span>View All On One Page</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* CONTINUOUS SCROLL MODE: All Sections Stacked for users who prefer full scrolling */
            <div>
              <div className="bg-[#FAF2EB] border-b border-[#E6D9C8] py-2 px-6 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#843E1F]">Viewing Continuous Full-Page Archive</span>
                <button
                  onClick={() => setViewMode('app')}
                  className="px-3 py-1 bg-[#843E1F] text-white rounded-lg font-semibold text-xs"
                >
                  Switch Back to Easy Tab Mode (Zero Scroll)
                </button>
              </div>

              {/* Farmer Agro-Ecological Voice Advisory Section */}
              <FarmerAdvisorySection />

              {/* Personal Soil Ledger & Community Map */}
              <PersonalJournalAndMap />

              {/* The 8 Core Living Practices Archive */}
              <PracticesArchive onSelectPractice={(practice) => setSelectedPractice(practice)} />

              {/* Agricultural Harvest Cycle & Seasonal Guide */}
              <SeasonalGuide />

              {/* Regional Biodegradable Practices Explorer */}
              <RegionalExplorer />

              {/* Day 1 to Year 500 Interactive Comparative Soil Sandbox */}
              <DecompositionSimulator />

              {/* Practical Transition & Household Impact Calculator */}
              <ImpactCalculator />

              {/* Botanical Herbarium & Phytochemical Matrix */}
              <BotanicalMatrix />

              {/* Vedic Pancha Mahabhuta Cosmology */}
              <PanchaMahabhutas />
            </div>
          )}

        </main>

        {/* Quiet Archival Footer */}
        <Footer />

        {/* Deep Dive Archival Specimen Modal */}
        <PracticeModal 
          practice={selectedPractice} 
          onClose={() => setSelectedPractice(null)} 
        />

        {/* Guided Discovery Quiz */}
        <PracticeFinderQuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          onSelectPractice={(practice) => setSelectedPractice(practice)}
        />
      </div>
    </LanguageProvider>
  );
}

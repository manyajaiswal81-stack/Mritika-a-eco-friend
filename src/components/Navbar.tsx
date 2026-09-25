import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundscape } from '../utils/soundscape';
import { useLanguage } from '../context/LanguageContext';
import { AppTabId } from './AppNavigationTabs';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  onOpenQuiz: () => void;
  onNavigateToTab?: (id: AppTabId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz, onNavigateToTab }) => {
  const { t } = useLanguage();
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const active = soundscape.toggle();
    setIsPlayingSound(active);
  };

  const handleNavClick = (e: React.MouseEvent, id: AppTabId) => {
    if (onNavigateToTab) {
      e.preventDefault();
      onNavigateToTab(id);
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
      scrolled ? 'bg-[#FBF9F5]/95 backdrop-blur-md border-[#E6D8C8] shadow-xs' : 'bg-[#FBF9F5] border-[#EDE2D4]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single Text Element Wordmark */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, 'farmers')}
          className="text-2xl font-serif font-bold tracking-tight text-[#3B2616] hover:text-[#843E1F] transition-colors"
        >
          {t('nav.brand', 'Mrittika')}
        </a>

        {/* Zone 2: 4-6 Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6B5A4E]">
          <a 
            href="#farmer-advisory" 
            onClick={(e) => handleNavClick(e, 'farmers')}
            className="hover:text-[#3B2616] text-[#2D4A3E] font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#2D4A3E] inline-block animate-pulse" />
            <span>{t('nav.forFarmers', 'For Farmers (कृषि)')}</span>
          </a>
          <a 
            href="#personal-journal" 
            onClick={(e) => handleNavClick(e, 'ledger')}
            className="hover:text-[#3B2616] transition-colors whitespace-nowrap"
          >
            {t('nav.soilLedger', 'Soil Ledger & Map')}
          </a>
          <a 
            href="#practices" 
            onClick={(e) => handleNavClick(e, 'practices')}
            className="hover:text-[#3B2616] transition-colors whitespace-nowrap"
          >
            {t('nav.practices', 'Living Practices')}
          </a>
          <a 
            href="#seasonal-guide" 
            onClick={(e) => handleNavClick(e, 'seasonal')}
            className="hover:text-[#3B2616] transition-colors whitespace-nowrap"
          >
            {t('nav.seasonalGuide', 'Seasonal Guide')}
          </a>
          <a 
            href="#regional-explorer" 
            onClick={(e) => handleNavClick(e, 'regional')}
            className="hover:text-[#3B2616] transition-colors whitespace-nowrap"
          >
            {t('nav.byRegion', 'By Region')}
          </a>
          <a 
            href="#impact-calculator" 
            onClick={(e) => handleNavClick(e, 'science')}
            className="hover:text-[#3B2616] transition-colors whitespace-nowrap"
          >
            Soil Lab
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PWAInstallButton variant="nav" />

          <button
            onClick={handleToggleSound}
            aria-label={isPlayingSound ? 'Mute ambient soundscape' : 'Play earthen ambient soundscape'}
            title={isPlayingSound ? 'Mute ambient nature soundscape' : 'Play calming earthen nature soundscape'}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors border ${
              isPlayingSound
                ? 'bg-[#EAE0D2] text-[#843E1F] border-[#D3B197]'
                : 'bg-transparent text-[#6B5A4E] border-[#E0D3C3] hover:bg-[#F2ECE2]'
            }`}
          >
            {isPlayingSound ? (
              <>
                <Volume2 className="w-4 h-4 text-[#843E1F] animate-pulse" />
                <span className="hidden sm:inline">{t('nav.ambienceOn', 'Ambience On')}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#8C7A6D]" />
                <span className="hidden sm:inline">{t('nav.ambience', 'Ambience')}</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#843E1F] rounded-lg hover:bg-[#6B3019] transition-colors whitespace-nowrap shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('nav.discoverQuiz', 'Discover Practice')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};



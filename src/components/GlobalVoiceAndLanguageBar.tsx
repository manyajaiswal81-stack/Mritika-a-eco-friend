import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Languages, Volume2, VolumeX, Sparkles, Radio } from 'lucide-react';

export const GlobalVoiceAndLanguageBar: React.FC = () => {
  const {
    currentLanguage,
    setLanguage,
    languages,
    t,
    isSpeaking,
    speakingSection,
    speakSection,
    stopSpeaking
  } = useLanguage();

  const handleGlobalVoiceToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      // Start reading from the hero or current view
      speakSection('hero');
    }
  };

  return (
    <div className="bg-[#2D2118] text-[#F3ECE2] border-b border-[#433225] py-2 px-4 sm:px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        
        {/* Left Zone: Language Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <div className="flex items-center gap-1.5 font-semibold text-[#D4B598] shrink-0">
            <Languages className="w-3.5 h-3.5 text-[#E6A060]" />
            <span className="hidden sm:inline">Language / भाषा:</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {languages.map((lang) => {
              const isActive = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium text-xs whitespace-nowrap ${
                    isActive
                      ? 'bg-[#843E1F] text-white font-semibold shadow-xs'
                      : 'text-[#C9B9A6] hover:text-white hover:bg-[#3E2F23]'
                  }`}
                  title={`${lang.name} (${lang.nativeName})`}
                >
                  <span>{lang.nativeName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Zone: Global Voice Controller & Sound Wave Indicator */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          
          {/* Active Voice Playing Indicator / Equalizer */}
          {isSpeaking && (
            <div className="flex items-center gap-2 px-2.5 py-1 bg-[#1E1712] border border-[#843E1F]/60 rounded-md text-[#E6A060] animate-pulse">
              <span className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-full bg-[#E6A060] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 h-2/3 bg-[#E6A060] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-full bg-[#E6A060] animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="w-0.5 h-1/2 bg-[#E6A060] animate-bounce" style={{ animationDelay: '75ms' }} />
              </span>
              <span className="text-[11px] font-mono tracking-tight font-medium">
                {currentLanguage === 'hi' ? 'आवाज़ सक्रिय है...' : currentLanguage === 'te' ? 'వాయిస్ ప్లే అవుతోంది...' : currentLanguage === 'ta' ? 'குரல் ஒலிக்கிறது...' : 'Voice Active...'}
              </span>
            </div>
          )}

          {/* Voice Narration Button */}
          <button
            onClick={handleGlobalVoiceToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isSpeaking
                ? 'bg-[#A84523] text-white hover:bg-[#8D381B] ring-2 ring-[#E6A060]/40'
                : 'bg-[#402F23] text-[#F3ECE2] hover:bg-[#523C2C] hover:text-white border border-[#5C4533]'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>{t('nav.stopListening', 'Stop Voice')}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#E6A060]" />
                <span>{t('nav.listen', 'Listen to Page')}</span>
              </>
            )}
          </button>

          {/* Quick link indicator */}
          <a
            href="#farmer-advisory"
            className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#C9B9A6] hover:text-[#E6A060] transition-colors border-l border-[#433225] pl-3"
          >
            <Radio className="w-3 h-3 text-[#2E7D32]" />
            <span>{t('nav.forFarmers', 'For Farmers')}</span>
          </a>

        </div>

      </div>
    </div>
  );
};

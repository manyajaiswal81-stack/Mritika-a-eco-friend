import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, LanguageOption } from '../data/farmerData';
import { APP_TRANSLATIONS, SECTION_AUDIO_SCRIPTS } from '../data/translations';
import { voiceManager } from '../utils/voiceNarration';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: LanguageOption[];
  t: (key: string, fallback?: string) => string;
  isSpeaking: boolean;
  speakingSection: string | null;
  speakSection: (sectionId: string, customText?: string) => void;
  stopSpeaking: () => void;
  speakText: (text: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const PREFERRED_LANGUAGE_STORAGE_KEY = 'mrittika_preferred_lang_v1';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const stored = localStorage.getItem(PREFERRED_LANGUAGE_STORAGE_KEY);
      if (stored && ['en', 'hi', 'te', 'ta', 'bn', 'pa', 'mr'].includes(stored)) {
        return stored as SupportedLanguage;
      }
    } catch {
      // Fallback
    }
    return 'hi'; // Default to Hindi to prominently showcase Indian languages, with full English and regional options
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingSection, setSpeakingSection] = useState<string | null>(null);

  useEffect(() => {
    voiceManager.setCallback((speaking) => {
      setIsSpeaking(speaking);
      if (!speaking) {
        setSpeakingSection(null);
      }
    });

    return () => {
      voiceManager.stop();
    };
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    // If speaking, cancel ongoing utterance before switching language
    if (isSpeaking) {
      voiceManager.stop();
    }
    setCurrentLanguageState(lang);
    try {
      localStorage.setItem(PREFERRED_LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  };

  const t = (key: string, fallback?: string): string => {
    const entry = APP_TRANSLATIONS[key];
    if (entry && entry[currentLanguage]) {
      return entry[currentLanguage];
    }
    if (entry && entry['en']) {
      return entry['en'];
    }
    return fallback || key;
  };

  const speakSection = (sectionId: string, customText?: string) => {
    if (isSpeaking && speakingSection === sectionId) {
      voiceManager.stop();
      setIsSpeaking(false);
      setSpeakingSection(null);
      return;
    }

    let textToSpeak = customText;
    if (!textToSpeak) {
      const scriptGroup = SECTION_AUDIO_SCRIPTS[sectionId];
      if (scriptGroup) {
        textToSpeak = scriptGroup[currentLanguage] || scriptGroup['en'] || scriptGroup['hi'];
      }
    }

    if (!textToSpeak) {
      // Fallback: announce the section title
      textToSpeak = t(`${sectionId}.title`, t(`${sectionId}.badge`, 'Mrittika Section'));
    }

    setSpeakingSection(sectionId);
    voiceManager.speak(textToSpeak, currentLanguage);
  };

  const speakText = (text: string) => {
    setSpeakingSection('custom');
    voiceManager.speak(text, currentLanguage);
  };

  const stopSpeaking = () => {
    voiceManager.stop();
    setIsSpeaking(false);
    setSpeakingSection(null);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        languages: SUPPORTED_LANGUAGES,
        t,
        isSpeaking,
        speakingSection,
        speakSection,
        stopSpeaking,
        speakText
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

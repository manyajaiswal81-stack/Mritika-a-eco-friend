// Voice synthesis audio manager for multi-lingual farmer assistance
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../data/farmerData';

class VoiceNarrationManager {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;
  private onStateChangeCallback: ((speaking: boolean) => void) | null = null;

  public setCallback(cb: (speaking: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public speak(text: string, lang: SupportedLanguage) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    // Stop ongoing speech
    this.stop();

    const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langConfig.speechLangCode;
    utterance.rate = 0.95; // Gentle, clear speed for agricultural advisory
    utterance.pitch = 1.0;

    // Try finding an appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langConfig.code) || v.lang === langConfig.speechLangCode);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onStateChangeCallback) this.onStateChangeCallback(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
    if (this.onStateChangeCallback) this.onStateChangeCallback(false);
  }

  public getSpeakingState(): boolean {
    return this.isSpeaking;
  }
}

export const voiceManager = new VoiceNarrationManager();

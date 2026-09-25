import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, VolumeX } from 'lucide-react';

interface SectionVoiceButtonProps {
  sectionId: string;
  customText?: string;
  className?: string;
}

export const SectionVoiceButton: React.FC<SectionVoiceButtonProps> = ({
  sectionId,
  customText,
  className = ''
}) => {
  const { currentLanguage, isSpeaking, speakingSection, speakSection } = useLanguage();

  const isCurrentSpeaking = isSpeaking && speakingSection === sectionId;

  const getLabel = () => {
    if (isCurrentSpeaking) {
      switch (currentLanguage) {
        case 'hi': return 'आवाज़ रोकें';
        case 'te': return 'ఆపండి';
        case 'ta': return 'நிறுத்து';
        case 'bn': return 'থামান';
        case 'pa': return 'ਰੋਕੋ';
        case 'mr': return 'थांबवा';
        default: return 'Stop Voice';
      }
    }
    switch (currentLanguage) {
      case 'hi': return 'इस भाग को सुनें';
      case 'te': return 'ఈ విభాగం వినండి';
      case 'ta': return 'இதை கேட்கவும்';
      case 'bn': return 'এই অংশ শুনুন';
      case 'pa': return 'ਇਸਨੂੰ ਸੁਣੋ';
      case 'mr': return 'हा भाग ऐका';
      default: return 'Listen to Section';
    }
  };

  return (
    <button
      onClick={() => speakSection(sectionId, customText)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
        isCurrentSpeaking
          ? 'bg-[#843E1F] text-white border-[#843E1F] shadow-xs'
          : 'bg-[#F2ECE2] text-[#6B5A4E] border-[#DECDBB] hover:text-[#24211D] hover:bg-[#EAE0D2]'
      } ${className}`}
      title={isCurrentSpeaking ? 'Stop narration' : 'Listen with voice narration in your selected language'}
    >
      {isCurrentSpeaking ? (
        <>
          <span className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-2/3 bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
          <VolumeX className="w-3.5 h-3.5" />
          <span>{getLabel()}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#843E1F]" />
          <span>{getLabel()}</span>
        </>
      )}
    </button>
  );
};

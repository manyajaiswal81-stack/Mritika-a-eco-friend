import React, { useState } from 'react';
import { 
  FARMER_ADVISORIES, 
  SUPPORTED_LANGUAGES, 
  SupportedLanguage,
  FarmerAdvisory 
} from '../data/farmerData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Volume2, 
  VolumeX, 
  Sprout, 
  ShieldCheck, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  Wheat, 
  Sparkles, 
  Languages 
} from 'lucide-react';

export const FarmerAdvisorySection: React.FC = () => {
  const { currentLanguage, setLanguage, isSpeaking, speakingSection, speakSection, stopSpeaking, t } = useLanguage();
  const [activeAdvisoryId, setActiveAdvisoryId] = useState<string>(FARMER_ADVISORIES[0].id);

  const activeAdvisory = FARMER_ADVISORIES.find(a => a.id === activeAdvisoryId) || FARMER_ADVISORIES[0];

  const handleToggleVoice = (advisory: FarmerAdvisory) => {
    const isThisSpeaking = isSpeaking && speakingSection === `farmer-${advisory.id}`;
    if (isThisSpeaking) {
      stopSpeaking();
    } else {
      const script = advisory.audioNarrationScript[currentLanguage] || advisory.audioNarrationScript['hi'];
      speakSection(`farmer-${advisory.id}`, script);
    }
  };

  const getLanguageLabel = (code: SupportedLanguage) => {
    switch (code) {
      case 'hi': return 'किसान भाइयों और बहनों के लिए प्राकृतिक सलाह';
      case 'te': return 'రైతు సోదరుల కోసం సేంద్రీయ పద్ధతులు మరియు మార్గదర్శకాలు';
      case 'ta': return 'விவசாயிகளுக்கான பாரம்பரிய இயற்கை வேளாண் வழிகாட்டி';
      case 'bn': return 'কৃষক ভাইদের জন্য ঐতিহ্যবাহী পরিবেশবান্ধব কৃষি নির্দেশিকা';
      case 'pa': return 'ਕਿਸਾਨ ਵੀਰਾਂ ਲਈ ਕੁਦਰਤੀ ਖੇਤੀ ਅਤੇ ਪਰਾਲੀ ਪ੍ਰਬੰਧਨ ਸਲਾਹ';
      case 'mr': return 'शेतकरी बांधवांसाठी पारंपरिक नैसर्गिक शेती मार्गदर्शन';
      case 'en':
      default:
        return 'Ancient Agro-Ecological Advisories & Bio-Practices for Indian Farmers';
    }
  };

  return (
    <section id="farmer-advisory" className="py-16 md:py-24 bg-[#FAF5EC] border-b border-[#EDE2D4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header with Multi-lingual indicator */}
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-[#8C7A6D] mb-3">
          <span className="flex items-center gap-1.5 text-[#2D4A3E] font-semibold">
            <Wheat className="w-3.5 h-3.5" />
            Krishi Mitra · Farmer Ecological Advisory
          </span>
          <span aria-hidden="true">·</span>
          <span>Voice Assisted in 7 Indian Languages</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E6D9C8]">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#24211D]">
              Traditional Biodegradable Farm Practices
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
              {getLanguageLabel(currentLanguage)}
            </p>
          </div>

          {/* Language Selector Bar with Audio Indicator */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-[#786657] font-semibold">
              <Languages className="w-4 h-4 text-[#843E1F]" />
              <span>Select Language / भाषा चुनें:</span>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto p-1 bg-[#EFE6D8] rounded-xl border border-[#DECDBB]">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    currentLanguage === lang.code
                      ? 'bg-[#2D4A3E] text-white shadow-xs'
                      : 'text-[#594B40] hover:text-[#24211D] hover:bg-[#E2D6C5]'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advisory Topic Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {FARMER_ADVISORIES.map((advisory) => {
            const isSelected = activeAdvisoryId === advisory.id;
            const isSpeakingThis = isSpeaking && speakingSection === `farmer-${advisory.id}`;

            return (
              <button
                key={advisory.id}
                onClick={() => setActiveAdvisoryId(advisory.id)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#3B2616] text-[#FBF9F5] border-[#3B2616] shadow-sm ring-1 ring-[#3B2616]'
                    : 'bg-[#FBF9F5] text-[#594B40] border-[#DECDBB] hover:bg-[#EAE0D2]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-[#D3B197]' : 'text-[#8C7A6D]'}`}>
                      {advisory.traditionalName.split(' ')[0]}
                    </span>
                    {isSpeakingThis && (
                      <span className="flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#843E1F] text-white animate-pulse">
                        <Volume2 className="w-3 h-3" />
                        VOICE ON
                      </span>
                    )}
                  </div>
                  <div className="font-serif text-sm font-bold line-clamp-2 mt-0.5 leading-snug">
                    {advisory.practiceTitle[currentLanguage]}
                  </div>
                </div>

                <div className={`text-[11px] mt-3 font-medium flex items-center gap-1.5 ${isSelected ? 'text-[#E6D2C2]' : 'text-[#2D4A3E]'}`}>
                  <Coins className="w-3.5 h-3.5" />
                  <span className="truncate">{advisory.costSavingsPerAcre}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Advisory Card with Voice Player */}
        <div className="bg-[#FBF9F5] border-2 border-[#2D4A3E]/30 rounded-2xl p-6 sm:p-10 shadow-xs">
          
          {/* Top Bar: Title & Voice Player Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6D9C8] mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-serif italic text-[#843E1F] bg-[#FAF2EB] px-2.5 py-0.5 rounded border border-[#E8D4C4]">
                  {activeAdvisory.traditionalName}
                </span>
                <span className="text-xs text-[#2D4A3E] font-semibold bg-[#E4EFE8] px-2.5 py-0.5 rounded">
                  {activeAdvisory.costSavingsPerAcre}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#24211D]">
                {activeAdvisory.practiceTitle[currentLanguage]}
              </h3>
              <div className="text-xs text-[#786657] mt-1">
                Season / Timing: <strong>{activeAdvisory.cropOrSeason[currentLanguage]}</strong>
              </div>
            </div>

            {/* Voice Audio Listen Button */}
            <button
              onClick={() => handleToggleVoice(activeAdvisory)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs transition-all shadow-xs self-start sm:self-auto shrink-0 ${
                isSpeaking && speakingSection === `farmer-${activeAdvisory.id}`
                  ? 'bg-[#843E1F] text-white animate-pulse'
                  : 'bg-[#2D4A3E] hover:bg-[#1E332A] text-white'
              }`}
            >
              {isSpeaking && speakingSection === `farmer-${activeAdvisory.id}` ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>आवाज़ रोकें / Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>आवाज़ में सुनें / Listen in {SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)?.nativeName}</span>
                </>
              )}
            </button>
          </div>

          {/* Description narrative */}
          <p className="text-sm sm:text-base text-[#594B40] leading-relaxed mb-8">
            {activeAdvisory.description[currentLanguage]}
          </p>

          {/* Step-by-Step Practical Protocol (Vidhi) */}
          <div className="mb-8">
            <h4 className="text-base font-serif font-bold text-[#24211D] mb-4 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#2D4A3E]" />
              <span>चरणबद्ध विधि / Step-by-Step Farmer Protocol:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeAdvisory.stepByStepProtocol[currentLanguage].map((step, idx) => (
                <div key={idx} className="p-4 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-serif font-bold text-[#843E1F] mb-1.5">
                      कदम 0{idx + 1}
                    </div>
                    <p className="text-xs text-[#4A3D33] leading-relaxed">
                      {step}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] text-[#2D4A3E] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>सरल एवं सुरक्षित</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scientific Soil & Biology Footnote */}
          <div className="p-5 bg-[#EDF4EE] border border-[#CFE0D2] rounded-xl">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#2D4A3E] mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>कृषि विज्ञान एवं मिट्टी का पोषण / Soil Science Validation</span>
            </div>
            <p className="text-xs sm:text-sm text-[#3E5246] leading-relaxed">
              {activeAdvisory.scientificPrinciple[currentLanguage]}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

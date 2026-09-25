import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { PRACTICES_DATA, Practice } from '../data/practicesData';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPractice: (practice: Practice) => void;
}

export const PracticeFinderQuizModal: React.FC<QuizProps> = ({ isOpen, onClose, onSelectPractice }) => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{
    routine?: string;
    setting?: string;
    goal?: string;
  }>({});

  if (!isOpen) return null;

  const handleSelectAnswer = (key: 'routine' | 'setting' | 'goal', value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    setStep(step + 1);
  };

  const getRecommendedPractice = (): Practice => {
    if (answers.routine === 'hygiene') {
      return PRACTICES_DATA.find(p => p.id === 'datun') || PRACTICES_DATA[2];
    }
    if (answers.routine === 'cleansing') {
      return PRACTICES_DATA.find(p => p.id === 'reetha-shikakai') || PRACTICES_DATA[4];
    }
    if (answers.routine === 'dining') {
      if (answers.goal === 'compost') {
        return PRACTICES_DATA.find(p => p.id === 'pattal') || PRACTICES_DATA[1];
      }
      return PRACTICES_DATA.find(p => p.id === 'kulhar') || PRACTICES_DATA[0];
    }
    return PRACTICES_DATA[0];
  };

  const recommendation = step >= 3 ? getRecommendedPractice() : null;

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-title"
        className="relative z-10 w-full max-w-xl bg-[#FBF9F5] border border-[#D9C4B0] rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-[#E6D9C8] pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#843E1F]">
            <Sparkles className="w-4 h-4" />
            <span>Discover Your Ancient Practice</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close practice discovery"
            className="p-1 rounded-lg text-[#6B5A4E] hover:text-[#24211D] hover:bg-[#F2EBE0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 0 && (
          <div>
            <div className="text-xs text-[#8C7A6D] mb-1 uppercase tracking-wider">Question 1 of 3</div>
            <h3 id="quiz-title" className="text-xl sm:text-2xl font-serif font-bold text-[#24211D] mb-5">
              Which area of daily life do you wish to transform into circular zero-waste?
            </h3>
            <div className="space-y-3">
              {[
                { key: 'dining', title: 'Hot Beverages & Banquet Feasting', desc: 'Eliminate polystyrene cups, plastic-lined paper cups, and styrofoam plates.' },
                { key: 'hygiene', title: 'Oral & Dental Care', desc: 'Ditch synthetic petroleum nylon toothbrushes and fluoridated tube paste.' },
                { key: 'cleansing', title: 'Laundry, Bathing & Home Cleansing', desc: 'Replace chemical detergents and synthetic SLS shampoos with natural greywater soaps.' },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectAnswer('routine', opt.key)}
                  className="w-full text-left p-4 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl hover:border-[#843E1F] hover:bg-[#F2EAE0] transition-colors"
                >
                  <div className="font-semibold text-sm text-[#24211D]">{opt.title}</div>
                  <div className="text-xs text-[#6B5A4E] mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="text-xs text-[#8C7A6D] mb-1 uppercase tracking-wider">Question 2 of 3</div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#24211D] mb-5">
              What is your primary living environment?
            </h3>
            <div className="space-y-3">
              {[
                { key: 'apartment', title: 'Urban Apartment or High-Rise', desc: 'No open backyard ground; uses balcony pots or municipal recycling.' },
                { key: 'garden', title: 'Home with Garden or Backyard', desc: 'Direct access to native soil, compost bin, or tree beds.' },
                { key: 'community', title: 'Eco-Community, Campus or Village', desc: 'Shared communal composting and active rural artisan access.' },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectAnswer('setting', opt.key)}
                  className="w-full text-left p-4 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl hover:border-[#843E1F] hover:bg-[#F2EAE0] transition-colors"
                >
                  <div className="font-semibold text-sm text-[#24211D]">{opt.title}</div>
                  <div className="text-xs text-[#6B5A4E] mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="text-xs text-[#8C7A6D] mb-1 uppercase tracking-wider">Question 3 of 3</div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#24211D] mb-5">
              What primary environmental outcome matters most to you right now?
            </h3>
            <div className="space-y-3">
              {[
                { key: 'microplastics', title: 'Zero Microplastic Ingestion', desc: 'Stop consuming hot liquids or dental products that shed polymers into body tissues.' },
                { key: 'compost', title: 'Rapid Humus Soil Reintegration', desc: 'Want artifacts that vanish into fertilizer within 10 to 30 days.' },
                { key: 'greywater', title: 'Clean Waterways & Greywater Safety', desc: 'Protect rivers and aquifers from foaming phosphate chemicals.' },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectAnswer('goal', opt.key)}
                  className="w-full text-left p-4 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl hover:border-[#843E1F] hover:bg-[#F2EAE0] transition-colors"
                >
                  <div className="font-semibold text-sm text-[#24211D]">{opt.title}</div>
                  <div className="text-xs text-[#6B5A4E] mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step >= 3 && recommendation && (
          <div className="space-y-5">
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-[#EAE0D2] text-[#843E1F] mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-[#843E1F]">
                Your Ideal Ancient Living Practice Match
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#24211D] mt-1">
                {recommendation.name} ({recommendation.devanagari})
              </h3>
              <p className="text-xs sm:text-sm text-[#594B40] mt-2 max-w-md mx-auto leading-relaxed">
                {recommendation.tagline}
              </p>
            </div>

            <div className="p-4 bg-[#F5EFE6] border border-[#DECDBB] rounded-xl space-y-2 text-xs text-[#594B40]">
              <div className="flex justify-between border-b border-[#E6D9C8] pb-1.5">
                <span className="font-semibold text-[#3B2616]">Soil Return Window:</span>
                <span className="tabular-nums font-bold text-[#843E1F]">{recommendation.soilReturnDays} days</span>
              </div>
              <div className="flex justify-between border-b border-[#E6D9C8] pb-1.5">
                <span className="font-semibold text-[#3B2616]">Replaces:</span>
                <span>{recommendation.syntheticCounterpart}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#3B2616]">Materials:</span>
                <span>{recommendation.materials.join(', ')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#6B5A4E] bg-[#F5EFE6] hover:bg-[#EAE0D2] rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectPractice(recommendation);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#843E1F] hover:bg-[#6B3019] rounded-lg transition-colors shadow-xs"
              >
                <span>View Full Archival Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

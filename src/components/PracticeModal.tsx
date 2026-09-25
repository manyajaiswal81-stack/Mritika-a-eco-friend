import React, { useEffect } from 'react';
import { Practice } from '../data/practicesData';
import { X, Sprout, AlertTriangle, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface PracticeModalProps {
  practice: Practice | null;
  onClose: () => void;
}

export const PracticeModal: React.FC<PracticeModalProps> = ({ practice, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (practice) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [practice, onClose]);

  if (!practice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FBF9F5] border border-[#D9C4B0] rounded-2xl shadow-2xl flex flex-col"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E6D9C8] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#786657]">
            <span className="font-semibold uppercase tracking-wider text-[#843E1F]">Archival Record</span>
            <span aria-hidden="true">·</span>
            <span>{practice.antiquity}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close archival modal"
            className="p-1.5 rounded-lg text-[#6B5A4E] hover:text-[#24211D] hover:bg-[#F2EBE0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Main Title & Devanagari Banner */}
          <div>
            <div className="text-sm font-serif italic text-[#843E1F] mb-1">
              {practice.devanagari} ({practice.hindiName})
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#24211D]">
              {practice.name}
            </h2>
            <p className="mt-2 text-base text-[#6B5A4E] leading-relaxed">
              {practice.tagline}
            </p>
          </div>

          {/* Media & Key Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-6 rounded-xl overflow-hidden border border-[#E0D1BF]">
              <img
                src={practice.image}
                alt={practice.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover"
              />
              <div className="p-3 bg-[#F5EFE6] text-[11px] text-[#6B5A4E] italic border-t border-[#E0D1BF]">
                Archival specimen photograph · Traditional Indian zero-waste craftsmanship
              </div>
            </div>

            <div className="md:col-span-6 space-y-4">
              {/* Decomposition metric */}
              <div className="p-4 bg-[#F2EBE0] border border-[#DECDBB] rounded-xl flex items-start gap-3">
                <Sprout className="w-5 h-5 text-[#2D4A3E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#2D4A3E]">
                    Natural Soil Breakdown
                  </div>
                  <div className="text-lg font-serif font-bold text-[#24211D]">
                    <span className="tabular-nums">{practice.soilReturnDays}</span> Days to Complete Humus Reintegration
                  </div>
                  <div className="text-xs text-[#6B5A4E] mt-0.5">
                    Dissolves through rain, soil moisture, and native earthworm activity.
                  </div>
                </div>
              </div>

              {/* Synthetic counterpart warning */}
              <div className="p-4 bg-[#F7EFE8] border border-[#E6CEBE] rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#843E1F] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#843E1F]">
                    Displaces Toxic Synthetic
                  </div>
                  <div className="text-sm font-semibold text-[#3B2616]">
                    {practice.syntheticCounterpart}
                  </div>
                  <div className="text-xs text-[#785E49] mt-0.5">
                    Modern plastic equivalent persists for <strong className="tabular-nums">{practice.syntheticLifespan}</strong>, leaching endocrine disruptors and microplastics.
                  </div>
                </div>
              </div>

              {/* Natural Materials & Compounds */}
              <div className="p-4 bg-[#F5EFE6] border border-[#DECDBB] rounded-xl">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#8C7A6D] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Bio-Mineral Constituents</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {practice.keyCompounds.map((comp, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 bg-[#EAE0D2] text-[#4A3D33] rounded">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ancient Textual Citation (Sanskrit Verse) */}
          <div className="p-6 bg-[#F4EDE2] border-l-4 border-[#843E1F] rounded-r-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#843E1F] mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Classical Literary Source · {practice.ancientSource.text}</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl text-[#3B2616] tracking-wide mb-2 leading-relaxed">
              &ldquo;{practice.ancientSource.quote}&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#594B40] leading-relaxed italic">
              Translation: &ldquo;{practice.ancientSource.translation}&rdquo;
            </p>
          </div>

          {/* Full Narrative Description */}
          <div>
            <h3 className="text-xl font-serif font-bold text-[#24211D] mb-2">
              Ecological & Cultural Context
            </h3>
            <p className="text-sm sm:text-base text-[#594B40] leading-relaxed">
              {practice.description}
            </p>
          </div>

          {/* 4-Stage Lifecycle Architecture */}
          <div>
            <h3 className="text-xl font-serif font-bold text-[#24211D] mb-4">
              Circular Soil Lifecycle
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl">
                <div className="text-xs font-serif font-bold text-[#843E1F] mb-1">01 / Harvest</div>
                <div className="text-xs text-[#594B40] leading-relaxed">{practice.lifecycle.harvest}</div>
              </div>
              <div className="p-4 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl">
                <div className="text-xs font-serif font-bold text-[#843E1F] mb-1">02 / Handcrafted Creation</div>
                <div className="text-xs text-[#594B40] leading-relaxed">{practice.lifecycle.creation}</div>
              </div>
              <div className="p-4 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl">
                <div className="text-xs font-serif font-bold text-[#843E1F] mb-1">03 / Active Use</div>
                <div className="text-xs text-[#594B40] leading-relaxed">{practice.lifecycle.use}</div>
              </div>
              <div className="p-4 bg-[#EDF3EE] border border-[#D0DEC8] rounded-xl">
                <div className="text-xs font-serif font-bold text-[#2D4A3E] mb-1">04 / Soil Reintegration</div>
                <div className="text-xs text-[#3E5246] leading-relaxed">{practice.lifecycle.soilReturn}</div>
              </div>
            </div>
          </div>

          {/* Scientific Mechanism */}
          <div className="p-5 bg-[#F7F4EE] border border-[#E2D6C5] rounded-xl">
            <h4 className="text-sm font-serif font-bold text-[#24211D] uppercase tracking-wider mb-2">
              Biochemical Degradation Mechanism
            </h4>
            <p className="text-xs sm:text-sm text-[#594B40] leading-relaxed">
              {practice.scientificMechanism}
            </p>
          </div>

          {/* Concrete Ecological Benefits */}
          <div>
            <h3 className="text-lg font-serif font-bold text-[#24211D] mb-3">
              Ecological Merits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {practice.ecologicalGains.map((gain, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4A3D33] p-3 bg-[#F5EFE6] rounded-lg border border-[#E6D9C8]">
                  <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                  <span>{gain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modern Adoption Callout */}
          <div className="p-5 bg-[#FAF2EB] border border-[#E6D5C2] rounded-xl">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#843E1F] mb-1">
              Contemporary Revival & Global Relevance
            </div>
            <p className="text-xs sm:text-sm text-[#594B40] leading-relaxed">
              {practice.modernAdoption}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#FBF9F5] px-6 py-3 border-t border-[#E6D9C8] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#3B2616] rounded-lg hover:bg-[#24211D] transition-colors"
          >
            Close Record
          </button>
        </div>

      </div>
    </div>
  );
};

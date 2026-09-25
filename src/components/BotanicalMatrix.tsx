import React, { useState } from 'react';
import { BOTANICAL_SPECIMENS } from '../data/practicesData';
import { Leaf, Clock, ShieldCheck, Microscope } from 'lucide-react';

export const BotanicalMatrix: React.FC = () => {
  const [selectedBotanicalIndex, setSelectedBotanicalIndex] = useState<number>(0);
  const activeSpecimen = BOTANICAL_SPECIMENS[selectedBotanicalIndex];

  return (
    <section id="botanical-matrix" className="py-16 md:py-24 bg-[#F5EFE6] border-b border-[#EDE2D4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header */}
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-[#8C7A6D] mb-3">
          <span>05. Botanical Herbarium</span>
          <span aria-hidden="true">·</span>
          <span>Indigenous Plant Kingdom & Phytochemistry</span>
        </div>

        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#24211D]">
            The Botanical Alchemy of Ancient India
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
            Ancient Indians selected specific wild tree canopies and perennial crops whose leaf cuticles, 
            bast fibers, and bitter saponins served high mechanical functions while breaking down in weeks.
          </p>
        </div>

        {/* Botanical Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {BOTANICAL_SPECIMENS.map((specimen, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedBotanicalIndex(idx)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                selectedBotanicalIndex === idx
                  ? 'bg-[#2D4A3E] text-[#FBF9F5] shadow-xs'
                  : 'bg-[#EAE0D2] text-[#594B40] hover:bg-[#DECDBB]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>{specimen.commonName}</span>
            </button>
          ))}
        </div>

        {/* Selected Specimen Deep Dive Card */}
        <div className="bg-[#FBF9F5] border border-[#DECDBB] rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-serif italic text-[#843E1F]">
                {activeSpecimen.sanskritName}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#24211D]">
                {activeSpecimen.commonName} <span className="text-lg font-sans font-normal italic text-[#6B5A4E]">({activeSpecimen.botanicalName})</span>
              </h3>

              <div className="p-4 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl space-y-2 text-xs text-[#594B40]">
                <div className="font-semibold text-[#24211D] flex items-center gap-1.5 text-sm">
                  <Microscope className="w-4 h-4 text-[#843E1F]" />
                  <span>Biodegradable Portion & Use</span>
                </div>
                <p className="leading-relaxed">
                  {activeSpecimen.biodegradablePart}
                </p>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-semibold text-[#24211D]">Active Phytochemicals:</span>
                <p className="text-[#6B5A4E] leading-relaxed">
                  {activeSpecimen.activeBiochemicals}
                </p>
              </div>

              <div className="space-y-1 text-xs pt-2">
                <span className="font-semibold text-[#24211D]">Ecological Keystone Role:</span>
                <p className="text-[#6B5A4E] leading-relaxed">
                  {activeSpecimen.ecologicalRole}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 bg-[#F2F8F4] border border-[#D5E4D8] rounded-xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Decomposition Window</span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#1C3328]">
                  {activeSpecimen.decompositionTime}
                </div>
                <p className="text-xs text-[#3E5246] mt-1 leading-relaxed">
                  Fastest biological cycling: leaves and twigs integrate into native topsoil without industrial composting temperatures.
                </p>
              </div>

              <div className="p-5 bg-[#FAF4EB] border border-[#E9D9C7] rounded-xl text-xs text-[#594B40] space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-[#843E1F]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ayurvedic Classification</span>
                </div>
                <p className="leading-relaxed">
                  Preserved in classical Nighantus (lexicons) as non-toxic, Tridosha-balancing flora supporting human biological homeostasis.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

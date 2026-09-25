import React, { useState } from 'react';
import { PANCHA_MAHABHUTAS } from '../data/practicesData';
import { Globe } from 'lucide-react';

export const PanchaMahabhutas: React.FC = () => {
  const [activeElementIndex, setActiveElementIndex] = useState<number>(0);
  const activeElement = PANCHA_MAHABHUTAS[activeElementIndex];

  return (
    <section id="five-elements" className="py-16 md:py-24 bg-[#FBF9F5] border-b border-[#EDE2D4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header */}
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-[#8C7A6D] mb-3">
          <span>06. Vedic Cosmology</span>
          <span aria-hidden="true">·</span>
          <span>Pancha Mahabhuta (The Five Great Elements)</span>
        </div>

        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#24211D]">
            The Zero-Waste Philosophy of Cosmic Dissolution
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
            In ancient Indian philosophy, waste (*Kachra*) as an eternal non-decomposing entity was an impossibility. 
            All objects were borrowed from one of the five cosmic elements and crafted so they would swiftly return without disrupting the whole.
          </p>
        </div>

        {/* Interactive 5 Elements Segmented Display */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {PANCHA_MAHABHUTAS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveElementIndex(idx)}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeElementIndex === idx
                  ? 'bg-[#3B2616] text-[#FBF9F5] border-[#3B2616] shadow-sm'
                  : 'bg-[#F5EFE6] text-[#594B40] border-[#E6D9C8] hover:bg-[#EAE0D2]'
              }`}
            >
              <div className="text-[10px] uppercase tracking-widest opacity-75">Element 0{idx + 1}</div>
              <div className="font-serif text-base font-bold mt-1 truncate">{item.element.split(' ')[0]}</div>
              <div className="text-xs opacity-85 truncate mt-0.5">{item.principle.split(' ')[0]}</div>
            </button>
          ))}
        </div>

        {/* Active Element Showcase */}
        <div className="bg-[#F5EFE6] border border-[#DECDBB] rounded-2xl p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DECDBB] pb-6 mb-6">
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold text-[#843E1F] mb-1">
                Cosmic Element Manifestation
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#24211D]">
                {activeElement.element}
              </h3>
            </div>
            <div className="px-4 py-2 bg-[#FAF4EB] border border-[#E0D0BF] rounded-lg text-xs font-semibold text-[#843E1F] flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Core Principle: {activeElement.principle}</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#594B40] leading-relaxed mb-6 max-w-4xl">
            {activeElement.description}
          </p>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#8C7A6D] mb-3">
              Living Material Expressions:
            </div>
            <div className="flex flex-wrap gap-2.5">
              {activeElement.examples.map((ex, i) => (
                <div key={i} className="px-3.5 py-1.5 text-xs bg-[#FBF9F5] text-[#3B2616] border border-[#DECDBB] rounded-lg font-medium">
                  {ex}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

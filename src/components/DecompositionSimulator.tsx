import React, { useState, useEffect } from 'react';
import { COMPARATIVE_CYCLES } from '../data/practicesData';
import { Play, Pause, RotateCcw, Sprout, AlertOctagon, CheckCircle, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionVoiceButton } from './SectionVoiceButton';

export const DecompositionSimulator: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPairKey, setSelectedPairKey] = useState<string>('pattalVsStyrofoam');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activePair = COMPARATIVE_CYCLES[selectedPairKey];
  const totalSteps = activePair.steps.length;
  const currentStep = activePair.steps[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalSteps]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const getVisualAncientState = () => {
    switch (currentStepIndex) {
      case 0:
        return {
          title: 'Freshly Crafted & Functional',
          bg: 'bg-[#EAE0D2]',
          badgeText: '100% Intact Botanical/Clay Structure',
          badgeColor: 'text-[#843E1F]',
          humusPercent: 0,
          soilHealth: 'Pure Earth Foundation'
        };
      case 1:
        return {
          title: 'Cellulose Hydration & Softening',
          bg: 'bg-[#DFD3C3]',
          badgeText: 'Fungal Mycelium Colonization Starts',
          badgeColor: 'text-[#6B5A4E]',
          humusPercent: 25,
          soilHealth: 'Native Microbes Feeding'
        };
      case 2:
        return {
          title: 'Rapid Bacterial Hydrolysis',
          bg: 'bg-[#CFBEA8]',
          badgeText: '90% Digested by Earth Organisms',
          badgeColor: 'text-[#2D4A3E]',
          humusPercent: 75,
          soilHealth: 'Rich Nutrient Enrichment'
        };
      case 3:
        return {
          title: 'Complete Humus Synthesis',
          bg: 'bg-[#BFA890]',
          badgeText: '100% Soil Return (Vanished)',
          badgeColor: 'text-[#2D4A3E]',
          humusPercent: 100,
          soilHealth: 'Stimulating New Flora Growth'
        };
      case 4:
      default:
        return {
          title: 'Enduring Ecological Equilibrium',
          bg: 'bg-[#B09880]',
          badgeText: 'Zero Residual Toxicity in Strata',
          badgeColor: 'text-[#2D4A3E]',
          humusPercent: 100,
          soilHealth: 'Unbroken Natural Biosphere'
        };
    }
  };

  const getVisualSyntheticState = () => {
    switch (currentStepIndex) {
      case 0:
        return {
          title: 'Manufactured Polymer Matrix',
          badgeText: 'Chemical Petro-Polymer',
          microplasticCount: '0 ppm (shedding begins)',
          hazardLevel: 'Low Acute / High Latent'
        };
      case 1:
        return {
          title: 'Unchanged Solid Plastic',
          badgeText: '0% Biological Decomposition',
          microplasticCount: '150 particles/cm²',
          hazardLevel: 'Physical Drain Clogging'
        };
      case 2:
        return {
          title: 'UV Photo-Oxidation & Brittling',
          badgeText: 'Fragmentation without Mineralization',
          microplasticCount: '12,500 micro-shards/cm²',
          hazardLevel: 'Ingestion Risk to Fauna'
        };
      case 3:
        return {
          title: 'Deep Soil Sub-surface Migration',
          badgeText: 'Micro & Nano-Plastics in Aquifers',
          microplasticCount: '250,000 nano-particles',
          hazardLevel: 'Endocrine Disruption in Soil'
        };
      case 4:
      default:
        return {
          title: 'Permanent Anthropocene Residue',
          badgeText: 'Resisting 500+ Years Weathering',
          microplasticCount: 'Persistent Hydrocarbon Chains',
          hazardLevel: 'Permanent Geological Fossil Layer'
        };
    }
  };

  const ancientVisual = getVisualAncientState();
  const syntheticVisual = getVisualSyntheticState();

  return (
    <section id="soil-simulator" className="py-16 md:py-24 bg-[#F5EFE6] border-b border-[#EDE2D4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-[#8C7A6D]">
            <span>03. Educational Soil Simulation</span>
            <span aria-hidden="true">·</span>
            <span>{t('simulator.badge', 'Comparative Lifecycle Chamber')}</span>
          </div>

          <SectionVoiceButton sectionId="simulator" />
        </div>

        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#24211D]">
            {t('simulator.title', 'Day 1 to Year 500: The Soil Cycle Test')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
            Witness how ancient Indian biodegradable designs harmonize with earth microbiology 
            compared to the multi-century persistence and toxic microplastic legacy of modern synthetic substitutes.
          </p>
        </div>

        {/* Pair Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7A6D] mr-2">
            Select Specimen Pair:
          </span>
          {[
            { key: 'pattalVsStyrofoam', label: 'Sal Leaf Pattal vs. Styrofoam Plate' },
            { key: 'kulharVsPlastic', label: 'Clay Kulhar vs. Plastic-Coated Cup' },
            { key: 'datunVsToothbrush', label: 'Neem Datun vs. Nylon Toothbrush' },
          ].map((pair) => (
            <button
              key={pair.key}
              onClick={() => {
                setSelectedPairKey(pair.key);
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors border ${
                selectedPairKey === pair.key
                  ? 'bg-[#3B2616] text-[#FBF9F5] border-[#3B2616] shadow-xs'
                  : 'bg-[#FBF9F5] text-[#594B40] border-[#DECDBB] hover:bg-[#EAE0D2]'
              }`}
            >
              {pair.label}
            </button>
          ))}
        </div>

        {/* Timeline Controller Deck */}
        <div className="bg-[#FBF9F5] border border-[#DECDBB] rounded-xl p-5 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#843E1F]">
                Active Time Horizon:
              </span>
              <span className="text-base font-serif font-bold text-[#24211D] px-2.5 py-1 bg-[#F5EFE6] border border-[#E0D0BF] rounded">
                {currentStep.timeframe}
              </span>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#843E1F] text-white rounded-md hover:bg-[#6B3019] transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Auto Step</span>
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6B5A4E] bg-[#F5EFE6] border border-[#DECDBB] rounded-md hover:bg-[#EAE0D2] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Stepper Timeline Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {activePair.steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  setIsPlaying(false);
                }}
                className={`py-2 px-3 text-left rounded-lg border transition-all text-xs ${
                  currentStepIndex === idx
                    ? 'border-[#843E1F] bg-[#FAF2EB] text-[#3B2616] font-semibold ring-1 ring-[#843E1F]'
                    : 'border-[#E6D9C8] bg-[#F5EFE6] text-[#786657] hover:bg-[#EAE0D2]'
                }`}
              >
                <div className="text-[10px] text-[#8C7A6D] uppercase">Stage {idx + 1}</div>
                <div className="truncate font-medium">{step.timeframe.split(' ')[0]} {step.timeframe.split(' ')[1]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Two-Zone Comparative Visual Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Ancient Indian Practice Side (Green / Earth Bio-Harmony) */}
          <div className="bg-[#FAF7F0] border-2 border-[#2D4A3E]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D4A3E]">
                  <Sprout className="w-4 h-4" />
                  <span>Ancient Biodegradable Tradition</span>
                </div>
                <span className="text-xs text-[#2D4A3E] font-medium bg-[#E3EFE7] px-2.5 py-0.5 rounded-full">
                  Zero Residue
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#24211D]">
                {activePair.practiceName}
              </h3>

              {/* Dynamic Soil Transformation Box */}
              <div className="my-6 p-5 rounded-xl border border-[#D5E2D8] bg-[#F2F8F4] flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#2D4A3E] font-semibold mb-2">
                  <span>Humus Formation: <span className="tabular-nums font-bold">{ancientVisual.humusPercent}%</span></span>
                  <span>{ancientVisual.badgeText}</span>
                </div>

                {/* Soil bar indicator */}
                <div className="w-full bg-[#DCE8DF] h-3 rounded-full overflow-hidden mb-4">
                  <div 
                    className="bg-[#2D4A3E] h-full transition-all duration-700 ease-out" 
                    style={{ width: `${ancientVisual.humusPercent}%` }}
                  />
                </div>

                <div className="text-sm font-semibold text-[#1C3328] mb-1">
                  Status: {currentStep.ancientTitle}
                </div>
                <p className="text-xs text-[#3E5246] leading-relaxed">
                  {currentStep.ancientStatus}
                </p>
              </div>

              {/* Subsurface Impact */}
              <div className="p-4 bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl text-xs space-y-1.5">
                <div className="font-semibold text-[#2D4A3E] flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Subsurface Microbiome Impact</span>
                </div>
                <p className="text-[#594B40] leading-relaxed">
                  {currentStep.ancientSoilImpact}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DECDBB] text-[11px] text-[#786657] flex items-center justify-between">
              <span>Ultimate Fate:</span>
              <strong className="text-[#2D4A3E] font-medium">Becomes Soil Mineral Fertilizer</strong>
            </div>
          </div>

          {/* Modern Synthetic Substitute Side (Red / Toxic Plastic Alert) */}
          <div className="bg-[#FAF5F2] border-2 border-[#843E1F]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#843E1F]">
                  <AlertOctagon className="w-4 h-4" />
                  <span>Modern Petrochemical Substitute</span>
                </div>
                <span className="text-xs text-[#843E1F] font-medium bg-[#FCECE4] px-2.5 py-0.5 rounded-full">
                  Hazardous Persistence
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#24211D]">
                {activePair.syntheticName}
              </h3>

              {/* Dynamic Synthetic Transformation Box */}
              <div className="my-6 p-5 rounded-xl border border-[#ECD9CE] bg-[#FCF5F1] flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#843E1F] font-semibold mb-2">
                  <span>Microplastic Shed: <span className="tabular-nums font-bold">{syntheticVisual.microplasticCount}</span></span>
                  <span className="truncate max-w-[180px]">{syntheticVisual.hazardLevel}</span>
                </div>

                {/* Persistence bar indicator */}
                <div className="w-full bg-[#ECD3C6] h-3 rounded-full overflow-hidden mb-4">
                  <div 
                    className="bg-[#A0522D] h-full transition-all duration-700 ease-out" 
                    style={{ width: `${Math.min(100, (currentStepIndex + 1) * 20)}%` }}
                  />
                </div>

                <div className="text-sm font-semibold text-[#4A2413] mb-1">
                  Status: {currentStep.syntheticTitle}
                </div>
                <p className="text-xs text-[#6B3F2B] leading-relaxed">
                  {currentStep.syntheticStatus}
                </p>
              </div>

              {/* Subsurface Contamination */}
              <div className="p-4 bg-[#F7ECE4] border border-[#E9D1C3] rounded-xl text-xs space-y-1.5">
                <div className="font-semibold text-[#843E1F] flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4" />
                  <span>Environmental & Food-Chain Toll</span>
                </div>
                <p className="text-[#6B3F2B] leading-relaxed">
                  {currentStep.syntheticSoilImpact}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DECDBB] text-[11px] text-[#786657] flex items-center justify-between">
              <span>Ultimate Fate:</span>
              <strong className="text-[#843E1F] font-medium">Permanent Nanoplastic Contaminant</strong>
            </div>
          </div>

        </div>

        {/* Scientific Footnote */}
        <div className="mt-8 flex items-start gap-2.5 p-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl text-xs text-[#6B5A4E]">
          <Info className="w-4 h-4 text-[#843E1F] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#3B2616]">Scientific Reference:</strong> In 2023, the Indian Institute of Technology (IIT) and Central Pollution Control Board documented that a single disposable plastic cup discharges 25,000 microplastic fibers into hot tea within 15 minutes. In contrast, fired alluvial clay kulhars provide trace magnesium and iron while returning cleanly to silt under 10mm of rainfall.
          </p>
        </div>

      </div>
    </section>
  );
};

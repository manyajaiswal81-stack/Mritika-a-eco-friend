import React, { useState } from 'react';
import { Sprout, Trash2, Droplets, Leaf, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionVoiceButton } from './SectionVoiceButton';

export const ImpactCalculator: React.FC = () => {
  const { t } = useLanguage();
  // User slider inputs
  const [cupsPerWeek, setCupsPerWeek] = useState<number>(7);
  const [plattersPerYear, setPlattersPerYear] = useState<number>(60);
  const [brushesPerYear, setBrushesPerYear] = useState<number>(4);
  const [laundryLoadsPerMonth, setLaundryLoadsPerMonth] = useState<number>(12);
  const [activeRecipe, setActiveRecipe] = useState<'reetha' | 'datun' | 'kulhar'>('reetha');

  // Annual impact math
  const annualCups = cupsPerWeek * 52;
  const annualPlatters = plattersPerYear;
  const annualBrushes = brushesPerYear;
  const annualLoads = laundryLoadsPerMonth * 12;

  // Total plastic items avoided
  const totalPlasticItemsAvoided = annualCups + annualPlatters + annualBrushes;
  
  // Microplastic particles prevented from waterways (~25,000 per cup + ~700,000 per synthetic wash)
  const microplasticsPreventedMillions = ((annualCups * 25000 + annualLoads * 250000) / 1000000).toFixed(1);

  // Organic compost returned to earth (approx kg)
  const organicHumusKg = ((annualCups * 0.08) + (annualPlatters * 0.05) + (annualBrushes * 0.02) + (annualLoads * 0.03)).toFixed(1);

  // Carbon emission reduction (kg CO2e)
  const carbonSavedKg = (annualCups * 0.04 + annualPlatters * 0.12 + annualBrushes * 0.08 + annualLoads * 0.25).toFixed(1);

  return (
    <section id="impact-calculator" className="py-16 md:py-24 bg-[#FBF9F5] border-b border-[#EDE2D4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-[#8C7A6D]">
            <span>04. Practical Transition</span>
            <span aria-hidden="true">·</span>
            <span>{t('calc.badge', 'Household Environmental Swap Calculator')}</span>
          </div>

          <SectionVoiceButton sectionId="calculator" />
        </div>

        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#24211D]">
            {t('calc.title', 'Calculate Your Soil Return: Ancient Wisdom in Modern Life')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
            What happens when an individual or family replaces synthetic disposables with classical Indian biodegradable materials? 
            Adjust your weekly routine below to measure the plastic diverted and living soil created.
          </p>
        </div>

        {/* 2-Column Layout: Sliders on Left, Impact Dashboard on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Controls Deck (Left 6 Cols) */}
          <div className="lg:col-span-6 bg-[#F5EFE6] border border-[#E6D9C8] rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#24211D] border-b border-[#DECDBB] pb-3">
              Your Daily Lifestyle Baseline
            </h3>

            {/* Slider 1: Cups */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#3B2616] mb-2">
                <span>Chai / Coffee Cups (Weekly):</span>
                <span className="font-serif text-lg font-bold text-[#843E1F] tabular-nums">
                  {cupsPerWeek} cups
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={cupsPerWeek}
                onChange={(e) => setCupsPerWeek(Number(e.target.value))}
                className="w-full accent-[#843E1F] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C7A6D] mt-1">
                <span>0 (None)</span>
                <span>Swap with Earthen Kulhar</span>
                <span>35 (5/day)</span>
              </div>
            </div>

            {/* Slider 2: Platters */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#3B2616] mb-2">
                <span>Party / Festive Platters (Annual):</span>
                <span className="font-serif text-lg font-bold text-[#843E1F] tabular-nums">
                  {plattersPerYear} plates
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                step="10"
                value={plattersPerYear}
                onChange={(e) => setPlattersPerYear(Number(e.target.value))}
                className="w-full accent-[#843E1F] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C7A6D] mt-1">
                <span>0</span>
                <span>Swap with Sal/Palash Pattals</span>
                <span>300 plates</span>
              </div>
            </div>

            {/* Slider 3: Toothbrushes */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#3B2616] mb-2">
                <span>Toothbrushes Replaced (Annual):</span>
                <span className="font-serif text-lg font-bold text-[#843E1F] tabular-nums">
                  {brushesPerYear} brushes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={brushesPerYear}
                onChange={(e) => setBrushesPerYear(Number(e.target.value))}
                className="w-full accent-[#843E1F] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C7A6D] mt-1">
                <span>0</span>
                <span>Swap with Neem Datun Twigs</span>
                <span>12/year</span>
              </div>
            </div>

            {/* Slider 4: Laundry Loads */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#3B2616] mb-2">
                <span>Laundry Loads per Month:</span>
                <span className="font-serif text-lg font-bold text-[#843E1F] tabular-nums">
                  {laundryLoadsPerMonth} loads
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="2"
                value={laundryLoadsPerMonth}
                onChange={(e) => setLaundryLoadsPerMonth(Number(e.target.value))}
                className="w-full accent-[#843E1F] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C7A6D] mt-1">
                <span>0</span>
                <span>Swap with Reetha Soapberry Liquid</span>
                <span>30 loads</span>
              </div>
            </div>

          </div>

          {/* Results Scoreboard (Right 6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="bg-[#FAF4EB] border-2 border-[#843E1F]/20 rounded-2xl p-6 sm:p-8">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#843E1F]">
                Annual Ecological Balance Sheet
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#24211D] mt-1 mb-6">
                Your Cumulative Annual Living Dividends
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Metric 1 */}
                <div className="p-4 bg-[#FBF9F5] border border-[#E6D9C8] rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#843E1F] mb-1">
                    <Trash2 className="w-4 h-4" />
                    <span>Plastic Disposables Diverted</span>
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#24211D] tabular-nums">
                    {totalPlasticItemsAvoided.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[#786657] mt-0.5">
                    Items kept permanently out of landfills & oceans.
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-4 bg-[#FBF9F5] border border-[#E6D9C8] rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2D4A3E] mb-1">
                    <Droplets className="w-4 h-4" />
                    <span>Microplastics Stopped</span>
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#2D4A3E] tabular-nums">
                    {microplasticsPreventedMillions}M
                  </div>
                  <div className="text-[11px] text-[#786657] mt-0.5">
                    Micro-shards prevented from entering human drinking water.
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-4 bg-[#FBF9F5] border border-[#E6D9C8] rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2D4A3E] mb-1">
                    <Sprout className="w-4 h-4" />
                    <span>Fertile Humus Returned</span>
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#24211D] tabular-nums">
                    {organicHumusKg} kg
                  </div>
                  <div className="text-[11px] text-[#786657] mt-0.5">
                    Organic cellulose and terracotta minerals nourishing gardens.
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-4 bg-[#FBF9F5] border border-[#E6D9C8] rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#843E1F] mb-1">
                    <Leaf className="w-4 h-4" />
                    <span>Carbon Footprint Reduced</span>
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#24211D] tabular-nums">
                    {carbonSavedKg} kg
                  </div>
                  <div className="text-[11px] text-[#786657] mt-0.5">
                    CO₂e averted from fossil polymer manufacturing.
                  </div>
                </div>
              </div>

              {/* Artisan direct support notice */}
              <div className="mt-6 p-4 bg-[#F3EAE0] border border-[#DEC8B2] rounded-xl text-xs text-[#594B40] flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#843E1F] shrink-0 mt-0.5" />
                <span>
                  <strong>Social Economy Impact:</strong> By choosing earthen Kulhars and Pattals, you directly channel rural revenues to India’s traditional potters (Kumhars) and forest leaf gatherers instead of multinational petrochemical corporations.
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Vernacular DIY Recipes & Transition Handbook */}
        <div className="bg-[#F5EFE6] border border-[#DECDBB] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#843E1F] mb-2">
            <span>Practical Home Recipes</span>
            <span aria-hidden="true">·</span>
            <span>How to Practice Zero-Waste at Home</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#24211D] mb-6">
            Simple Step-by-Step Vernacular Recipes
          </h3>

          <div className="flex gap-2 border-b border-[#DECDBB] pb-3 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveRecipe('reetha')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeRecipe === 'reetha'
                  ? 'bg-[#843E1F] text-white'
                  : 'text-[#6B5A4E] hover:text-[#24211D] hover:bg-[#EAE0D2]'
              }`}
            >
              Recipe 1: Reetha Liquid Laundry
            </button>
            <button
              onClick={() => setActiveRecipe('datun')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeRecipe === 'datun'
                  ? 'bg-[#843E1F] text-white'
                  : 'text-[#6B5A4E] hover:text-[#24211D] hover:bg-[#EAE0D2]'
              }`}
            >
              Recipe 2: Neem Datun Oral Routine
            </button>
            <button
              onClick={() => setActiveRecipe('kulhar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeRecipe === 'kulhar'
                  ? 'bg-[#843E1F] text-white'
                  : 'text-[#6B5A4E] hover:text-[#24211D] hover:bg-[#EAE0D2]'
              }`}
            >
              Recipe 3: Terracotta Garden Cycle
            </button>
          </div>

          {/* Active Recipe Display */}
          {activeRecipe === 'reetha' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#594B40]">
              <div className="p-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl space-y-2">
                <div className="font-bold text-sm text-[#24211D] flex items-center gap-1.5">
                  <span className="text-[#843E1F] font-serif">1.</span> Ingredients
                </div>
                <p>10-12 deseeded Reetha (soapnut) shells, 1 liter of fresh water, optional 2-3 dried Amla pods for natural shine and low pH.</p>
              </div>
              <div className="p-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl space-y-2">
                <div className="font-bold text-sm text-[#24211D] flex items-center gap-1.5">
                  <span className="text-[#843E1F] font-serif">2.</span> Simmer & Foam
                </div>
                <p>Boil the shells in water for 20 minutes on medium heat. Allow to cool overnight, then crush the soft shells with your hands to release natural saponin froth.</p>
              </div>
              <div className="p-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl space-y-2">
                <div className="font-bold text-sm text-[#24211D] flex items-center gap-1.5">
                  <span className="text-[#843E1F] font-serif">3.</span> Washing & Greywater
                </div>
                <p>Strain the golden liquid into a jar. Use 50ml per washing machine load. The wastewater is 100% safe to irrigate garden flowers and herbs directly!</p>
              </div>
            </div>
          )}

          {activeRecipe === 'datun' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#594B40]">
              <div className="p-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl space-y-2">
                <div className="font-bold text-sm text-[#24211D] flex items-center gap-1.5">
                  <span className="text-[#843E1F] font-serif">1.</span> Sourcing the Twig
                </div>
                <p>Cut a 15cm fresh green twig of Neem (Azadirachta indica) or Babool, about pencil thickness, from a clean tree canopy away from busy highways.</p>
              </div>
              <div className="p-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl space-y-2">
                <div className="font-bold text-sm text-[#24211D] flex items-center gap-1.5">
                  <span className="text-[#843E1F] font-serif">2.</span> Chewing the Bristles
                </div>
                <p>Gently chew the top 1.5cm with your molars for 60 seconds until soft brush-like fibrous bristles unfurl. Brush teeth and massage gums smoothly.</p>
              </div>
              <div className="p-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl space-y-2">
                <div className="font-bold text-sm text-[#24211D] flex items-center gap-1.5">
                  <span className="text-[#843E1F] font-serif">3.</span> Tongue Scrape & Compost
                </div>
                <p>Split the twig in half longitudinally to use the inner curve as an Ayurvedic tongue scraper. Toss the spent twig into your house plant soil.</p>
              </div>
            </div>
          )}

          {activeRecipe === 'kulhar' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#594B40]">
              <div className="p-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl space-y-2">
                <div className="font-bold text-sm text-[#24211D] flex items-center gap-1.5">
                  <span className="text-[#843E1F] font-serif">1.</span> Savoring the Chai
                </div>
                <p>Pour boiling hot tea or lassi into an unglazed fired clay kulhar. Experience the rich earthy petrichor aroma while enjoying alkaline pH buffering.</p>
              </div>
              <div className="p-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl space-y-2">
                <div className="font-bold text-sm text-[#24211D] flex items-center gap-1.5">
                  <span className="text-[#843E1F] font-serif">2.</span> Crushing for Soil
                </div>
                <p>After use, place the cup inside a cloth bag and tap lightly with a small stone or hammer into 1-2cm pebble-sized shards.</p>
              </div>
              <div className="p-4 bg-[#FBF9F5] border border-[#DECDBB] rounded-xl space-y-2">
                <div className="font-bold text-sm text-[#24211D] flex items-center gap-1.5">
                  <span className="text-[#843E1F] font-serif">3.</span> Planter Bed Drainage
                </div>
                <p>Line the base of potted plants with terracotta pieces. They provide excellent aeration, retain moisture, and slowly weather into mineral-rich earth.</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { X, Plus, Sparkles, Sprout, MapPin, CheckCircle } from 'lucide-react';
import { RegionalPractice, RegionInfo, REGIONS_DATA } from '../data/regionalData';

interface ContributePracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPractice: (newPractice: RegionalPractice) => void;
  defaultRegionId?: RegionInfo['id'];
}

export const ContributePracticeModal: React.FC<ContributePracticeModalProps> = ({
  isOpen,
  onClose,
  onAddPractice,
  defaultRegionId = 'north'
}) => {
  const [regionId, setRegionId] = useState<RegionInfo['id']>(defaultRegionId);
  const [name, setName] = useState('');
  const [localName, setLocalName] = useState('');
  const [script, setScript] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState<RegionalPractice['category']>('dining');
  const [material, setMaterial] = useState('');
  const [lifespan, setLifespan] = useState('Single-use banquet');
  const [degradeDays, setDegradeDays] = useState<number>(14);
  const [highlight, setHighlight] = useState('');
  const [description, setDescription] = useState('');
  const [botanicalOrEarthenSource, setBotanicalOrEarthenSource] = useState('');
  const [traditionalCommunities, setTraditionalCommunities] = useState('');
  const [modernRevivalStatus, setModernRevivalStatus] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !state.trim() || !material.trim() || !description.trim()) {
      return;
    }

    const newPractice: RegionalPractice = {
      id: `user-practice-${Date.now()}`,
      name: name.trim(),
      localName: localName.trim() || name.trim(),
      script: script.trim() || name.trim(),
      state: state.trim(),
      regionId,
      material: material.trim(),
      category,
      lifespan: lifespan.trim() || 'Single-use / Seasonal',
      degradeDays: Number(degradeDays) || 14,
      highlight: highlight.trim() || 'Traditional local biodegradable material dissolving naturally into topsoil.',
      description: description.trim(),
      botanicalOrEarthenSource: botanicalOrEarthenSource.trim() || material.trim(),
      traditionalCommunities: traditionalCommunities.trim() || 'Local rural artisans and indigenous communities',
      modernRevivalStatus: modernRevivalStatus.trim() || 'Preserved through community heritage and grassroots adoption.'
    };

    onAddPractice(newPractice);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  const selectedRegion = REGIONS_DATA.find(r => r.id === regionId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="contribute-modal-title"
        className="relative z-10 w-full max-w-2xl bg-[#FBF9F5] border border-[#D9C4B0] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
      >
        {submitted ? (
          <div className="text-center py-12 space-y-3">
            <div className="inline-flex p-3 rounded-full bg-[#E4EFE8] text-[#2D4A3E]">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#24211D]">
              Archival Entry Added!
            </h3>
            <p className="text-xs sm:text-sm text-[#594B40] max-w-md mx-auto">
              Your regional biodegradable practice has been integrated into the live community archive for {selectedRegion?.name}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E6D9C8] pb-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#843E1F]">
                  <Sparkles className="w-4 h-4" />
                  <span>Citizen Heritage Contribution</span>
                </div>
                <h3 id="contribute-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-[#24211D] mt-1">
                  Add a Biodegradable Practice from Your Region
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close contribute form"
                className="p-1 rounded-lg text-[#6B5A4E] hover:text-[#24211D] hover:bg-[#F2EBE0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#6B5A4E] leading-relaxed">
              Help preserve India&apos;s living ecological heritage. If your town, village, or state uses a traditional 
              leaf, clay vessel, natural fiber cordage, or herbal cleaner that returns to the soil, document it here.
            </p>

            {/* Field Grid 1: Region & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  Geographic Indian Region *
                </label>
                <select
                  value={regionId}
                  onChange={(e) => setRegionId(e.target.value as RegionInfo['id'])}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                  required
                >
                  {REGIONS_DATA.map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.hindiName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  State / District / Territory *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kerala, Assam, Bihar, Rajasthan"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                  required
                />
              </div>
            </div>

            {/* Field Grid 2: Practice Name & Vernacular Name */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  Practice or Artifact Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sial Leaf Dona, Bellam Pot Cooler, Khajoor Mat"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  Local Vernacular Script
                </label>
                <input
                  type="text"
                  placeholder="e.g. സിയാൽ, সিয়াল, दोना"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                />
              </div>
            </div>

            {/* Field Grid 3: Raw Natural Material & Decomposition */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  Primary Botanical / Earthen Material *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wild date palm fronds, River clay, Palash leaves"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  Soil Return Days *
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={degradeDays}
                  onChange={(e) => setDegradeDays(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                  required
                />
              </div>
            </div>

            {/* Field 4: Description */}
            <div>
              <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                How is it crafted, used, and returned to the soil? *
              </label>
              <textarea
                rows={3}
                placeholder="Describe how your community harvests or shapes the material, what modern plastic or chemical it replaces, and how rain or soil bacteria dissolves it..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F] resize-none"
                required
              />
            </div>

            {/* Field Grid 5: Traditional Community & Modern Revival */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  Artisan / Tribal / Farming Community
                </label>
                <input
                  type="text"
                  placeholder="e.g. Local Kumhar potters, Santhal women, Gond farmers"
                  value={traditionalCommunities}
                  onChange={(e) => setTraditionalCommunities(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2616] mb-1">
                  Ecological / Cultural Punchline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wicks hot tea acid and breaks into garden soil in 3 weeks"
                  value={highlight}
                  onChange={(e) => setHighlight(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#D9C8B5] rounded-lg focus:outline-none focus:border-[#843E1F]"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#E6D9C8] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#6B5A4E] hover:text-[#24211D] bg-[#F5EFE6] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#843E1F] hover:bg-[#6B3019] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Save to Regional Archive</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

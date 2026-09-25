export interface Practice {
  id: string;
  name: string;
  hindiName: string;
  devanagari: string;
  tagline: string;
  category: 'dining' | 'hygiene' | 'architecture' | 'textiles' | 'storage';
  antiquity: string;
  era: string;
  lifespan: string;
  soilReturnDays: number;
  syntheticCounterpart: string;
  syntheticLifespan: string;
  materials: string[];
  keyCompounds: string[];
  image: string;
  imageAlt: string;
  description: string;
  ancientSource: {
    text: string;
    quote: string;
    translation: string;
  };
  lifecycle: {
    harvest: string;
    creation: string;
    use: string;
    soilReturn: string;
  };
  ecologicalGains: string[];
  scientificMechanism: string;
  modernAdoption: string;
}

export const PRACTICES_DATA: Practice[] = [
  {
    id: 'kulhar',
    name: 'Kulhar (Mitti ke Bartan)',
    hindiName: 'Kulhar',
    devanagari: 'कुल्हड़',
    tagline: 'Unglazed alluvial clay vessels returning to river silt in rain',
    category: 'dining',
    antiquity: 'Indus Valley Civilization (~2500 BCE)',
    era: 'Harappan to Contemporary India',
    lifespan: 'Single-use / Multi-use porous ware',
    soilReturnDays: 30,
    syntheticCounterpart: 'Polystyrene & Wax-coated Plastic Cups',
    syntheticLifespan: '450+ Years',
    materials: ['Riverbed Alluvial Silt', 'Water', 'Kiln Firewood / Cowdung Cakes'],
    keyCompounds: ['Montmorillonite', 'Silica (SiO₂)', 'Iron Oxide (Fe₂O₃)', 'Alumina (Al₂O₃)'],
    image: '/src/assets/images/kulhar_terracotta_craft_1790313432378.jpg',
    imageAlt: 'Authentic Indian unglazed terracotta kulhar tea cups on river clay',
    description: 'The Kulhar is a millennia-old unglazed terracotta cup. Poured with hot masala chai, fresh malai lassi, or water, it infuses drinks with an incomparable earthy aroma (mitti ki khushboo or petrichor). Once finished, it is tossed onto the ground or railway track beds where rain and footfall crush it back into neutral, fertile soil without releasing a single microplastic molecule.',
    ancientSource: {
      text: 'Charaka Samhita (Sutra Sthana, Ch. 27)',
      quote: 'मृद्भाण्डेषु यत्तोयं शीतममलं रुच्यम्',
      translation: 'Water stored or served in unglazed earthen clay vessels becomes naturally cooling, pristine, free of toxicity, and agreeable to digestion.'
    },
    lifecycle: {
      harvest: 'Local potters excavate seasonal silt from riverbanks and lakes without mineral depletion.',
      creation: 'Shaped by hand upon the wooden wheel (Chak) and baked in open wood-and-husk community kilns (Aava).',
      use: 'Naturally hygienic single-use serving vessel; unglazed porous surface naturally wicks acidity from hot liquids.',
      soilReturn: 'When discarded, exposure to moisture dissolves the baked clay matrix back into harmless silt within 20 to 45 days.'
    },
    ecologicalGains: [
      '100% free of bisphenol-A (BPA), phthalates, and microplastic shedding',
      'Provides direct livelihood for over 2 million traditional rural potters (Kumhars)',
      'Natural alkaline chemistry neutralizes excessive tannic acid in hot tea',
      'Reenriches topsoil with trace iron, calcium, and magnesium upon breakdown'
    ],
    scientificMechanism: 'Unlike vitrified porcelain or plastic, unglazed terracotta possesses an open microporous capillary network. This wicks volatile acidity, creates evaporative cooling, and rapidly breaks down under natural weathering via physical friability and hydration.',
    modernAdoption: 'Re-mandated by the Ministry of Railways across 400+ major Indian railway stations to eliminate billions of single-use plastic cups annually.'
  },
  {
    id: 'pattal',
    name: 'Pattal & Dona Leaf Tableware',
    hindiName: 'Pattal - Dona',
    devanagari: 'पत्तल एवं दोना',
    tagline: 'Artisanal dining platters stitched from broad forest leaves',
    category: 'dining',
    antiquity: 'Vedic Period (~1500 BCE)',
    era: 'Ancient India to Contemporary Festive Banquets',
    lifespan: 'Single banquet meal',
    soilReturnDays: 14,
    syntheticCounterpart: 'Single-Use Styrofoam & Polypropylene Plates',
    syntheticLifespan: '500+ Years (Leaches Styrene)',
    materials: ['Sal (Shorea robusta) leaves', 'Palash (Butea monosperma) leaves', 'Bamboo or dried grass splints'],
    keyCompounds: ['Polyphenols', 'Lignin', 'Cellulose', 'Tannins with antimicrobial properties'],
    image: '/src/assets/images/pattal_leaf_plate_1790313443669.jpg',
    imageAlt: 'Hand-stitched Sal leaf dining plate (pattal) with organic vein patterns',
    description: 'Pattal (flat plates) and Dona (deep bowls) are hand-stitched from freshly shed or pruned broad leaves of the Sal tree, Palash (Flame of the Forest), Banyan, or Banana. Fastened with tiny dried bamboo or grass splints (Thinka), these plates have anchored communal feasts (Pangat & Bhandara) for centuries. Leftovers and plates are eaten directly by roaming cows and goats, or decompose into nutrient-rich compost in less than three weeks.',
    ancientSource: {
      text: 'Bhavaprakasha Nighantu (Pushpa Varga)',
      quote: 'पलाशपत्रे भुञ्जीत विषदोषविनाशनम्',
      translation: 'Consuming warm food on fresh Palash leaves neutralizes ingested toxins, stimulates digestive fire, and preserves natural appetite.'
    },
    lifecycle: {
      harvest: 'Fallen or sustainably collected mature leaves gathered by tribal forest communities without felling trees.',
      creation: 'Interlocked radially using miniature bamboo splints and pressed in natural mechanical dies without chemical adhesives.',
      use: 'Warm food activates natural leaf polyphenols and pleasant forest aromatics while remaining leak-proof.',
      soilReturn: 'Readily consumed by cattle as healthy roughage or degraded by soil saprophytic fungi within 10 to 18 days.'
    },
    ecologicalGains: [
      'Replaces non-recyclable grease-soaked styrofoam that chokes storm drains and oceans',
      'Provides sustainable green revenue for indigenous and forest-dwelling communities in Central and Eastern India',
      'Completely compostable in backyard gardens without industrial high-heat composting facilities',
      'Zero chemical glues, bleaching agents, or PFAS coating'
    ],
    scientificMechanism: 'Leaves contain natural wax cuticles (hydrophobic fatty acid esters) that resist hot dal, rice, and curries without soggy breakdown during eating, while natural cellulolytic bacteria in moist soil digest the leaf cellulose rapidly.',
    modernAdoption: 'Modern sustainable catering collectives are adopting molded Sal and Areca nut leaf plates for weddings and campus dining globally.'
  },
  {
    id: 'datun',
    name: 'Datun Herbal Oral Twigs',
    hindiName: 'Datun',
    devanagari: 'दातुन',
    tagline: 'Fresh medicinal branch bristles with zero plastic waste',
    category: 'hygiene',
    antiquity: 'Sushruta Samhita & Vedic Era (~1000 BCE)',
    era: 'Ayurvedic Antiquity to Rural Daily Routine',
    lifespan: 'Single-use morning routine',
    soilReturnDays: 7,
    syntheticCounterpart: 'Plastic Nylon Toothbrushes & Laminated Toothpaste Tubes',
    syntheticLifespan: '500+ Years (3.5 billion dumped annually worldwide)',
    materials: ['Neem (Azadirachta indica) twigs', 'Babool (Acacia nilotica) twigs', 'Karanja (Millettia pinnata)'],
    keyCompounds: ['Azadirachtin', 'Nimbin', 'Tannins', 'Fluoride bio-complexes', 'Alkaloids'],
    image: '/src/assets/images/datun_neem_twigs_1790313454635.jpg',
    imageAlt: 'Fresh green neem datun twigs tied with rustic jute twine',
    description: 'Before petroleum molded nylon bristles, ancient Indians cleaned their teeth with fresh, pencil-thick twigs of Neem, Babool, or Karanja. The tip is chewed until natural plant fibers separate into fine, soft bristles. As you brush, natural bitter alkaloids and antimicrobial sap are released directly into the gums, killing periodontal bacteria. The twig is split to serve as a tongue scraper and discarded back onto the soil where it nourishes earthworms.',
    ancientSource: {
      text: 'Sushruta Samhita (Chikitsa Sthana, Ch. 24)',
      quote: 'निम्बश्च तिक्तके श्रेष्ठः कषाये खदिरस्तथा',
      translation: 'For cleansing teeth, Neem is foremost among bitter botanicals, and Khadira foremost among astringents to tighten gums and dispel oral disease.'
    },
    lifecycle: {
      harvest: 'Pruned sustainably from mature village Neem and Babool canopies, stimulating tree vegetative growth.',
      creation: 'Trimmed to 15-20cm lengths; needs zero processing, packaging, energy, or chemical synthesis.',
      use: 'Chewed at one end to unfurl soft mechanical bristles; releases natural antiseptic bitters and oral cleansers.',
      soilReturn: 'Completely biodegradable plant cellulose returning nitrogen, carbon, and bitter insect-deterrent bio-compounds to garden soil.'
    },
    ecologicalGains: [
      'Eliminates petroleum-based nylon toothbrushes that cannot be mechanically recycled',
      'Zero synthetic micro-beads or sodium lauryl sulfate (SLS) washing into water tables',
      'Naturally antiseptic without chemical preservatives or artificial sweeteners',
      'Completely circular: pruned from living trees, returned directly beneath the same canopy'
    ],
    scientificMechanism: 'Chewing activates salivary enzymes while mechanical chewing releases neem tannins, nimbin, and nimbinin which destroy Streptococcus mutans biofilms. The frayed xylem fibers provide ideal abrasive stiffness to dislodge plaque without eroding enamel.',
    modernAdoption: 'Inspiration behind modern compostable bamboo toothbrushes, zero-waste neem dental chews, and certified Ayurvedic oral powders.'
  },
  {
    id: 'gobar-lepan',
    name: 'Lippan & Gobar Lepan (Cow Dung & Mud Plaster)',
    hindiName: 'Lippan & Gobar Lepan',
    devanagari: 'गोबर लेपन एवं लिप्पण',
    tagline: 'Thermal earthen bio-insulation that breathes with the seasons',
    category: 'architecture',
    antiquity: 'Neolithic Indian Settlements & Indus Valley (~3000 BCE)',
    era: 'Vernacular Architecture to Kutch Desert Living Heritage',
    lifespan: 'Seasonal re-coating / 6-12 months',
    soilReturnDays: 45,
    syntheticCounterpart: 'VOC Chemical Paints, Cement Plasters & Vinyl Flooring',
    syntheticLifespan: 'Non-biodegradable persistent landfill waste',
    materials: ['Fermented cow dung', 'Alluvial clay soil', 'Rice husk / wheat chaff', 'Slaked lime (Chuna)'],
    keyCompounds: ['Cellulose fibers', 'Silica from husk', 'Lignin', 'Beneficial Bacillus bacteria'],
    image: '/src/assets/images/hero_ancient_biodegradable_1790313418657.jpg',
    imageAlt: 'Ancient Indian earthen biodegradable materials and vernacular earthen textures',
    description: 'In traditional Indian courtyard houses, huts, and Kutch bhungas, walls and floors are plastered with an emulsified paste of cow dung, clay, and husk called Gobar Lepan or Lippan Kaam. Far from unhygienic, cow dung from grass-fed cattle contains rich fibrous cellulose and benign microflora that repels mosquitoes, termites, and scorpions while keeping interior temperatures 6°C cooler during blistering 45°C summers.',
    ancientSource: {
      text: 'Brihat Samhita of Varahamihira (Vastu Vidya)',
      quote: 'गोमयेन प्रलेपोऽत्र सर्वपापोपशान्तिदः',
      translation: 'Plastering living spaces with bovine earth mixture pacifies foul pestilence, purifies ambient air, and creates peaceful thermal harmony.'
    },
    lifecycle: {
      harvest: 'Byproduct of pastoral grazing collected daily from cattle stables without industrial processing.',
      creation: 'Blended with fine river silt clay, sieved rice husk for tensile strength, and water to form a smooth workable mortar.',
      use: 'Applied with bare hands or cotton rags onto mud walls and floors; dries to a smooth, odorless, earthy green-tan finish.',
      soilReturn: 'When scraped or weathered by monsoons, it melts straight into the surrounding courtyard soil as organic fertilizer.'
    },
    ecologicalGains: [
      'Zero Volatile Organic Compounds (VOCs) that cause sick building syndrome',
      'Acts as a passive thermal envelope reducing need for energy-guzzling air conditioners',
      'Natural insect and fungal deterrent properties recognized by traditional bioclimatic architects',
      'Emits negative carbon in production compared to carbon-intensive Portland cement'
    ],
    scientificMechanism: 'The digested grass fibers in dung act as micro-reinforcing rebar, preventing shrinkage cracks in drying clay. Upon drying, it forms a porous breathable membrane that regulates humidity through vapor sorption while the high phosphorus-potassium content enriches soil upon wash-off.',
    modernAdoption: 'Currently championed by modern sustainable earth-builders, Auroville Earth Institute, and green architects across India and Europe.'
  },
  {
    id: 'reetha-shikakai',
    name: 'Reetha & Shikakai Natural Saponins',
    hindiName: 'Reetha & Shikakai',
    devanagari: 'रीठा एवं शिकाकाई',
    tagline: 'Tree berry surfactants that cleanse and nourish soil runoff',
    category: 'hygiene',
    antiquity: 'Ayurvedic Classical Samhitas (~1000 BCE)',
    era: 'Classical Ayurvedic Period to Modern Organic Living',
    lifespan: 'Single wash cycle',
    soilReturnDays: 3,
    syntheticCounterpart: 'Synthetic Detergents with Phosphates, Parabens & SLS',
    syntheticLifespan: 'Non-biodegradable surfactants creating toxic foam on lakes',
    materials: ['Soapnut shells (Sapindus mukorossi)', 'Shikakai pods (Acacia concinna)', 'Amla (Phyllanthus emblica)'],
    keyCompounds: ['Natural Saponins (triterpenoid glycosides)', 'Ascorbic Acid (Vitamin C)', 'Tannins', 'Natural low pH'],
    image: '/src/assets/images/hero_ancient_biodegradable_1790313418657.jpg',
    imageAlt: 'Natural botanicals, soapberries, and earthen eco-friendly materials',
    description: 'Centuries before commercial laundry detergents fouled rivers like the Yamuna and Bellandur Lake with suffocating chemical foam, Indian households simmered dried Reetha (soapnut) shells and Shikakai pods. When boiled or shaken with water, they release rich natural saponin suds that break down grease, clean delicate silks and cashmere, and cleanse hair without stripping natural scalp sebum. The wash water is 100% safe greywater that fertilizes kitchen gardens.',
    ancientSource: {
      text: 'Charaka Samhita (Chikitsa Sthana, Varnya Rogas)',
      quote: 'फेनिला केशसंशोधनी सर्वमलापहा',
      translation: 'The frothing soapnut (Phenila) thoroughly purifies hair and skin, dispelling all accumulated grime without injuring natural oils.'
    },
    lifecycle: {
      harvest: 'Wild-harvested from perennial forest canopy trees (Sapindus) in the Himalayan foothills and Western Ghats.',
      creation: 'Sun-dried shells separated from seeds; ground into flakes or boiled into liquid decoction.',
      use: 'Releases natural foaming surfactants upon contact with agitated water; safe for newborns and delicate textiles.',
      soilReturn: 'Wastewater directly drains to banana and papaya roots; saponins act as natural soil antifungal and nematode repellents.'
    },
    ecologicalGains: [
      'Prevents eutrophication (dead zones) in lakes and rivers caused by synthetic phosphate detergents',
      'Eliminates single-use plastic detergent bottles and toxic petrochemical foaming surfactants',
      'Hypoallergenic, antibacterial, and completely greywater-safe for urban rooftop gardens',
      'Wild forest harvest provides evergreen livelihood incentives to protect native deciduous forests'
    ],
    scientificMechanism: 'Triterpene saponins are amphiphilic molecules possessing a lipophilic aglycone and hydrophilic sugar moiety. They lower the surface tension of water, encapsulating dirt and oils into micelles that rinse away cleanly, followed by rapid microbial breakdown in topsoil within 48 to 72 hours.',
    modernAdoption: 'Widely popular worldwide as eco-laundry detergent berries, solid shampoo bars, and zero-waste bulk liquid refill stations.'
  },
  {
    id: 'jute-sabai',
    name: 'Jute (Paat) & Sabai Grass Packaging',
    hindiName: 'Jute & Sabai',
    devanagari: 'जूट एवं सबई घास',
    tagline: 'The golden bast fiber that stores food grains without plastic microfibers',
    category: 'textiles',
    antiquity: 'Indus Valley & Iron Age Bengal (~300 BCE)',
    era: 'Mauryan Era to Global Golden Fiber Commerce',
    lifespan: 'Multi-season reuse (3-5 years) -> Soil compost',
    soilReturnDays: 90,
    syntheticCounterpart: 'Polypropylene (PP) Woven Gunny Bags & Nylon Ropes',
    syntheticLifespan: '400+ Years (Sheds microplastics into stored food)',
    materials: ['Corchorus olitorius / capsularis (Jute)', 'Eulaliopsis binata (Sabai Grass)'],
    keyCompounds: ['Alpha-cellulose (60%)', 'Hemicellulose (24%)', 'Lignin (13%)', 'Pectin'],
    image: '/src/assets/images/hero_ancient_biodegradable_1790313418657.jpg',
    imageAlt: 'Golden jute fibers, cordage, and ancient biodegradable textiles',
    description: 'Known as the "Golden Fiber" of India, Jute (Paat) has been cultivated in the Gangetic delta for thousands of years. Woven into heavy-duty gunny bags (Bora), ropes, and cots (Charpai), it is remarkably strong yet fully breathable. Stored wheat and rice can respire freely inside jute sacks without sweat condensation or fungal rot—unlike sealed synthetic plastic sacks. When frayed beyond use, it is laid in farming furrows as biodegradable mulch.',
    ancientSource: {
      text: 'Ain-i-Akbari & Bengal Vernacular Texts',
      quote: 'पटवस्त्रं दृढं शुद्धं धान्यसंरक्षणे हितम्',
      translation: 'The woven cloth of the Paat (Jute) plant is extraordinarily sturdy, pure, and uniquely suited to preserve harvested grain.'
    },
    lifecycle: {
      harvest: 'Fast-growing crop harvested in 120 days; absorbs 15 tonnes of CO₂ and releases 11 tonnes of oxygen per hectare.',
      creation: 'Stalks are water-retted in village ponds, stripped by hand into golden fibers, and woven on handlooms or mechanical shuttles.',
      use: 'Heavy-duty grain sacks, burlap sacks, shipping twine, and rural string charpais that carry 200kg weights.',
      soilReturn: 'When buried or shredded as mulch, it completely decomposes in 2 to 3 months, returning organic matter and carbon to topsoil.'
    },
    ecologicalGains: [
      'Saves millions of tonnes of fossil-fuel derived polypropylene sacks from landfills',
      'Acts as an exceptional carbon sink during its short 4-month rapid growth cycle',
      'Leaves shed during cultivation act as natural organic green manure in the fields',
      'Naturally breathable: grain remains cool and pest-resistant without synthetic chemical fumigation'
    ],
    scientificMechanism: 'High alpha-cellulose content gives jute remarkable tensile strength comparable to mild steel wire by weight, yet its plant-cell matrix is recognized by soil microorganisms, breaking down into water, CO₂, and biomass under aerobic soil conditions.',
    modernAdoption: 'Enforced in India under the Jute Packaging Materials Act (100% of foodgrains and 20% of sugar must be packaged in diversified jute bags).'
  },
  {
    id: 'matka-surahi',
    name: 'Matka & Surahi Earthen Coolers',
    hindiName: 'Matka & Surahi',
    devanagari: 'मटका एवं सुराही',
    tagline: 'Electricity-free refrigeration via latent evaporative physics',
    category: 'storage',
    antiquity: 'Harappan Civilization (~2600 BCE)',
    era: 'Bronze Age to Every Indian Summer Household',
    lifespan: 'Seasonal (1-2 years) -> Crushed for planting soil',
    soilReturnDays: 30,
    syntheticCounterpart: 'PET Plastic Water Bottles & CFC-Coolant Refrigerators',
    syntheticLifespan: '450+ Years (Leaches microplastics and antimony)',
    materials: ['Natural terra-cotta clay', 'Fine sand', 'Mica flakes'],
    keyCompounds: ['Porous aluminosilicates', 'Calcium oxide', 'Magnesium traces'],
    image: '/src/assets/images/kulhar_terracotta_craft_1790313432378.jpg',
    imageAlt: 'Clay terracotta vessels and earthen pots for natural cooling',
    description: 'Dubbed the "refrigerator of the poor", the spherical Matka and slender Surahi have quenched Indian thirsts for millennia. Water placed inside gradually seeps through millions of microscopic capillary pores to the outer surface. As warm breezes pass over the damp exterior, the water evaporates, absorbing latent heat from the vessel interior and chilling the water by 5°C to 8°C without a single watt of electricity or ozone-depleting hydrofluorocarbons.',
    ancientSource: {
      text: 'Sushruta Samhita (Sutra Sthana, Ch. 45)',
      quote: 'मृत्पात्रे सक्तं तोयं सुशीतं लघुपथ्यदम्',
      translation: 'Water held in a clay pitcher becomes naturally cool, light for digestion, balances Pitta dosha, and quenches burning thirst.'
    },
    lifecycle: {
      harvest: 'Alluvial soil sourced from seasonal monsoon silt beds.',
      creation: 'Turned on potters’ wheels and beaten uniformly with wooden paddles (Pindi & Thapa) to calibrate pore density.',
      use: 'Fills homes with sweet-tasting, naturally alkalized cool drinking water without electricity.',
      soilReturn: 'Old pots are smashed to line the base of flower planters for drainage or crushed into soil amendment.'
    },
    ecologicalGains: [
      'Eliminates millions of single-use PET plastic bottled water packages',
      'Zero electrical consumption and zero greenhouse gas refrigerant emissions',
      'Naturally alkaline clay neutralizes acid reflux and provides gentle mineral filtration',
      'Completely circular: discarded pots become porous drainage layers for rooftop plants'
    ],
    scientificMechanism: 'Operates on the physical principle of latent heat of vaporization ($Q = m L_v$). Water evaporating through 0.1 to 0.5 micron clay pores draws approximately 2,260 kJ/kg of heat energy directly from the core water volume, lowering temperature naturally.',
    modernAdoption: 'Inspires modern bio-climatic evaporative cooling towers (e.g., Ant Studio clay conical facade coolers in New Delhi) and zero-energy cool chambers for rural farmers.'
  },
  {
    id: 'khadi-natural-dye',
    name: 'Khadi & Plant-Dyed Cotton',
    hindiName: 'Khadi',
    devanagari: 'खादी एवं प्राकृतिक रंग',
    tagline: 'Solar and hand-spun organic cloth shedding zero microplastics into oceans',
    category: 'textiles',
    antiquity: 'Indus Valley (Cotton spinning spindle whorls ~3000 BCE)',
    era: 'Vedic to Freedom Movement to Sustainable Slow Fashion',
    lifespan: 'Years of wear -> Organic rag composting',
    soilReturnDays: 90,
    syntheticCounterpart: 'Fast Fashion Polyester, Nylon & Acrylic Garments',
    syntheticLifespan: '200+ Years (Sheds 700,000 microplastic fibers per wash)',
    materials: ['Desi organic short-staple cotton', 'Indigofera tinctoria (Indigo)', 'Rubia cordifolia (Manjistha / Madder)', 'Pomegranate peel'],
    keyCompounds: ['Natural Cellulose (C₆H₁₀O₅)ₙ', 'Indigotin', 'Alizarin', 'Flavonoid mordants'],
    image: '/src/assets/images/hero_ancient_biodegradable_1790313418657.jpg',
    imageAlt: 'Hand-woven organic cotton textiles and natural earthen dyes',
    description: 'While modern synthetic clothing (polyester, nylon, spandex) sheds millions of toxic microplastic fibers into oceans during every single machine wash cycle, ancient Indian Khadi is handspun on the Charkha and woven on handlooms using indigenous rain-fed cotton. Dyed with turmeric, indigo leaves, madder root (Manjistha), and iron rust vinegar, it breathes with the body, keeps the skin cool, and when worn out, decomposes in moist soil within 3 months, feeding fungi rather than choking marine food webs.',
    ancientSource: {
      text: 'Arthashastra of Kautilya (Book II, Ch. 23)',
      quote: 'कर्पासतन्तून् सूत्रशालासु निष्पादयेत्',
      translation: 'Establish public weaving centers for spinning indigenous cotton threads into pure garments to foster self-reliance and civic dignity.'
    },
    lifecycle: {
      harvest: 'Rain-fed indigenous Desi cotton grown without synthetic chemical pesticides.',
      creation: 'Spinning by hand (Charkha) requiring zero fossil fuel energy; woven on pit looms.',
      use: 'Durable, soft, highly breathable fabric that becomes softer with every wash.',
      soilReturn: '100% natural cellulose fiber decomposed by soil cellulolytic fungi in 80-100 days.'
    },
    ecologicalGains: [
      'Zero synthetic microfibers entering municipal sewage and marine life food chains',
      'Consumes 3 liters of water per meter of cloth versus 55+ liters for mill-made polyester fabric',
      'Natural plant dyes generate non-toxic effluent safe for agricultural irrigation',
      'Provides decentralized rural green employment across Indian villages'
    ],
    scientificMechanism: 'Pure unmercerized organic cotton consists of pure cellulose polymer chains linked by beta-1,4-glucosidic bonds. Soil saprophytes produce cellulase enzymes that hydrolyze these bonds into harmless simple glucose units, unlike non-cleavable synthetic polymers.',
    modernAdoption: 'Leading the global slow-fashion revolution, zero-waste apparel, and circular eco-textile certifications.'
  }
];

export interface ComparativeCycleStep {
  timeframe: string;
  ancientTitle: string;
  ancientStatus: string;
  ancientSoilImpact: string;
  syntheticTitle: string;
  syntheticStatus: string;
  syntheticSoilImpact: string;
}

export const COMPARATIVE_CYCLES: Record<string, {
  practiceName: string;
  syntheticName: string;
  steps: ComparativeCycleStep[];
}> = {
  pattalVsStyrofoam: {
    practiceName: 'Sal Leaf Pattal Plate',
    syntheticName: 'Styrofoam (Polystyrene) Plate',
    steps: [
      {
        timeframe: 'Day 1 (Immediate Use)',
        ancientTitle: 'Fresh Forest Tableware',
        ancientStatus: 'Sturdy, natural leaf aroma, leak-proof cutin wax barrier protecting warm food.',
        ancientSoilImpact: 'Neutral / zero pollution footprint. Safe for humans and animals.',
        syntheticTitle: 'Polystyrene Molded Foam',
        syntheticStatus: 'Grease-soaked, prone to thermal leaching of styrene neurotoxins into hot food.',
        syntheticSoilImpact: 'Enters municipal municipal garbage bin or open litter heap.'
      },
      {
        timeframe: 'Day 7 (First Week)',
        ancientTitle: 'Initial Moisture Loss',
        ancientStatus: 'Leaf curls, bamboo splints loosen; soil moisture softens the plant tissue.',
        ancientSoilImpact: 'Earthworms and soil microbes begin colonizing leaf edges.',
        syntheticTitle: 'Persistent Petroleum Foam',
        syntheticStatus: 'Completely unchanged. Resists all natural bacterial enzymes.',
        syntheticSoilImpact: 'Blown by wind into road ditches, clogging storm drains and choking urban waterways.'
      },
      {
        timeframe: 'Day 30 (One Month)',
        ancientTitle: 'Humus Reintegration',
        ancientStatus: 'Cellulose completely digested by saprophytic fungi. Skeletonized veins return to earth.',
        ancientSoilImpact: 'Converted into 100% fertile compost; enriches topsoil with carbon and nitrogen.',
        syntheticTitle: 'Sun Brittling & Fragmentation',
        syntheticStatus: 'UV radiation snaps foam into thousands of micro-pellets.',
        syntheticSoilImpact: 'Eaten by birds and marine life mistaking shiny white pellets for fish eggs.'
      },
      {
        timeframe: 'Year 1 (12 Months)',
        ancientTitle: 'New Growth Cycle',
        ancientStatus: 'Plate has vanished. Its decomposed minerals now feed grass and tree roots.',
        ancientSoilImpact: 'Healthy soil microbiome thriving with mycorrhizal fungi.',
        syntheticTitle: 'Microplastic Infiltration',
        syntheticStatus: 'Millions of microscopic styrene particulates distributed through topsoil.',
        syntheticSoilImpact: 'Styrene and plasticizer chemicals leach into groundwater tables.'
      },
      {
        timeframe: 'Year 500 (Half Millennia)',
        ancientTitle: 'Generations of Forests',
        ancientStatus: 'Part of hundreds of recurring seasonal life cycles.',
        ancientSoilImpact: 'Pure, living earth.',
        syntheticTitle: 'Still Present in Deep Layers',
        syntheticStatus: 'Synthetic benzene rings resist degradation for up to 500-1000 years.',
        syntheticSoilImpact: 'Permanent toxic legacy embedded in sedimentary fossil strata.'
      }
    ]
  },
  kulharVsPlastic: {
    practiceName: 'Unglazed Earthen Kulhar',
    syntheticName: 'Wax-Lined Paper / Plastic Cup',
    steps: [
      {
        timeframe: 'Day 1 (Immediate Use)',
        ancientTitle: 'Porous Clay Infusion',
        ancientStatus: 'Wicks tea acidity, infuses earthy petrichor mineral fragrance.',
        ancientSoilImpact: 'Completely non-toxic; fired from river mud.',
        syntheticTitle: 'Polyethylene Coating',
        syntheticStatus: 'Paper shell lined with microscopic plastic film to prevent hot liquid leakage.',
        syntheticSoilImpact: 'Cannot be easily recycled due to bonded plastic-paper composite.'
      },
      {
        timeframe: 'Day 7 (First Week)',
        ancientTitle: 'Weathering & Fragility',
        ancientStatus: 'Crushed into porous terracotta shards by human steps or rain impact.',
        ancientSoilImpact: 'Creates natural soil aeration pores, preventing compaction.',
        syntheticTitle: 'Paper Rotting, Plastic Persisting',
        syntheticStatus: 'Outer paper rots away, exposing the gossamer thin polyethylene liner.',
        syntheticSoilImpact: 'Liner remains water-impermeable, trapping stagnant water and mosquito larvae.'
      },
      {
        timeframe: 'Day 30 (One Month)',
        ancientTitle: 'Return to Riverbed Silt',
        ancientStatus: 'Terracotta grains dissolve into alluvial soil and sand particles.',
        ancientSoilImpact: 'Adds trace iron, silica, and minerals back into roadside ground.',
        syntheticTitle: 'Microplastic Shedding',
        syntheticStatus: 'The plastic film sheds over 25,000 microplastic particles per cup.',
        syntheticSoilImpact: 'Particles enter earthworm digestive tracts, causing cellular lesions.'
      },
      {
        timeframe: 'Year 1 (12 Months)',
        ancientTitle: 'Undifferentiated Earth',
        ancientStatus: 'Indistinguishable from river silt. Complete geological circle.',
        ancientSoilImpact: 'Enriches soil for planting.',
        syntheticTitle: 'Sub-Surface Contamination',
        syntheticStatus: 'Polyethylene fragments migrate into local agriculture runoff.',
        syntheticSoilImpact: 'Plants absorb nano-plastics through root pores (xylem blockage).'
      },
      {
        timeframe: 'Year 500 (Half Millennia)',
        ancientTitle: 'Timeless Earth Cycle',
        ancientStatus: 'May be excavated by future potters to make new kulhars.',
        ancientSoilImpact: 'Zero toxic burden.',
        syntheticTitle: 'Synthetic Polymer Residue',
        syntheticStatus: 'Cross-linked synthetic hydrocarbon chains still traceable.',
        syntheticSoilImpact: 'Permanent microplastic deposit in the geological epoch.'
      }
    ]
  },
  datunVsToothbrush: {
    practiceName: 'Neem Datun Herbal Twig',
    syntheticName: 'Nylon Bristle Plastic Toothbrush',
    steps: [
      {
        timeframe: 'Day 1 (Immediate Use)',
        ancientTitle: 'Living Plant Bristles',
        ancientStatus: 'Direct release of azadirachtin and tannins into gums while brushing.',
        ancientSoilImpact: 'Discarded onto garden soil or compost heap.',
        syntheticTitle: 'Injection Molded Polypropylene',
        syntheticStatus: 'Synthetic handle with 2,500 nylon-6 filaments held by metal staples.',
        syntheticSoilImpact: 'Used for 3 months, then cast into the municipal trash.'
      },
      {
        timeframe: 'Day 7 (First Week)',
        ancientTitle: 'Bark Softening',
        ancientStatus: 'Xylem fibers dehydrate, then absorb ground dew and soften.',
        ancientSoilImpact: 'Antimicrobial neem compounds protect surrounding garden roots from termites.',
        syntheticTitle: 'Landfill Burial',
        syntheticStatus: 'Compacted with thousands of tons of garbage under anaerobic conditions.',
        syntheticSoilImpact: 'Will not decompose under anaerobic landfill landfill cover.'
      },
      {
        timeframe: 'Day 30 (One Month)',
        ancientTitle: 'Complete Biodegradation',
        ancientStatus: 'Cellulose converted into rich dark leaf mold.',
        ancientSoilImpact: 'Feeds garden earthworms and bacterial microfauna.',
        syntheticTitle: 'Ocean Drift / River Wash',
        syntheticStatus: 'Swept out of dumps into river estuaries, floating on ocean gyres.',
        syntheticSoilImpact: 'Bristles break off into waters, ingested by pelagic fish.'
      },
      {
        timeframe: 'Year 1 (12 Months)',
        ancientTitle: 'New Neem Sapling Food',
        ancientStatus: 'Original twig has fueled the growth of new neighborhood greenery.',
        ancientSoilImpact: '100% biological nutrient cycling.',
        syntheticTitle: 'Ghost Plastic',
        syntheticStatus: 'The handle washes onto a remote coral atoll, faded but structurally whole.',
        syntheticSoilImpact: 'Leaches bisphenols, chemical dyes, and phthalate plasticizers.'
      },
      {
        timeframe: 'Year 500 (Half Millennia)',
        ancientTitle: 'Pure Biosphere',
        ancientStatus: 'Part of the ancient living forest continuum.',
        ancientSoilImpact: 'Balanced eco-balance.',
        syntheticTitle: 'Still Intact',
        syntheticStatus: 'Polypropylene plastic toothbrush handles last 400 to 600+ years.',
        syntheticSoilImpact: 'Outlives the human who used it for 3 minutes a day by 10 lifetimes.'
      }
    ]
  }
};

export const PANCHA_MAHABHUTAS = [
  {
    element: 'Prithvi (Earth / भूमि)',
    principle: 'Alluvial Clay & Minerals',
    description: 'Every vessel, cup, and wall originated from seasonal river silt or native red clay, and was formulated to dissolve back into fertile soil without toxic residue.',
    examples: ['Kulhar cups', 'Surahi pots', 'Lippan mud plaster', 'Alluvial bricks'],
    color: '#843e1f'
  },
  {
    element: 'Jala (Water / जल)',
    principle: 'Evaporative Cooling & Greywater',
    description: 'Ancient cleansing systems used plant saponins and porous ceramics that work in harmony with water cycles, keeping aquifers pure and drinkable.',
    examples: ['Matka evaporative chilling', 'Reetha laundry greywater', 'Copper pot purification'],
    color: '#2d4a3e'
  },
  {
    element: 'Agni (Fire / अग्नि)',
    principle: 'Clean Kiln Firing & Sunlight',
    description: 'Natural low-carbon biomass kilns using fallen wood, cowdung briquettes, and direct solar drying for textiles and leaf tableware.',
    examples: ['Potters’ Aava kilns', 'Sun-drying of Sal leaves', 'Chuna calcination'],
    color: '#b8673e'
  },
  {
    element: 'Vayu (Air / वायु)',
    principle: 'Porosity & Thermal Breathability',
    description: 'Unlike impermeable plastics that create sweating, mold, and trapped heat, natural jute, khadi, and mud plaster breathe dynamically with ambient air.',
    examples: ['Breathable jute grain bags', 'Khadi cotton aeration', 'Mud wall humidity regulation'],
    color: '#785e49'
  },
  {
    element: 'Akasha (Ether / आकाश)',
    principle: 'Zero-Waste Space Harmony',
    description: 'The ancient philosophy that no human artifact should occupy permanent dead space on Earth after its purpose is fulfilled.',
    examples: ['Pattal feast recycling', 'Datun twig compost', 'Complete cyclical non-accumulation'],
    color: '#4a3b32'
  }
];

export const BOTANICAL_SPECIMENS = [
  {
    commonName: 'Neem / Margosa',
    botanicalName: 'Azadirachta indica',
    sanskritName: 'Arishta (अरिष्ट - Reliever of Sickness)',
    biodegradablePart: 'Twigs for Datun, leaves for grain preservation',
    activeBiochemicals: 'Azadirachtin, Nimbin, Salannin, Quercetin',
    decompositionTime: '5-10 days in moist soil',
    ecologicalRole: 'Natural broad-spectrum pesticide that does not harm honeybees or soil bacteria.'
  },
  {
    commonName: 'Sal Tree',
    botanicalName: 'Shorea robusta',
    sanskritName: 'Shala (शाल - Imposing Forest Giant)',
    biodegradablePart: 'Broad leathery leaves for Pattal & Dona tableware',
    activeBiochemicals: 'Polyphenols, Sal-resin, condensed tannins, natural waxy cutin',
    decompositionTime: '10-20 days',
    ecologicalRole: 'Deep root networks prevent topsoil erosion in Central and Eastern Indian tribal belts.'
  },
  {
    commonName: 'Soapnut / Reetha',
    botanicalName: 'Sapindus mukorossi',
    sanskritName: 'Phenila (फेनिल - Foaming Berry)',
    biodegradablePart: 'Pericarp (fruit shell) for laundry & hygiene surfactant',
    activeBiochemicals: 'Triterpenoid saponins (10-18%), Sapindoside A & B',
    decompositionTime: '2-4 days in wastewater',
    ecologicalRole: 'Eliminates chemical phosphate eutrophication in freshwater lakes and rivers.'
  },
  {
    commonName: 'Golden Jute',
    botanicalName: 'Corchorus olitorius',
    sanskritName: 'Patta (पट्ट - Woven Bast Ribbon)',
    biodegradablePart: 'Stem bast fiber for gunny bags, twines, and geotextiles',
    activeBiochemicals: '60% Cellulose, 24% Hemicellulose, 13% Lignin',
    decompositionTime: '60-90 days',
    ecologicalRole: 'Absorbs 15 tonnes of atmospheric CO₂ per hectare in just 120 days.'
  },
  {
    commonName: 'Palash / Flame of the Forest',
    botanicalName: 'Butea monosperma',
    sanskritName: 'Kimsuka / Palash (पलाश)',
    biodegradablePart: 'Large trifoliate leaves for dining platters, flowers for natural Holi colors',
    activeBiochemicals: 'Butrin, isobutrin, palasonin, gallic acid',
    decompositionTime: '12-18 days',
    ecologicalRole: 'Nitrogen-fixing deciduous tree revitalizing saline and exhausted soils.'
  }
];

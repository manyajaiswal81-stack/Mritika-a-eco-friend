export interface SeasonalCycle {
  id: string;
  rituName: string;
  hindiName: string;
  devanagari: string;
  monthsEnglish: string;
  indianCalendarMonths: string;
  agriculturalCropCycle: string;
  climateCondition: string;
  recommendedMaterials: {
    material: string;
    botanicalOrEarthenOrigin: string;
    practiceName: string;
    usageGuidance: string;
    harvestContext: string;
    soilBenefit: string;
  }[];
  culinaryTablewareGuide: string;
  ecoRitualTradition: string;
}

export const SEASONS_DATA: SeasonalCycle[] = [
  {
    id: 'sharad',
    monthsEnglish: 'September - October',
    rituName: 'Sharad Ritu (Early Autumn / Post-Monsoon)',
    hindiName: 'शरद ऋतु',
    devanagari: 'शरद् ऋतु',
    indianCalendarMonths: 'Ashvin - Kartika (अश्विन - कार्तिक)',
    agriculturalCropCycle: 'Kharif Harvest',
    climateCondition: 'Clear skies, receding monsoon moisture, pleasant breezes, warm days, and cool nights.',
    recommendedMaterials: [
      {
        material: 'Golden Jute (Pat / Paat)',
        botanicalOrEarthenOrigin: 'Corchorus olitorius stalks retted in post-monsoon rivers',
        practiceName: 'Breathable Grain Storage Sacks & Twine',
        usageGuidance: 'Store newly harvested paddy (rice), pulses, and maize in woven unbleached jute sacks to prevent moisture sweat and fungal molds.',
        harvestContext: 'Post-monsoon retting of jute stalks is completed across Bengal and Assam as river flows ease.',
        soilBenefit: 'Frayed fibers returned to farming beds degrade into rich fibrous organic matter within 90 days.'
      },
      {
        material: 'Fresh Rice Straw (Paddy Chaff / Parali)',
        botanicalOrEarthenOrigin: 'Oryza sativa post-harvest stalks',
        practiceName: 'Root Bio-Mulch & Earthen Plaster Binder',
        usageGuidance: 'Never burn crop stubble: mix chopped rice straw into clay courtyard plaster or spread directly as orchard mulch.',
        harvestContext: 'Major Kharif paddy harvesting season across Punjab, Haryana, UP, and coastal plains.',
        soilBenefit: 'Retains ground moisture, suppresses weeds, and converts carbon into soil fungal food.'
      },
      {
        material: 'Terracotta Diwali Diyas & Handi',
        botanicalOrEarthenOrigin: 'Monsoon-enriched fresh alluvial silt beds',
        practiceName: 'Festival Oil Lamps & Festive Cooking Pots',
        usageGuidance: 'Light clay diyas filled with mustard or sesame oil; bake seasonal sweets in earthen handis.',
        harvestContext: 'Potters excavate freshly settled river silt deposited by receding monsoon waters to spin diyas.',
        soilBenefit: 'Spent diyas crushed into gardens provide soil porosity and trace iron-magnesium.'
      }
    ],
    culinaryTablewareGuide: 'Serve festival offerings and harvest meals on broad mature Sal leaves (Shorea robusta) that withstand warm festive ghee and sweets.',
    ecoRitualTradition: 'Diwali & Navratri lighting of unglazed baked earth lamps (Mitti ke Diye) returning cleanly to village soil after the festival.'
  },
  {
    id: 'hemant',
    monthsEnglish: 'November - December',
    rituName: 'Hemant Ritu (Pre-Winter / Late Autumn)',
    hindiName: 'हेमंत ऋतु',
    devanagari: 'हेमन्त ऋतु',
    indianCalendarMonths: 'Margashirsha - Pausha (मार्गशीर्ष - पौष)',
    agriculturalCropCycle: 'Rabi Sowing',
    climateCondition: 'Crisp dry air, dropping temperatures, heavy morning dew, drying topsoil.',
    recommendedMaterials: [
      {
        material: 'Handspun Khadi & Organic Desi Cotton',
        botanicalOrEarthenOrigin: 'Gossypium herbaceum indigenous short-staple cotton',
        practiceName: 'Zero-Microplastic Layering Quilts & Wraps',
        usageGuidance: 'Wear handspun unmercerized Khadi cotton quilts (Razai) filled with raw carded cotton instead of polyester fleece.',
        harvestContext: 'Raw indigenous cotton harvesting peaks across Gujarat, Vidarbha, and Deccan plateaus.',
        soilBenefit: 'Pure cellulose fibers shed zero microplastics during washing and decompose 100% in soil.'
      },
      {
        material: 'Sugarcane Bagasse & Molasses Residue',
        botanicalOrEarthenOrigin: 'Saccharum officinarum crushed cane fiber',
        practiceName: 'Natural Molded Plates & Soil Carbon Feed',
        usageGuidance: 'Utilize fiber residue from winter jaggery (Gur) crushing for biodegradable meal boxes or garden compost.',
        harvestContext: 'Sugarcane crushers (Kolhu) commence seasonal operations across North & West India.',
        soilBenefit: 'Rich in lignin and natural sugars, boosting beneficial earthworm propagation.'
      },
      {
        material: 'Neem & Babool Twig Bristles',
        botanicalOrEarthenOrigin: 'Mature winter Azadirachta branchlets',
        practiceName: 'Morning Datun with Astringent Oils',
        usageGuidance: 'Chew fresh Babool or Neem twigs; bitter tannins tighten gums prone to winter bleeding and dryness.',
        harvestContext: 'Winter pruning of avenue trees to encourage spring foliage.',
        soilBenefit: 'Antimicrobial twigs protect surrounding plants from soil pests when buried.'
      }
    ],
    culinaryTablewareGuide: 'Steaming hot Makki ki Roti (corn flatbread) and Sarson ka Saag served on natural stitched Palash leaf platters.',
    ecoRitualTradition: 'Traditional Kolam and Rangoli patterns made exclusively with edible rice flour, feeding morning ants and birds.'
  },
  {
    id: 'shishir',
    monthsEnglish: 'January - February',
    rituName: 'Shishir Ritu (Deep Winter / Frost Season)',
    hindiName: 'शिशिर ऋतु',
    devanagari: 'शिशिर ऋतु',
    indianCalendarMonths: 'Magha - Phalguna (माघ - फाल्गुन)',
    agriculturalCropCycle: 'Rabi Maturation',
    climateCondition: 'Peak cold waves in the north, foggy mornings, dry chilly winds, sunny afternoons.',
    recommendedMaterials: [
      {
        material: 'Wild Kashmiri Willow (Salix)',
        botanicalOrEarthenOrigin: 'Salix purpurea twigs harvested after autumn leaf drop',
        practiceName: 'Kangri Wicker & Zero-Electricity Earthen Heaters',
        usageGuidance: 'Carry glowing embers in an earthen Kundal cradled inside woven willow wicker instead of plastic heaters.',
        harvestContext: 'Annual harvesting and boiling of wild willow twigs in the Kashmir valley.',
        soilBenefit: 'Natural willow and clay dismantle safely into forest compost when worn out.'
      },
      {
        material: 'Fresh Bamboo Cooking Tubes (Sunga)',
        botanicalOrEarthenOrigin: 'Bambusa balcooa winter green culms',
        practiceName: 'Magh Bihu Bamboo Rice Steaming (Sunga Saul)',
        usageGuidance: 'Steam sticky winter rice inside green bamboo culms over open wood embers with zero metal or Teflon.',
        harvestContext: 'Harvest of fresh winter bamboo shoots and culms in Assam and the North-East.',
        soilBenefit: 'Spent bamboo tubes rot in soil within 45 days, adding silica and potassium.'
      },
      {
        material: 'Mustard Stalks & Cowdung Briquettes',
        botanicalOrEarthenOrigin: 'Brassica campestris dry stalks and pastoral manure',
        practiceName: 'Lohri & Makar Sankranti Bonfire Clean Fuel',
        usageGuidance: 'Burn sun-dried crop stalks and cowdung cakes for harvest bonfires rather than synthetic plastics or tires.',
        harvestContext: 'Pruning dry lower stalks of flowering winter mustard fields.',
        soilBenefit: 'Wood-ash left behind is the most potent natural alkaline potash fertilizer for gardens.'
      }
    ],
    culinaryTablewareGuide: 'Khichdi and Til-Gud distributed during Makar Sankranti in deep, dried Sal and Banyan leaf Dona bowls.',
    ecoRitualTradition: 'Makar Sankranti harvest feasting and bonfire ash returned to agricultural fields as organic potash fertilizer.'
  },
  {
    id: 'vasant',
    monthsEnglish: 'March - April',
    rituName: 'Vasant Ritu (Spring / Festival of Renewal)',
    hindiName: 'वसंत ऋतु',
    devanagari: 'वसन्त ऋतु',
    indianCalendarMonths: 'Chaitra - Vaishakha (चैत्र - वैशाख)',
    agriculturalCropCycle: 'Rabi Harvest',
    climateCondition: 'Blossoming flora, warming ambient temperatures, gentle vernal breezes, golden harvest fields.',
    recommendedMaterials: [
      {
        material: 'Palash (Tesu) Flowers',
        botanicalOrEarthenOrigin: 'Butea monosperma fiery red vernal blossoms',
        practiceName: 'Natural Ayurvedic Holi Dyes & Skin Tonics',
        usageGuidance: 'Soak dried Tesu flowers overnight in water to create fragrant saffron-orange natural Holi colors.',
        harvestContext: 'Forests of Central India blaze red with wild Palash blossoms during March.',
        soilBenefit: 'Zero toxic chemical heavy metals (lead/mercury); wash-water directly enriches garden soil.'
      },
      {
        material: 'Wheat Straw (Turi / Bhusa)',
        botanicalOrEarthenOrigin: 'Triticum aestivum post-harvest golden chaff',
        practiceName: 'Mud Mortar Reinforcement & Cattle Fodder',
        usageGuidance: 'Mix golden wheat chaff with river silt clay for spring wall repairs; provides extraordinary tensile strength.',
        harvestContext: 'Peak golden wheat harvest (Baisakhi) across Northern and Central India.',
        soilBenefit: 'Decomposing straw feeds soil cellulolytic microbes and prevents soil crusting.'
      },
      {
        material: 'Soapnut (Reetha) & Shikakai Shells',
        botanicalOrEarthenOrigin: 'Sapindus mukorossi dried berries',
        practiceName: 'Spring Cleaning & Woolen Textile Care',
        usageGuidance: 'Wash winter woolens before storage with Reetha decoction to deter silverfish and moths naturally.',
        harvestContext: 'Mature wild soapberries drop naturally from sub-Himalayan forest trees.',
        soilBenefit: '100% greywater safe; drains directly to home fruit trees.'
      }
    ],
    culinaryTablewareGuide: 'Savor festive spring feasts on vibrant green stitched Palash (Flame of the Forest) leaf platters.',
    ecoRitualTradition: 'Traditional Holi played exclusively with plant-based botanical extracts (Tesu, Turmeric, Indigo, Beetroot).'
  },
  {
    id: 'grishma',
    monthsEnglish: 'May - June',
    rituName: 'Grishma Ritu (Summer / High Solar Energy)',
    hindiName: 'ग्रीष्म ऋतु',
    devanagari: 'ग्रीष्म ऋतु',
    indianCalendarMonths: 'Jyeshtha - Ashadha (ज्येष्ठ - आषाढ़)',
    agriculturalCropCycle: 'Zaid (Summer) Fallow',
    climateCondition: 'Scorching sun, loo heatwaves, soaring temperatures up to 47°C, low humidity.',
    recommendedMaterials: [
      {
        material: 'Unglazed Terracotta (Matka & Surahi)',
        botanicalOrEarthenOrigin: 'Porous riverbed clay mixed with fine mica and sand',
        practiceName: 'Zero-Electricity Evaporative Water Refrigeration',
        usageGuidance: 'Fill earthen pitchers with drinking water; wrap with wet jute cloth for extra evaporative chill (5-8°C drop).',
        harvestContext: 'Peak production season for village potters utilizing blazing sun for open kiln firing.',
        soilBenefit: 'Cracked seasonal pots broken into drainage pebbles for summer vegetable planters.'
      },
      {
        material: 'Vetiver (Khus) Roots',
        botanicalOrEarthenOrigin: 'Chrysopogon zizanioides wild aromatic marsh roots',
        practiceName: 'Evaporative Desert Cooler Screens & Door Blinds',
        usageGuidance: 'Hang wet vetiver mats in front of windows and cooler vents to blow naturally chilled, woody fragrant air.',
        harvestContext: 'Summer harvesting of wild fragrant grass roots from wetland marshes.',
        soilBenefit: 'When spent after summer, shredded roots act as moisture-retaining organic soil conditioner.'
      },
      {
        material: 'Areca Palm Leaf Sheaths (Adike Thatte)',
        botanicalOrEarthenOrigin: 'Areca catechu naturally shed leaf sheaths',
        practiceName: 'Heat-Resistant Picnic & Summer Travel Tableware',
        usageGuidance: 'Use rigid molded Areca palm plates for summer travel and outdoor mango feasts; resists greasy oils.',
        harvestContext: 'Pre-monsoon natural shedding of dried leaf sheaths in coastal Western Ghats orchards.',
        soilBenefit: 'Breaks down in backyard compost within 30-40 days into dark organic matter.'
      }
    ],
    culinaryTablewareGuide: 'Chilled sweet lassi served in thick porous clay Kulhars that absorb surface warmth and impart an earthen petrichor aroma.',
    ecoRitualTradition: 'Pyaoo (free public drinking water stations) set along pilgrimage routes using giant earthen matkas.'
  },
  {
    id: 'varsha',
    monthsEnglish: 'July - August',
    rituName: 'Varsha Ritu (Monsoon / Season of Rains)',
    hindiName: 'वर्षा ऋतु',
    devanagari: 'वर्षा ऋतु',
    indianCalendarMonths: 'Shravana - Bhadrapada (श्रावण - भाद्रपद)',
    agriculturalCropCycle: 'Monsoon Onset / Kharif Sowing',
    climateCondition: 'Heavy torrential downpours, soaring humidity, lush green rejuvenation, swollen rivers.',
    recommendedMaterials: [
      {
        material: 'Fresh Banana Leaves (Vazhai Ilai)',
        botanicalOrEarthenOrigin: 'Musa paradisiaca lush tropical rain-fed foliage',
        practiceName: 'Waterproof Feast Platters & Steam Cooking',
        usageGuidance: 'Serve piping hot pakoras, dal, and rice on fresh emerald banana leaves; steam sweet Ada packets inside leaf folds.',
        harvestContext: 'Banana plantains thrive in torrential monsoon moisture, unfurling 2-meter leaves daily.',
        soilBenefit: 'Composts in moist soil in just 3 to 7 days, supercharged by active monsoon earthworms.'
      },
      {
        material: 'Toko Palm & Bamboo Rainwear (Japi)',
        botanicalOrEarthenOrigin: 'Livistona jenkinsiana water-repellent leaf fronds',
        practiceName: 'Zero-Plastic Conical Rain Hats & Farm Umbrellas',
        usageGuidance: 'Wear hand-woven bamboo-framed Toko palm Japis while transplanting paddy in muddy fields instead of PVC raincoats.',
        harvestContext: 'Forest collection of mature waxy rain-resistant palm fronds in Assam and Arunachal.',
        soilBenefit: 'Endures 5 years of tropical torrential rain, then decomposes 100% naturally.'
      },
      {
        material: 'Coir (Coconut Husk) Erosion Mats',
        botanicalOrEarthenOrigin: 'Cocos nucifera retting backwater husk fibers',
        practiceName: 'Monsoon Hillside Landslide & Soil Blanketing',
        usageGuidance: 'Lay woven coir geotextile blankets over rain-eroded slopes to protect sprouting seeds from washouts.',
        harvestContext: 'Abundant coconut husk harvesting along tropical coastal belts.',
        soilBenefit: 'Slowly decomposes over 2-3 years, releasing potassium and forming rich humus as roots establish.'
      }
    ],
    culinaryTablewareGuide: 'Steaming hot ginger tea poured into newly baked clay Kulhars; the rain creates an intoxicating aroma of petrichor (Sondhi Khushboo).',
    ecoRitualTradition: 'Shravan month fasting and temple feasts served exclusively on fresh biodegradable leaf plates.'
  }
];

export function getCurrentIndianSeason(): SeasonalCycle {
  const now = new Date();
  const month = now.getMonth() + 1; // 1 to 12

  // Month-based matching to Indian 6 Ritus:
  // Jan-Feb: Shishir (Winter)
  // Mar-Apr: Vasant (Spring)
  // May-Jun: Grishma (Summer)
  // Jul-Aug: Varsha (Monsoon)
  // Sep-Oct: Sharad (Post-Monsoon / Autumn)
  // Nov-Dec: Hemant (Pre-Winter)
  if (month === 1 || month === 2) return SEASONS_DATA.find(s => s.id === 'shishir')!;
  if (month === 3 || month === 4) return SEASONS_DATA.find(s => s.id === 'vasant')!;
  if (month === 5 || month === 6) return SEASONS_DATA.find(s => s.id === 'grishma')!;
  if (month === 7 || month === 8) return SEASONS_DATA.find(s => s.id === 'varsha')!;
  if (month === 9 || month === 10) return SEASONS_DATA.find(s => s.id === 'sharad')!;
  return SEASONS_DATA.find(s => s.id === 'hemant')!;
}

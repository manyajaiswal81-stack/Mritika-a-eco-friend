export interface RegionalPractice {
  id: string;
  name: string;
  localName: string;
  script: string;
  state: string;
  regionId: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  material: string;
  category: 'dining' | 'storage' | 'architecture' | 'farming' | 'lifestyle';
  lifespan: string;
  degradeDays: number;
  highlight: string;
  description: string;
  botanicalOrEarthenSource: string;
  traditionalCommunities: string;
  modernRevivalStatus: string;
}

export interface RegionInfo {
  id: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  name: string;
  hindiName: string;
  statesIncluded: string[];
  climateProfile: string;
  ecologicalKeystone: string;
  primaryEcoMaterials: string[];
  bannerHighlight: string;
  practices: RegionalPractice[];
}

export const REGIONS_DATA: RegionInfo[] = [
  {
    id: 'north',
    name: 'Northern India & Himalayas',
    hindiName: 'उत्तर भारत एवं हिमालय',
    statesIncluded: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Delhi NCR'],
    climateProfile: 'Gangetic alluvial plains, semi-arid summers, cold temperate Himalayan valleys',
    ecologicalKeystone: 'Alluvial river silt from the Ganga-Yamuna basins and Himalayan pine & willow',
    primaryEcoMaterials: ['Alluvial Clay (Mitti)', 'Neem & Babool Twigs', 'Kashmiri Willow (Veer)', 'Pine Needles (Pirul)'],
    bannerHighlight: 'Birthplace of the universal Kulhar tea cup, Gangetic terracotta pottery, and Himalayan Pirul needle bio-briquettes.',
    practices: [
      {
        id: 'gangetic-kulhar',
        name: 'Gangetic Alluvial Kulhar',
        localName: 'Mitti ka Shikora / Kulhad',
        script: 'कुल्हड़ / शिकोरा',
        state: 'Uttar Pradesh & Bihar',
        regionId: 'north',
        material: 'Fine monsoon riverbed sediment and sand',
        category: 'dining',
        lifespan: 'Single-use',
        degradeDays: 25,
        highlight: 'Over 200,000 rural potters along the Ganges mold cups that dissolve under rain into topsoil.',
        description: 'Along the Varanasi ghats and Lucknow tea stalls, unglazed shikora and kulhar cups are fired in open straw kilns. When dropped by train tracks or pavements, rain returns them into silt without microplastic contamination.',
        botanicalOrEarthenSource: 'Ganga-Yamuna Riverbank Alluvial Clay',
        traditionalCommunities: 'Prajapati / Kumhar potter collectives',
        modernRevivalStatus: 'Mandated across Indian Railways in Northern zones to eliminate plastic cups.'
      },
      {
        id: 'pirul-pine-needles',
        name: 'Pirul (Pine Needle) Eco-Craft & Bio-Briquettes',
        localName: 'Pirul',
        script: 'पिरुल हस्तशिल्प',
        state: 'Uttarakhand & Himachal Pradesh',
        regionId: 'north',
        material: 'Fallen Chir Pine (Pinus roxburghii) dry needles',
        category: 'lifestyle',
        lifespan: '5-10 years as utility baskets / Single burn as fuel',
        degradeDays: 60,
        highlight: 'Clearing inflammable forest floor needles to weave baskets and create clean bio-fuel.',
        description: 'Dry Chir pine needles carpet Himalayan hillsides and frequently ignite disastrous forest fires. Hill women gather these needles, soften them with boiling water, and coil them into sturdy bread baskets, coasters, and zero-fossil fuel briquettes.',
        botanicalOrEarthenSource: 'Pinus roxburghii (Chir Pine needles)',
        traditionalCommunities: 'Garhwali and Kumaoni women SHGs (Self-Help Groups)',
        modernRevivalStatus: 'Promoted as a forest conservation circular economy model by state forest departments.'
      },
      {
        id: 'kashmiri-willow-kangri',
        name: 'Kashmiri Willow Wicker & Kangri Bio-Heating',
        localName: 'Kani Kaam / Kangri',
        script: 'کانٛگٕرؠ / कांगड़ी',
        state: 'Jammu & Kashmir',
        regionId: 'north',
        material: 'Wild willow twigs (Salix purpurea) and fired earthen bowl',
        category: 'lifestyle',
        lifespan: '2-4 winters',
        degradeDays: 90,
        highlight: 'Zero-electricity personal winter heater made of baked clay cradled in natural woven willow.',
        description: 'Before electric room heaters and synthetic thermal blankets, Kashmiris survived sub-zero winters with the Kangri. An inner earthen bowl (Kundal) holds glowing biomass embers, surrounded by intricately woven biodegradable willow twigs. At the end of its life, it decomposes harmlessly.',
        botanicalOrEarthenSource: 'Salix (Willow) twigs and Kashmir valley clay',
        traditionalCommunities: 'Kashmiri Kani craftspeople and Charari Sharief potters',
        modernRevivalStatus: 'Iconic intangible cultural heritage that remains carbon-neutral personal heating.'
      },
      {
        id: 'babool-datun-north',
        name: 'Babool & Neem Morning Datun',
        localName: 'Kikar / Babool Datun',
        script: 'कीकर दातुन',
        state: 'Punjab, Haryana & Western UP',
        regionId: 'north',
        material: 'Fresh pruned Acacia nilotica branchlets',
        category: 'farming',
        lifespan: 'Single morning use',
        degradeDays: 7,
        highlight: 'Pruned from hardy arid farm borders; releases astringent gum-tightening tannins.',
        description: 'Babool (Kikar) flourishes naturally along farm bunds across the plains. Farmers prune branches every morning, chew the fiber to clean their teeth, and throw the twig back into farm furrows where it fertilizes wheat and mustard crops.',
        botanicalOrEarthenSource: 'Acacia nilotica (Babool)',
        traditionalCommunities: 'Agrarian farming families across North-West India',
        modernRevivalStatus: 'Resurging as an organic alternative to nylon microplastic oral products.'
      }
    ]
  },
  {
    id: 'south',
    name: 'Southern Peninsular India',
    hindiName: 'दक्षिण भारत (प्रायद्वीपीय)',
    statesIncluded: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'],
    climateProfile: 'Tropical maritime, heavy Western Ghats monsoon, coastal palms, red loamy soil',
    ecologicalKeystone: 'Coconut palm, Areca nut palm, and broad tropical banana plantations',
    primaryEcoMaterials: ['Vazhai Ilai (Banana Leaf)', 'Areca Nut Leaf Sheaths', 'Coir (Coconut Husk Fiber)', 'Vetiver (Khus) Roots'],
    bannerHighlight: 'The global vanguard of plant-leaf dining, coir geotextiles, and fragrant vetiver air cooling.',
    practices: [
      {
        id: 'vazhai-ilai',
        name: 'Vazhai Ilai (Banana Leaf Feasting)',
        localName: 'Vazhai Ilai Virundhu',
        script: 'வாழை இலை விருந்து / ಬಾಳೆ ಎಲೆ',
        state: 'Tamil Nadu & Kerala',
        regionId: 'south',
        material: 'Fresh whole cut leaf of Musa paradisiaca (Plantain)',
        category: 'dining',
        lifespan: 'Single meal (Sadhya / Kalyana Virundhu)',
        degradeDays: 5,
        highlight: 'Epigallocatechin gallate (EGCG) antioxidants melt into steaming hot sambar and rice.',
        description: 'The crowning glory of South Indian banquets. Fresh emerald banana leaves contain natural wax that resists boiling curries, while releasing polyphenols into hot rice. Leftovers and leaves are immediately eaten by roaming temple cows or decomposed into black garden compost within 5 days.',
        botanicalOrEarthenSource: 'Musa paradisiaca (Banana plant leaf)',
        traditionalCommunities: 'Banana farming families across the Cauvery and Periyar river deltas',
        modernRevivalStatus: 'Mandatory in prestigious catering and certified zero-waste Indian weddings worldwide.'
      },
      {
        id: 'areca-leaf-sheath',
        name: 'Areca Palm Leaf Molded Tableware',
        localName: 'Paaku Mattai / Adike Thatte',
        script: 'பாக்கு மட்டை / ಅಡಿಕೆ ತಟ್ಟೆ',
        state: 'Karnataka (Malnad) & Kerala',
        regionId: 'south',
        material: 'Naturally fallen leaf sheaths of the Areca catechu tree',
        category: 'dining',
        lifespan: 'Sturdy single-use or dry reuse',
        degradeDays: 30,
        highlight: 'Zero trees felled: naturally shed sheath pressed with steam heat, 100% leak-proof.',
        description: 'In the Areca nut orchards of coastal Karnataka, trees shed broad fibrous sheaths naturally. Instead of burning them, rural micro-enterprises wash them in spring water and heat-press them into elegant plates, bowls, and cutlery. Absolutely zero chemicals or glues are added.',
        botanicalOrEarthenSource: 'Areca catechu (Betel nut palm fallen sheath)',
        traditionalCommunities: 'Malnad & Coastal farmer collectives and rural women cooperatives',
        modernRevivalStatus: 'Exported to over 40 countries as the gold standard alternative to single-use plastics.'
      },
      {
        id: 'coir-geotextiles',
        name: 'Coir (Kayar) Husk Rope & Soil Geotextiles',
        localName: 'Kayar / Thenga Naar',
        script: 'കയർ / ತೆಂಗಿನ ನಾರು',
        state: 'Kerala & Tamil Nadu',
        regionId: 'south',
        material: 'Retting fibrous husk of Cocos nucifera',
        category: 'farming',
        lifespan: '3-5 years on slopes -> Soil enrichment',
        degradeDays: 730,
        highlight: 'High lignin natural fiber that stabilizes highway slopes and hillside landslides, then rots into humus.',
        description: 'Extracted through gentle saltwater retting in backwaters, coconut coir is woven into thick mesh geotextiles. Laid over landslide-prone mountain slopes, it anchors saplings and prevents soil washouts. As the vegetation takes root over 2-3 years, the coir rots completely into fertile humus.',
        botanicalOrEarthenSource: 'Cocos nucifera (Coconut husk)',
        traditionalCommunities: 'Kerala Coir Board weavers and coastal backwater artisans',
        modernRevivalStatus: 'Used globally for eco-engineering, riverbank restoration, and peat-free horticulture.'
      },
      {
        id: 'vetiver-cooling',
        name: 'Vetiver (Vettiveru) Cooling Screens & Bath Scrubs',
        localName: 'Vettiveru / Khus',
        script: 'வெட்டிவேர் / ರಾಮಂಚ',
        state: 'Tamil Nadu & Kerala',
        regionId: 'south',
        material: 'Aromatic roots of Chrysopogon zizanioides',
        category: 'lifestyle',
        lifespan: '1-2 summer seasons',
        degradeDays: 45,
        highlight: 'Naturally antibacterial root woven into window mats; cools rooms with water evaporation.',
        description: 'Vetiver root mats are hung over doorways and windows during blazing summer months. Sprayed with cool water, the wind blowing through cools the room by 6°C while diffusing a soothing woody scent. Discarded mats are woven into exfoliating bath loofahs or returned to garden soil.',
        botanicalOrEarthenSource: 'Chrysopogon zizanioides (Vetiver roots)',
        traditionalCommunities: 'Tribal communities along the Western Ghats foothills',
        modernRevivalStatus: 'Replaced synthetic plastic air fresheners and plastic body loofahs in zero-waste spas.'
      }
    ]
  },
  {
    id: 'east',
    name: 'Eastern India & Bengal Basin',
    hindiName: 'पूर्वी भारत एवं बंगाल बेसिन',
    statesIncluded: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand'],
    climateProfile: 'Tropical wet, fertile deltaic floodplains, lush Sal and bamboo forests',
    ecologicalKeystone: 'Golden Jute bast fiber, Sal forest canopies, and Gangetic delta silt',
    primaryEcoMaterials: ['Golden Jute (Pat / Paat)', 'Sal Leaf Pattals', 'Sabai Grass', 'Terracotta Bankura Clay'],
    bannerHighlight: 'Home of the global Jute revolution, tribal Sal leaf stitch-craft, and earthen Bhar tea traditions.',
    practices: [
      {
        id: 'bengal-jute-paat',
        name: 'Golden Jute (Paat) Sacks & Gunny Twine',
        localName: 'Sonali Aansh (সোনালী আঁশ)',
        script: 'পাট / সোনালী আঁশ',
        state: 'West Bengal & Bihar',
        regionId: 'east',
        material: 'Corchorus bast plant stem fibers',
        category: 'storage',
        lifespan: '3-6 years of agricultural shipping',
        degradeDays: 90,
        highlight: 'Absorbs 15 tonnes of CO2 per hectare in 120 days; grain respire without synthetic mold.',
        description: 'Grown extensively across the fertile Gangetic delta, golden jute was India’s chief sustainable export for centuries. Jute sacks allow stored potatoes, rice, and onions to breathe naturally without sweat moisture, unlike suffocating plastic bags.',
        botanicalOrEarthenSource: 'Corchorus olitorius / capsularis (Golden Jute)',
        traditionalCommunities: 'Bengal delta jute farmers and traditional loom weavers',
        modernRevivalStatus: 'Protected under the Jute Packaging Materials Act; expanding into biodegradable shopping bags.'
      },
      {
        id: 'odisha-sal-leaf',
        name: 'Mayurbhanj Tribal Sal Leaf Stitch-Craft',
        localName: 'Sal Patra Khali & Dana',
        script: 'ଶାଳ ପତ୍ର ଖଳି / साल पत्ता',
        state: 'Odisha & Jharkhand',
        regionId: 'east',
        material: 'Shorea robusta mature forest leaves',
        category: 'dining',
        lifespan: 'Single-use',
        degradeDays: 14,
        highlight: 'Santhal and tribal women gather naturally shed forest leaves, stitching with wild bamboo grass.',
        description: 'In the Simlipal forest belts of Mayurbhanj, tribal women collect mature Sal leaves from the forest floor without cutting trees. They interlock the leaves with fine wild grass twigs into bowls (Dana) and plates (Khali), serving temple Prasad and tribal celebrations.',
        botanicalOrEarthenSource: 'Shorea robusta (Sal tree leaves)',
        traditionalCommunities: 'Santhal, Ho, and Munda indigenous forest dwellers',
        modernRevivalStatus: 'Organized into ORMAS (Odisha Rural Development and Marketing Society) sustainable exports.'
      },
      {
        id: 'kolkata-bhar',
        name: 'Kolkata Earthen Bhar (Chai Pot)',
        localName: 'Matir Bhar (মাটির ভাঁড়)',
        script: 'মাটির ভাঁড়',
        state: 'West Bengal',
        regionId: 'east',
        material: 'Alluvial clay from the Hooghly river banks',
        category: 'dining',
        lifespan: 'Single-use',
        degradeDays: 20,
        highlight: 'Infuses tea with natural petrichor; smashed on street curbs where monsoons liquefy it into silt.',
        description: 'The Kolkata street tea experience is incomplete without the flared clay Bhar. Potters in Kumartuli and rural Nadia spin hundreds of thousands daily. Smashed cups on train tracks and roadside drains dissolve seamlessly into street silt within 3 weeks of rain.',
        botanicalOrEarthenSource: 'Hooghly river silt clay',
        traditionalCommunities: 'Kumartuli and Nadia Kumhars (traditional potters)',
        modernRevivalStatus: 'Preserved by Kolkata civic culture as a proud plastic-free heritage trademark.'
      },
      {
        id: 'sabai-grass-mayurbhanj',
        name: 'Sabai Grass Twine & Storage Baskets',
        localName: 'Sabai Ghasha Kaam',
        script: 'ସବାଇ ଘାସ / सबई घास',
        state: 'Odisha & West Bengal',
        regionId: 'east',
        material: 'Eulaliopsis binata wild perennial grass',
        category: 'storage',
        lifespan: '5-15 years',
        degradeDays: 120,
        highlight: 'Known as the "Money Grass" that stops soil erosion on barren tribal hillocks.',
        description: 'Sabai grass grows wild on rocky uncultivable soil. Tribal craftswomen harvest the long blades, hand-twist them into tensile ropes and colorful, natural-dyed laundry hampers, grain baskets, and floor mats that outlive synthetic plastic storage crates.',
        botanicalOrEarthenSource: 'Eulaliopsis binata (Sabai Grass)',
        traditionalCommunities: 'Mayurbhanj tribal self-help women artisans',
        modernRevivalStatus: 'Featured in high-end sustainable home decor across European and Japanese markets.'
      }
    ]
  },
  {
    id: 'west',
    name: 'Western Arid & Coastal India',
    hindiName: 'पश्चिम भारत (शुष्क एवं तटीय)',
    statesIncluded: ['Rajasthan', 'Gujarat', 'Maharashtra', 'Goa'],
    climateProfile: 'Thar desert extremes, semi-arid scrublands, Konkan humid coastal tropics',
    ecologicalKeystone: 'Desert lime, Thar river clay, Kutch grass, and Konkan coconut shells',
    primaryEcoMaterials: ['Desert Alluvial Mud & Cowdung', 'Kutch Lippan Clay', 'Desert Acacia Twigs', 'Konkan Coconut Bowls'],
    bannerHighlight: 'Pioneers of passive bioclimatic desert architecture, terracotta water chilling, and coastal shell crafts.',
    practices: [
      {
        id: 'kutch-lippan',
        name: 'Kutch Lippan Kaam (Camel/Cow Dung & Clay Plaster)',
        localName: 'Lippan Kaam / Bhunga Plaster',
        script: 'લીંપણ કામ / लिप्पण',
        state: 'Gujarat (Kutch)',
        regionId: 'west',
        material: 'Dung of pastoral cattle/camels, alluvial clay, rice husk, chuna',
        category: 'architecture',
        lifespan: '1-3 years before re-smearing',
        degradeDays: 40,
        highlight: 'Thermal earth envelope keeping circular Bhunga desert homes cool at 48°C heat.',
        description: 'In the White Desert of Kutch, artisans plaster the thick circular walls of their Bhungas with a mixture of animal dung, fine clay, and chaff. This natural insulation keeps the interior cool in scorching heat and warm during freezing desert nights, with zero toxic paints.',
        botanicalOrEarthenSource: 'Desert alluvial silt & pastoral manure',
        traditionalCommunities: 'Rabari, Mutwa, and Marwada Meghwal artisan communities',
        modernRevivalStatus: 'Admired by green architects globally for earthquake-resistant, zero-carbon insulation.'
      },
      {
        id: 'rajasthani-surahi',
        name: 'Pokhran & Alwar Terracotta Surahi & Matka',
        localName: 'Pokhran ki Surahi / Matka',
        script: 'पोकरण की सुराही / मटका',
        state: 'Rajasthan',
        regionId: 'west',
        material: 'Pink & red desert clay with natural mica flecks',
        category: 'storage',
        lifespan: '1-2 summer seasons',
        degradeDays: 30,
        highlight: 'Latent heat evaporation chills drinking water without a single watt of electricity or CFC gas.',
        description: 'In the searing heat of the Thar Desert, the long-necked Surahi and round Matka have provided cool, sweet drinking water for centuries. The clay’s microscopic pores allow slow surface seepage; the arid desert wind evaporates this moisture, drawing heat from the water inside.',
        botanicalOrEarthenSource: 'Thar desert red and white riverbed clay',
        traditionalCommunities: 'Pokhran potters and Marwar traditional craftsmen',
        modernRevivalStatus: 'Active in almost every Indian railway kiosk, bus depot, and rural courtyard.'
      },
      {
        id: 'konkan-coconut-cutlery',
        name: 'Konkan Coconut Shell Bowls & Cutlery',
        localName: 'Naralachi Vati',
        script: 'नारळाची वाटी',
        state: 'Maharashtra & Goa',
        regionId: 'west',
        material: 'Endocarp shell of mature coastal coconuts',
        category: 'dining',
        lifespan: '2-5 years as dining bowl -> Garden mulch',
        degradeDays: 360,
        highlight: 'Upcycles discarded coconut shells into hard, water-impermeable bowls and ladles.',
        description: 'Along the Konkan coastline, millions of hard coconut shells are generated as waste. Traditional artisans sand them smooth with coconut oil, forming heat-resistant bowls, spoons, and cooking spatulas that withstand boiling curry without toxic chemical coatings.',
        botanicalOrEarthenSource: 'Cocos nucifera endocarp (Inner hard coconut shell)',
        traditionalCommunities: 'Konkan coastal craftsmen and Goan rural artisans',
        modernRevivalStatus: 'Major zero-waste restaurant staple for smoothie bowls and eco-cutlery.'
      }
    ]
  },
  {
    id: 'central',
    name: 'Central Tribal Heartlands',
    hindiName: 'मध्य भारत (जनजातीय अंचल)',
    statesIncluded: ['Madhya Pradesh', 'Chhattisgarh'],
    climateProfile: 'Central dry deciduous forests, rocky plateaus, monsoon river catchments',
    ecologicalKeystone: 'Sal, Mahua, Palash, and dense bamboo groves',
    primaryEcoMaterials: ['Palash (Butea) Leaves', 'Wild Bamboo Culms', 'Mahua Seed Oil Resin', 'Forest Clay'],
    bannerHighlight: 'Vast tribal repositories of forest leaf tableware, unlacquered bamboo grain storage, and herbal resins.',
    practices: [
      {
        id: 'palash-dona-bastar',
        name: 'Bastar Tribal Palash & Mahua Leaf Dona',
        localName: 'Mahul / Palash Dona Pattal',
        script: 'पलाश दोना पत्तल',
        state: 'Chhattisgarh (Bastar) & Madhya Pradesh',
        regionId: 'central',
        material: 'Broad leaves of Butea monosperma (Flame of the Forest)',
        category: 'dining',
        lifespan: 'Single banquet meal',
        degradeDays: 12,
        highlight: 'Antimicrobial flavonoids protect food; decomposes in less than two weeks in moist soil.',
        description: 'In the tribal haats (weekly markets) of Bastar and Mandla, food is served exclusively in freshly gathered Palash leaf cups. The leaves impart a subtle herbal fragrance and are discarded under trees where they disintegrate into organic humus within two monsoons.',
        botanicalOrEarthenSource: 'Butea monosperma (Palash) and Bauhinia vahlii (Mahul creeper)',
        traditionalCommunities: 'Gond, Baiga, and Maria tribal forest gathers',
        modernRevivalStatus: 'Supported through TRIFED and minor forest produce procurement programs.'
      },
      {
        id: 'bamboo-kothi-grain',
        name: 'Baiga Earthen-Lined Bamboo Grain Silo (Kothi)',
        localName: 'Bans ki Kothi / Dholi',
        script: 'बांस की कोठी / ढोली',
        state: 'Madhya Pradesh & Chhattisgarh',
        regionId: 'central',
        material: 'Woven wild bamboo strips plastered with cow dung and red mud',
        category: 'storage',
        lifespan: '10-25 years',
        degradeDays: 180,
        highlight: 'Naturally pest-repellent grain silo requiring zero chemical synthetic fumigation tablets.',
        description: 'Baiga tribes weave colossal 8-foot grain silos from wild forest bamboo and seal the seams with mud, neem leaf paste, and cow dung. Grain kept inside stays dry, cool, and free from weevils for years without synthetic pesticides like aluminum phosphide.',
        botanicalOrEarthenSource: 'Dendrocalamus strictus (Male Bamboo) & neem paste',
        traditionalCommunities: 'Baiga and Gond tribal communities',
        modernRevivalStatus: 'Studied by organic farming organizations for chemical-free seed bank preservation.'
      }
    ]
  },
  {
    id: 'northeast',
    name: 'Northeastern Rainforests & Brahmaputra Valley',
    hindiName: 'पूर्वोत्तर भारत एवं ब्रह्मपुत्र घाटी',
    statesIncluded: ['Assam', 'Meghalaya', 'Nagaland', 'Arunachal Pradesh', 'Manipur', 'Mizoram', 'Tripura', 'Sikkim'],
    climateProfile: 'Sub-tropical to alpine rainforests, high precipitation, misty hills, river islands',
    ecologicalKeystone: 'Gigantic bamboo species, Toko palm leaves, water hyacinth, and black Longpi stone clay',
    primaryEcoMaterials: ['Bhaluka Bamboo', 'Toko Palm (Livistona)', 'Black Serpentine Stone Clay', 'Water Hyacinth Fiber'],
    bannerHighlight: 'The world’s most advanced bamboo civilization, living root bridges, and black stone-clay cooking pottery.',
    practices: [
      {
        id: 'assam-sunga-saul',
        name: 'Sunga Saul (Green Bamboo Stem Cooking Tubes)',
        localName: 'Sunga Saul / Chunga Pitha',
        script: 'চুঙা চাউল / বাঁশের চোঙা',
        state: 'Assam & Nagaland',
        regionId: 'northeast',
        material: 'Freshly cut green hollow internodes of Bhaluka bamboo',
        category: 'dining',
        lifespan: 'Single cooking cycle -> Firewood / Compost',
        degradeDays: 45,
        highlight: 'Zero metal pots or gas: rice steams inside fresh bamboo resin over open wood embers.',
        description: 'During Magh Bihu and tribal celebrations, sticky Bora rice is packed into fresh green bamboo tubes with river water and roasted directly over charcoal. The inner bamboo membrane seals moisture, infusing sweet natural vanillin flavors. After cooking, the spent bamboo is returned to the soil.',
        botanicalOrEarthenSource: 'Bambusa balcooa (Bhaluka green bamboo)',
        traditionalCommunities: 'Assamese, Mising, and Naga indigenous communities',
        modernRevivalStatus: 'Celebrated culinary ecotourism specialty and zero-waste slow cooking technique.'
      },
      {
        id: 'longpi-black-pottery',
        name: 'Longpi (Hampai) Black Stone Cookware',
        localName: 'Longpi Hampai',
        script: 'ଲୋଙ୍ଗପି କଳା ମାଟି / Longpi Ware',
        state: 'Manipur (Ukhrul)',
        regionId: 'northeast',
        material: 'Weathered black serpentine stone & weathered alluvial clay',
        category: 'dining',
        lifespan: 'Decades of use -> Non-toxic earth return',
        degradeDays: 60,
        highlight: 'No potter’s wheel used: crushed black rock hand-molded and polished with wild Machi leaves.',
        description: 'In the Tangkhul Naga village of Longpi, artisans crush local black rock and clay with river water, shaping pots entirely by hand without a wheel. Once fired, they rub hot pots with the leaves of the wild Machi tree, creating a lustrous, non-toxic, non-stick black surface that replaces Teflon.',
        botanicalOrEarthenSource: 'Serpentine rock, river clay, and wild Machi leaves',
        traditionalCommunities: 'Tangkhul Naga artisans of Ukhrul district',
        modernRevivalStatus: 'Acclaimed globally as an ultra-pure, zero-chemical replacement for non-stick cookware.'
      },
      {
        id: 'toko-leaf-thatch',
        name: 'Toko Leaf Waterproof Rainwear & Thatch',
        localName: 'Toko Paat / Japi',
        script: 'টোকো পাত / জাপি',
        state: 'Assam & Arunachal Pradesh',
        regionId: 'northeast',
        material: 'Livistona jenkinsiana (Toko palm broad fans)',
        category: 'lifestyle',
        lifespan: '5-10 years of heavy monsoon downpours',
        degradeDays: 90,
        highlight: 'Natural waxy leaf fans woven into conical Japi hats that shield farmers from torrential rains.',
        description: 'The iconic Assamese Japi hat and stilt house roofs are crafted from wild Toko palm leaves. The naturally waterproof, tough fibrous structure resists monsoon deluges for years without rotting, completely eliminating synthetic PVC tarpaulins and plastic umbrellas.',
        botanicalOrEarthenSource: 'Livistona jenkinsiana (Toko palm)',
        traditionalCommunities: 'Assamese rural artisans and Nyishi / Adi tribes of Arunachal',
        modernRevivalStatus: 'Honored as Assam’s premier cultural symbol and sustainable rain-gear craft.'
      },
      {
        id: 'water-hyacinth-craft',
        name: 'Brahmaputra Water Hyacinth Wicker',
        localName: 'Pani Meteka Craft',
        script: 'পানী মেটেকা',
        state: 'Assam & Meghalaya',
        regionId: 'northeast',
        material: 'Eichhornia crassipes (Invasive aquatic weed stems)',
        category: 'lifestyle',
        lifespan: '3-8 years',
        degradeDays: 60,
        highlight: 'Harvests an aggressive invasive aquatic weed choking wetlands to create zero-plastic home goods.',
        description: 'Water hyacinth aggressively clogs the wetlands and oxbow lakes of the Brahmaputra valley. In a brilliant eco-adaptation, rural women harvest the choking stems, sun-dry them, and weave them into soft, durable bags, mats, and baskets, turning an ecological nuisance into income.',
        botanicalOrEarthenSource: 'Eichhornia crassipes (Water hyacinth stem fiber)',
        traditionalCommunities: 'Assam riparian women self-help cooperatives',
        modernRevivalStatus: 'Supported by UNDP and North Eastern Development Finance Corporation.'
      }
    ]
  }
];

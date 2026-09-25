export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  practiceCategory: 'kulhar' | 'pattal' | 'datun' | 'reetha' | 'jute' | 'matka' | 'compost' | 'other';
  practiceName: string;
  count: number; // e.g., 2 cups, 1 load, 1 platter, etc.
  notes: string;
  locationCity: string;
  locationState: string;
  estimatedPlasticAvoided: number; // count of items
  estimatedCompostGrams: number; // grams returned to soil
  estimatedMicroplasticsPrevented: number; // count of particles
}

export interface CommunityEcoNode {
  id: string;
  city: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';
  coords: { x: number; y: number }; // percentage on stylized SVG map of India (0-100)
  activePractioners: number;
  topPractice: string;
  monthlyPlasticDivertedKg: number;
  localArtisanCollective: string;
  recentTestimonial: string;
}

export const SEED_COMMUNITY_NODES: CommunityEcoNode[] = [
  {
    id: 'node-varanasi',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North',
    coords: { x: 58, y: 44 },
    activePractioners: 1420,
    topPractice: 'Alluvial Kulhars & Sikora',
    monthlyPlasticDivertedKg: 2850,
    localArtisanCollective: 'Prajapati Kumhar Potter Parishad',
    recentTestimonial: 'Over 40 tea stalls near Assi Ghat exclusively use unglazed river-silt kulhars.'
  },
  {
    id: 'node-kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    coords: { x: 74, y: 52 },
    activePractioners: 2150,
    topPractice: 'Matir Bhar & Jute Shopping Bags',
    monthlyPlasticDivertedKg: 4320,
    localArtisanCollective: 'Nadia & Kumartuli Clay Collective',
    recentTestimonial: 'Daily office commuters refuse plastic cups, choosing 100% biodegradable roadside bhars.'
  },
  {
    id: 'node-madurai',
    city: 'Madurai',
    state: 'Tamil Nadu',
    region: 'South',
    coords: { x: 44, y: 88 },
    activePractioners: 1890,
    topPractice: 'Vazhai Ilai (Banana Leaf) Dining',
    monthlyPlasticDivertedKg: 3910,
    localArtisanCollective: 'Cauvery Delta Agro-Artisan Guild',
    recentTestimonial: 'Catering guilds across Madurai ban all styrofoam, returning 100% to temple cow barns.'
  },
  {
    id: 'node-udupi',
    city: 'Udupi / Mangaluru',
    state: 'Karnataka',
    region: 'South',
    coords: { x: 36, y: 78 },
    activePractioners: 940,
    topPractice: 'Areca Palm Leaf Sheath Plates',
    monthlyPlasticDivertedKg: 1980,
    localArtisanCollective: 'Malnad Areca Growers Cooperative',
    recentTestimonial: 'Naturally fallen palm sheaths pressed into restaurant delivery platters with zero adhesives.'
  },
  {
    id: 'node-kutch',
    city: 'Bhuj (Kutch)',
    state: 'Gujarat',
    region: 'West',
    coords: { x: 22, y: 47 },
    activePractioners: 720,
    topPractice: 'Lippan Earth Plaster & Clay Pots',
    monthlyPlasticDivertedKg: 1120,
    localArtisanCollective: 'Kutch Mahila Vikas Sangathan (KMVS)',
    recentTestimonial: 'Desert bhungas coated in cowdung-earth maintain comfortable 28°C inside during 46°C heatwaves.'
  },
  {
    id: 'node-mayurbhanj',
    city: 'Baripada (Mayurbhanj)',
    state: 'Odisha',
    region: 'East',
    coords: { x: 69, y: 54 },
    activePractioners: 1100,
    topPractice: 'Sal Leaf Pattal & Sabai Grass',
    monthlyPlasticDivertedKg: 2400,
    localArtisanCollective: 'Simlipal Tribal Forest Self-Help Federations',
    recentTestimonial: 'Tribal women gather fallen sal leaves, stitching them with wild bamboo splints.'
  },
  {
    id: 'node-bastar',
    city: 'Jagdalpur (Bastar)',
    state: 'Chhattisgarh',
    region: 'Central',
    coords: { x: 53, y: 60 },
    activePractioners: 860,
    topPractice: 'Palash Leaf Cups & Bamboo Silos',
    monthlyPlasticDivertedKg: 1540,
    localArtisanCollective: 'Bastar Gond Agro-Forestry Network',
    recentTestimonial: 'Local weekly haats have completely eliminated single-use polythene via forest dona cups.'
  },
  {
    id: 'node-guwahati',
    city: 'Guwahati / Majuli',
    state: 'Assam',
    region: 'Northeast',
    coords: { x: 86, y: 39 },
    activePractioners: 1340,
    topPractice: 'Green Bamboo Cooking & Toko Fronds',
    monthlyPlasticDivertedKg: 2190,
    localArtisanCollective: 'Brahmaputra Bamboo & Cane Guild',
    recentTestimonial: 'Rice steamed inside fresh green bamboo cylinders, discarded into organic farm compost.'
  },
  {
    id: 'node-jaipur',
    city: 'Jaipur / Pokhran',
    state: 'Rajasthan',
    region: 'West',
    coords: { x: 38, y: 39 },
    activePractioners: 1650,
    topPractice: 'Terracotta Surahi & Babool Datun',
    monthlyPlasticDivertedKg: 3100,
    localArtisanCollective: 'Marwar Earthen Potters Union',
    recentTestimonial: 'Public pyaoos chilling fresh drinking water with zero CFC refrigerants or electricity.'
  }
];

export const INITIAL_USER_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'sample-entry-6',
    date: new Date(Date.now() - 86400000 * 6).toISOString().split('T')[0],
    timestamp: Date.now() - 86400000 * 6,
    practiceCategory: 'jute',
    practiceName: 'Woven Golden Jute Vegetable Bag',
    count: 3,
    notes: 'Used heavy jute gunny bag for weekly mandi groceries; refused 3 thin polybags.',
    locationCity: 'Kolkata',
    locationState: 'West Bengal',
    estimatedPlasticAvoided: 3,
    estimatedCompostGrams: 90,
    estimatedMicroplasticsPrevented: 75000
  },
  {
    id: 'sample-entry-5',
    date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
    timestamp: Date.now() - 86400000 * 5,
    practiceCategory: 'matka',
    practiceName: 'Terracotta Matka Chilled Water Refill',
    count: 2,
    notes: 'Filled brass water flask from red clay pot at home instead of buying PET bottled water.',
    locationCity: 'Jaipur',
    locationState: 'Rajasthan',
    estimatedPlasticAvoided: 2,
    estimatedCompostGrams: 0,
    estimatedMicroplasticsPrevented: 50000
  },
  {
    id: 'sample-entry-4',
    date: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
    timestamp: Date.now() - 86400000 * 4,
    practiceCategory: 'pattal',
    practiceName: 'Sal Leaf Pattal Community Feast Platter',
    count: 4,
    notes: 'Served midday family meal on pressed shorea robusta leaf platters stitched with bamboo splints.',
    locationCity: 'Ranchi',
    locationState: 'Jharkhand',
    estimatedPlasticAvoided: 4,
    estimatedCompostGrams: 200,
    estimatedMicroplasticsPrevented: 100000
  },
  {
    id: 'sample-entry-1',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    timestamp: Date.now() - 86400000 * 3,
    practiceCategory: 'kulhar',
    practiceName: 'Morning Chai in Fired Clay Kulhar',
    count: 2,
    notes: 'Visited local tea stall and asked for unglazed kulhar instead of plastic-lined paper cup. Smashed the cup into my balcony plant bed afterwards for drainage!',
    locationCity: 'New Delhi',
    locationState: 'Delhi NCR',
    estimatedPlasticAvoided: 2,
    estimatedCompostGrams: 160,
    estimatedMicroplasticsPrevented: 50000
  },
  {
    id: 'sample-entry-2',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    timestamp: Date.now() - 86400000 * 2,
    practiceCategory: 'datun',
    practiceName: 'Fresh Neem Datun Twig Routine',
    count: 1,
    notes: 'Chewed fresh neem branchlet from neighborhood tree. Gums felt exceptionally clean, discarded spent fibers straight into garden compost.',
    locationCity: 'Bengaluru',
    locationState: 'Karnataka',
    estimatedPlasticAvoided: 1,
    estimatedCompostGrams: 20,
    estimatedMicroplasticsPrevented: 15000
  },
  {
    id: 'sample-entry-3',
    date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    timestamp: Date.now() - 86400000 * 1,
    practiceCategory: 'reetha',
    practiceName: 'Reetha Soapberry Liquid Laundry',
    count: 2,
    notes: 'Washed whole load of cotton linens using boiled soapnut broth. Smelled clean, zero synthetic fragrance, and drained greywater to our papaya tree.',
    locationCity: 'Pune',
    locationState: 'Maharashtra',
    estimatedPlasticAvoided: 2,
    estimatedCompostGrams: 100,
    estimatedMicroplasticsPrevented: 700000
  },
  {
    id: 'sample-entry-today',
    date: new Date().toISOString().split('T')[0],
    timestamp: Date.now(),
    practiceCategory: 'kulhar',
    practiceName: 'Evening Chai in Terracotta Kulhar',
    count: 3,
    notes: 'Family gathering with fresh ginger chai in earthenware cups.',
    locationCity: 'Varanasi',
    locationState: 'Uttar Pradesh',
    estimatedPlasticAvoided: 3,
    estimatedCompostGrams: 240,
    estimatedMicroplasticsPrevented: 75000
  }
];

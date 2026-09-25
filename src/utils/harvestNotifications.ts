import { SeasonalCycle } from '../data/seasonalData';
import { soundscape } from './soundscape';

export type RegionalZoneId = 'all' | 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';

export interface RegionalZoneInfo {
  id: RegionalZoneId;
  name: string;
  hindiName: string;
  statesSummary: string;
}

export const REGIONAL_ZONES: RegionalZoneInfo[] = [
  {
    id: 'all',
    name: 'Pan-India (All Regions)',
    hindiName: 'अखिल भारतीय (सभी क्षेत्र)',
    statesSummary: 'National agricultural rhythms across all 6 cultural zones'
  },
  {
    id: 'north',
    name: 'North India & Himalayas',
    hindiName: 'उत्तर भारत एवं हिमालय',
    statesSummary: 'Punjab, Haryana, UP, Uttarakhand, Himachal, Delhi NCR'
  },
  {
    id: 'south',
    name: 'Peninsular South India',
    hindiName: 'दक्षिण भारत',
    statesSummary: 'Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana'
  },
  {
    id: 'east',
    name: 'East India & Delta Wetlands',
    hindiName: 'पूर्वी भारत एवं डेल्टा',
    statesSummary: 'West Bengal, Odisha, Bihar, Jharkhand'
  },
  {
    id: 'west',
    name: 'West India & Arid Deccan',
    hindiName: 'पश्चिम भारत एवं दक्कन',
    statesSummary: 'Maharashtra, Gujarat, Rajasthan, Goa'
  },
  {
    id: 'central',
    name: 'Central India & Forest Belts',
    hindiName: 'मध्य भारत एवं वन क्षेत्र',
    statesSummary: 'Madhya Pradesh, Chhattisgarh'
  },
  {
    id: 'northeast',
    name: 'Northeast India & River Valleys',
    hindiName: 'पूर्वोत्तर भारत',
    statesSummary: 'Assam, Meghalaya, Arunachal, Manipur, Nagaland, Tripura, Mizoram'
  }
];

export interface HarvestNotificationSettings {
  enabled: boolean;
  regionId: RegionalZoneId;
  lastNotifiedCycleId?: string;
  lastNotifiedTimestamp?: number;
}

export const HARVEST_STORAGE_KEY = 'mrittika_harvest_notification_settings_v1';

export function getStoredHarvestSettings(): HarvestNotificationSettings {
  try {
    const raw = localStorage.getItem(HARVEST_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Storage fallback
  }

  return {
    enabled: false,
    regionId: 'all'
  };
}

export function saveHarvestSettings(settings: HarvestNotificationSettings): void {
  try {
    localStorage.setItem(HARVEST_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage fallback
  }
}

// Generate region-specific harvest context for a given season
export function getRegionalHarvestBulletin(season: SeasonalCycle, regionId: RegionalZoneId): {
  headline: string;
  detail: string;
  recommendedMaterials: string[];
} {
  const rituShort = season.rituName.split(' ')[0];

  switch (season.id) {
    case 'sharad': // Sep - Oct (Kharif Harvest)
      if (regionId === 'north') {
        return {
          headline: `Kharif Paddy Harvest & Alluvial Terracotta Season in North India`,
          detail: `Paddy harvesting commences across Punjab, Haryana, and UP. Rice straw (Parali) bio-mulching active; Gangetic potters spin Diwali earthen diyas from fresh monsoon river silt.`,
          recommendedMaterials: ['Rice Straw Bio-Mulch', 'Alluvial Clay Diyas', 'Cotton Twine']
        };
      }
      if (regionId === 'south') {
        return {
          headline: `Kuruvai Harvest & Areca Palm Sheath Shedding in South India`,
          detail: `Cauvery delta Kuruvai paddy threshing peaks; natural Areca palm fronds drop in Malnad orchards, ready for heat-pressed dining platters without glues.`,
          recommendedMaterials: ['Areca Palm Sheath Plates', 'Banana Leaf Platters', 'Coir Ropes']
        };
      }
      if (regionId === 'east') {
        return {
          headline: `Golden Jute River Retting & Aman Paddy in Eastern Wetlands`,
          detail: `Corchorus jute stalks harvested and retted in Bengal and Assam waterways, yielding breathable grain storage bags; Sal leaves harvested from Chota Nagpur forests.`,
          recommendedMaterials: ['Golden Jute Sacks', 'Sal Leaf Pattals', 'Matir Bhar (Clay Cups)']
        };
      }
      if (regionId === 'west') {
        return {
          headline: `Kharif Pulses & Early Cotton Boll Picking in Western India`,
          detail: `Groundnut and millet harvest in Gujarat and Marathwada; raw organic desi cotton picking begins. Terracotta water vessels transition to festive earthenware.`,
          recommendedMaterials: ['Desi Cotton Sacks', 'Terracotta Handis', 'Neem Twigs']
        };
      }
      if (regionId === 'central') {
        return {
          headline: `Kodo-Kutki Millets & Forest Leaf Gathering in Central India`,
          detail: `Indigenous millets harvested in tribal belts of Bastar and Dindori; Sal and Mahua leaves woven with bamboo splints for village community dining.`,
          recommendedMaterials: ['Wild Sal Pattal Plates', 'Bamboo Baskets', 'Forest Mulch']
        };
      }
      if (regionId === 'northeast') {
        return {
          headline: `Kati Bihu Sali Paddy Rhythms & Toko Palm Fronds in Northeast`,
          detail: `Assam riverine paddy reaches ear-head maturity; Toko palm and bamboo weaving peak for weather-resistant storage granaries.`,
          recommendedMaterials: ['Woven Bamboo Duli', 'Toko Palm Fronds', 'Muga Bio-Fibers']
        };
      }
      return {
        headline: `Pan-India Kharif Harvest & Post-Monsoon Bio-Materials`,
        detail: `Paddy harvest underway across the nation. Golden jute retting completed, fresh parali mulch shields winter soils, and alluvial potteries fire Diwali diyas.`,
        recommendedMaterials: ['Golden Jute Sacks', 'Rice Straw Bio-Mulch', 'Unglazed Clay Diyas']
      };

    case 'hemant': // Nov - Dec (Rabi Sowing)
      if (regionId === 'north') {
        return {
          headline: `Winter Wheat Sowing & Sugarcane Crushing in North India`,
          detail: `Wheat and mustard drill-sown into moist loam. Winter sugarcane Kolhus produce bagasse for compost; Babool and neem datun tighten gums in cold dry air.`,
          recommendedMaterials: ['Sugarcane Bagasse Plates', 'Neem & Babool Datun', 'Handspun Khadi']
        };
      }
      if (regionId === 'south') {
        return {
          headline: `Samba Paddy Maturation & Coconut Husk Retting in South India`,
          detail: `Northeast monsoon nourishes Samba crop in Tamil Nadu. Fresh coconut husks soaked in backwaters for natural coir erosion mats and ropes.`,
          recommendedMaterials: ['Coir Geotextiles', 'Banana Leaf Dining', 'Clay Tawa']
        };
      }
      return {
        headline: `Rabi Sowing Commences & Indigenous Winter Fiber Season`,
        detail: `Farmers sow wheat, mustard, and chickpeas. Organic cotton and sugarcane bagasse replace synthetic packaging nationwide.`,
        recommendedMaterials: ['Desi Cotton Quilting', 'Bagasse Bio-Plates', 'Astringent Datun']
      };

    case 'shishir': // Jan - Feb (Late Winter / Magh)
      return {
        headline: `Lohri, Pongal & Magh Bihu Harvest Cycle`,
        detail: `Winter grain harvest celebrations! Freshly reaped golden grain offerings in earthen pots (Pongal Paanai) and bonfire ashes returning potash to crop fields.`,
        recommendedMaterials: ['Terracotta Harvest Pots', 'Rice Flour Alpana', 'Bamboo Winnowing Trays']
      };

    case 'vasant': // Mar - Apr (Rabi Harvest / Spring)
      return {
        headline: `Golden Rabi Harvest: Wheat, Mustard & Forest Blossom Flush`,
        detail: `The great spring harvest across India! Golden wheat fields reaped, Mahua blossom nectar collected in Central forests, and Palash flowers gathered for natural Holi dyes.`,
        recommendedMaterials: ['Palash Leaf Plates', 'Wheat Straw Fiber', 'Natural Herbal Pigments']
      };

    case 'grishma': // May - Jun (Summer / Zaid)
      return {
        headline: `Pre-Monsoon Earthen Cooling & Vetiver (Khus) Harvest`,
        detail: `Intense heatwaves met with ancient vernacular evaporative wisdom: red terracotta Matkas chilled without electricity and woven Khus grass screens soaked in water.`,
        recommendedMaterials: ['Terracotta Matka & Surahi', 'Vetiver (Khus) Grass Screens', 'Leaf Fans']
      };

    case 'varsha': // Jul - Aug (Monsoon / Kharif Sowing)
    default:
      return {
        headline: `Monsoon Awakening: Kharif Paddy Sowing & Tropical Canopy Flush`,
        detail: `The Southwest monsoon drenches the subcontinent! Paddy sapling transplantation, banana leaf dining in temple feasts, and fresh bamboo shoots gathered sustainably.`,
        recommendedMaterials: ['Fresh Banana Leaves', 'Toko Palm Rainwear', 'Coir Erosion Blankets']
      };
  }
}

export interface HarvestAlertPayload {
  title: string;
  body: string;
  regionName: string;
  seasonName: string;
  cycleId: string;
  timestamp: number;
  materials: string[];
}

// Request browser notification permission if available
export async function requestBrowserNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }

  try {
    const perm = await Notification.requestPermission();
    return perm;
  } catch {
    return 'default';
  }
}

// Send persistent browser alert and return payload for in-app toast display
export function triggerHarvestCycleAlert(
  season: SeasonalCycle,
  regionId: RegionalZoneId,
  isTestPreview: boolean = false
): HarvestAlertPayload {
  const bulletin = getRegionalHarvestBulletin(season, regionId);
  const zone = REGIONAL_ZONES.find(z => z.id === regionId) || REGIONAL_ZONES[0];
  
  const title = isTestPreview 
    ? `🌾 [Preview] Harvest Cycle Alert: ${season.rituName.split(' ')[0]} Active!`
    : `🌾 New Agricultural Cycle: ${season.rituName.split(' ')[0]} ${season.agriculturalCropCycle} Active!`;

  const body = `${bulletin.headline}. ${bulletin.detail}`;

  const payload: HarvestAlertPayload = {
    title,
    body,
    regionName: zone.name,
    seasonName: season.rituName,
    cycleId: `${season.id}-${new Date().getFullYear()}`,
    timestamp: Date.now(),
    materials: bulletin.recommendedMaterials
  };

  // Play gentle celebratory singing bowl chime
  soundscape.playMilestoneChime();

  // Trigger Native Web Notification API if permitted
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          tag: `harvest-cycle-${season.id}`,
          silent: false
        });
      } catch {
        // Notification constructor fallback (e.g. mobile or iframe restriction)
      }
    }
  }

  // Update storage with last notified cycle if not a preview
  if (!isTestPreview) {
    const current = getStoredHarvestSettings();
    saveHarvestSettings({
      ...current,
      lastNotifiedCycleId: payload.cycleId,
      lastNotifiedTimestamp: payload.timestamp
    });
  }

  return payload;
}

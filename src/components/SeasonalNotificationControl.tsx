import React, { useState, useEffect } from 'react';
import { SeasonalCycle, SEASONS_DATA } from '../data/seasonalData';
import { 
  getStoredHarvestSettings, 
  saveHarvestSettings, 
  HarvestNotificationSettings, 
  REGIONAL_ZONES, 
  RegionalZoneId, 
  triggerHarvestCycleAlert, 
  requestBrowserNotificationPermission,
  HarvestAlertPayload 
} from '../utils/harvestNotifications';
import { 
  Bell, 
  BellOff, 
  CheckCircle, 
  MapPin, 
  Sparkles, 
  Send, 
  RotateCw, 
  Info,
  ShieldCheck
} from 'lucide-react';

interface SeasonalNotificationControlProps {
  currentSeason: SeasonalCycle;
  onTriggerAlert: (alert: HarvestAlertPayload) => void;
  onSelectSeason: (seasonId: string) => void;
}

export const SeasonalNotificationControl: React.FC<SeasonalNotificationControlProps> = ({
  currentSeason,
  onTriggerAlert,
  onSelectSeason
}) => {
  const [settings, setSettings] = useState<HarvestNotificationSettings>(() => getStoredHarvestSettings());
  const [browserPerm, setBrowserPerm] = useState<string>('default');
  const [simulatedSeasonIndex, setSimulatedSeasonIndex] = useState<number>(0);

  // Check browser notification capabilities on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setBrowserPerm(Notification.permission);
    } else {
      setBrowserPerm('unsupported');
    }

    // Auto-check on load: if enabled and current cycle hasn't been alerted yet, send alert!
    if (settings.enabled) {
      const currentCycleId = `${currentSeason.id}-${new Date().getFullYear()}`;
      if (settings.lastNotifiedCycleId !== currentCycleId) {
        const payload = triggerHarvestCycleAlert(currentSeason, settings.regionId, false);
        onTriggerAlert(payload);
        setSettings(prev => ({
          ...prev,
          lastNotifiedCycleId: currentCycleId,
          lastNotifiedTimestamp: Date.now()
        }));
      }
    }
  }, []);

  // Handle Persistent Toggle
  const handleToggle = async () => {
    const nextEnabled = !settings.enabled;

    if (nextEnabled) {
      // Request browser permission
      const perm = await requestBrowserNotificationPermission();
      setBrowserPerm(perm);

      const updated: HarvestNotificationSettings = {
        ...settings,
        enabled: true,
        lastNotifiedCycleId: `${currentSeason.id}-${new Date().getFullYear()}`,
        lastNotifiedTimestamp: Date.now()
      };
      setSettings(updated);
      saveHarvestSettings(updated);

      // Send initial welcome harvest cycle alert
      const payload = triggerHarvestCycleAlert(currentSeason, settings.regionId, false);
      onTriggerAlert(payload);
    } else {
      const updated: HarvestNotificationSettings = {
        ...settings,
        enabled: false
      };
      setSettings(updated);
      saveHarvestSettings(updated);
    }
  };

  // Handle Region Change
  const handleRegionChange = (newRegion: RegionalZoneId) => {
    const updated: HarvestNotificationSettings = {
      ...settings,
      regionId: newRegion
    };
    setSettings(updated);
    saveHarvestSettings(updated);

    // If notifications are active, immediately preview the new region's bulletin
    if (settings.enabled) {
      const payload = triggerHarvestCycleAlert(currentSeason, newRegion, true);
      onTriggerAlert(payload);
    }
  };

  // Trigger Instant Test Alert
  const handleManualTestAlert = () => {
    const payload = triggerHarvestCycleAlert(currentSeason, settings.regionId, true);
    onTriggerAlert(payload);
  };

  // Simulate Next Harvest Cycle Shift
  const handleSimulateCycleShift = () => {
    const nextIdx = (simulatedSeasonIndex + 1) % SEASONS_DATA.length;
    setSimulatedSeasonIndex(nextIdx);
    const nextSeason = SEASONS_DATA[nextIdx];
    onSelectSeason(nextSeason.id);

    const payload = triggerHarvestCycleAlert(nextSeason, settings.regionId, true);
    onTriggerAlert(payload);
  };

  const selectedZone = REGIONAL_ZONES.find(z => z.id === settings.regionId) || REGIONAL_ZONES[0];

  return (
    <div className="bg-[#FAF2EB] border-2 border-[#843E1F]/20 rounded-2xl p-5 sm:p-6 mb-8 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-[#E8D4C4]">
        
        {/* Title & Description */}
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#843E1F]">
            <Bell className="w-4 h-4 text-[#D97706]" />
            <span>Persistent Regional Harvest Cycle Alerts</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#24211D]">
            Browser Alerts for New Agricultural Harvests
          </h3>

          <p className="text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
            Stay in sync with India&apos;s crop rhythms. Receive automatic browser alerts whenever a new 
            agricultural harvest cycle (Kharif, Rabi, Zaid) or Vedic Ritu begins in your home region.
          </p>
        </div>

        {/* Toggle Switch Component */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#F2ECE2] p-3.5 rounded-xl border border-[#DECDBB] self-start lg:self-auto">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#24211D] flex items-center gap-1.5">
              <span>Alert Notifications</span>
              {settings.enabled ? (
                <span className="text-[10px] text-[#2D7A4D] font-semibold bg-[#E4EFE8] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4D] animate-ping" />
                  Active
                </span>
              ) : (
                <span className="text-[10px] text-[#8C7A6D] font-semibold bg-[#DECDBB]/60 px-2 py-0.5 rounded-full">
                  Disabled
                </span>
              )}
            </div>
            <div className="text-[11px] text-[#786657]">
              {settings.enabled 
                ? 'Preferences saved to your browser' 
                : 'Turn on for regional crop alerts'}
            </div>
          </div>

          <button
            onClick={handleToggle}
            type="button"
            role="switch"
            aria-checked={settings.enabled}
            className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              settings.enabled ? 'bg-[#843E1F]' : 'bg-[#DECDBB]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center text-xs ${
                settings.enabled ? 'translate-x-7 text-[#843E1F]' : 'translate-x-0 text-[#8C7A6D]'
              }`}
            >
              {settings.enabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
            </span>
          </button>
        </div>

      </div>

      {/* Region Selector & Live Status Controls */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Regional Zone Selector */}
        <div className="md:col-span-6 space-y-1.5">
          <label className="text-xs font-semibold text-[#3B2616] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#843E1F]" />
            <span>Select Your Agro-Climatic Zone:</span>
          </label>

          <select
            value={settings.regionId}
            onChange={(e) => handleRegionChange(e.target.value as RegionalZoneId)}
            className="w-full px-3.5 py-2 text-xs font-medium bg-[#FBF9F5] border border-[#D9C8B5] rounded-xl focus:outline-none focus:border-[#843E1F] text-[#24211D] shadow-2xs"
          >
            {REGIONAL_ZONES.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name} ({zone.hindiName})
              </option>
            ))}
          </select>

          <p className="text-[11px] text-[#786657] truncate">
            {selectedZone.statesSummary}
          </p>
        </div>

        {/* Live Status and Action Buttons */}
        <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-2.5 pt-1">
          
          <button
            onClick={handleManualTestAlert}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#FBF9F5] hover:bg-[#F2ECE2] text-[#843E1F] border border-[#DECDBB] rounded-xl shadow-2xs transition-colors"
            title="Send an immediate test alert to preview browser notification"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Test Alert</span>
          </button>

          <button
            onClick={handleSimulateCycleShift}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#843E1F] hover:bg-[#6B3019] text-white rounded-xl shadow-2xs transition-colors"
            title="Simulate the arrival of the next harvest cycle"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Simulate Cycle Shift</span>
          </button>
        </div>

      </div>

      {/* Permission & Environmental Note */}
      <div className="mt-4 pt-3 border-t border-[#DECDBB] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#786657]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2D4A3E]" />
          <span>
            Web Notifications API: <strong>{browserPerm === 'granted' ? 'Authorized (Web Push)' : browserPerm === 'denied' ? 'Blocked in Browser Settings (Using In-App Alerts)' : 'In-App Alerts + Native Notifications'}</strong>
          </span>
        </div>

        <span className="italic text-[#8C7A6D]">
          Notification preference automatically remembered across browser sessions
        </span>
      </div>

    </div>
  );
};

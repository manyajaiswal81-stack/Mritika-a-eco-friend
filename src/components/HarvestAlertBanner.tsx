import React, { useState, useEffect } from 'react';
import { HarvestAlertPayload } from '../utils/harvestNotifications';
import { Sprout, X, Bell, ExternalLink, Sparkles } from 'lucide-react';

interface HarvestAlertBannerProps {
  alert: HarvestAlertPayload | null;
  onDismiss: () => void;
  onSelectSeason?: (seasonId: string) => void;
}

export const HarvestAlertBanner: React.FC<HarvestAlertBannerProps> = ({
  alert,
  onDismiss,
  onSelectSeason
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (alert) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [alert]);

  if (!alert || !isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full p-1 animate-slideUp">
      <div className="relative bg-[#FAF2EB] border-2 border-[#843E1F] rounded-2xl shadow-2xl p-5 space-y-3 overflow-hidden text-[#24211D]">
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D97706] via-[#843E1F] to-[#2D4A3E]" />

        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#843E1F] text-white shadow-xs">
              <Bell className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#843E1F] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D97706]" />
                <span>Agricultural Harvest Cycle Alert</span>
              </div>
              <h4 className="text-sm font-serif font-bold text-[#24211D] leading-tight">
                {alert.regionName}
              </h4>
            </div>
          </div>

          <button
            onClick={() => {
              setIsVisible(false);
              onDismiss();
            }}
            className="p-1 text-[#8C7A6D] hover:text-[#24211D] rounded-lg hover:bg-[#EAE0D2] transition-colors"
            title="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Alert Body */}
        <div className="text-xs text-[#594B40] leading-relaxed space-y-1.5 bg-[#F5EFE6] p-3 rounded-xl border border-[#E6D9C8]">
          <div className="font-bold text-[#843E1F]">
            {alert.title}
          </div>
          <p className="text-[11px] text-[#4A3D33]">
            {alert.body}
          </p>
        </div>

        {/* Recommended Bio-Materials Ready for Harvest */}
        {alert.materials && alert.materials.length > 0 && (
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C7A6D]">
              In-Season Biodegradables:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {alert.materials.map((mat, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] font-semibold bg-[#EAE0D2] text-[#843E1F] rounded-md border border-[#DFCBB5]"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="pt-2 flex items-center justify-between gap-3 text-xs">
          <span className="text-[10px] text-[#8C7A6D]">
            Browser alert verified
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsVisible(false);
                onDismiss();
                const el = document.getElementById('seasonal-guide');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#843E1F] hover:bg-[#6B3019] text-white font-semibold rounded-lg shadow-2xs transition-colors"
            >
              <span>View Materials</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

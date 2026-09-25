import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallButton } from './PWAInstallButton';
import { Smartphone, X, Sparkles } from 'lucide-react';

const DISMISS_KEY = 'mrittika_pwa_banner_dismissed_v1';

export const PWAInstallBanner: React.FC = () => {
  const { isInstalled } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Only show if not installed and not recently dismissed
    const dismissedTime = localStorage.getItem(DISMISS_KEY);
    if (!dismissedTime) {
      setIsDismissed(false);
    } else {
      // Re-prompt after 3 days
      const daysSince = (Date.now() - Number(dismissedTime)) / (1000 * 60 * 60 * 24);
      if (daysSince > 3) {
        setIsDismissed(false);
      }
    }
  }, []);

  if (isInstalled || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    } catch {
      // Storage fallback
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 animate-slideUp">
      <div className="bg-[#FAF2EB] border-2 border-[#843E1F] rounded-2xl shadow-xl p-4 flex items-center justify-between gap-3 text-[#24211D]">
        
        {/* Icon & Description */}
        <div className="flex items-center gap-3 min-w-0">
          <img 
            src="/pwa-192x192.png" 
            alt="Mrittika App" 
            className="w-10 h-10 rounded-xl shadow-xs border border-[#843E1F]/20 shrink-0 object-cover" 
          />
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#843E1F] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D97706]" />
              <span>Use as Mobile App</span>
            </div>
            <h4 className="text-xs font-serif font-bold text-[#24211D] truncate">
              Install Mrittika on Your Device
            </h4>
            <p className="text-[11px] text-[#6B5A4E] truncate">
              Offline access &amp; 1-tap home screen launch
            </p>
          </div>
        </div>

        {/* Action Button & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <PWAInstallButton variant="banner" className="!px-3 !py-1.5 !text-[11px]" />
          
          <button
            onClick={handleDismiss}
            className="p-1 text-[#8C7A6D] hover:text-[#24211D] rounded-lg transition-colors"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

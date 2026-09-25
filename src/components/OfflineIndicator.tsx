import React, { useEffect, useState } from 'react';
import { WifiOff, RotateCw } from 'lucide-react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="flex items-center gap-2 rounded-full bg-[#843E1F] border border-[#F3DECA] px-4 py-1.5 text-xs font-semibold text-white shadow-xl">
        <WifiOff className="w-3.5 h-3.5 text-[#FCD34D]" />
        <span>Offline Mode Active — Browsing cached vernacular wisdom</span>
      </div>
    </div>
  );
};

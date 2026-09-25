import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle, Sparkles } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'nav' | 'banner' | 'hero';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'nav',
  className = ''
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // If already running inside installed standalone app, hide the button
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setInstallSuccess(true);
        setTimeout(() => setInstallSuccess(false), 4000);
      }
    } else {
      // Show guided instructions for iOS, Safari, Chrome, Edge, Firefox
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Navbar Variant */}
      {variant === 'nav' && (
        <button
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 shadow-2xs ${
            isInstallable
              ? 'bg-[#843E1F] hover:bg-[#6B3019] text-white animate-pulse'
              : 'bg-[#FAF2EB] hover:bg-[#F2ECE2] text-[#843E1F] border border-[#DECDBB]'
          } ${className}`}
          title="Install Mrittika as a standalone App on your device"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Install App</span>
        </button>
      )}

      {/* Banner Variant */}
      {variant === 'banner' && (
        <button
          onClick={handleInstallClick}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#843E1F] hover:bg-[#6B3019] shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${className}`}
        >
          <Download className="w-4 h-4" />
          <span>Install on Phone / Desktop</span>
        </button>
      )}

      {/* Hero / CTA Variant */}
      {variant === 'hero' && (
        <button
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-[#FAF2EB] hover:bg-white text-[#843E1F] border border-[#DECDBB] rounded-xl shadow-xs transition-all ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5 text-[#843E1F]" />
          <span>Get Free App</span>
        </button>
      )}

      {/* Guided Installation Modal (for iOS & browsers without native automated trigger) */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative w-full max-w-md bg-[#FAF2EB] border-2 border-[#843E1F] rounded-2xl shadow-2xl p-6 sm:p-7 space-y-5 animate-scaleUp text-[#24211D]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-[#8C7A6D] hover:text-[#24211D] hover:bg-[#EAE0D2] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with App Icon */}
            <div className="flex items-center gap-3.5">
              <img 
                src="/pwa-192x192.png" 
                alt="Mrittika App Icon" 
                className="w-14 h-14 rounded-2xl shadow-sm border border-[#843E1F]/20 object-cover" 
              />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#843E1F] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D97706]" />
                  <span>Progressive Web App</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-[#24211D]">
                  Install Mrittika App
                </h3>
                <p className="text-xs text-[#6B5A4E]">
                  Fast, offline-ready &amp; zero storage clutter
                </p>
              </div>
            </div>

            {/* Platform Specific Steps */}
            {isIOS ? (
              <div className="bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-[#843E1F] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span>How to Install on iPhone / iPad (Safari)</span>
                </div>
                
                <ol className="space-y-2.5 text-xs text-[#594B40] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#843E1F] text-white text-[10px] font-bold shrink-0 mt-0.5">1</span>
                    <span>Tap the <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline mx-1 text-[#0284C7]" /> at the bottom or top of your Safari browser bar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#843E1F] text-white text-[10px] font-bold shrink-0 mt-0.5">2</span>
                    <span>Scroll down the menu and tap <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-[#2D7A4D]" />.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#843E1F] text-white text-[10px] font-bold shrink-0 mt-0.5">3</span>
                    <span>Tap <strong>Add</strong> in the top right. Mrittika will launch full-screen directly from your home screen like any native App!</span>
                  </li>
                </ol>
              </div>
            ) : (
              <div className="bg-[#F5EFE6] border border-[#E6D9C8] rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-[#843E1F] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span>How to Install on Android or Computer (Chrome / Edge / Firefox)</span>
                </div>

                <ol className="space-y-2.5 text-xs text-[#594B40] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#843E1F] text-white text-[10px] font-bold shrink-0 mt-0.5">1</span>
                    <span>Tap the browser menu (<strong>⋮</strong> or <strong>⋯</strong> in top right corner).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#843E1F] text-white text-[10px] font-bold shrink-0 mt-0.5">2</span>
                    <span>Select <strong>Install app</strong> or <strong>Add to Home screen</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#843E1F] text-white text-[10px] font-bold shrink-0 mt-0.5">3</span>
                    <span>Confirm installation. An icon will appear on your app drawer / desktop for instant 1-tap access!</span>
                  </li>
                </ol>
              </div>
            )}

            {/* App Benefits */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6B5A4E]">
              <div className="p-2.5 bg-[#FAF4EB] rounded-lg border border-[#DFCBB5] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D7A4D] shrink-0" />
                <span>Works 100% Offline</span>
              </div>
              <div className="p-2.5 bg-[#FAF4EB] rounded-lg border border-[#DFCBB5] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D7A4D] shrink-0" />
                <span>No App Store needed</span>
              </div>
              <div className="p-2.5 bg-[#FAF4EB] rounded-lg border border-[#DFCBB5] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D7A4D] shrink-0" />
                <span>Full-screen app mode</span>
              </div>
              <div className="p-2.5 bg-[#FAF4EB] rounded-lg border border-[#DFCBB5] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D7A4D] shrink-0" />
                <span>Takes &lt; 2MB storage</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-[#843E1F] hover:bg-[#6B3019] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              Got It
            </button>

          </div>
        </div>
      )}
    </>
  );
};

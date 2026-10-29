import React, { useRef } from 'react';
import { Share2, MapPin, ChevronDown } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useCart } from '../../context/CartContext';
import { shareContent } from '../../utils/share';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenDeals?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { showToast } = useToast();
  const { selectedBranch, openBranchSelector } = useCart();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleShareApp = async () => {
    const result = await shareContent({
      title: 'مطعم زينجر | ZINGER Restaurant',
      text: 'تصفح منيو مطعم زينجر واطلب أشهى برجر، كريب، بيتزا، وشاورما أونلاين بضغطة زر! 🔥',
      url: window.location.href,
    });

    if (result === 'copied') {
      showToast('تم نسخ رابط موقع مطعم زينجر بنجاح! شاركه الآن 🔥');
    }
  };

  // Secret admin access: triple-click on logo
  const handleLogoClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      onOpenAdmin();
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1200);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-zinger-bg/95 backdrop-blur-xl border-b border-zinger-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogoClick}
              title="Zinger Restaurant"
              className="relative flex items-center justify-center w-11 h-11 rounded-full bg-zinger-bg border-2 border-zinger-yellow shadow-glow-yellow-sm shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <span className="font-heading font-black text-2xl text-zinger-yellow italic tracking-tighter">
                Z
              </span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-zinger-green rounded-full border-2 border-zinger-bg animate-pulse" />
            </button>

            <div>
              <h1 className="font-heading font-black text-2xl tracking-tight text-white uppercase">
                ZINGER
              </h1>
              <p className="text-[11px] text-zinger-muted font-cairo font-medium">
                مطعم زينجر
              </p>
            </div>
          </div>

          {/* Center / Right: Interactive Branch Selector Pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={openBranchSelector}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinger-yellow/40 hover:border-zinger-yellow text-white transition-all active:scale-95 shadow-glow-yellow-sm max-w-[200px] sm:max-w-xs"
              title="تغيير الفرع"
            >
              <MapPin className="w-3.5 h-3.5 text-zinger-yellow shrink-0 animate-bounce" />
              <div className="text-right truncate">
                <span className="block text-[11px] font-cairo font-bold text-zinger-yellow truncate">
                  {selectedBranch.name}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            </button>

            <button
              onClick={handleShareApp}
              title="مشاركة الموقع"
              className="p-2 rounded-full bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-zinger-yellow transition-all active:scale-90 shadow-sm shrink-0"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

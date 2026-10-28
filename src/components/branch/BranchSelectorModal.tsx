import React from 'react';
import { X, MapPin, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import { branches } from '../../data/branches';
import { Branch } from '../../types';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface BranchSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BranchSelectorModal: React.FC<BranchSelectorModalProps> = ({ isOpen, onClose }) => {
  const { selectedBranch, setSelectedBranch } = useCart();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    showToast(`تم تحديد ${branch.name} بنجاح 🔥`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden"
        dir="rtl"
      >
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-zinger-yellow/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinger-yellow/30 flex items-center justify-center text-zinger-yellow shadow-glow-yellow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-cairo font-black text-white">اختر فرع زينجر</h2>
              <p className="text-xs text-zinc-400 font-cairo">
                اختر الفرع الأقرب إليك لعرض المنيو المتاح وخدمة التوصيل السريع
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Branch Cards */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar pr-0.5">
          {branches.map((branch) => {
            const isSelected = selectedBranch.id === branch.id;
            const isFaqousMain = branch.id === 'faqous-manshiya';

            return (
              <div
                key={branch.id}
                onClick={() => handleSelectBranch(branch)}
                className={`relative p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900/90 border-zinger-yellow shadow-glow-yellow-sm ring-1 ring-zinger-yellow/40'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-cairo font-black text-sm text-white">
                        {branch.name}
                      </span>
                      {isFaqousMain && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-cairo font-black px-2 py-0.5 rounded-full bg-zinger-yellow/15 text-zinger-yellow border border-zinger-yellow/30">
                          <Sparkles className="w-3 h-3" />
                          شاورما وتندوري وبايا
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 font-cairo flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      {branch.address}
                    </p>

                    <p className="text-xs text-zinc-400 font-cairo flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      {branch.phone}
                    </p>
                  </div>

                  <div className="shrink-0 mt-1">
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-zinger-yellow flex items-center justify-center text-black">
                        <CheckCircle2 className="w-4 h-4 fill-black stroke-zinger-yellow" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-zinc-700 hover:border-zinc-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-5 pt-3 border-t border-zinc-800/80 text-center">
          <p className="text-[11px] text-zinc-500 font-cairo">
            💡 ملاحظة: أصناف الشاورما والتندوري والبايا والماريا متوفرة حصرياً في فرع فاقوس - شارع أبو دهشان.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MenuItem, SizeOption } from '../../types';
import { 
  Home, 
  Tag, 
  Share2, 
  Flame, 
  Sparkles, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check,
  MapPin
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { shareContent } from '../../utils/share';
import { getCategoryDefaultImage } from '../../data/categories';
import { branches } from '../../data/branches';

interface ProductPageProps {
  item: MenuItem;
  onBack: () => void;
  onHome: () => void;
  onOpenDeals: () => void;
}

const SPICE_LEVELS = [
  { id: 'عادي (بدون شطة)', labelAr: 'عادي (بدون شطة)' },
  { id: 'سبايسي حار 🔥', labelAr: 'سبايسي حار 🔥' },
  { id: 'حار نار إكسترا 🔥🔥', labelAr: 'حار نار إكسترا 🔥🔥' },
];

export const ProductPage: React.FC<ProductPageProps> = ({
  item,
  onHome,
  onOpenDeals,
}) => {
  const { addToCart, selectedBranch, setSelectedBranch } = useCart();
  const { showToast } = useToast();

  const isAvailableInSelectedBranch =
    !item.availableBranches || item.availableBranches.includes(selectedBranch.id);

  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(
    item.sizes && item.sizes.length > 0 ? item.sizes[0] : undefined
  );
  const [selectedSpice, setSelectedSpice] = useState<string>('عادي (بدون شطة)');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const unitPrice = selectedSize ? selectedSize.price : item.basePrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(item, selectedSize, item.allowSpice ? selectedSpice : undefined, quantity);
    setAddedAnimation(true);
    showToast(`تمت إضافة ${item.nameAr} إلى السلة! 🔥`);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleShare = async () => {
    const shareTitle = `${item.nameAr} من مطعم زينجر`;
    const shareText = `شوف ${item.nameAr} من مطعم زينجر بسعر ${unitPrice} ج.م فقط! اطلب الآن:`;
    const shareUrl = `${window.location.origin}${window.location.pathname}#/product/${item.id}`;

    const result = await shareContent({
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    });

    if (result === 'copied') {
      showToast('تم نسخ الرابط بنجاح! شاركه الآن 🔥');
    }
  };

  return (
    <div className="min-h-screen bg-zinger-bg text-white pb-28 animate-fade-in" dir="rtl">
      {/* Top Floating Action Bar */}
      <div className="sticky top-0 z-40 bg-zinger-bg/95 backdrop-blur-xl border-b border-zinc-800 px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-xs font-cairo font-bold text-white transition-all active:scale-95 shadow-sm"
          >
            <Home className="w-4 h-4 text-zinger-yellow" />
            <span>الرئيسية</span>
          </button>

          <button
            onClick={onOpenDeals}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-xs font-cairo font-bold text-zinger-yellow transition-all active:scale-95 shadow-sm"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>العروض</span>
          </button>
        </div>

        <button
          onClick={handleShare}
          className="p-2 rounded-xl bg-zinger-card hover:bg-zinc-800 border border-zinc-700 text-zinger-yellow transition-all active:scale-95"
          title="مشاركة"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Product Container */}
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
        {/* Large Product Hero Image */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-card-dark">
          <img
            src={item.image}
            alt={item.nameAr}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getCategoryDefaultImage(item.category);
            }}
          />


          {/* Badges on Image */}
          {item.badge && (
            <div className="absolute top-4 right-4 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-zinger-yellow text-black font-cairo font-black text-xs shadow-glow-yellow flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {item.badge}
              </span>
            </div>
          )}
        </div>

        {/* Product Details Header */}
        <div className="bg-zinger-card p-5 sm:p-6 rounded-3xl border border-zinc-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="font-cairo font-black text-2xl sm:text-3xl text-white">
                {item.nameAr}
              </h1>
            </div>

            <div className="flex items-baseline gap-1.5 self-start sm:self-auto">
              <span className="font-heading font-black text-3xl text-zinger-yellow">
                {unitPrice}
              </span>
              <span className="font-cairo font-bold text-sm text-zinc-400">جنيه مصري</span>
            </div>
          </div>

          {/* Description */}
          {item.descAr && (
            <div className="pt-2 border-t border-zinc-800">
              <p className="text-xs sm:text-sm text-zinc-300 font-cairo leading-relaxed">
                {item.descAr}
              </p>
            </div>
          )}
        </div>

        {/* 1. Size Options */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="bg-zinger-card p-5 rounded-3xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-cairo font-black text-sm text-white">
                اختر الحجم
              </h3>
              <span className="text-xs font-cairo font-bold text-zinger-yellow">مطلوب</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {item.sizes.map((size, idx) => {
                const isSelected = selectedSize?.nameAr === size.nameAr;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-zinc-800 border-zinger-yellow text-white shadow-glow-yellow-sm scale-[1.01]'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span className="font-cairo font-bold text-sm text-white block">
                      {size.nameAr}
                    </span>

                    <span className="font-heading font-black text-sm text-zinger-yellow">
                      {size.price} ج.م
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Spice Level Selector */}
        {item.allowSpice && (
          <div className="bg-zinger-card p-5 rounded-3xl border border-zinc-800 space-y-3">
            <h3 className="font-cairo font-black text-sm text-white flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-zinger-red" />
              درجة الشطة
            </h3>

            <div className="grid grid-cols-3 gap-2.5">
              {SPICE_LEVELS.map((spice) => {
                const isSelected = selectedSpice === spice.id;
                return (
                  <button
                    key={spice.id}
                    type="button"
                    onClick={() => setSelectedSpice(spice.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-zinc-800 border-zinger-yellow text-white shadow-glow-yellow-sm'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span className="font-cairo font-bold text-xs block text-white">
                      {spice.labelAr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Quantity Selector */}
        <div className="bg-zinger-card p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <span className="font-cairo font-bold text-xs text-zinc-300">
            الكمية المطلوبة
          </span>

          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-xl p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white active:scale-90"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-heading font-black text-base w-6 text-center text-zinger-yellow">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white active:scale-90"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Branch Exclusivity Banner */}
        {!isAvailableInSelectedBranch && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cairo space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-200">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>هذا الصنف متوفر حصرياً في فرع فاقوس - شارع أبو دهشان</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              فرعك المحدد حالياً هو ({selectedBranch.name}). لتتمكن من طلب هذا الصنف، يرجى التبديل إلى فرع فاقوس:
            </p>
            <button
              type="button"
              onClick={() => {
                const faqousBranch = branches.find((b) => b.id === 'faqous-manshiya');
                if (faqousBranch) {
                  setSelectedBranch(faqousBranch);
                  showToast('تم التحويل إلى فرع فاقوس - شارع أبو دهشان بنجاح! 🔥');
                }
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cairo font-black text-xs transition-all shadow-sm active:scale-95"
            >
              التبديل إلى فرع فاقوس لطلب هذا الصنف 🚀
            </button>
          </div>
        )}

        {/* 4. Compact Centered Order Button */}
        <div className="flex justify-center pt-3 pb-10">
          <button
            onClick={isAvailableInSelectedBranch ? handleAddToCart : () => {
              showToast('يرجى التحويل إلى فرع فاقوس لطلب هذا الصنف', 'warning');
            }}
            disabled={!isAvailableInSelectedBranch}
            className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-cairo font-black text-sm transition-all shadow-glow-yellow active:scale-95 w-full max-w-sm ${
              !isAvailableInSelectedBranch
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                : addedAnimation
                ? 'bg-zinger-green text-black'
                : 'bg-zinger-yellow hover:bg-zinger-yellowHover text-black'
            }`}
          >
            {addedAnimation ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            <span>
              {!isAvailableInSelectedBranch
                ? 'غير متوفر في هذا الفرع'
                : addedAnimation
                ? 'تمت الإضافة للسلة!'
                : `إضافة إلى السلة (${totalPrice} ج.م)`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

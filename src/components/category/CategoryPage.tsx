import React, { useState, useEffect } from 'react';
import { Category, MenuItem } from '../../types';
import { Home, Tag, Sparkles } from 'lucide-react';
import { FoodCard } from '../menu/FoodCard';

interface CategoryPageProps {
  category: Category;
  categories: Category[];
  items: MenuItem[];
  onBack: () => void;
  onHome: () => void;
  onOpenDeals: () => void;
  onSelectCategory: (catId: string) => void;
  onOpenProduct: (item: MenuItem) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  categories,
  items,
  onHome,
  onOpenDeals,
  onSelectCategory,
  onOpenProduct,
}) => {
  const [activeSubFilter, setActiveSubFilter] = useState<string>('all');

  useEffect(() => {
    setActiveSubFilter('all');
  }, [category.id]);

  // Sub-filter tabs configuration for shawarma & tandoori
  const shawarmaSubFilters = [
    { id: 'all', label: 'الكل' },
    { id: 'sandwich', label: '🌯 ساندوتشات شاورما' },
    { id: 'meal', label: '🍱 وجبات شاورما' },
    { id: 'tandoori', label: '🌶️ تندوري هندي' },
    { id: 'maria', label: '🫓 ماريا سوري' },
    { id: 'batates', label: '🍟 بطاطس سوري' },
  ];

  const displayedItems = items.filter((item) => {
    if (category.id !== 'shawarma' || activeSubFilter === 'all') return true;
    if (activeSubFilter === 'sandwich') {
      return (
        item.nameAr.includes('سندوتش') &&
        !item.nameAr.includes('تندوري') &&
        !item.nameAr.includes('بطاطس')
      );
    }
    if (activeSubFilter === 'meal') {
      return item.nameAr.includes('وجبة') && !item.nameAr.includes('تندوري');
    }
    if (activeSubFilter === 'tandoori') {
      return item.nameAr.includes('تندوري');
    }
    if (activeSubFilter === 'maria') {
      return item.nameAr.includes('ماريا');
    }
    if (activeSubFilter === 'batates') {
      return item.nameAr.includes('بطاطس');
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-zinger-bg text-white pb-28 animate-fade-in" dir="rtl">
      {/* Top Header */}
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

        <div className="text-left">
          <h2 className="font-cairo font-black text-sm sm:text-base text-zinger-yellow">
            {category.nameAr}
          </h2>
        </div>
      </div>

      {/* Category Horizontal Quick Switcher */}
      <div className="px-4 py-3 border-b border-zinc-900 bg-zinc-950/60 overflow-x-auto no-scrollbar flex items-center gap-2">
        {categories
          .filter((c) => c.id !== 'deals')
          .map((c) => {
            const isCurrent = c.id === category.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.id)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-cairo font-bold transition-all ${
                  isCurrent
                    ? 'bg-zinger-yellow text-black shadow-glow-yellow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {c.nameAr}
              </button>
            );
          })}
      </div>

      {/* Subcategory Pills (Special for Shawarma & Tandoori & Maria) */}
      {category.id === 'shawarma' && (
        <div className="px-4 py-2.5 bg-zinc-900/50 border-b border-zinc-800/80 overflow-x-auto no-scrollbar flex items-center gap-2">
          {shawarmaSubFilters.map((sub) => {
            const isSubActive = activeSubFilter === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubFilter(sub.id)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-cairo font-bold transition-all ${
                  isSubActive
                    ? 'bg-white text-black shadow-sm font-black'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Category Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-cairo font-black text-xl sm:text-2xl text-white">
                {category.nameAr}
              </h1>
              {category.availableBranches && (
                <span className="inline-flex items-center gap-1 text-[10px] font-cairo font-black px-2 py-0.5 rounded-full bg-zinger-yellow/15 text-zinger-yellow border border-zinger-yellow/30">
                  <Sparkles className="w-3 h-3" />
                  فرع فاقوس فقط
                </span>
              )}
            </div>
            <p className="font-cairo text-xs sm:text-sm text-zinc-400 mt-0.5">
              {category.descAr || `قائمة وجبات ${category.nameAr} من مطعم زينجر`}
            </p>
          </div>

          <span className="text-xs font-cairo font-bold text-zinc-400 shrink-0">
            {displayedItems.length} أصناف
          </span>
        </div>

        {/* Grid of Food Items (Single column on mobile, 2-3 columns on tablet/desktop) */}
        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {displayedItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onOpenCustomizer={(it) => onOpenProduct(it)}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-zinc-500 font-cairo">
            <p className="text-sm">لا توجد أصناف متوفرة في هذا القسم حالياً</p>
          </div>
        )}
      </main>
    </div>
  );
};

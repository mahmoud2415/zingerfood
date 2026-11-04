import { Category } from '../types';

export const categories: Category[] = [
  {
    id: "pizza",
    nameEn: "AMERICAN PIZZA",
    nameAr: "بيتزا أمريكي",
    icon: "Pizza",
    coverImage: "/covers/pizza.jpeg",
    descAr: "بيتزا أمريكية بالسلايس والأحجام المختلفة، مع البيتزا الخاصة والجديدة",
  },
  {
    id: "crepes",
    nameEn: "FRENCH CREPES",
    nameAr: "الكريب الفرنسي والسبيشيال",
    icon: "Utensils",
    coverImage: "/covers/crepes.jpeg",
    descAr: "كريب فرنسي وكريب سبيشيال بأحجام متعددة",
  },
  {
    id: "paella",
    nameEn: "ITALIAN PAELLA",
    nameAr: "البايا",
    icon: "Layers",
    coverImage: "/covers/paella.jpeg",
    descAr: "بايا بالأجبان والدجاج واللحوم بأحجام متعددة",
  },
  {
    id: "shawarma",
    nameEn: "SHAWARMA & TANDOORI",
    nameAr: "ركن الشاورما والبوكسات",
    icon: "Flame",
    coverImage: "/covers/shawarma-category.svg",
    descAr: "ساندوتشات ووجبات الشاورما والبوكسات والفتة والأوزان والوجبات",
    availableBranches: ["faqous-manshiya"],
  },
  {
    id: "burgers",
    nameEn: "BEEF BURGERS",
    nameAr: "ركن البرجر والفرايز المحملة",
    icon: "Beef",
    coverImage: "/covers/burgers.jpeg",
    descAr: "برجر اللحم والدجاج والفرايز المحملة وأطباق الريزو",
  },
  {
    id: "hawawshi",
    nameEn: "ITALIAN HAWAWSHI",
    nameAr: "حواوشي إيطالي",
    icon: "Flame",
    coverImage: "/covers/hawawshi.jpeg",
    descAr: "حواوشي مخبوز في الفرن بوش بيتزا وموزاريلا مقرمشة",
  },
  {
    id: "melted_cheese",
    nameEn: "MELTED CHEESE",
    nameAr: "طاسات الجبنة السايحة",
    icon: "Zap",
    coverImage: "/covers/melted_cheese.jpeg",
    descAr: "طاسات ساخنة غرقانة بصوص الشيدر والجبنة السايحة والقطع المقرمشة",
  },
  {
    id: "pasta",
    nameEn: "PASTA & MAC",
    nameAr: "طواجن باستا",
    icon: "ChefHat",
    coverImage: "/covers/pasta.jpeg",
    descAr: "طواجن مكرونة وبنا بالوايت صوص الإيطالي والموزاريلا وشاورما تندوري",
  },
  {
    id: "extras",
    nameEn: "EXTRAS & DRINKS",
    nameAr: "الإضافات والصوصات والمشروبات",
    icon: "PackagePlus",
    coverImage: "/covers/extras.jpeg",
    descAr: "بطاطس، صوصات شيدر ورانش، حلقات بصل، ومشروبات باردة",
  },
];

export const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  pizza: '/category_defaults/pizza.jpg',
  crepes: '/category_defaults/crepes.jpg',
  paella: '/category_defaults/paella.jpg',
  shawarma: '/category_defaults/shawarma.jpg',
  burgers: '/category_defaults/burgers.jpg',
  crispy_chicken: '/category_defaults/crispy_chicken.jpg',
  hawawshi: '/covers/hawawshi.jpeg',
  melted_cheese: '/covers/melted_cheese.jpeg',
  pasta: '/covers/pasta.jpeg',
  extras: '/covers/extras.jpeg',
};

export function getCategoryDefaultImage(categoryId?: string): string {
  if (!categoryId) return '/category_defaults/burgers.jpg';
  return CATEGORY_DEFAULT_IMAGES[categoryId] || '/category_defaults/burgers.jpg';
}

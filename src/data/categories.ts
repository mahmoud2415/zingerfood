import { Category } from '../types';

export const categories: Category[] = [
  {
    id: "pizza",
    nameEn: "AMERICAN PIZZA",
    nameAr: "بيتزا أمريكي",
    icon: "Pizza",
    coverImage: "/covers/pizza.jpeg",
    descAr: "عجينة أمريكية هشة مع تشيكن باربيكيو وبيبيروني وميكس جبن وشاورما",
  },
  {
    id: "crepes",
    nameEn: "FRENCH CREPES",
    nameAr: "كريب زينجر",
    icon: "Utensils",
    coverImage: "/covers/crepes.jpeg",
    descAr: "كريب مقرمش محشو بالفراخ واللحوم والموزاريلا السايحة ورول مميز",
  },
  {
    id: "paella",
    nameEn: "ITALIAN PAELLA",
    nameAr: "البايا الإيطالية",
    icon: "Layers",
    coverImage: "/covers/paella.jpeg",
    descAr: "فطائر بايا إيطالية مقرمشة ومحشوة بألذ الأجبان وقطع الدجاج واللحوم",
    availableBranches: ["faqous-manshiya"],
  },
  {
    id: "shawarma",
    nameEn: "SHAWARMA & TANDOORI",
    nameAr: "شاورما وتندوري وماريا",
    icon: "Flame",
    coverImage: "/covers/shawarma.jpeg",
    descAr: "ساندوتشات ووجبات شاورما سوري، تندوري هندي حار، ساندوتشات ماريا، وبطاطس سوري",
    availableBranches: ["faqous-manshiya"],
  },
  {
    id: "burgers",
    nameEn: "BEEF BURGERS",
    nameAr: "برجر لحم",
    icon: "Beef",
    coverImage: "/covers/burgers.jpeg",
    descAr: "برجر لحم بلدي مشوي عالفحم، كلاسيك، هالبينو، إكسترا مايل، وسوبر نايت",
  },
  {
    id: "crispy_chicken",
    nameEn: "CRUNCHY SANDWICHES",
    nameAr: "تشيكن برجر وفرايز",
    icon: "Drumstick",
    coverImage: "/covers/crispy_chicken.jpeg",
    descAr: "صدور دجاج كرانشي فريش مقرمشة، تشيكن بيكون، تركي مدخن، وفرايز محملة وريزو",
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
    id: "rolls",
    nameEn: "WETCH ROLLS",
    nameAr: "وتش رول",
    icon: "Layers",
    coverImage: "/covers/rolls.jpeg",
    descAr: "رول تورتيلا محمص غرقان بقطع الدجاج والجبنة وش بيتزا",
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
  rolls: '/covers/rolls.jpeg',
  extras: '/covers/extras.jpeg',
};

export function getCategoryDefaultImage(categoryId?: string): string {
  if (!categoryId) return '/category_defaults/burgers.jpg';
  return CATEGORY_DEFAULT_IMAGES[categoryId] || '/category_defaults/burgers.jpg';
}


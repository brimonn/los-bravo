export type MenuCategory = "hamburguesas" | "alitas" | "combos" | "bebidas";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: MenuCategory;
  featured?: boolean;
};

export const menuItems: MenuItem[] = [
  {
    id: "bravo-clasica",
    name: "Bravo Clásica",
    description:
      "Doble carne smash, queso cheddar, cebolla caramelizada y salsa secreta en pan brioche tostado.",
    price: "₡4 500",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    category: "hamburguesas",
    featured: true,
  },
  {
    id: "bbq-bacon",
    name: "BBQ Bacon Smash",
    description:
      "Carne jugosa, bacon crocante, aros de cebolla, BBQ ahumada y pepinillos.",
    price: "₡5 200",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
    category: "hamburguesas",
    featured: true,
  },
  {
    id: "spicy-chicken",
    name: "Spicy Chicken",
    description:
      "Pechuga crispy, mayo chipotle, lechuga, tomate y jalapeños en pan artesanal.",
    price: "₡4 200",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80",
    category: "hamburguesas",
    featured: true,
  },
  {
    id: "alitas-buffalo",
    name: "Alitas Buffalo (8 pzas)",
    description:
      "Clásicas picantes con mantequilla, servidas con dip de blue cheese.",
    price: "₡3 800",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
    category: "alitas",
    featured: true,
  },
  {
    id: "alitas-bbq",
    name: "Alitas BBQ Sticky",
    description:
      "Glaseadas BBQ dulce, terminadas al horno para un brillo irresistible.",
    price: "₡3 900",
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80",
    category: "alitas",
    featured: true,
  },
  {
    id: "combo-familiar",
    name: "Combo Familiar Bravo",
    description:
      "2 hamburguesas clásicas, 12 alitas (sabor a elegir), papas grandes y 4 bebidas.",
    price: "₡18 500",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    category: "combos",
    featured: true,
  },
  {
    id: "doble-smash",
    name: "Doble Smash Trufa",
    description:
      "Doble carne, queso suizo, champiñones salteados y notas de trufa.",
    price: "₡5 800",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80",
    category: "hamburguesas",
  },
  {
    id: "veggie-bravo",
    name: "Veggie Bravo",
    description:
      "Medallón de legumbres, aguacate, rúcula y mayo de hierbas en pan integral.",
    price: "₡4 000",
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&q=80",
    category: "hamburguesas",
  },
  {
    id: "alitas-lemon",
    name: "Alitas Lemon Pepper",
    description:
      "Crocantes con mezcla cítrica y pimienta negra recién molida.",
    price: "₡3 700",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80",
    category: "alitas",
  },
  {
    id: "alitas-mango",
    name: "Alitas Mango Habanero",
    description:
      "Dulzor tropical con picor controlado. Para los que buscan adrenalina.",
    price: "₡4 100",
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80",
    category: "alitas",
  },
  {
    id: "combo-duo",
    name: "Combo Dúo",
    description:
      "2 hamburguesas clásicas + papas medias + 2 refrescos de lata.",
    price: "₡11 900",
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80",
    category: "combos",
  },
  {
    id: "combo-alitas",
    name: "Combo Alitas + Papas",
    description: "10 alitas (elige 2 sabores) + papas gajo con dip de la casa.",
    price: "₡9 200",
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80",
    category: "combos",
  },
  {
    id: "refresco",
    name: "Refresco de lata",
    description: "Coca-Cola, Fanta, Sprite o agua.",
    price: "₡900",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80",
    category: "bebidas",
  },
  {
    id: "limonada",
    name: "Limonada natural",
    description: "Jarra fresca o vaso individual.",
    price: "₡1 200",
    image:
      "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=800&q=80",
    category: "bebidas",
  },
  {
    id: "malteada",
    name: "Malteada",
    description: "Vainilla, chocolate o fresa con crema batida.",
    price: "₡2 400",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    category: "bebidas",
  },
];

export const categoryLabels: Record<MenuCategory, string> = {
  hamburguesas: "Hamburguesas",
  alitas: "Alitas",
  combos: "Combos",
  bebidas: "Bebidas",
};

export function getFeaturedItems(): MenuItem[] {
  return menuItems.filter((i) => i.featured);
}

export function getItemsByCategory(category: MenuCategory): MenuItem[] {
  return menuItems.filter((i) => i.category === category);
}

export const categoryOrder: MenuCategory[] = [
  "hamburguesas",
  "alitas",
  "combos",
  "bebidas",
];

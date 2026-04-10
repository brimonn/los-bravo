export type Review = {
  id: string;
  author: string;
  role: string;
  rating: number;
  text: string;
};

export const reviews: Review[] = [
  {
    id: "1",
    author: "María José C.",
    role: "Cliente frecuente",
    rating: 5,
    text: "Las alitas Buffalo están al nivel de cualquier ciudad grande. Pedimos por WhatsApp y en 25 minutos estaban listas. Súper recomendados.",
  },
  {
    id: "2",
    author: "Andrés M.",
    role: "De paso por Liberia",
    rating: 5,
    text: "La Bravo Clásica es brutal: carne jugosa y el pan no se deshace. El local se siente urbano y limpio. Volvería sin pensarlo.",
  },
  {
    id: "3",
    author: "Sofía R.",
    role: "Pedido a domicilio",
    rating: 4,
    text: "Probamos el combo familiar para ver el partido. Todo llegó caliente y bien empacado. El BBQ sticky es adictivo.",
  },
  {
    id: "4",
    author: "Diego H.",
    role: "Foodie local",
    rating: 5,
    text: "Se nota que le meten cariño al detalle: salsas propias, buen contraste de sabores y porciones justas. Mi spot de comfort food en Liberia.",
  },
];

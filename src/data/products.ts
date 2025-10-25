import { Product } from "@/types/product";
import mixtureImg from "@/assets/product-mixture.jpg";
import chakliImg from "@/assets/product-chakli.jpg";
import bhujiaImg from "@/assets/product-bhujia.jpg";
import peanutsImg from "@/assets/product-peanuts.jpg";
import chivdaImg from "@/assets/product-chivda.jpg";
import mathriImg from "@/assets/product-mathri.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Mixture",
    description: "A delightful blend of crispy sev, nuts, and spices. Perfect tea-time companion.",
    price: "₹250/kg",
    image: mixtureImg,
    category: "Savory",
    weight: "500g, 1kg",
  },
  {
    id: "2",
    name: "Golden Chakli",
    description: "Spiral-shaped crispy snack made with rice flour and aromatic spices.",
    price: "₹280/kg",
    image: chakliImg,
    category: "Mild",
    weight: "250g, 500g, 1kg",
  },
  {
    id: "3",
    name: "Aloo Bhujia",
    description: "Thin, crispy noodles made from potato and gram flour with mild spices.",
    price: "₹220/kg",
    image: bhujiaImg,
    category: "Mild",
    weight: "500g, 1kg",
  },
  {
    id: "4",
    name: "Masala Peanuts",
    description: "Crunchy peanuts coated with spicy gram flour and authentic Indian spices.",
    price: "₹180/kg",
    image: peanutsImg,
    category: "Spicy",
    weight: "250g, 500g, 1kg",
  },
  {
    id: "5",
    name: "Poha Chivda",
    description: "Light and crispy flattened rice mix with peanuts, curry leaves, and spices.",
    price: "₹200/kg",
    image: chivdaImg,
    category: "Savory",
    weight: "500g, 1kg",
  },
  {
    id: "6",
    name: "Methi Mathri",
    description: "Flaky, crispy crackers infused with fenugreek leaves and carom seeds.",
    price: "₹240/kg",
    image: mathriImg,
    category: "Savory",
    weight: "250g, 500g, 1kg",
  },
];

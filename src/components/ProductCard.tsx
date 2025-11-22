import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toast } = useToast();

  // Parse weight options from product.weight string (e.g., "500g, 1kg")
  const weightOptions = product.weight.split(",").map((w) => w.trim());

  // Set first weight option as default
  const [selectedWeight, setSelectedWeight] = useState<string>(
    weightOptions[0] || ""
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event

    addToCart(product, 1, selectedWeight);
    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedWeight}) has been added to your cart.`,
    });
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-hover)] bg-gradient-to-b from-card to-secondary/30"
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm">
          {product.category}
        </Badge>
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">
            {product.price}
          </span>
        </div>
        <div className="space-y-2">
          <Select value={selectedWeight} onValueChange={setSelectedWeight}>
            <SelectTrigger
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <SelectValue placeholder="Select weight" />
            </SelectTrigger>
            <SelectContent>
              {weightOptions.map((weight) => (
                <SelectItem key={weight} value={weight}>
                  {weight}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddToCart} className="w-full" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ["All", "Spicy", "Mild", "Sweet", "Savory"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleWhatsAppOrder = () => {
    if (!selectedProduct) return;
    const message = encodeURIComponent(
      `Hi! I'd like to order ${selectedProduct.name} (${selectedProduct.price})`
    );
    window.open(`https://wa.me/YOUR_PHONE_NUMBER?text=${message}`, "_blank");
  };

  const handleEmailOrder = () => {
    if (!selectedProduct) return;
    const subject = encodeURIComponent(`Order: ${selectedProduct.name}`);
    const body = encodeURIComponent(
      `Hello,\n\nI would like to order:\n\nProduct: ${selectedProduct.name}\nPrice: ${selectedProduct.price}\nDescription: ${selectedProduct.description}\n\nPlease let me know about availability and delivery details.\n\nThank you!`
    );
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="products" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our range of authentic namkeens, crafted with traditional recipes and premium ingredients
          </p>
        </div>

        <Tabs defaultValue="All" className="mb-12">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 h-auto p-1">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setSelectedCategory(category)}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedProduct.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-2xl font-bold text-primary">{selectedProduct.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Available in</p>
                      <p className="text-lg font-semibold">{selectedProduct.weight}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-accent hover:bg-accent/90"
                      onClick={handleWhatsAppOrder}
                    >
                      Order via WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-2"
                      onClick={handleEmailOrder}
                    >
                      Order via Email
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProductGrid;

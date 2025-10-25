import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import OrderSection from "@/components/OrderSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductGrid />
      <OrderSection />
      <Footer />
    </div>
  );
};

export default Index;

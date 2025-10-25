import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-snacks.jpg";

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
            Authentic Indian
            <span className="block text-primary mt-2">Namkeens & Snacks</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Experience the rich flavors of traditional Indian snacks. Handcrafted with premium ingredients, delivered fresh to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button
              size="lg"
              className="text-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300"
              onClick={scrollToProducts}
            >
              Browse Catalog
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-2 hover:bg-primary/5"
              onClick={() => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

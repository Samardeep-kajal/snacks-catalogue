import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, Phone } from "lucide-react";

const OrderSection = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/YOUR_PHONE_NUMBER?text=Hi! I'd like to know more about your products.", "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:your-email@example.com?subject=Product Inquiry";
  };

  return (
    <section id="order" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground">
            Ready to place an order? Contact us through your preferred method
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 hover:border-accent hover:shadow-[var(--shadow-hover)] transition-all duration-300 bg-gradient-to-br from-card to-secondary/50">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold">WhatsApp Order</h3>
              <p className="text-muted-foreground">
                Quick and easy ordering through WhatsApp. Get instant confirmation and updates.
              </p>
              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90"
                onClick={handleWhatsApp}
              >
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary hover:shadow-[var(--shadow-hover)] transition-all duration-300 bg-gradient-to-br from-card to-secondary/50">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Email Order</h3>
              <p className="text-muted-foreground">
                Prefer email? Send us your order details and we'll get back to you soon.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2"
                onClick={handleEmail}
              >
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center p-8 bg-card rounded-lg border">
          <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Call Us Directly</h3>
          <p className="text-muted-foreground mb-4">
            For bulk orders or special requests, feel free to give us a call
          </p>
          <a
            href="tel:+911234567890"
            className="text-2xl font-bold text-primary hover:underline"
          >
            +91 123 456 7890
          </a>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;

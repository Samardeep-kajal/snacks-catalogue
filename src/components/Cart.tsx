import { useCartStore } from "@/store/cartStore";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const getCartCount = useCartStore((state) => state.getCartCount);
  const clearCart = useCartStore((state) => state.clearCart);
  const calculateItemPrice = useCartStore((state) => state.calculateItemPrice);

  const [isOpen, setIsOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [clearCartDialogOpen, setClearCartDialogOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const { toast } = useToast();

  const formatOrderMessage = () => {
    let message = `🛒 *New Order*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerName}\n`;
    message += `Phone: ${customerPhone}\n`;
    message += `Address: ${customerAddress}\n\n`;
    message += `📦 *Order Items:*\n`;

    cartItems.forEach((item, index) => {
      const itemPrice = calculateItemPrice(item);
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.quantity}\n`;
      message += `   Base Price: ${item.price}\n`;
      if (item.selectedWeight) {
        message += `   Weight: ${item.selectedWeight}\n`;
      }
      message += `   Item Price: ₹${itemPrice.toFixed(2)}\n`;
      message += `   Subtotal: ₹${(itemPrice * item.quantity).toFixed(2)}\n`;
      message += `\n`;
    });

    message += `💰 *Total: ₹${getCartTotal().toFixed(2)}*\n`;
    message += `\n📍 Payment: Cash on Delivery`;

    return message;
  };

  const handleWhatsAppOrder = () => {
    if (!customerName || !customerPhone || !customerAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all customer details",
        variant: "destructive",
      });
      return;
    }

    const message = formatOrderMessage();
    const whatsappNumber = "1234567890"; // Replace with your WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    toast({
      title: "Order Sent!",
      description: "Your order has been sent via WhatsApp",
    });

    // Clear form and cart
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setOrderDialogOpen(false);
    clearCart();
    setIsOpen(false);
  };

  const handleEmailOrder = () => {
    if (!customerName || !customerPhone || !customerAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all customer details",
        variant: "destructive",
      });
      return;
    }

    const subject = `New Order from ${customerName}`;
    const body = formatOrderMessage();
    const emailAddress = "orders@example.com"; // Replace with your email
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    toast({
      title: "Order Email Created!",
      description: "Your email client will open with the order details",
    });

    // Clear form and cart
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setOrderDialogOpen(false);
    clearCart();
    setIsOpen(false);
  };

  const handleClearCart = () => {
    clearCart();
    setClearCartDialogOpen(false);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  const cartCount = getCartCount();

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              {cartItems.length === 0
                ? "Your cart is empty"
                : `You have ${cartItems.length} item(s) in your cart`}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingCart className="h-16 w-16 mb-4 opacity-20" />
                <p>Start adding items to your cart</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-4 border rounded-lg p-4 bg-card"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.price}
                          </p>
                          {item.selectedWeight && (
                            <p className="text-xs text-muted-foreground">
                              Weight: {item.selectedWeight}
                            </p>
                          )}
                          <p className="text-sm font-semibold text-primary mt-1">
                            ₹{calculateItemPrice(item).toFixed(2)} each
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.cartItemId)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.cartItemId, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.cartItemId, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setClearCartDialogOpen(true)}
                >
                  Clear Cart
                </Button>
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={() => setOrderDialogOpen(true)}
                >
                  Proceed to Order
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Order Dialog */}
      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
            <DialogDescription>
              Enter your details to place the order. Payment will be Cash on
              Delivery.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                placeholder="Enter your complete address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleWhatsAppOrder}
              className="w-full"
              variant="default"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Order via WhatsApp
            </Button>
            <Button
              onClick={handleEmailOrder}
              className="w-full"
              variant="outline"
            >
              <Mail className="mr-2 h-4 w-4" />
              Order via Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Clear Cart Confirmation Dialog */}
      <Dialog open={clearCartDialogOpen} onOpenChange={setClearCartDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Clear Cart?</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove all items from your cart? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setClearCartDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Cart;

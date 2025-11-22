import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
  selectedWeight?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedWeight?: string
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on init
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedWeight?: string
  ) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, quantity, selectedWeight }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Helper function to calculate price based on weight
  const calculateItemPrice = (item: CartItem): number => {
    // Extract base price per kg (e.g., "₹250/kg" -> 250)
    const pricePerKg = parseFloat(item.price.replace(/[^0-9.]/g, ""));

    if (!item.selectedWeight) {
      return pricePerKg;
    }

    // Parse the selected weight and convert to kg
    const weightStr = item.selectedWeight.toLowerCase();
    let weightInKg = 1; // Default to 1kg

    if (weightStr.includes("g") && !weightStr.includes("kg")) {
      // Convert grams to kg (e.g., "250g" -> 0.25)
      const grams = parseFloat(weightStr.replace(/[^0-9.]/g, ""));
      weightInKg = grams / 1000;
    } else if (weightStr.includes("kg")) {
      // Extract kg value (e.g., "1kg" -> 1, "0.5kg" -> 0.5)
      weightInKg = parseFloat(weightStr.replace(/[^0-9.]/g, ""));
    }

    return pricePerKg * weightInKg;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = calculateItemPrice(item);
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

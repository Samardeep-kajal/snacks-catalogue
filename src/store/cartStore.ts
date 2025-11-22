import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
  selectedWeight?: string;
  cartItemId: string; // Unique ID combining product ID and weight
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedWeight?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  calculateItemPrice: (item: CartItem) => number;
}

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

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, quantity = 1, selectedWeight) => {
        set((state) => {
          // Create unique cart item ID combining product ID and weight
          const cartItemId = `${product.id}-${selectedWeight || "default"}`;

          const existingItem = state.cartItems.find(
            (item) => item.cartItemId === cartItemId
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.cartItemId === cartItemId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            cartItems: [
              ...state.cartItems,
              { ...product, quantity, selectedWeight, cartItemId },
            ],
          };
        });
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.cartItemId !== cartItemId
          ),
        }));
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getCartTotal: () => {
        const items = get().cartItems;
        return items.reduce((total, item) => {
          const itemPrice = calculateItemPrice(item);
          return total + itemPrice * item.quantity;
        }, 0);
      },

      getCartCount: () => {
        const items = get().cartItems;
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      calculateItemPrice,
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);

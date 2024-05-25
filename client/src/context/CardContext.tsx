// CartContext.tsx
import React, { createContext, useState, useContext } from "react";
import { Product, CartItem } from "../modules/Types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
      console.log(cart);
        const newCartItem: CartItem = { ...product, quantity: 1 }; // Assuming quantity 1 when adding
        setCart([...cart, newCartItem]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;

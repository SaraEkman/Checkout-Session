import { useState } from "react";
import { useCart } from "../context/CardContext";
import Payment from "./Payment";
import "../styles/CartDisplay.css";

const CartDisplay = () => {
  const { cart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) =>
          total + item.quantity * item.default_price.unit_amount / 100,
        0
      )
      .toFixed(2);
  };

  return (
    <div className="cart-container">
      <button className="cart-button" onClick={toggleCart}>
        🛒 Cart ({cart.reduce((count, item) => count + item.quantity, 0)}) -{" "}
        {calculateTotal()} kr
      </button>
      {isOpen &&
        <div className="cart-content">
          <button className="cart-close" onClick={toggleCart}>
            ×
          </button>
          <h2>Cart Items</h2>
          {cart.map(item =>
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                {item.name} - <span className="quantity">
                  {item.quantity}
                </span>{" "}
                x {item.default_price.unit_amount / 100} kr
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          )}
          <div className="cart-total">
            Total: {calculateTotal()} kr
          </div>
          <Payment />
        </div>}
    </div>
  );
};

export default CartDisplay;

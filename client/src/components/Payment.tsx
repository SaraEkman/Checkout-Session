import { useCart } from "../context/CardContext";
import "../styles/Payment.css";

const Payment = () => {
  const { cart } = useCart();
  

  const handlePayment = async () => {
    
    const userData = JSON.parse(localStorage.getItem("data") || "{}");
    
    console.log("userData", userData);
    const items = cart.map(item => ({
      price: item.default_price.id,
      quantity: item.quantity
    }));

    const response = await fetch(
      "http://localhost:3001/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userData, items })
      }
    );

    const data = await response.json();
    localStorage.setItem("sessionId", data.sessionId);
    window.location.href = data.url;
  };

  

  return <div className="payment-container">
      <button className="payment-button" onClick={handlePayment}>
        Betala nu
      </button>
    </div>;
};

export default Payment;

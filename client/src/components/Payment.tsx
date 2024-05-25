import { useState } from "react";
import { useCart } from "../context/CardContext";
import "../styles/Payment.css";

const Payment = () => {
  const { cart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
     if (isProcessing) return; 
     setIsProcessing(true);
    const userData = JSON.parse(localStorage.getItem("data") || "{}");
    
    console.log("userData", userData);
    const items = cart.map(item => ({
      price: item.default_price.id,
      quantity: item.quantity
    }));

    // const response = await fetch(
    //   "http://localhost:3001/api/stripe/create-checkout-session",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ userData, items })
    //   }
    // );

    // const data = await response.json();
    // localStorage.setItem("sessionId", data.sessionId);
    // window.location.href = data.url;


      try {
        const response = await fetch(
          "http://localhost:3001/api/stripe/create-checkout-session",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userData, items })
          }
        );
        const data = await response.json();
        localStorage.setItem("sessionId", data.sessionId);
        window.location.href = data.url;
      } catch (error) {
        console.error("Payment failed:", error);
      } finally {
        setIsProcessing(false);
      }


  };

  

  return <div className="payment-container">
      <button disabled={isProcessing} className="payment-button" onClick={handlePayment}>
        Betala nu
      </button>
    </div>;
};

export default Payment;

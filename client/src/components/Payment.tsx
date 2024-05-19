const Payment = () => {
  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3001/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([
          {
            product: "price_1PAYwGP46Bs56q5IcWErEpEV",
            quantity: 3
          },
          {
            product: "price_1PAYvqP46Bs56q5I3HqJX4PL",
            quantity: 1
          }
        ])
      }
    );
    const data = await response.json();
    localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
    window.location = data.url;
  };

  return (
    <div>
      <button onClick={handlePayment}>GE MIG PENGAR!!!!</button>
    </div>
  );
};

export default Payment;

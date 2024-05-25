import { useEffect, useState } from "react";

const Confirmation = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

useEffect(
  () => {
    if (!verified) {
      const verifySession = async () => {
        const dataFromLs = localStorage.getItem("sessionId");
        const sessionId = dataFromLs;
        const userData = JSON.parse(localStorage.getItem("data") || "{}");
        setUserName(userData.name);

        try {
          if (sessionId) {
            const response = await fetch(
              "http://localhost:3001/api/stripe/verify-session",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ sessionId })
              }
            );

            const data = await response.json();

            if (response.ok) {
              setVerified(data.verified);
              setIsLoading(false);
              localStorage.removeItem("address");
            }
          }
        } catch (error) {
          console.error("Error verifying session:", error);
        }
      };

      verifySession();
    }
  },
  [verified]
);

  return (
    <div>
      Hej
      <h3>{verified && !isLoading ? `Tack för ditt köp ${userName} ✅` : "Laddar... Nåt gick fel!"}</h3>
      <a href="/" style={{ textDecoration: "none", color: "blue" }}>
        Go Till Start Sida
      </a>
    </div>
  );
};

export default Confirmation;

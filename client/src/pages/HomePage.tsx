import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [displayText, setDisplayText] = useState("");

  const handleButtonClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/getBalance", {
        method: "Post",
      });
      const data = await response.json();
      const balance: number = data.balance;
      setDisplayText(`Balance: ${balance}`);
    } catch (error) {
      alert("Failed to retrieve balance");
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleButtonClick}>Get Balance</button>
      <span>{displayText}</span>
    </div>
  );
};

export default HomePage;

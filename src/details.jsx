import React, { useState } from "react";
import axios from "axios";

const Details = ({ capturedImage, onShare, onReset }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const phoneNumberRegex = /^[0-9]{10}$/;

  const validateForm = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return false;
    }
    if (!email.trim()) {
      alert("Please enter your email.");
      return false;
    }
    if (!number.trim()) {
      alert("Please enter your phone number.");
      return false;
    }
    if (!phoneNumberRegex.test(number)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const userDetails = { name, email, number };

    try {
      // Use Axios to make a POST request
      const response = await axios.post(
        "https://vercel-serverless-func-seven.vercel.app/api/save-user",
        userDetails, // Send the data object directly
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
      alert("Successfully registered!");
      setName("");
      setEmail("");
      setNumber("");
      return true;
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register.");
      return false;
    }
  };

  const handleShareClick = async () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      const isSubmitted = await handleSubmit();

      if (isSubmitted && capturedImage) {
        onShare();
      } else if (!capturedImage) {
        alert("No image available to share.");
      }
    }
  };

  return (
    <div>
      <h2>Submit Your Details</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="number">Phone Number:</label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
      </form>

      <button
        onClick={handleShareClick}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Share Image
      </button>

      {/* Add the reset button */}
      <button
        onClick={() => {
          console.log("Reset clicked in Details");
          onReset();
        }}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
          marginLeft: "10px",
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Details;

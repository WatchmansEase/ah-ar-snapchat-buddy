import React, { useState } from "react";
import ThankYou from "./ThankYou";
import "./detail.css";
import axios from "axios";

const Details = ({ capturedImage, onShare, onReset, newsLetter }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const phoneNumberRegex = /^\+?[0-9]{10,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z\u0370-\u03FF\u1F00-\u1FFF\s]+$/; // Support Greek

  const validateForm = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return false;
    } else if (!nameRegex.test(name)) {
      alert("Name cannot contain digits or symbols.");
      return false;
    }
    if (!email.trim()) {
      alert("Please enter your email.");
      return false;
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!number.trim()) {
      alert("Please enter your phone number.");
      return false;
    } else if (!phoneNumberRegex.test(number)) {
      alert("Please enter a valid phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const convertToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      const base64Image = await convertToBase64(blob);

      // 1. Send user details to the Backend API
      const response = await axios.post(
        "https://vercel-serverless-func-seven.vercel.app/api/save-user",
        {
          name: name,
          email: email,
          phoneNumber: number,
          hasNewsletter: newsLetter,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User saved:", response.data);

      // 2. Pass email and Base64 image string to the Backend API
      const emailResponse = await axios.post(
        "https://vercel-serverless-func-seven.vercel.app/api/send-email-image",
        {
          email: email,
          image: base64Image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Email sent:", emailResponse.data);
      alert("Successfully registered!");
      setName("");
      setEmail("");
      setNumber("");
      setShowThankYou(true);
      return true;
    } catch (error) {
      console.error("Error:", error);
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

  if (showThankYou) {
    return <ThankYou />;
  }

  return (
    <>
      <div className="form-header">
        <div className="form-header-inside">
          <h2 className="detail-header">
            Συμμετοχή
            <br />
            στην κλήρωση
            <br />
            & αποστολή
            <br />
            της φωτογραφίας
          </h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <h6 className="sub-header">Πεδία υποχρεωτικής συμπλήρωσης:</h6>
              <div className="form-label-input">
                <label htmlFor="name"
                className="name-label">
                  Ονοματεπώνυμο
                </label>
                <br />
                <input
                  type="text"
                  className="name-input"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <div>
                  <label htmlFor="number"
                  className="number-label">
                    Τηλέφωνο
                  </label>
                  <br />
                  <input
                    type="text"
                    id="number"
                    className="number-input"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" 
                  className="email-label">
                    Email:
                  </label>
                  <br />
                  <input
                    type="email"
                    id="email" 
                    value={email}
                    className="email-input"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="submit-button">
        <img
          src="/buttons/dheeraj.png"
          alt="submit"
          onClick={handleShareClick}
          style={{
            width: "160px",
          }}
        />
      </div>
    </>
  );
};

export default Details;

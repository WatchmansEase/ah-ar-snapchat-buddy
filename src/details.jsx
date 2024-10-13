import React, { useState } from "react";
import ResetButton from "./ResetButton";
import "./detail.css";
import axios from "axios";

const Details = ({ capturedImage, onReset, newsLetter }) => {
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
    if (!number.trim()) {
      alert("Please enter your phone number.");
      return false;
    } else if (!phoneNumberRegex.test(number)) {
      alert("Please enter a valid phone number.");
      return false;
    }
    if (!email.trim()) {
      alert("Please enter your email.");
      return false;
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // Call validateForm() to check if the inputs are valid
    const isFormValid = validateForm();
    if (!isFormValid) {
      return; // Stop execution if the form is not valid
    }

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

      // Send user details to the Backend API
      await axios.post(
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

      // Send email asynchronously but don't wait for it to complete before showing feedback
      axios
        .post(
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
        )
        .then((response) => {
          console.log("Email sent:", response.data);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });

      setName("");
      setEmail("");
      setNumber("");
      setShowThankYou(true);
      // Show Thank You message after form submission without waiting for email to finish
      alert("Successfully registered! Your email will be sent shortly.");
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  if (showThankYou) {
    return <ResetButton onReset={onReset} />; // Pass onReset to ResetButton
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
              <h3 className="sub-header">Πεδία υποχρεωτικής συμπλήρωσης:</h3>
              <div className="form-label-input">
                <label htmlFor="name">
                  <b>Ονοματεπώνυμο</b>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="number">
                  <b>Τηλέφωνο</b>
                </label>
                <input
                  type="text"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
                <label htmlFor="email">
                  <b>E-mail</b>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="submit-button">
        <img
          src="/buttons/dheeraj.png"
          alt="submit"
          onClick={handleSubmit}
          style={{
            width: "100px",
          }}
        />
      </div>
    </>
  );
};

export default Details;

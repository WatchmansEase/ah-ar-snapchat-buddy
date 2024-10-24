import React, { useState } from "react";
import ResetButton from "./ResetButton";
import "./detail.css";
import axios from "axios";
import ToastProvider, { showToast } from "./toast";

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
      showToast("Παρακαλώ  εισάγετε το όνομα σας.");
      return false;
    } else if (!nameRegex.test(name)) {
      showToast("Το όνομα δεν μπορεί να περιέχει ψηφία ή σύμβολα.");
      return false;
    }
    if (!number.trim()) {
      showToast("Παρακαλώ εισάγετε το τηλέφωνο σας.");
      return false;
    } else if (!phoneNumberRegex.test(number)) {
      showToast("Ο αριθμός τηλεφώνου πρέπει να είναι μεταξύ 10-15 ψηφίων.");
      return false;
    }
    if (!email.trim()) {
      showToast("Παρακαλώ εισάγετε το email σας.");
      return false;
    } else if (!emailRegex.test(email)) {
      showToast("Εισαγάγετε μια έγκυρη διεύθυνση email.");
      return false;
    }
    return true;
  };

  const compressImage = async (base64Image, quality = 0.7) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = base64Image;
    });
  };

  const handleSubmit = async () => {
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    try {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      let base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      // Compress the image
      base64Image = await compressImage(base64Image, 0.7); // Adjust quality as needed

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

      // Send email with compressed image
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

      // Send email with terms and conditions
      axios
        .post(
          "https://vercel-serverless-func-seven.vercel.app/api/send-email-terms",
          {
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Email terms sent:", response.data);
        })
        .catch((error) => {
          console.error("Error sending terms email:", error);
        });

      setName("");
      setEmail("");
      setNumber("");
      setShowThankYou(true);
      showToast(
        "Η εγγραφή σας ήταν επιτυχής. Το email σας θα σταλεί σύντομα. "
      );
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  if (showThankYou) {
    return <ResetButton onReset={onReset} />;
  }

  return (
    <>
      <div className="form-container">
        <div className="form-header">
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
            width: "150px",
          }}
        />
      </div>
    </>
  );
};

export default Details;

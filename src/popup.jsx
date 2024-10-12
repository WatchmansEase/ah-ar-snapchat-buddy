import React, { useState } from "react";
import "./popup.css"; // Import the popup.css file

const ConsentPopup = ({ onAgree }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [newsLetter, setNewsletter] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleCheckboxChangeNewsletter = () => {
    setNewsletter(!newsLetter);
  };

  const handleSubmit = () => {
    if (isChecked) {
      onAgree(newsLetter); // Call the onAgree function passed from App component
      setIsVisible(false); // Close the popup
    } else {
      alert("You must agree to the terms to proceed.");
    }
  };

  return (
    isVisible && (
      <div className="popup">
        <h2>Διαγωνισμός για να είσαι μέσα σε όλα!</h2>
        <h4>Λάβε μέρος!</h4>
        <img
          src="/buttons/popupbuttonAsset 7.png"
          alt="Logo"
          className="popup-image"
          onClick={handleSubmit}
        />

        <p>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          Αποδέχομαι τους <a href="">όρους</a> &nbsp; του διαγωνισμού.
        </p>

        <label>
          <input
            type="checkbox"
            checked={newsLetter}
            onChange={handleCheckboxChangeNewsletter}
          />
          Επιθυμώ να λαμβάνω ενημερώσεις σχετικά με προϊόντα και νέες υπηρεσίες
          του Ομίλου ΔΕΗ.
        </label>
      </div>
    )
  );
};

export default ConsentPopup;

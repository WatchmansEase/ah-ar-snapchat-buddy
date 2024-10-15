import React, { useState } from "react";
import "./popup.css"; // Import the popup.css file
import ToastProvider, { showToast } from "./toast";

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
      onAgree();
      setIsVisible(false);
    } else {
      showToast("You must agree to the terms to proceed.");
    }
  };

  return (
    isVisible && (
      <div className="popup-first">
        <div className="popup">
          <h2 className="pop-first-title">Διαγωνισμός</h2>
          <h2 className="pop-second-title">για να είσαι μέσα σε όλα!</h2>
          <h4 className="pop-third-title">Λάβε μέρος!</h4>
          <img
            src="/buttons/popupbuttonAsset 7.png"
            alt="Logo"
            className="popup-image"
            onClick={handleSubmit}
          />
          <div className="popup-input-text">
            <div className="checkbox-row-one">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <h4>
                Αποδέχομαι τους{" "}
                <a
                  href="https://www.dei.gr/en/terms-of-use/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  όρους
                </a>{" "}
                <br />
                του διαγωνισμού.
              </h4>
            </div>
            <div className="checkbox-row-two">
              {" "}
              <input
                type="checkbox"
                checked={newsLetter}
                onChange={handleCheckboxChangeNewsletter}
              />
              <h4>
                Επιθυμώ να λαμβάνω ενημερώσεις
                <br />
                σχετικά με προϊόντα και
                <br /> νέες υπηρεσίες του Ομίλου ΔΕΗ.
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConsentPopup;

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
      onAgree();
      setIsVisible(false);
    } else {
      alert("You must agree to the terms to proceed.");
    }
  };

  return (
    isVisible && (
      <div className="popup-first">
        <div className="popup">
          <h2 className="pop-first-title">Διαγωνισμός</h2>
          <h2 className="pop-second-title">για να είσαι μέσα σε όλα!</h2>
          <h4>Λάβε μέρος!</h4>
          <div className="popup-img-flex">
            <img
              src="/buttons/popupbuttonAsset 7.png"
              alt="Logo"
              className="popup-image"
              onClick={handleSubmit}
            />
          </div>
          <div className="popup-input-text">
            <div className="popup-h4-input-2">
              <div className="popup-h4-input-2-2">
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
              <div className="popup-h4-input-2-2">
                <input
                  type="checkbox"
                  checked={newsLetter}
                  onChange={handleCheckboxChangeNewsletter}
                />
                <h4>
                  Επιθυμώ να λαμβάνω ενημερώσεις
                  <br />
                  σχετικά με προϊόντα και νέες
                  <br /> υπηρεσίες του Ομίλου ΔΕΗ.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConsentPopup;

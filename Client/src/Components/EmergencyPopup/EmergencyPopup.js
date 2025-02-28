import React, { useState } from "react";

const EmergencyPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    { name: "Animal Control", phone: "123-456-7890" },
    { name: "Local Vet Clinic", phone: "987-654-3210" },
    { name: "Pet Poison Helpline", phone: "800-555-0199" },
    { name: "Lost & Found Pets", phone: "555-123-4567" },
  ];

  return (
    <div>
      {/* Emergency Button */}
      <button className="emergency-button" onClick={() => setIsOpen(true)}>
        🚨 Emergency Contacts
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Emergency Contacts</h2>
            <ul>
              {contacts.map((contact, index) => (
                <li key={index}>
                  <strong>{contact.name}:</strong> {contact.phone}
                </li>
              ))}
            </ul>
            <button className="close-button" onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyPopup;

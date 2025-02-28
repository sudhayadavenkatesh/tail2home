import React, { useState } from "react";
import { useAuthContext } from "../../hooks/UseAuthContext";

function AdoptForm(props) {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user.email);  // Initialize with user email
  const [phoneNo, setPhoneNo] = useState("");
  const [livingSituation, setLivingSituation] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [familyComposition, setFamilyComposition] = useState("");
  const [formError, setFormError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [ErrPopup, setErrPopup] = useState(false);
  const [SuccPopup, setSuccPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);

    if (
      !name ||
      !email ||
      !phoneNo ||
      !livingSituation ||
      !previousExperience ||
      !familyComposition
    ) {
      setFormError(true);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:4000/form/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name,
          email,
          phoneNo,
          livingSituation,
          previousExperience,
          familyComposition,
          petId: props.pet._id,
        }),
      });

      if (!response.ok) {
        setErrPopup(true);
      } else {
        setSuccPopup(true);
        // Reset form after successful submission
        setName("");
        setEmail(user.email);  // Reset with user email
        setPhoneNo("");
        setLivingSituation("");
        setPreviousExperience("");
        setFamilyComposition("");
      }
    } catch (err) {
      setErrPopup(true);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="custom-adopt-form-container">
      <h2 className="custom-form-heading">Pet Adoption Application</h2>
      <div className="form-pet-container">
        <div className="pet-details">
          <div className="pet-pic">
            <img
              src={`http://localhost:4000/images/${props.pet.filename}`}
              alt={props.pet.name}
            />
          </div>
          <div className="pet-info">
            <h2>{props.pet.name}</h2>
            <p>
              <b>Type:</b> {props.pet.type}
            </p>
            <p>
              <b>Age:</b> {props.pet.age}
            </p>
            <p>
              <b>Location:</b> {props.pet.location}
            </p>
          </div>
        </div>

        <div className="form-div">
          <form onSubmit={handleSubmit} className="custom-form">
            {/* Name Input Field */}
            <div className="custom-input-box">
              <label className="custom-label">Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="custom-input"
              />
            </div>

            {/* Email Input Field */}
            <div className="custom-input-box">
              <label className="custom-label">Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="custom-input"
              />
            </div>

            {/* Phone Number Input Field */}
            <div className="custom-input-box">
              <label className="custom-label">Phone No.</label>
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="custom-input"
              />
            </div>

            {/* Living Situation Input Field */}
            <div className="custom-input-box">
              <label className="custom-label">Pet Living Situation:</label>
              <input
                type="text"
                value={livingSituation}
                onChange={(e) => setLivingSituation(e.target.value)}
                className="custom-input"
              />
            </div>

            {/* Previous Experience Input Field */}
            <div className="custom-input-box">
              <label className="custom-label">Previous Pet Experience:</label>
              <input
                type="text"
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
                className="custom-input"
              />
            </div>

            {/* Family Composition (Other Pets) Input Field */}
            <div className="custom-input-box">
              <label className="custom-label">Any Other Pets:</label>
              <input
                type="text"
                value={familyComposition}
                onChange={(e) => setFamilyComposition(e.target.value)}
                className="custom-input"
              />
            </div>

            {/* Error Message */}
            {formError && (
              <p className="error-message">Please fill out all fields.</p>
            )}

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="custom-cta-button custom-m-b"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>

            {/* Error Popup */}
            {ErrPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>Oops!... Connection Error.</h4>
                </div>
                <button
                  onClick={() => setErrPopup(false)}
                  className="close-btn"
                >
                  Close <i className="fa fa-times"></i>
                </button>
              </div>
            )}

            {/* Success Popup */}
            {SuccPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>
                    Adoption Form for {props.pet.name} is Submitted. We'll get
                    in touch with you soon for further process.
                  </h4>
                </div>
                <button
                  onClick={() => {
                    setSuccPopup(false);
                    props.closeForm();
                  }}
                  className="close-btn"
                >
                  Close <i className="fa fa-times"></i>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdoptForm;

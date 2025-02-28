import React, { useState, useEffect } from "react";
import postPet from "./images/postPet.png";
import { useAuthContext } from "../../hooks/UseAuthContext";

const PostPetSection = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [area, setArea] = useState("");
  const [justification, setJustification] = useState("");
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [justificationError, setJustificationError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [type, setType] = useState("None");
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSubmitting) {
      setFormError(false);
      setNameError(false);
      setLocationError(false);
      setJustificationError(false);
    }
  }, [isSubmitting]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicture(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation Checks
    setNameError(name.length < 3 || name.length > 30 || !/^[a-zA-Z\s]+$/.test(name));
    setLocationError(area.length < 3 || area.length > 50 || !/^[a-zA-Z\s,]+$/.test(area));
    setJustificationError(justification.length < 10 || justification.length > 200);

    if (
      !name || !age || !area || !justification || !email || !phone || !fileName ||
      type === "None" || nameError || locationError || justificationError
    ) {
      setFormError(true);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("area", area);
    formData.append("justification", justification);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("type", type);
    if (picture) {
      formData.append("picture", picture);
    }

    try {
      const response = await fetch("http://localhost:4000/services", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Form submitted successfully");
      setName(""); setAge(""); setArea(""); setJustification(""); setEmail("");
      setPhone(""); setPicture(null); setFileName("");
      togglePopup();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="post-pet-section">
      <h2>Post a Pet for Adoption</h2>
      <img src={postPet} alt="Pet Looking for a Home" />

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name Field */}
        <div className="input-box">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter pet's name"
          />
          {nameError && <p className="error-message">Name must be 3-30 characters and contain only letters.</p>}
        </div>

        {/* Age Field */}
        <div className="input-box">
          <label>Pet Age:</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter pet's age"
          />
        </div>

        {/* Picture Field */}
        <div className="input-box">
          <label>Picture:</label>
          <label className="file-input-label">
            <span className="file-input-text">{fileName || "Choose a Picture"}</span>
            <input className="file-input" type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>

        {/* Location Field */}
        <div className="input-box">
          <label>Location:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter city or area"
          />
          {locationError && <p className="error-message">Location must be 3-50 characters and contain only letters, spaces, or commas.</p>}
        </div>

        {/* Type Selection */}
        <div className="filter-selection-service">
          <label>Type:</label>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="None">None</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
        </div>

        {/* Justification Field */}
        <div className="input-box">
          <h3>Justification for Giving a Pet</h3>
          <textarea
            rows="4"
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Explain why you are giving the pet for adoption"
          ></textarea>
          {justificationError && <p className="error-message">Justification must be 10-200 characters long.</p>}
        </div>

        {/* Contact Information */}
        <h3>Contact Information</h3>
        <div className="input-box">
          <label>Email:</label>
          <input type="text" value={email} disabled />
        </div>

        <div className="input-box">
          <label>Phone No:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const inputVal = e.target.value;
              if (/^\d{0,10}$/.test(inputVal)) {
                setPhone(inputVal);
              }
            }}
            maxLength="10"
            placeholder="Enter 10-digit phone number"
          />
        </div>
        {phone.length > 0 && phone.length < 10 && <p className="error-message">Phone number must be exactly 10 digits.</p>}

        {formError && <p className="error-message">Please fill out all fields correctly.</p>}

        <button type="submit" className="cta-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Your Pet"}
        </button>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h4>Application Submitted; we'll get in touch with you soon.</h4>
            </div>
            <button onClick={togglePopup} className="close-btn">
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default PostPetSection;

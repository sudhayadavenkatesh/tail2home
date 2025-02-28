import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="contact-us-container">
      {/* Contact Intro Section */}
      <div className="contact-intro">
        <h2>Contact Form</h2>
        <p>
          Are you looking forward to giving a pet (Indian Mongrel Pups, Dogs, or
          Indian Kittens or Cats) its forever home? Your perfect furry companion
          is waiting for you with us. Just leave behind the details by filling
          up the simple form below, and our team will get in touch with you
          about the adoption process.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="contactUs-form-container">
        <h3>Send Us A Message</h3>
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-label="Your Name"
          />

          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Your Email"
          />

          <label htmlFor="phone">Your Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            aria-label="Your Phone Number"
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
            aria-label="Your Message"
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

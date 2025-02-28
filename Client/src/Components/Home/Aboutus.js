import React from "react";

const AboutUs = () => {
  return (
    <section className="about-container">
      <div className="about-content">
        {/* Heading */}
        <h2 className="about-title">
          About <span className="highlight">Tail2Home</span>
        </h2>

        {/* Description */}
        <p className="about-text">
          Tail2Home is a non-profit organization started by a small group of
          animal lovers in Thane, who have had enough of seeing innocent animals
          struggle for their lives.
        </p>
        <p className="about-text">
          We help animals in distress (orphaned, injured, or abandoned) and find
          loving homes that treat them like family.
        </p>

        {/* Image */}
        <div className="about-image-container">
          <img
            src="/images/about-us.jpg"
            alt="About Tail2Home"
            className="about-image"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

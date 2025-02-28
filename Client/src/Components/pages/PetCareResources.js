import React from "react";
import { CheckCircle, Heart, PawPrint, Shield, BookOpen, Smile } from "lucide-react";

const PetCareResources = () => {
  return (
    <div className="pet-care-container">
      {/* Header Section */}
      <div className="header">
        <h1>🐾 Pet Care Resources</h1>
        <p>A guide to keeping your pets happy, healthy, and safe.</p>
      </div>

      {/* Resource Sections */}
      <div className="resource-sections">
        
        {/* Introduction Section */}
        <div className="section card blue">
          <h2><PawPrint className="icon" /> Introduction to Pet Care</h2>
          <p>Caring for a pet requires love, commitment, and responsibility.</p>
        </div>

        {/* Nutrition Section */}
        <div className="section card green">
          <h2><Heart className="icon" /> Nutrition</h2>
          <p>Provide a well-balanced diet for your pet's health.</p>
          <ul>
            <li>Feed appropriate portions.</li>
            <li>Provide fresh water.</li>
            <li>Avoid toxic foods like chocolate and onions.</li>
          </ul>
        </div>

        {/* Healthcare Section */}
        <div className="section card red">
          <h2><Shield className="icon" /> Healthcare</h2>
          <ul>
            <li>Schedule vet check-ups.</li>
            <li>Keep up with vaccinations.</li>
            <li>Be prepared for emergencies.</li>
          </ul>
        </div>

        {/* Exercise Section */}
        <div className="section card yellow">
          <h2><Smile className="icon" /> Exercise & Mental Stimulation</h2>
          <p>Keep your pet active with regular playtime and training.</p>
        </div>

        {/* Training & Grooming */}
        <div className="section card purple">
          <h2><BookOpen className="icon" /> Training & Grooming</h2>
          <ul>
            <li>Teach basic commands.</li>
            <li>Brush fur and trim nails regularly.</li>
          </ul>
        </div>

        {/* Adoption & Rehoming */}
        <div className="section card pink">
          <h2><CheckCircle className="icon" /> Adoption & Rehoming</h2>
          <p>Support shelters and be prepared for lifelong responsibility.</p>
        </div>

        {/* Useful Links */}
        <div className="section card blue">
          <h2>Useful Links & Resources</h2>
          <ul>
            <li><a href="https://www.aspca.org/">ASPCA - Pet Care Tips</a></li>
            <li><a href="https://www.avma.org/">American Veterinary Association</a></li>
            <li><a href="https://www.humanesociety.org/">Humane Society</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PetCareResources;

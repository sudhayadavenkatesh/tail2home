import React from "react";
import EmergencyPopup from "../EmergencyPopup/EmergencyPopup"; // Import the popup
import HomeLandingContainer from "./HomeLandingContainer";
import CardBelowHome from "./CardBelowHome";
import PlanningToAdoptAPet from "./PlanningToAdoptAPet";
import AboutUs from "./Aboutus"; // Import the About Us component
import ContactForm from "./Contactform";

const Home = (props) => {
  return (
    <>
      <HomeLandingContainer description={props.description} />
      <CardBelowHome />
      <PlanningToAdoptAPet />

      {/* Emergency Popup Component */}
      <EmergencyPopup />

      {/* About Us Section */}
      <AboutUs />

      <ContactForm />


    </>
  );
};

export default Home;

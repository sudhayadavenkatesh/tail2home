import React from 'react';
import Card from "./Card";

const PlanningToAdoptAPet = () => {
  return (
    <div className='planning-container'>
        <h1>Adopt a Pet , Don't Shop</h1>
        <div className='boxes-container'>
            <Card title="Why Adopt? The Joy of Pet Parenthood" description="Adopting a pet is more than just a decision—it's a heartwarming journey filled with unconditional love, joy, and companionship."/>
            <Card title="Your Adoption Guide: Finding the Right Pet for You!" description="Thinking about bringing a furry friend home? Let us guide you through the pet adoption process to make it smooth and rewarding! "/>
            <Card title="The Incredible Benefits of Pet Companionship" description="Pets bring happiness, reduce stress, and create lasting bonds. Discover how animals can transform lives with their love!"/>
        </div>
    </div>
  )
}

export default PlanningToAdoptAPet;
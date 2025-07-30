import React, { useState } from 'react';
import './SubscriptionPlans.css'
import PricingCard from './components/PricingCard';
import PricingModal from './components/PricingModal';

function SubscriptionPlans() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tiers = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started",
      features: [
        "Access to everything",
        "Data scraper - 50/month",
        "Email marketing - 50/month",
        "Landing page builder - Build 1 page (no deploy)"
      ],
      highlight: false
    },
    {
      name: "Lite",
      price: "29.99",
      description: "Great for small businesses",
      features: [
        "Data scraper - First 40 free + API charges",
        "Email marketing - 2,000 emails/month",
        "Landing page builder - 1 page with deploy",
        "Priority email support"
      ],
      highlight: false
    },
    {
      name: "Premium",
      price: "49.99",
      description: "Perfect for growing teams",
      features: [
        "Data scraper - First 40 free + API charges",
        "Email marketing - 5,000 emails/month",
        "Landing page builder - 2 pages with deploy",
        "24/7 Priority support"
      ],
      highlight: true
    },
    {
      name: "Enterprise",
      price: "89.99",
      description: "For professional businesses",
      features: [
        "Data scraper - First 40 free + API charges",
        "Email marketing - 10,000 emails/month",
        "Landing page builder - 3 pages with deploy",
        "Dedicated support manager"
      ],
      highlight: false
    }
  ];

  const handleTierClick = (tier) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  return (
    <div className="app">
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>Select the perfect plan for your needs</p>
      </div>
      
      <div className="pricing-container">
        {tiers.map((tier, index) => (
          <PricingCard
            key={index}
            tier={tier}
            onClick={() => handleTierClick(tier)}
          />
        ))}
        
      </div>

      

      {isModalOpen && (
        <PricingModal
          tier={selectedTier}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default SubscriptionPlans;
import React from 'react';

function PricingCard({ tier, onClick }) {
  const getTierClass = (name) => {
    switch (name.toLowerCase()) {
      case 'free': return 'free';
      case 'lite': return 'lite';
      case 'premium': return 'premium';
      case 'enterprise': return 'enterprise';
      default: return '';
    }
  };

  const tierClass = getTierClass(tier.name);

  return (
    <div className={`pricing-card ${tierClass}`}>
      <div className="card-header">
        <h2>{tier.name}</h2>
        <div className="price">
          <span className="currency">$</span>
          <span className="amount">{tier.price}</span>
          {tier.price !== "0" && <span className="period">/mo</span>}
        </div>
        <p className="description">{tier.description}</p>
      </div>

      <div className="features">
        {tier.features.map((feature, index) => (
          <div key={index} className="feature">
            <span className="checkmark">✦</span>
            {feature}
          </div>
        ))}
      </div>

      <button 
        className="select-button"
        onClick={() => onClick(tier)}
      >
        Select Plan
      </button>
    </div>
  );
}

export default PricingCard;
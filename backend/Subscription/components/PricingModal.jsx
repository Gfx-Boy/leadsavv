import React from 'react';

function PricingModal({ tier, onClose }) {
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
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${tierClass}`} onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{tier.name} Plan</h2>
          <div className="modal-price">
            <span className="currency">$</span>
            <span className="amount">{tier.price}</span>
            {tier.price !== "0" && <span className="period">/mo</span>}
          </div>
        </div>

        <div className="modal-features">
          <h3>What's included:</h3>
          {tier.features.map((feature, index) => (
            <div key={index} className="modal-feature">
              <span className="checkmark">✦</span>
              {feature}
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="get-started-button">Get Started Now</button>
          <button className="contact-sales-button">Contact Sales</button>
        </div>
      </div>
    </div>
  );
}

export default PricingModal;
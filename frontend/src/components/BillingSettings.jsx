import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

function BillingSettings() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$10',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$29',
      features: ['All Basic features', 'Feature 4', 'Feature 5', 'Feature 6'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      features: ['All Pro features', 'Feature 7', 'Feature 8', 'Feature 9'],
    },
  ];

  const handleCardSubmit = (e) => {
    e.preventDefault();
    toast.success('Payment method added successfully!');
    setShowCardForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div className="px-6 py-8">
          <h3 className="text-2xl font-semibold text-white mb-8">Subscription Plans</h3>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg border-2 p-6 transition-all duration-200 transform hover:scale-105 ${
                  selectedPlan === plan.id
                    ? 'border-indigo-500 bg-gray-700'
                    : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">{plan.name}</h3>
                    <p className="mt-2 text-2xl font-bold text-indigo-400">{plan.price}</p>
                    <ul className="mt-4 space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <svg
                            className="h-5 w-5 text-indigo-400 mr-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`mt-6 w-full rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      selectedPlan === plan.id
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-600 text-white hover:bg-gray-500'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-white">Payment Methods</h3>
            <button
              onClick={() => setShowCardForm(!showCardForm)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:bg-indigo-700 hover:scale-105"
            >
              Add Payment Method
            </button>
          </div>

          {showCardForm && (
            <form onSubmit={handleCardSubmit} className="space-y-6">
              <div className="group">
                <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-200 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="cardholderName"
                  placeholder="John Doe"
                  className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                           transition-all duration-200 ease-in-out
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                           hover:border-gray-500"
                  value={cardData.cardholderName}
                  onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                />
              </div>

              <div className="group">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-200 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                           transition-all duration-200 ease-in-out
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                           hover:border-gray-500"
                  value={cardData.cardNumber}
                  onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-200 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="MM/YY"
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                    value={cardData.expiryDate}
                    onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
                  />
                </div>

                <div className="group">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-200 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium
                           transform transition-all duration-200 ease-in-out
                           hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add Card
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default BillingSettings;
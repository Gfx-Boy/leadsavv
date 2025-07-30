import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { CreditCard, Shield, Zap, CheckCircle, Star, Trash2, AlertTriangle, X } from 'lucide-react';

const stripePromise = loadStripe('pk_live_51Ocz3aLkcPTy2rjPtXbNgTurl0FpoaxdeHOnj39RLvI68zkLR4mk8B2YfDCFm4ryAvn5VEzjjedkdNhoHUk3mXCX003XxUmXKj');

function BillingSettings() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [plans, setPlans] = useState([
    { 
      id: 'free', 
      name: 'Free Plan', 
      price: 0, 
      icon: <Shield className="w-6 h-6 text-gray-400" />,
      features: [
        'Access to everything',
        'Data scraper - 50/month',
        'Email marketing - 50/month', 
        'Landing page builder - build 1 page but they cannot deploy'
      ]
    },
    { 
      id: 'basic', 
      name: 'Basic Plan', 
      price: 10, 
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      features: [
        'Data scraper - first 40 free and the rest depending upon api charges', 
        'Email marketing - 2000 email a month', 
        'Landing page builder - 1 landing page with deploy'
      ]
    },
    { 
      id: 'pro', 
      name: 'Standard Plan', 
      price: 29, 
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      features: [
        'Data scraper - first 40 free and the rest depending upon api charges', 
        'Email marketing - 5000 email a month', 
        'Landing page builder - 2 landing page with deploy'
      ]
    },
    { 
      id: 'premium', 
      name: 'Enterprise Plan', 
      price: 99, 
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      features: [
        'Data scraper - first 40 free and the rest depending upon api charges', 
        'Email marketing - 10k email a month', 
        'Landing page builder - 3 landing page with deploy'
      ]
    }
  ]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [paymentMethodToDelete, setPaymentMethodToDelete] = useState(null);

  useEffect(() => {
    const fetchBillingDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const [paymentMethodsResponse, subscriptionResponse] = await Promise.all([
          axios.get('http://31.97.41.27:5005/api/payment/get-payment-methods', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://31.97.41.27:5005/api/user/subscription-plan', {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        
        setPaymentMethods(paymentMethodsResponse.data.paymentMethods);
        setCurrentPlan(subscriptionResponse.data);
      } catch (error) {
        console.error('Error fetching billing details:', error);
        toast.error('Failed to fetch billing details');
      } finally {
        setLoading(false);
      }
    };

    fetchBillingDetails();
  }, []);

  const handleSelectPlan = (planId) => {
    if (planId === 'free') {
      toast.success('You are already on the Free Plan.');
      return;
    }
    setSelectedPlan(plans.find(p => p.id === planId));
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (successMessage) => {
    toast.success(successMessage);
    setShowPaymentModal(false);
    setSelectedPlan(null);
    setShowSuccessPopup(true);
    
    const token = sessionStorage.getItem('token');
    const subscriptionResponse = await axios.get('http://31.97.41.27:5005/api/user/subscription-plan', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCurrentPlan(subscriptionResponse.data);
  };

  const handlePaymentError = (errorMessage) => {
    toast.error(errorMessage);
    setShowPaymentModal(false);
    setSelectedPlan(null);
  };

  const handleDeletePaymentMethod = async () => {
    if (!paymentMethodToDelete) return;

    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://31.97.41.27:5005/api/payment/delete-payment-method/${paymentMethodToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const updatedPaymentMethods = await axios.get('http://31.97.41.27:5005/api/payment/get-payment-methods', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setPaymentMethods(updatedPaymentMethods.data.paymentMethods);
      alert('Payment method deleted successfully');
      setShowDeletePopup(false);
      setPaymentMethodToDelete(null);
    } catch (error) {
      console.error('Error deleting payment method:', error);
    alert('Failed to delete payment method');
    }
  };

  const handleSetDefaultPaymentMethod = async (paymentMethodId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(
        'http://31.97.41.27:5005/api/payment/set-default-payment-method',
        { paymentMethodId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const updatedPaymentMethods = await axios.get('http://31.97.41.27:5005/api/payment/get-payment-methods', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setPaymentMethods(updatedPaymentMethods.data.paymentMethods);
      alert('Default payment method updated');
    } catch (error) {
      console.error('Error setting default payment method:', error);
      alert('Failed to update default payment method');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-400">Select the perfect plan for your needs</p>
        </header>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${
                currentPlan?.id === plan.id ? 'ring-2 ring-blue-500' : ''
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-2xl font-bold mt-2">${plan.price}<span className="text-sm text-gray-400">/mo</span></p>
                </div>
                {plan.icon}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={currentPlan?.id === plan.id}
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  currentPlan?.id === plan.id
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {currentPlan?.id === plan.id ? 'Current Plan' : 'Select Plan'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                Payment Methods
              </h2>
            </div>

            {paymentMethods.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No payment methods added yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      method.isDefault ? 'bg-blue-900/20 border border-blue-500/50' : 'bg-gray-700/50'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-700 rounded">
                        <CreditCard className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{method.brand} •••• {method.last4}</span>
                          {method.isDefault && (
                            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">Expires {method.expMonth}/{method.expYear}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!method.isDefault && (
                        <button
                          onClick={() => handleSetDefaultPaymentMethod(method.id)}
                          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                          title="Set as default"
                        >
                          <Star className="w-5 h-5 text-gray-400 hover:text-blue-500" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setPaymentMethodToDelete(method.id);
                          setShowDeletePopup(true);
                        }}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showPaymentModal && (
            <PaymentModal
              selectedPlan={selectedPlan}
              onClose={() => setShowPaymentModal(false)}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}

          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <Confetti />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Success!</h3>
                <p className="text-gray-400 mb-6">Your subscription has been activated successfully.</p>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="w-full py-2 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Continue
                </button>
              </motion.div>
            </motion.div>
          )}

          {showDeletePopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-xl max-w-md mx-4"
              >
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-bold">Confirm Deletion</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-6">
                    Are you sure you want to delete this payment method? This action cannot be undone.
                  </p>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setShowDeletePopup(false);
                        setPaymentMethodToDelete(null);
                      }}
                      className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeletePaymentMethod}
                      className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PaymentModal({ selectedPlan, onClose, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get('http://31.97.41.27:5005/api/payment/get-payment-methods', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        setSavedPaymentMethods(response.data.paymentMethods || []);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedPaymentMethod) {
        const response = await axios.post(
          'http://31.97.41.27:5005/api/payment/create-subscription',
          { planId: selectedPlan.id, paymentMethodId: selectedPaymentMethod },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );

        if (response.status === 200) {
          onSuccess(response.data.message || 'Subscription created successfully.');
        } else {
          onError(response.data.message || 'Subscription failed. Please try again.');
        }
      } else {
        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          onError(error.message);
          setLoading(false);
          return;
        }

        if (savePaymentMethod) {
          const token = sessionStorage.getItem('token');
          await axios.post(
            'http://31.97.41.27:5005/api/payment/add-payment-method',
            { paymentMethodId: paymentMethod.id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        const response = await axios.post(
          'http://31.97.41.27:5005/api/payment/create-subscription',
          { planId: selectedPlan.id, paymentMethodId: paymentMethod.id },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );

        if (response.status === 200) {
          onSuccess(response.data.message || 'Subscription created successfully.');
        } else {
          onError(response.data.message || 'Subscription failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      onError('An error occurred while processing your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-xl max-w-md w-full mx-4"
      >
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-xl font-bold">Complete Payment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Plan Details</h4>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{selectedPlan.name}</p>
                  <p className="text-sm text-gray-400">Monthly subscription</p>
                </div>
                <p className="text-2xl font-bold">${selectedPlan.price}/mo</p>
              </div>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            {savedPaymentMethods.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Saved Cards</h4>
                <div className="space-y-3">
                  {savedPaymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'bg-blue-500/20 border border-blue-500/50'
                          : 'bg-gray-700/50 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={selectedPaymentMethod === method.id}
                          onChange={() => setSelectedPaymentMethod(method.id)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-medium">
                            {method.brand} •••• {method.last4}
                          </p>
                          <p className="text-sm text-gray-400">
                            Expires {method.expMonth}/{method.expYear}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-3">
                {savedPaymentMethods.length > 0 ? 'Or Pay with New Card' : 'Card Details'}
              </h4>
              <div className="p-4 rounded-lg bg-gray-700/50">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#fff',
                        '::placeholder': {
                          color: '#9ca3af',
                        },
                      },
                    },
                  }}
                />
              </div>

              <label className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={savePaymentMethod}
                  onChange={(e) => setSavePaymentMethod(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-300">
                  Save this card for future payments
                </span>
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay $${selectedPlan.price}`
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <Elements stripe={stripePromise}>
      <BillingSettings />
    </Elements>
  );
}

export default App;
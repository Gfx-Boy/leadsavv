import dotenv from 'dotenv';
import Stripe from 'stripe';
import User from '../models/userModel.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const planLimits = {
  free: { scraperLimit: 50, emailLimit: 50, priceId: null }, // Free plan has no price ID
  basic: { scraperLimit: 40, emailLimit: 2000, priceId: 'price_1R47d42MWieuisj2IJG275r8' }, // Replace with your Stripe price ID
  pro: { scraperLimit: 40, emailLimit: 5000, priceId: 'price_1R47ea2MWieuisj2ImVedlaJ' }, // Replace with your Stripe price ID
  premium: { scraperLimit: 40, emailLimit: 10000, priceId: 'price_1R47fE2MWieuisj222qlqczi' }, // Replace with your Stripe price ID
};

// Add a new payment method
export const addPaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.body;

  try {
    const user = await User.findById(req.userId); // Get the user from the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.stripeCustomerId) {
      // Create a Stripe customer if not already created
      const customer = await stripe.customers.create({
        email: user.email,
      });
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    // Attach the payment method to the customer
    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    // Set the payment method as the default
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Save the payment method details in MongoDB
    const paymentMethodDetails = {
      id: paymentMethod.id,
      brand: paymentMethod.card.brand,
      last4: paymentMethod.card.last4,
      expMonth: paymentMethod.card.exp_month,
      expYear: paymentMethod.card.exp_year,
    };

    user.paymentMethods = user.paymentMethods || []; // Ensure the field exists
    user.paymentMethods.push(paymentMethodDetails); // Add the new payment method
    user.defaultPaymentMethod = paymentMethodId; // Set as default
    await user.save();

    res.status(200).json({ message: 'Payment method added successfully.' });
  } catch (error) {
    console.error('Error adding payment method:', error.message);
    res.status(500).json({ message: 'Failed to add payment method.' });
  }
};
// Get all payment methods
export const getPaymentMethods = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.stripeCustomerId) {
      return res.status(400).json({ message: 'No Stripe customer found.' });
    }

    // Retrieve all payment methods attached to the customer from Stripe
    const stripePaymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
      type: 'card',
    });

    // Combine Stripe payment methods with MongoDB saved methods
    const savedPaymentMethods = user.paymentMethods || [];
    const formattedMethods = stripePaymentMethods.data.map((method) => ({
      id: method.id,
      brand: method.card.brand,
      last4: method.card.last4,
      expMonth: method.card.exp_month,
      expYear: method.card.exp_year,
      isDefault: method.id === user.defaultPaymentMethod,
    }));

    res.status(200).json({ paymentMethods: formattedMethods });
  } catch (error) {
    console.error('Error fetching payment methods:', error.message);
    res.status(500).json({ message: 'Failed to fetch payment methods.' });
  }
};
export const updatePaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the new payment method to the customer in Stripe
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    // Set the new payment method as the default for the customer
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Update the payment method in MongoDB
    user.defaultPaymentMethod = paymentMethodId;
    await user.save();

    res.status(200).json({ message: 'Payment method updated successfully.' });
  } catch (error) {
    console.error('Error updating payment method:', error.message);
    res.status(500).json({ message: 'An error occurred while updating the payment method.' });
  }
};

// Delete a payment method
export const deletePaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.params;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.defaultPaymentMethod === paymentMethodId) {
      return res.status(400).json({ message: 'Cannot delete the default payment method.' });
    }

    // Detach the payment method from the customer
    await stripe.paymentMethods.detach(paymentMethodId);

    res.status(200).json({ message: 'Payment method deleted successfully.' });
  } catch (error) {
    console.error('Error deleting payment method:', error.message);
    res.status(500).json({ message: 'Failed to delete payment method.' });
  }
};

// Set a payment method as default
export const setDefaultPaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set the payment method as the default in Stripe
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Update the default payment method in MongoDB
    user.defaultPaymentMethod = paymentMethodId;
    await user.save();

    res.status(200).json({ message: 'Default payment method updated successfully.' });
  } catch (error) {
    console.error('Error setting default payment method:', error.message);
    res.status(500).json({ message: 'Failed to set default payment method.' });
  }
};

// Create a new subscription
export const createSubscription = async (req, res) => {
  const { paymentMethodId, planId } = req.body;

  try {
    const user = await User.findById(req.userId); // Get the user from the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the plan
    const planLimits = {
      free: null, // Free plan has no price ID
      basic: 'price_1R8CLVLkcPTy2rjPC3obPtCy', // Replace with your Stripe price ID
      pro: 'price_1R8CM6LkcPTy2rjPF1OwWmG3', // Replace with your Stripe price ID
      premium: 'price_1R8CMmLkcPTy2rjP0tBW5qD0', // Replace with your Stripe price ID
    };

    if (!planLimits[planId]) {
      return res.status(400).json({ message: 'Invalid plan selected.' });
    }

    // Check if the user has a Stripe customer ID
    if (!user.stripeCustomerId) {
      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        payment_method: paymentMethodId, // Attach the payment method to the customer
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      // Save the Stripe customer ID in the database
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId, // Use the Stripe customer ID
      items: [{ price: planLimits[planId] }], // Use the price ID for the selected plan
      expand: ['latest_invoice.payment_intent'], // Expand to include payment intent details
    });

    // Update the user's subscription details in the database
    user.subscriptionPlan = planId;
    user.stripeSubscriptionId = subscription.id;
    user.scraperLimit = planId === 'free' ? 50 : planId === 'basic' ? 40 : planId === 'pro' ? 40 : 1000; // Example limits
    user.emailLimit = planId === 'free' ? 50 : planId === 'basic' ? 2000 : planId === 'pro' ? 5000 : 10000; // Example limits
    await user.save();

    res.status(200).json({ message: 'Subscription created successfully.', subscription });
  } catch (error) {
    console.error('Error creating subscription:', error.message);
    res.status(500).json({ message: 'Failed to create subscription.' });
  }
};

// Update an existing subscription
export const updateSubscription = async (req, res) => {
  const { newPlanId } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!planLimits[newPlanId]) {
      return res.status(400).json({ message: 'Invalid plan selected.' });
    }

    const subscription = await stripe.subscriptions.update(user.stripeSubscriptionId, {
      items: [{ price: planLimits[newPlanId].priceId }],
    });

    // Update the user's subscription details in MongoDB
    user.subscriptionPlan = newPlanId;
    user.scraperLimit = planLimits[newPlanId].scraperLimit;
    user.emailLimit = planLimits[newPlanId].emailLimit;
    user.scraperUsage = 0; // Reset scraper usage
    user.emailUsage = 0; // Reset email usage
    await user.save();

    res.status(200).json({ message: 'Subscription updated successfully.', subscription });
  } catch (error) {
    console.error('Error updating subscription:', error.message);
    res.status(500).json({ message: 'Failed to update subscription.' });
  }
};

// Charge for extra usage
export const chargeForExtraUsage = async (req, res) => {
  const { extraUsage } = req.body;
  const CHARGE_PER_COMPANY = 0.05; // Charge per company scraped beyond the limit

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.defaultPaymentMethod) {
      return res.status(400).json({ message: 'No default payment method found.' });
    }

    const amountToCharge = Math.round(extraUsage * CHARGE_PER_COMPANY * 100); // Convert to cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountToCharge,
      currency: 'usd',
      customer: user.stripeCustomerId,
      payment_method: user.defaultPaymentMethod,
      confirm: true,
    });

    res.status(200).json({ message: 'Payment successful.', paymentIntent });
  } catch (error) {
    console.error('Error charging for extra usage:', error.message);
    res.status(500).json({ message: 'Failed to charge for extra usage.' });
  }
};
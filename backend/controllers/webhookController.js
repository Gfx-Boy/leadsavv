import dotenv from 'dotenv';
import Stripe from 'stripe';
import User from '../models/userModel.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const planLimits = {
  free: { scraperLimit: 50, emailLimit: 50 },
  basic: { scraperLimit: 40, emailLimit: 2000 },
  pro: { scraperLimit: 40, emailLimit: 5000 },
  premium: { scraperLimit: 40, emailLimit: 10000 },
};

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const user = await User.findOneAndUpdate(
          { stripeCustomerId: subscription.customer },
          {
            subscriptionPlan: subscription.items.data[0].plan.id,
            scraperLimit: planLimits[subscription.items.data[0].plan.id].scraperLimit,
            emailLimit: planLimits[subscription.items.data[0].plan.id].emailLimit,
            scraperUsage: 0, // Reset scraper usage
            emailUsage: 0, // Reset email usage
          },
          { new: true }
        );

        if (!user) {
          console.error(`User not found for Stripe customer ID: ${subscription.customer}`);
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const deletedSubscription = event.data.object;
        const user = await User.findOneAndUpdate(
          { stripeCustomerId: deletedSubscription.customer },
          {
            subscriptionPlan: 'free',
            scraperLimit: planLimits['free'].scraperLimit,
            emailLimit: planLimits['free'].emailLimit,
            scraperUsage: 0,
            emailUsage: 0,
          },
          { new: true }
        );

        if (!user) {
          console.error(`User not found for Stripe customer ID: ${deletedSubscription.customer}`);
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error(`Error handling webhook event: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};
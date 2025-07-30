import ScraperHistory from '../models/scraperHistory.js';
import User from '../models/userModel.js';
import Contact from '../models/Contact.js';
import Pipeline from '../models/pipelineModel.js';
import Meeting from '../models/Meeting.js';
import Stripe from 'stripe';
import mongoose from 'mongoose';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key

// Fetch payment history from Stripe
export const getPayments = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from authentication middleware

    // Fetch the user from the database to get their Stripe customer ID
    const user = await User.findById(userId);
    if (!user || !user.stripeCustomerId) {
      return res.status(404).json({ message: "User or Stripe customer ID not found." });
    }

    // Fetch payment history from Stripe
    const charges = await stripe.charges.list({
      customer: user.stripeCustomerId, // Stripe customer ID
      limit: 100, // Limit the number of charges fetched
    });

    // Format the response
    const paymentHistory = charges.data.map((charge) => ({
      id: charge.id,
      amount: charge.amount / 100, // Convert from cents to dollars
      currency: charge.currency,
      status: charge.status,
      description: charge.description,
      created: new Date(charge.created * 1000).toISOString(), // Convert timestamp to ISO string
    }));

    res.status(200).json({
      totalCharged: paymentHistory.reduce((sum, charge) => sum + charge.amount, 0), // Sum of all charges
      paymentHistory,
    });
  } catch (error) {
    console.error("Error fetching payment history from Stripe:", error);
    res.status(500).json({ message: "An error occurred while fetching payment history." });
  }
};
// 1. Get Total Emails Scraped
export const getEmailsScraped = async (req, res) => {
  try {
    const userId = req.userId; // Get the user ID from the authenticated request

    // Count the total number of emails for the user
    const totalEmails = await ScraperHistory.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Match user-specific data
      { $project: { emailCount: { $size: "$emails" } } }, // Count emails in each document
      { $group: { _id: null, total: { $sum: "$emailCount" } } }, // Sum up email counts
    ]);

    // Send the total email count in the response
    res.status(200).json({
      totalEmails: totalEmails[0]?.total || 0, // Total emails scraped
    });
  } catch (error) {
    console.error("Error fetching emails scraped:", error);
    res.status(500).json({ message: "An error occurred while fetching emails scraped." });
  }
};
// 2. Get Scraping Usage
export const getScrapingUsage = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from authentication middleware

    // Fetch the user's scraping usage and limit directly from the User model
    const user = await User.findById(userId, 'scraperUsage scraperLimit');
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      used: user.scraperUsage || 0, // Scraping usage
      limit: user.scraperLimit || 0, // Scraping limit
    });
  } catch (error) {
    console.error("Error fetching scraping usage:", error);
    res.status(500).json({ message: "An error occurred while fetching scraping usage." });
  }
};
// 3. Get Total Contacts
export const getContacts = async (req, res) => {
  try {
    const userId = req.userId;

    // Total contacts
    const totalContacts = await Contact.countDocuments({ userId });

    // Daily contacts added
    const dailyContacts = await Contact.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      totalContacts,
      dailyContacts: dailyContacts.map((entry) => ({
        date: entry._id,
        count: entry.count,
      })),
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "An error occurred while fetching contacts." });
  }
};

// 4. Get Payments

// 5. Get Pipelines
export const getPipelines = async (req, res) => {
  try {
    const userId = req.userId;

    // Total pipelines
    const totalPipelines = await Pipeline.countDocuments({ userId });

    // Active and completed pipelines
    const activePipelines = await Pipeline.countDocuments({ userId, status: "active" });
    const completedPipelines = await Pipeline.countDocuments({ userId, status: "completed" });

    res.status(200).json({
      totalPipelines,
      activePipelines,
      completedPipelines,
    });
  } catch (error) {
    console.error("Error fetching pipelines:", error);
    res.status(500).json({ message: "An error occurred while fetching pipelines." });
  }
};

// 6. Get Upcoming Meetings
export const getMeetings = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch upcoming meetings
    const meetings = await Meeting.find({ userId, date: { $gte: new Date() } }).sort({ date: 1 });

    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ message: "An error occurred while fetching meetings." });
  }
};
export const getSubscriptionDetails = async (req, res) => {
    try {
      const userId = req.userId; // Extracted from authentication middleware
  
      // Fetch the user from the database to get their Stripe customer ID
      const user = await User.findById(userId);
      if (!user || !user.stripeCustomerId) {
        return res.status(404).json({ message: "User or Stripe customer ID not found." });
      }
  
      // Fetch subscription details from Stripe
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'all', // Fetch all subscriptions (active, canceled, etc.)
        limit: 1, // Fetch the most recent subscription
      });
  
      if (subscriptions.data.length === 0) {
        return res.status(404).json({ message: "No subscriptions found for this user." });
      }
  
      const subscription = subscriptions.data[0];
      res.status(200).json({
        id: subscription.id,
        status: subscription.status,
        plan: subscription.items.data[0].plan.nickname, // Plan name
        amount: subscription.items.data[0].plan.amount / 100, // Convert from cents to dollars
        currency: subscription.items.data[0].plan.currency,
        currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
      });
    } catch (error) {
      console.error("Error fetching subscription details from Stripe:", error);
      res.status(500).json({ message: "An error occurred while fetching subscription details." });
    }
  };
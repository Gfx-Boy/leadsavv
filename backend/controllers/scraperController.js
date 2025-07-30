import User from '../models/userModel.js';
import ScraperHistory from '../models/scraperHistory.js';
import { Client } from '@googlemaps/google-maps-services-js';
import dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import Stripe from 'stripe';

dotenv.config();

const client = new Client({});
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const scrapeEmailFromWebsite = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = html.match(emailRegex);
    return emails ? emails[0] : 'N/A';
  } catch (error) {
    console.error(`Error scraping email from ${url}:`, error);
    return 'N/A';
  }
};

// Scrape data using Google Maps API with SSE
export const scrape = async (req, res) => {
  const { keywords, locations } = req.body;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const CHARGE_PER_COMPANY = 0.10; // Charge per company in USD
  const FREE_PLAN_REQUEST_LIMIT = 20; // Max companies per request for free plan
  const MINIMUM_CHARGE = 0.50; // Minimum charge amount in USD

  try {
    console.log('Scrape request received:', { keywords, locations, userId: req.userId });

    // Fetch the user from the database
    const user = await User.findById(req.userId); // Use req.userId from middleware
    if (!user) {
      console.error('User not found for ID:', req.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User details:', {
      email: user.email,
      subscriptionPlan: user.subscriptionPlan,
      scraperUsage: user.scraperUsage,
      scraperLimit: user.scraperLimit,
    });

    // Determine the user's per-request limit based on their plan
    const isFreePlan = user.subscriptionPlan === 'free';
    const requestLimit = isFreePlan ? FREE_PLAN_REQUEST_LIMIT : Infinity;

    console.log(`Scraper request limit for user (${user.subscriptionPlan} plan):`, requestLimit);

    // Check if the user has exceeded their total limit
    if (user.scraperUsage >= user.scraperLimit && isFreePlan) {
      console.log('Free plan user has exceeded their total scraping limit.');
      return res.status(403).json({
        message: 'You have reached your total scraping limit. Please upgrade your plan to scrape more data.',
      });
    }

    let additionalCharges = 0; // Accumulated charges for paid users
    let companiesScraped = 0; // Count of companies scraped in this request
    const scrapedResults = []; // Array to store scraped results

    for (const keyword of keywords) {
      for (const location of locations) {
        console.log(`Scraping for keyword: "${keyword}" in location: "${location}"`);

        // Search for places using the Google Places API
        const response = await client.textSearch({
          params: {
            query: `${keyword} in ${location}`,
            key: apiKey,
          },
        });

        console.log(`Found ${response.data.results.length} places for "${keyword}" in "${location}"`);

        for (const place of response.data.results) {
          // Check if the user has hit their per-request limit (only for free plan)
          if (isFreePlan && companiesScraped >= requestLimit) {
            console.log('Free plan user has reached their per-request limit.');
            return res.status(403).json({
              message: `You can only scrape up to ${requestLimit} companies per request. Please try again later.`,
            });
          }

          // Increment the count of companies scraped
          companiesScraped += 1;

          // Check if the user has exceeded their total limit
          if (user.scraperUsage >= user.scraperLimit) {
            if (isFreePlan) {
              console.log('Free plan user has exceeded their total scraping limit.');
              return res.status(403).json({
                message: 'You have reached your total scraping limit. Please upgrade your plan to scrape more data.',
              });
            } else {
              // Paid plan: Increment additional charges
              additionalCharges += CHARGE_PER_COMPANY;

              console.log('Paid user exceeded limit. Accumulating charges:', {
                additionalCharges,
                stripeCustomerId: user.stripeCustomerId,
                defaultPaymentMethod: user.defaultPaymentMethod,
              });

              // Charge the user only if the accumulated charges meet or exceed the minimum charge
              if (additionalCharges >= MINIMUM_CHARGE) {
                console.log('Attempting to charge user for additional scraping:', {
                  additionalCharges,
                  stripeCustomerId: user.stripeCustomerId,
                  defaultPaymentMethod: user.defaultPaymentMethod,
                });

                try {
                  const chargeResult = await stripe.paymentIntents.create({
                    amount: Math.round(additionalCharges * 100), // Convert to cents
                    currency: 'usd',
                    customer: user.stripeCustomerId, // The Stripe customer ID
                    description: `Scraping charges for ${companiesScraped} companies`,
                    payment_method: user.defaultPaymentMethod, // User's default payment method
                    confirm: true, // Confirm the payment immediately
                    automatic_payment_methods: {
                      enabled: true,
                      allow_redirects: 'never', // Disable redirect-based payment methods
                    },
                  });

                  console.log('Stripe charge result:', chargeResult);

                  if (chargeResult.status !== 'succeeded') {
                    console.error('Payment failed. Stripe charge result:', chargeResult);
                    return res.status(402).json({
                      message: 'Payment failed. Please update your payment method.',
                    });
                  }

                  // Reset charges after successful payment
                  additionalCharges = 0;
                } catch (error) {
                  console.error('Stripe payment error:', error);
                  return res.status(500).json({
                    message: 'Payment failed. Please update your payment method.',
                  });
                }
              }
            }
          }

          const placeDetails = await client.placeDetails({
            params: {
              place_id: place.place_id,
              key: apiKey,
              fields: [
                'name',
                'formatted_address',
                'formatted_phone_number',
                'website',
                'rating',
                'user_ratings_total',
              ],
            },
          });

          const details = placeDetails.data.result;

          const result = {
            id: `${scrapedResults.length + 1}`, // Generate a unique ID
            businessName: details.name,
            address: details.formatted_address || 'N/A',
            phone: details.formatted_phone_number || 'N/A',
            website: details.website || 'N/A',
            email: details.website ? await scrapeEmailFromWebsite(details.website) : 'N/A',
            rating: details.rating || 'N/A',
            reviews: details.user_ratings_total || 0,
            category: keyword,
            location: location,
          };

          console.log('Scraped result:', result);

          // Add the result to the scrapedResults array
          scrapedResults.push(result);

          // Increment the user's scraper usage
          user.scraperUsage += 1;

          // Save the updated scraper usage to the database
          await user.save();
        }
      }
    }

    // Generate CSV content
    const headers = Object.keys(scrapedResults[0]).join(',');
    const csvRows = scrapedResults.map(row =>
      Object.values(row)
        .map(value => (typeof value === 'string' && value.includes(',') ? `"${value}"` : value))
        .join(',')
    );
    const csvContent = [headers, ...csvRows].join('\n');

    // Generate a file name for the scraping session
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const fileName = `google_maps_scraper_${formattedDate}.csv`;

    // Save the scraped results to the ScraperHistory model
    const newHistoryEntry = new ScraperHistory({
      userId: user._id,
      fileName,
      keywords,
      locations,
      recordCount: scrapedResults.length,
      data: csvContent, // Save data as CSV content
      emails: scrapedResults.map(result => result.email).filter(email => email !== 'N/A'),
    });

    await newHistoryEntry.save();
    console.log('Scraped data saved to ScraperHistory.');

    // Return the full array of results as a JSON response
    return res.status(200).json(scrapedResults);
  } catch (error) {
    console.error('Error during scraping:', error);
    return res.status(500).json({
      message: 'An error occurred while scraping.',
    });
  }
};
export const scrapeStream = async (req, res) => {
  try {
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Example: Send a message every second
    const intervalId = setInterval(() => {
      res.write(`data: ${JSON.stringify({ message: 'Scraping in progress...' })}\n\n`);
    }, 1000);

    // Close the connection when the client disconnects
    req.on('close', () => {
      clearInterval(intervalId);
      res.end();
    });
  } catch (error) {
    console.error('Error in scrapeStream:', error);
    res.status(500).end();
  }
};
// Export data to CSV
export const exportToCSV = async (req, res) => {
  const { results } = req.body;
  if (!results || results.length === 0) {
    return res.status(400).json({ error: 'No results to export.' });
  }

  const headers = Object.keys(results[0]).join(',');
  const csvRows = results.map(row =>
    Object.values(row)
      .map(value => (typeof value === 'string' && value.includes(',') ? `"${value}"` : value))
      .join(',')
  );

  const csvContent = [headers, ...csvRows].join('\n');

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  const fileName = `google_maps_scraper_${formattedDate}.csv`;

  const newHistoryEntry = new ScraperHistory({
    userId: req.userId, // Use req.userId
    fileName,
    keywords: [...new Set(results.map(item => item.category))],
    locations: [...new Set(results.map(item => item.location))],
    recordCount: results.length,
    data: csvContent,
    emails: results.map(result => result.email).filter(email => email !== 'N/A'),
  });

  await newHistoryEntry.save();

  res.status(200).json({ csvContent, fileName });
};

// Get CSV history
export const getCSVHistory = async (req, res) => {
  try {
    const history = await ScraperHistory.find({ userId: req.userId }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'An error occurred while fetching history.' });
  }
};

// Delete CSV history
export const deleteCSVHistory = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Attempting to delete CSV history with id: ${id}`);

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const result = await ScraperHistory.findOneAndDelete({ _id: id, userId: req.userId });
    if (!result) {
      return res.status(404).json({ message: 'CSV history not found' });
    }
    res.status(200).json({ message: 'CSV history deleted successfully' });
  } catch (error) {
    console.error('Error deleting CSV history:', error);
    res.status(500).json({ error: 'An error occurred while deleting history.' });
  }
};
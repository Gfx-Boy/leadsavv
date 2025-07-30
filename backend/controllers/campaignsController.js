import Campaign from '../models/Compaign.js';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import EmailSettings from '../models/EmailSettings.js';

// Get all campaigns for a user
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.userId }); // Use req.userId
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new campaign
export const createCampaign = async (req, res) => {
  const campaign = new Campaign({
    ...req.body,
    userId: req.userId, // Use req.userId
  });

  try {
    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const sendCampaignEmails = async (req, res) => {
  try {
    // Find the campaign by ID
    const campaign = await Campaign.findById(req.params.id).populate('template');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Retrieve email settings for the user
    const emailSettings = await EmailSettings.findOne({ userId: req.userId });
    if (!emailSettings) {
      return res.status(404).json({ message: 'Email settings not found' });
    }

    console.log('Email settings found:', emailSettings);

    // Find the user by userId
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has exceeded their email limit
    const emailsToSend = campaign.recipients.length; // Number of recipients in the campaign
    if (user.emailUsage + emailsToSend > user.emailLimit) {
      return res.status(403).json({
        code: 'PLAN_LIMIT_REACHED',
        message: 'Email limit exceeded. Upgrade your plan to send more emails.',
      });
    }

    console.log(`User email usage: ${user.emailUsage}, Emails to send: ${emailsToSend}, Email limit: ${user.emailLimit}`);

    // Create a transporter using SMTP settings
    const transporter = nodemailer.createTransport({
      host: emailSettings.smtpServer,
      port: emailSettings.port,
      secure: emailSettings.security === 'ssl', // true for 465, false for other ports
      auth: {
        user: emailSettings.fromEmail,
        pass: emailSettings.emailPassword,
      },
    });

    console.log('SMTP transporter created');

    // Utility function to extract name from email
    const extractNameFromEmail = (email) => {
      if (!email) return 'Valued Customer';

      const localPart = email.split('@')[0];
      const formattedName = localPart
        .replace(/[\._]/g, ' ') // Replace dots and underscores with spaces
        .split(' ') // Split into words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join words back into a single string

      return formattedName;
    };

    // Send emails to each recipient in the campaign
    const promises = campaign.recipients.map((email) => {
      // Extract the recipient's name from their email
      const recipientName = extractNameFromEmail(email);

      // Get the template content
      const templateContent = campaign.template ? campaign.template.content : '{{content}}';

      // Replace placeholders in the template with recipient-specific data
      const personalizedContent = templateContent
        .replace('{{name}}', recipientName) // Replace {{name}} with the extracted name
        .replace('{{subject}}', campaign.subject) // Replace {{subject}} with the campaign subject
        .replace('{{content}}', campaign.content); // Replace {{content}} with the campaign's message body

      return transporter.sendMail({
        from: `${emailSettings.fromName} <${emailSettings.fromEmail}>`,
        to: email,
        subject: campaign.subject,
        html: personalizedContent, // Use the personalized content as the email body
      });
    });

    // Wait for all emails to be sent
    await Promise.all(promises);

    console.log('Emails sent successfully');

    // Update user's email usage
    user.emailUsage += emailsToSend; // Increment email usage
    await user.save(); // Save the updated user to the database

    console.log(`User email usage updated. Emails sent: ${emailsToSend}, Total usage: ${user.emailUsage}`);

    // Update campaign status
    campaign.status = 'sent';
    await campaign.save();

    console.log('Campaign status updated to sent');

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails', error: error.message });
  }
};
// Update a campaign
export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // Match by userId
      req.body,
      { new: true }
    );
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a campaign
export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndDelete({ _id: req.params.id, userId: req.userId }); // Match by userId
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    res.json({ message: 'Campaign removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set campaign to draft
export const setCampaignToDraft = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // Match by userId
      { status: 'draft' },
      { new: true }
    );
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
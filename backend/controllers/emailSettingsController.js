import EmailSettings from '../models/EmailSettings.js';
import nodemailer from 'nodemailer';

// Get email settings
export const getEmailSettings = async (req, res) => {
  try {
    const emailSettings = await EmailSettings.findOne({ userId: req.userId });
    if (!emailSettings) {
      return res.status(404).json({ message: 'Email settings not found.' });
    }
    res.status(200).json(emailSettings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving email settings', error: error.message });
  }
};

// Create email settings
export const createEmailSettings = async (req, res) => {
  const { smtpServer, port, fromEmail, emailPassword, fromName, security } = req.body;

  const emailSettings = new EmailSettings({
    userId: req.userId,
    smtpServer,
    port,
    fromEmail,
    emailPassword,
    fromName,
    security,
  });

  try {
    const savedSettings = await emailSettings.save();
    res.status(201).json(savedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update email settings
export const updateEmailSettings = async (req, res) => {
  const { smtpServer, port, fromEmail, emailPassword, fromName, security } = req.body;

  try {
    const emailSettings = await EmailSettings.findOneAndUpdate(
      { userId: req.userId },
      { smtpServer, port, fromEmail, emailPassword, fromName, security },
      { new: true, upsert: true }
    );
    if (!emailSettings) {
      return res.status(404).json({ message: 'Email settings not found.' });
    }
    res.status(200).json(emailSettings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating email settings', error: error.message });
  }
};

// Send email to subscriber
export const sendEmailToSubscriber = async (req, res) => {
  const { subscriberEmail, subject, text, html } = req.body;

  try {
    const emailSettings = await EmailSettings.findOne({ userId: req.userId });
    if (!emailSettings) {
      return res.status(404).json({ message: 'Email settings not found.' });
    }

    // Create a transporter using the stored SMTP settings
    const transporter = nodemailer.createTransport({
      host: emailSettings.smtpServer,
      port: emailSettings.port,
      secure: emailSettings.security === 'ssl', // true for 465, false for other ports
      auth: {
        user: emailSettings.fromEmail,
        pass: emailSettings.emailPassword,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000, // 10 seconds
      socketTimeout: 10000 // 10 seconds
    });

    // Send email
    const mailOptions = {
      from: `${emailSettings.fromName} <${emailSettings.fromEmail}>`,
      to: subscriberEmail,
      subject: subject,
      text: text,
      html: html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Email sent successfully', info: info.response });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};
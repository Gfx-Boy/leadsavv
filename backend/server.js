import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import importRoutes from './routes/importRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import pipelineRoutes from './routes/pipelineRoutes.js';
import bulkActionRoutes from './routes/bulkActionRoutes.js';
import meetingRoutes from './routes/meetingRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import snippetRoutes from './routes/snippetRoutes.js';
import folderRoutes from './routes/folderRoutes.js';
import manualActionRoutes from './routes/manualActionRoutes.js';
import triggerLinkRoutes from './routes/triggerLinkRoutes.js';
import businessProfileRoutes from './routes/businessProfile.js';
import myProfileRoutes from './routes/myProfile.js'; // New import for my profile routes
import opportunitiesRoutes from './routes/opportunities.js'; // New import for opportunities routes
import localizationRoutes from './routes/localizationRoutes.js'; // New import for localization routes
import emailSettingsRoutes from './routes/emailSettingsRoutes.js'; // New import for email settings routes
import authRoutes from './routes/authRoutes.js'; // Import the new auth routes
import { authenticateToken } from './middleware/auth.js'; // Import using named import
import subscriberRoutes from './routes/subscriberRoutes.js';
import campaignRoutes from './routes/campaigns.js'; // Corrected import for campaigns
import templatesRoutes from './routes/templates.js'; // Corrected import for templates
import settingsRoutes from './routes/settingsRoutes.js'; // New import for settings routes
import segmentsRoutes from './routes/segments.js';
import automationsRoutes from './routes/automations.js'; // Corrected import for automations
import scraperRoutes from './routes/scraperRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

const app = express();
const PORT = process.env.PORT || 5005;
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);
app.use('/api/appointments', authenticateToken, appointmentRoutes);
app.use('/api/history', authenticateToken, historyRoutes);
app.use('/api/contacts', authenticateToken, contactRoutes);
app.use('/api/companies', authenticateToken, companyRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);
app.use('/api/opportunities', authenticateToken, opportunityRoutes);
app.use('/api/pipelines', authenticateToken, pipelineRoutes);
app.use('/api/bulk-actions', authenticateToken, bulkActionRoutes);
app.use('/api/import', authenticateToken, importRoutes);
app.use('/api/meeting', authenticateToken, meetingRoutes);
app.use('/api/conversations', authenticateToken, conversationRoutes);
app.use('/api/messages', authenticateToken, messageRoutes);
app.use('/api/snippets', authenticateToken, snippetRoutes);
app.use('/api/folders', authenticateToken, folderRoutes);
app.use('/api/manual-actions', authenticateToken, manualActionRoutes);
app.use('/api/trigger-links', authenticateToken, triggerLinkRoutes);
app.use('/api/business-profile', authenticateToken, businessProfileRoutes); // New route for business profile
app.use('/api/my-profile', authenticateToken, myProfileRoutes); // New route for my profile
app.use('/api/localization', authenticateToken, localizationRoutes); // New route for localization
app.use('/api/email-settings', authenticateToken, emailSettingsRoutes);// New route for email settings
app.use('/api/subscribers', authenticateToken, subscriberRoutes);
app.use('/api/campaigns', authenticateToken, campaignRoutes); // New route for campaigns
app.use('/api/templates', authenticateToken, templatesRoutes); // New route for templates
app.use('/api/settings', authenticateToken, settingsRoutes); // New route for settings
app.use('/api/segments', authenticateToken, segmentsRoutes);
app.use('/api/automations', authenticateToken, automationsRoutes); // New route for automations
app.use('/api/dashboard',authenticateToken, dashboardRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api', scraperRoutes); 
app.use('/api', authRoutes); // Add the new auth routes

// MongoDB connection
mongoose.connect('mongodb+srv://root:root@cluster0.27cqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

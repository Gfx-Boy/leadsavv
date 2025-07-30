import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import Select from 'react-select/creatable';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';
import { Edit3, Send, Trash2 } from 'lucide-react';
import { CheckSquare, Upload } from 'lucide-react'; // Add other icons as needed
function Campaigns() {
  const [showForm, setShowForm] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [campaign, setCampaign] = useState({
    name: '',
    subject: '',
    template: '',
    status: 'draft', // Add status field with default value
    recipients: [],
    scheduledDate: '',
  });
  const [templates, setTemplates] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [selectedEmailColumn, setSelectedEmailColumn] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showUpgradePopup, setShowUpgradePopup] = useState(false); // State for upgrade popup
const [plans, setPlans] = useState([
  { id: 'basic', name: 'Basic Plan', price: 10, features: ['2000 emails/month', 'Advanced templates'] },
  { id: 'pro', name: 'Pro Plan', price: 29, features: ['5000 emails/month', 'Premium templates'] },
  { id: 'premium', name: 'Enterprise Plan', price: 99, features: ['Unlimited campaigns', 'Custom templates'] },
]);
  const handleSelectPlan = (planId) => {
    console.log(`Selected Plan: ${planId}`);
    // Redirect to the billing page or handle plan selection logic
    window.location.href = '/settings/billing';
  };
  // Create axios instance with token from localStorage
  const axiosInstance = axios.create({
    baseURL: 'http://31.97.41.27:5005/api',
  });

  // Add a request interceptor to include the token in every request
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Fetch campaigns from the backend
  const fetchCampaigns = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get('/campaigns');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setError(error.response?.data?.message || 'Failed to fetch campaigns. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch templates from the backend
  const fetchTemplates = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get('/templates');
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setError(error.response?.data?.message || 'Failed to fetch templates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch subscribers from the backend
  const fetchSubscribers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get('/subscribers');
      setSubscribers(response.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      setError(error.response?.data?.message || 'Failed to fetch subscribers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchTemplates();
    fetchSubscribers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!campaign.name || !campaign.subject || !campaign.template || campaign.recipients.length === 0) {
      setError('Please fill in all required fields and select at least one recipient.');
      setLoading(false);
      return;
    }

     // Validate scheduledDate only if the status is "scheduled"
  if (campaign.status === 'scheduled' && new Date(campaign.scheduledDate) < new Date()) {
    setError('Scheduled date cannot be in the past.');
    setLoading(false);
    return;
  }


    try {
      const campaignData = {
        ...campaign,
        recipients: campaign.recipients.map((recipient) => recipient.value || recipient.label),
      };

      if (campaign.id) {
        // Update existing campaign
        await axiosInstance.put(`/campaigns/${campaign.id}`, campaignData);
      } else {
        // Create new campaign
        await axiosInstance.post('/campaigns', campaignData);
      }

      resetForm();
      fetchCampaigns();
    } catch (error) {
      console.error('Error saving campaign:', error);
      setError('Failed to save campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCampaign({ name: '', subject: '', template: '', recipients: [], scheduledDate: '' });
    setShowForm(false);
  };

  const handleEditCampaign = (campaign) => {
    setCampaign({
      ...campaign,
      id: campaign._id,
      recipients: campaign.recipients.map((recipient) => ({
        value: recipient,
        label: recipient,
      })),
    });
    setShowForm(true);
  };

  const handleDeleteCampaign = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this campaign?');
    if (!confirmDelete) return;

    setLoading(true);
    setError('');
    try {
      await axiosInstance.delete(`/campaigns/${id}`);
      fetchCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      setError('Failed to delete campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendCampaign = async (id) => {
    setLoading(true);
    setError('');
    try {
      await axiosInstance.post(`/campaigns/${id}/send`);
      alert('Campaign sent successfully!');
    } catch (error) {
      console.error('Error sending campaign:', error);
  
      // Show upgrade popup if the error is due to reaching the plan limit
      if (error.response?.status === 403) {
        setShowUpgradePopup(true);
      } else {
        setError('Failed to send campaign. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAllRecipients = () => {
    setCampaign({
      ...campaign,
      recipients: subscribers.map((subscriber) => ({
        value: subscriber.email,
        label: subscriber.email,
      })),
    });
  };

  const handleRecipientChange = (selectedOptions) => {
    setCampaign({ ...campaign, recipients: selectedOptions });
  };

  const handleCSVImport = (acceptedFiles) => {
    const file = acceptedFiles[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
        setCsvColumns(Object.keys(results.data[0]));
        setShowCSVModal(false);
        setShowMappingModal(true);
      },
    });
  };

  const handleMappingSubmit = () => {
    const emails = csvData
      .map((row) => row[selectedEmailColumn])
      .filter((email) => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    if (emails.length === 0) {
      alert('No valid email addresses found in the selected column.');
      return;
    }

    const newRecipients = emails.map((email) => ({
      value: email,
      label: email,
    }));

    setCampaign({ ...campaign, recipients: [...campaign.recipients, ...newRecipients] });
    setShowMappingModal(false);
  };

  const recipientOptions = subscribers.map((subscriber) => ({
    value: subscriber.email,
    label: subscriber.email,
  }));

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Email Campaigns</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Campaign
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4">Campaign Name</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Recipients</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <tr key={campaign._id} className="border-b border-gray-700">
                  <td className="py-4 px-4">{campaign.name}</td>
                  <td className="py-4 px-4">{campaign.status}</td>
                  <td className="py-4 px-4">{campaign.recipients.length}</td>
                  <td className="py-4 px-4 flex space-x-4">
  {/* Edit Button */}
  <button
    className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
    onClick={() => handleEditCampaign(campaign)}
  >
    <Edit3 className="w-5 h-5" /> {/* Icon */}
    Edit
  </button>

  {/* Send Now Button */}
  <button
    className="flex items-center gap-2 text-green-400 hover:text-green-300"
    onClick={() => handleSendCampaign(campaign._id)}
  >
    <Send className="w-5 h-5" /> {/* Icon */}
    Send Now
  </button>

  {/* Delete Button */}
  <button
    className="flex items-center gap-2 text-red-400 hover:text-red-300"
    onClick={() => handleDeleteCampaign(campaign._id)}
  >
    <Trash2 className="w-5 h-5" /> {/* Icon */}
    Delete
  </button>
</td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-gray-700">
                <td className="py-4 px-4 text-gray-400" colSpan="4">
                  No campaigns created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">{campaign.id ? 'Edit Campaign' : 'Create Campaign'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Campaign Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  value={campaign.name}
                  onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  value={campaign.subject}
                  onChange={(e) => setCampaign({ ...campaign, subject: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Template</label>
                <select
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  value={campaign.template}
                  onChange={(e) => setCampaign({ ...campaign, template: e.target.value })}
                  required
                >
                  <option value="">Select Template</option>
                  {templates.map((template) => (
                    <option key={template._id} value={template._id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
  <label className="block text-sm font-medium mb-1">Status</label>
  <select
    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
    value={campaign.status}
    onChange={(e) => setCampaign({ ...campaign, status: e.target.value })}
    required
  >
    <option value="draft">Draft</option>
    <option value="scheduled">Scheduled</option>
  </select>
</div>

{campaign.status === 'scheduled' && (
  <div>
    <label className="block text-sm font-medium mb-1">Scheduled Date</label>
    <input
      type="datetime-local"
      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
      value={campaign.scheduledDate}
      onChange={(e) => setCampaign({ ...campaign, scheduledDate: e.target.value })}
      required
    />
  </div>
)}
              
              <div>
                <label className="block text-sm font-medium mb-1">Recipients</label>
                <Select
                  isMulti
                  options={recipientOptions}
                  value={campaign.recipients}
                  onChange={handleRecipientChange}
                  placeholder="Type to search and select recipients..."
                  noOptionsMessage={() => 'No subscribers found'}
                />
               <button
    type="button"
    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold"
    onClick={handleSelectAllRecipients}
  >
    <CheckSquare className="w-5 h-5" /> {/* Icon */}
    Select All
  </button>

  {/* Import from CSV */}
  <button
    type="button"
    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold"
    onClick={() => setShowCSVModal(true)}
  >
    <Upload className="w-5 h-5" /> {/* Icon */}
    Import CSV
  </button>
              </div>
              {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {campaign.id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {showCSVModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Import Recipients from CSV</h3>
            <Dropzone onDrop={handleCSVImport}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <p className="text-gray-400">Drag & drop a CSV file here, or click to select a file</p>
                </div>
              )}
            </Dropzone>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                onClick={() => setShowCSVModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
=         {showUpgradePopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-400">Select the perfect plan for your needs</p>
      </header>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${
              selectedPlan?.id === plan.id ? 'ring-2 ring-blue-500' : ''
            }`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-2">
                  ${plan.price}
                  <span className="text-sm text-gray-400">/mo</span>
                </p>
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
              disabled={selectedPlan?.id === plan.id}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                selectedPlan?.id === plan.id
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {selectedPlan?.id === plan.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          onClick={() => setShowUpgradePopup(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {/* Mapping Modal */}
      {showMappingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Map Email Column</h3>
            <select
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setSelectedEmailColumn(e.target.value)}
              value={selectedEmailColumn}
            >
              <option value="">Select Email Column</option>
              {csvColumns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                onClick={() => setShowMappingModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={handleMappingSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Campaigns;
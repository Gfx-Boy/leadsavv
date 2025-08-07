import React, { useState, useEffect } from 'react';
import { BarChart, PieChart, LineChart, Download } from 'lucide-react';
import axios from 'axios';

// Create an axios instance with base URL and token interceptor
const instance = axios.create({
  baseURL: 'https://api.leadsavvyai.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); // Get the token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Set the token in the headers
  }
  return config;
});

function Reports() {
  const [campaigns, setCampaigns] = useState([]);
  const [dateRange, setDateRange] = useState('last30');
  const [openRate, setOpenRate] = useState(0);
  const [clickRate, setClickRate] = useState(0);
  const [bounceRate, setBounceRate] = useState(0);

  // Fetch campaigns from the backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await instance.get('/campaigns'); // Use the axios instance
        setCampaigns(response.data);

        // Calculate rates
        const totalSent = response.data.reduce((sum, campaign) => sum + (campaign.sent || 0), 0);
        const totalOpened = response.data.reduce((sum, campaign) => sum + (campaign.opened || 0), 0);
        const totalClicked = response.data.reduce((sum, campaign) => sum + (campaign.clicked || 0), 0);
        const totalBounced = response.data.reduce((sum, campaign) => sum + (campaign.bounced || 0), 0);

        setOpenRate(totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(2) : 0);
        setClickRate(totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(2) : 0);
        setBounceRate(totalSent > 0 ? ((totalBounced / totalSent) * 100).toFixed(2) : 0);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Campaign Reports</h1>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Open Rate</h3>
            <BarChart className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{openRate}%</p>
          <p className="text-gray-400 text-sm mt-2">
            {campaigns.length > 0 ? 'Based on campaign data' : 'No data available'}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Click Rate</h3>
            <PieChart className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold">{clickRate}%</p>
          <p className="text-gray-400 text-sm mt-2">
            {campaigns.length > 0 ? 'Based on campaign data' : 'No data available'}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Bounce Rate</h3>
            <LineChart className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold">{bounceRate}%</p>
          <p className="text-gray-400 text-sm mt-2">
            {campaigns.length > 0 ? 'Based on campaign data' : 'No data available'}
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Campaign Performance History</h2>
          <div className="flex space-x-4">
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 3 months</option>
              <option value="lastYear">Last year</option>
            </select>
          </div>
        </div>

        <div className="h-64 flex items-center justify-center border border-gray-700 rounded-lg mb-4">
          <p className="text-gray-400">
            {campaigns.length > 0 ? 'Performance data will be displayed here' : 'No campaign data available'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Top Performing Campaigns</h2>
          <div className="flex items-center justify-center h-48 border border-gray-700 rounded-lg">
            <p className="text-gray-400">
              {campaigns.length > 0 ? 'Top campaigns will be displayed here' : 'No campaigns to display'}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Subscriber Growth</h2>
          <div className="flex items-center justify-center h-48 border border-gray-700 rounded-lg">
            <p className="text-gray-400">
              {campaigns.length > 0 ? 'Subscriber growth data will be displayed here' : 'No subscriber data available'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
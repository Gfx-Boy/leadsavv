import React, { useState, useEffect } from 'react';
import { BarChart, Users, Mail, CheckCircle } from 'lucide-react';
import axios from 'axios';

function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [completedCampaigns, setCompletedCampaigns] = useState(0);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get('https://api.leadsavvyai.com/api/campaigns', { headers });
        setCampaigns(response.data);

        // Calculate campaign statistics
        setTotalCampaigns(response.data.length);
        setActiveCampaigns(response.data.filter((campaign) => campaign.status === 'Active').length);
        setCompletedCampaigns(response.data.filter((campaign) => campaign.status === 'Completed').length);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Campaign Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <p className="text-gray-400">Total Campaigns</p>
              <h2 className="text-2xl font-bold">{totalCampaigns}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-gray-400">Active Campaigns</p>
              <h2 className="text-2xl font-bold">{activeCampaigns}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-purple-500 mr-4" />
            <div>
              <p className="text-gray-400">Completed Campaigns</p>
              <h2 className="text-2xl font-bold">{completedCampaigns}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4">Campaign</th>
                <th className="text-left py-3 px-4">Sent</th>
                <th className="text-left py-3 px-4">Opened</th>
                <th className="text-left py-3 px-4">Clicked</th>
                <th className="text-left py-3 px-4">Bounced</th>
                <th className="text-left py-3 px-4">Open Rate</th>
                <th className="text-left py-3 px-4">Click Rate</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                  <tr key={campaign._id} className="border-b border-gray-700">
                    <td className="py-4 px-4">{campaign.name}</td>
                    <td className="py-4 px-4">{campaign.sent || 0}</td>
                    <td className="py-4 px-4">{campaign.opened || 0}</td>
                    <td className="py-4 px-4">{campaign.clicked || 0}</td>
                    <td className="py-4 px-4">{campaign.bounced || 0}</td>
                    <td className="py-4 px-4">{campaign.openRate || '0%'}</td>
                    <td className="py-4 px-4">{campaign.clickRate || '0%'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 px-4 text-gray-400" colSpan="7">
                    No campaigns yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function BusinessSettings() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
  });

  // Fetch business profile data on page load
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        const response = await axios.get('http://31.97.41.27:5005/api/business-profile', {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        const profile = response.data;
        if (profile) {
          setFormData({
            businessName: profile.businessName || '',
            businessEmail: profile.businessEmail || '',
            businessPhone: profile.businessPhone || '',
            businessAddress: profile.businessAddress || '',
          });
        }
      } catch (error) {
        console.error('Error fetching business profile:', error);
        toast.error('Failed to fetch business profile');
      }
    };

    fetchBusinessProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://31.97.41.27:5005/api/business-profile', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        toast.success('Business profile updated successfully!');
      } else {
        toast.error('Failed to update business profile');
      }
    } catch (error) {
      console.error('Error updating business profile:', error);
      toast.error('An error occurred while updating the business profile');
    }
  };

  return (
    <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <div className="px-6 py-8">
        <h3 className="text-2xl font-semibold text-white mb-8">Business Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-200 mb-2">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                id="businessName"
                placeholder="Your Business Name"
                value={formData.businessName}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-200 mb-2">
                Business Email
              </label>
              <input
                type="email"
                name="businessEmail"
                id="businessEmail"
                placeholder="business@example.com"
                value={formData.businessEmail}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-200 mb-2">
                Business Phone
              </label>
              <input
                type="tel"
                name="businessPhone"
                id="businessPhone"
                placeholder="+1 (555) 123-4567"
                value={formData.businessPhone}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-200 mb-2">
                Business Address
              </label>
              <input
                type="text"
                name="businessAddress"
                id="businessAddress"
                placeholder="123 Main St"
                value={formData.businessAddress}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium
                       transform transition-all duration-200 ease-in-out
                       hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BusinessSettings;
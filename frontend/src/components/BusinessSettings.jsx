import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

function BusinessSettings() {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    website: '',
    taxId: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Business profile updated successfully!');
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
              <label htmlFor="industry" className="block text-sm font-medium text-gray-200 mb-2">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              >
                <option value="">Select an industry</option>
                <option value="technology">Technology</option>
                <option value="retail">Retail</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-200 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-200 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-200 mb-2">
                State / Province
              </label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-200 mb-2">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-200 mb-2">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              >
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-200 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
                placeholder="https://example.com"
                value={formData.website}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>

            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-200 mb-2">
                Tax ID / VAT Number
              </label>
              <input
                type="text"
                name="taxId"
                id="taxId"
                placeholder="Tax ID / VAT Number"
                value={formData.taxId}
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
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Localization() {
  const [formData, setFormData] = useState({
    defaultLanguage: 'English (US)',
    regionFormat: 'United States',
    timeZone: '(GMT-05:00) Eastern Time',
    timeFormat: '12-hour (AM/PM)',
    dateFormat: 'MM/DD/YYYY',
    firstDayOfWeek: 'Sunday',
    currency: 'USD ($)',
    numberFormat: '1,234.56',
  });

  // Fetch localization settings on page load
  useEffect(() => {
    const fetchLocalization = async () => {
      try {
        const response = await axios.get('https://api.leadsavvyai.com/api/localization', {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        const settings = response.data;
        if (settings) {
          setFormData({
            defaultLanguage: settings.defaultLanguage || 'English (US)',
            regionFormat: settings.regionFormat || 'United States',
            timeZone: settings.timeZone || '(GMT-05:00) Eastern Time',
            timeFormat: settings.timeFormat || '12-hour (AM/PM)',
            dateFormat: settings.dateFormat || 'MM/DD/YYYY',
            firstDayOfWeek: settings.firstDayOfWeek || 'Sunday',
            currency: settings.currency || 'USD ($)',
            numberFormat: settings.numberFormat || '1,234.56',
          });
        }
      } catch (error) {
        console.error('Error fetching localization settings:', error);
        toast.error('Failed to fetch localization settings');
      }
    };

    fetchLocalization();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.leadsavvyai.com/api/localization', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        toast.success('Localization settings updated successfully!');
      } else {
        toast.error('Failed to update localization settings');
      }
    } catch (error) {
      console.error('Error updating localization settings:', error);
      toast.error('An error occurred while updating localization settings');
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Localization Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Default Language */}
        <div className="flex flex-col">
          <label htmlFor="defaultLanguage" className="text-sm font-medium text-gray-300">
            Default Language
          </label>
          <select
            id="defaultLanguage"
            name="defaultLanguage"
            value={formData.defaultLanguage}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
          >
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Chinese (Simplified)</option>
          </select>
        </div>

        {/* Region Format */}
        <div className="flex flex-col">
          <label htmlFor="regionFormat" className="text-sm font-medium text-gray-300">
            Region Format
          </label>
          <select
            id="regionFormat"
            name="regionFormat"
            value={formData.regionFormat}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
          >
            <option>United States</option>
            <option>United Kingdom</option>
            <option>European Union</option>
            <option>China</option>
            <option>Japan</option>
          </select>
        </div>

        {/* Time Zone */}
        <div className="flex flex-col">
          <label htmlFor="timeZone" className="text-sm font-medium text-gray-300">
            Time Zone
          </label>
          <select
            id="timeZone"
            name="timeZone"
            value={formData.timeZone}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
          >
            <option>(GMT-05:00) Eastern Time</option>
            <option>(GMT-08:00) Pacific Time</option>
            <option>(GMT+00:00) UTC</option>
            <option>(GMT+01:00) Central European Time</option>
            <option>(GMT+08:00) China Standard Time</option>
          </select>
        </div>

        {/* Time Format */}
        <div className="flex flex-col">
          <label htmlFor="timeFormat" className="text-sm font-medium text-gray-300">
            Time Format
          </label>
          <select
            id="timeFormat"
            name="timeFormat"
            value={formData.timeFormat}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
          >
            <option>12-hour (AM/PM)</option>
            <option>24-hour</option>
          </select>
        </div>

        {/* Date Format */}
        <div className="flex flex-col">
          <label htmlFor="dateFormat" className="text-sm font-medium text-gray-300">
            Date Format
          </label>
          <select
            id="dateFormat"
            name="dateFormat"
            value={formData.dateFormat}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
          >
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        {/* First Day of Week */}
        <div className="flex flex-col">
          <label htmlFor="firstDayOfWeek" className="text-sm font-medium text-gray-300">
            First Day of Week
          </label>
          <select
            id="firstDayOfWeek"
            name="firstDayOfWeek"
            value={formData.firstDayOfWeek}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
          >
            <option>Sunday</option>
            <option>Monday</option>
          </select>
        </div>

        {/* Currency */}
        <div className="flex flex-col">
          <label htmlFor="currency" className="text-sm font-medium text-gray-300">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
          >
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
            <option>JPY (¥)</option>
            <option>CNY (¥)</option>
          </select>
        </div>

        {/* Number Format */}
        <div className="flex flex-col">
          <label htmlFor="numberFormat" className="text-sm font-medium text-gray-300">
            Number Format
          </label>
          <select
            id="numberFormat"
            name="numberFormat"
            value={formData.numberFormat}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
          >
            <option>1,234.56</option>
            <option>1.234,56</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Localization;
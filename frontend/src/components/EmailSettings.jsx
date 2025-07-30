import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

function EmailSettings() {
  const [formData, setFormData] = useState({
    smtpHost: '',
    smtpPort: '',
    security: 'tls',
    fromName: '',
    fromEmail: '',
    emailPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Email settings updated successfully!');
  };

  return (
    <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <div className="px-6 py-8">
        <h3 className="text-2xl font-semibold text-white mb-8">Email Settings</h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium text-white mb-4">SMTP Configuration</h4>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="group">
                  <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-200 mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    name="smtpHost"
                    id="smtpHost"
                    placeholder="smtp.example.com"
                    value={formData.smtpHost}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                  />
                </div>

                <div className="group">
                  <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-200 mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="text"
                    name="smtpPort"
                    id="smtpPort"
                    placeholder="587"
                    value={formData.smtpPort}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                  />
                </div>

                <div className="group">
                  <label htmlFor="security" className="block text-sm font-medium text-gray-200 mb-2">
                    Security
                  </label>
                  <select
                    id="security"
                    name="security"
                    value={formData.security}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                  >
                    <option value="none">None</option>
                    <option value="ssl">SSL</option>
                    <option value="tls">TLS</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">Sender Information</h4>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="group">
                  <label htmlFor="fromName" className="block text-sm font-medium text-gray-200 mb-2">
                    From Name
                  </label>
                  <input
                    type="text"
                    name="fromName"
                    id="fromName"
                    placeholder="Company Name"
                    value={formData.fromName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                  />
                </div>

                <div className="group">
                  <label htmlFor="fromEmail" className="block text-sm font-medium text-gray-200 mb-2">
                    From Email
                  </label>
                  <input
                    type="email"
                    name="fromEmail"
                    id="fromEmail"
                    placeholder="noreply@example.com"
                    value={formData.fromEmail}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                  />
                </div>

                <div className="group">
                  <label htmlFor="emailPassword" className="block text-sm font-medium text-gray-200 mb-2">
                    Email Password
                  </label>
                  <input
                    type="password"
                    name="emailPassword"
                    id="emailPassword"
                    placeholder="••••••••"
                    value={formData.emailPassword}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                  />
                </div>
              </div>
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

export default EmailSettings;
import React from 'react';
import { Mail, AtSign, Send, BookTemplate as Template } from 'lucide-react';

function EmailSettings() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Email Settings</h2>
      
      <div className="space-y-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Email Configuration</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">SMTP Server</label>
              <input type="text" className="input" placeholder="smtp.example.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Port</label>
                <input type="number" className="input" placeholder="587" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Security</label>
                <select className="input">
                  <option>TLS</option>
                  <option>SSL</option>
                  <option>None</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <AtSign className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Sender Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">From Name</label>
              <input type="text" className="input" placeholder="Your Company Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">From Email</label>
              <input type="email" className="input" placeholder="noreply@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reply-To Email</label>
              <input type="email" className="input" placeholder="support@example.com" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Send className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Email Delivery</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Tracking</p>
                <p className="text-sm text-gray-400">Track email opens and clicks</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delivery Reports</p>
                <p className="text-sm text-gray-400">Get notifications for failed deliveries</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Template className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Email Templates</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Welcome Email</p>
                <p className="text-sm text-gray-400">Sent to new users</p>
              </div>
              <button className="btn-secondary">Edit Template</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password Reset</p>
                <p className="text-sm text-gray-400">Password recovery email</p>
              </div>
              <button className="btn-secondary">Edit Template</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Invoice Email</p>
                <p className="text-sm text-gray-400">Sent with new invoices</p>
              </div>
              <button className="btn-secondary">Edit Template</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSettings;
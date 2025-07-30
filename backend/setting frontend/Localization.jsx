import React from 'react';
import { Globe, Clock, Calendar, DollarSign } from 'lucide-react';

function Localization() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Localization Settings</h2>
      
      <div className="space-y-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Language & Region</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Language</label>
              <select className="input">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese (Simplified)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Region Format</label>
              <select className="input">
                <option>United States</option>
                <option>United Kingdom</option>
                <option>European Union</option>
                <option>China</option>
                <option>Japan</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Time Zone</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Time Zone</label>
              <select className="input">
                <option>(GMT-05:00) Eastern Time</option>
                <option>(GMT-08:00) Pacific Time</option>
                <option>(GMT+00:00) UTC</option>
                <option>(GMT+01:00) Central European Time</option>
                <option>(GMT+08:00) China Standard Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time Format</label>
              <select className="input">
                <option>12-hour (AM/PM)</option>
                <option>24-hour</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Date Format</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date Format</label>
              <select className="input">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">First Day of Week</label>
              <select className="input">
                <option>Sunday</option>
                <option>Monday</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Number & Currency</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select className="input">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>JPY (¥)</option>
                <option>CNY (¥)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Number Format</label>
              <select className="input">
                <option>1,234.56</option>
                <option>1.234,56</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Localization;
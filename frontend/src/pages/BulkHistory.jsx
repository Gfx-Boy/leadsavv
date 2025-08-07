import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Download, Eye } from 'lucide-react';

export function BulkHistory() {
  const [importHistory, setImportHistory] = useState([]);

  // Fetch import history on component mount
  useEffect(() => {
    const fetchImportHistory = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
        const response = await axios.get('https://api.leadsavvyai.com/api/import/history', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        setImportHistory(response.data);
      } catch (error) {
        console.error('Error fetching import history:', error);
      }
    };

    fetchImportHistory();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
        <Clock className="text-indigo-500" />
        <span>Bulk History</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-4 px-6">Date</th>
              <th className="text-left py-4 px-6">Time</th>
              <th className="text-left py-4 px-6">Action</th>
              <th className="text-left py-4 px-6">Records</th>
              <th className="text-left py-4 px-6">Status</th>
              <th className="text-right py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {importHistory.map((item) => (
              <tr key={item.id} className="border-b border-gray-700 text-white">
                <td className="py-4 px-6">{item.date}</td>
                <td className="py-4 px-6">{item.time}</td>
                <td className="py-4 px-6">{item.action}</td>
                <td className="py-4 px-6">{item.records}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === 'Completed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-blue-400 hover:text-blue-300 mr-3">
                    <Eye size={18} />
                  </button>
                  <button className="text-green-400 hover:text-green-300">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
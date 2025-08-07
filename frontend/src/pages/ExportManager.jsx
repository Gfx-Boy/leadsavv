import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileSpreadsheet } from 'lucide-react';

function ExportManager() {
  const [exports, setExports] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    const fetchExports = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage
        const response = await axios.get('https://api.leadsavvyai.com/api/export-manager', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        setExports(response.data);
      } catch (err) {
        console.error('Error fetching exports:', err);
      }
    };
    fetchExports();
  }, []);

  const filteredExports = exports.filter(
    (exp) =>
      exp.keyword.includes(filterKeyword) && exp.location.includes(filterLocation)
  );

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Export Manager</h2>
          <p className="text-sm text-gray-400 mt-1">{exports.length} exports available</p>
        </div>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <FileSpreadsheet size={18} className="mr-2" />
          Export Selected
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filter by Keyword:
          </label>
          <input
            type="text"
            placeholder="Enter keyword to filter"
            className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filter by Location:
          </label>
          <input
            type="text"
            placeholder="Enter location to filter"
            className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Results Section */}
      {filteredExports.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 px-4">Keyword</th>
                <th className="pb-3 px-4">Location</th>
                <th className="pb-3 px-4">Date</th>
                <th className="pb-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExports.map((exp, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                >
                  <td className="py-4 px-4">{exp.keyword}</td>
                  <td className="py-4 px-4">{exp.location}</td>
                  <td className="py-4 px-4">{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="py-4 px-4">
                    <button className="text-blue-400 hover:text-blue-300 transition">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          No exports match your filter criteria.
        </div>
      )}
    </div>
  );
}

export default ExportManager;
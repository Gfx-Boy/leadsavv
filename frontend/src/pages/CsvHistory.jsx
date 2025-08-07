import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { History, Download, Trash2, Eye } from 'lucide-react';

function CsvHistory() {
  const [csvHistory, setCsvHistory] = useState([]);

  const fetchCSVHistory = async () => {
    try {
      const token = sessionStorage.getItem('token'); // Get token from sessionStorage
      const response = await axios.get('https://api.leadsavvyai.com/api/history', {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });
      setCsvHistory(response.data);
    } catch (err) {
      console.error('Error fetching CSV history:', err);
    }
  };

  useEffect(() => {
    fetchCSVHistory();
  }, []);

  const downloadFile = (filename) => {
    const token = sessionStorage.getItem('token');
    const encodedFilename = encodeURIComponent(filename); // Encode the filename
    axios({
      url: `https://api.leadsavvyai.com/api/download/${encodedFilename}`, // Use the encoded filename
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // Important
    })
      .then((response) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // or any other extension
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Download failed:', error);
      });
  };

  const deleteFile = async (filename) => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.delete(`https://api.leadsavvyai.com/api/delete/${filename}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // After successful deletion, refresh the CSV history
      fetchCSVHistory();
    } catch (error) {
      console.error('Deletion failed:', error);
    }
  };

  const viewFile = (filename) => {
    const token = sessionStorage.getItem('token');
    const encodedFilename = encodeURIComponent(filename);
    const url = `https://api.leadsavvyai.com/api/view/${encodedFilename}`;

    window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">CSV History</h2>
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={fetchCSVHistory}
        >
          <History size={18} className="mr-2" />
          Refresh History
        </button>
      </div>

      {/* Results Section */}
      {csvHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 px-4">Filename</th>
                <th className="pb-3 px-4">Keyword</th>
                <th className="pb-3 px-4">Location</th>
                <th className="pb-3 px-4">Leads</th>
                <th className="pb-3 px-4">Date</th>
                <th className="pb-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {csvHistory.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                >
                  <td className="py-4 px-4">{item.filename}</td>
                  <td className="py-4 px-4">{item.keyword}</td>
                  <td className="py-4 px-4">{item.location}</td>
                  <td className="py-4 px-4">{item.leads}</td>
                  <td className="py-4 px-4">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-blue-400 hover:text-blue-300 transition flex items-center"
                        onClick={() => viewFile(item.filename)}
                      >
                        <Eye size={16} className="mr-2" />
                        View
                      </button>
                      <button
                        className="text-green-400 hover:text-green-300 transition flex items-center"
                        onClick={() => downloadFile(item.filename)}
                      >
                        <Download size={16} className="mr-2" />
                        Download
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300 transition flex items-center"
                        onClick={() => deleteFile(item.filename)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          No CSV exports found. Start scraping and export your results to see them here.
        </div>
      )}
    </div>
  );
}

export default CsvHistory;
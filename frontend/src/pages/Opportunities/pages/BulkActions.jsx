import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

function BulkActions() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Simulate upload
      setUploadStatus('uploading');
      setTimeout(() => {
        setUploadStatus('success');
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Bulk Actions</h2>
        <a 
          href="#" 
          className="text-red-500 hover:text-red-400 transition"
          download="opportunity_template.csv"
        >
          Download Template CSV
        </a>
      </div>

      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors
          ${isDragging ? 'border-red-500 bg-red-500/10' : 'border-red-900/50 hover:border-red-500'}
          ${uploadStatus === 'success' ? 'border-green-500 bg-green-500/10' : ''}
          ${uploadStatus === 'error' ? 'border-yellow-500 bg-yellow-500/10' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex justify-center">
            {uploadStatus === 'success' ? (
              <CheckCircle className="h-12 w-12 text-green-500" />
            ) : uploadStatus === 'error' ? (
              <AlertCircle className="h-12 w-12 text-yellow-500" />
            ) : (
              <Upload className="h-12 w-12 text-red-500" />
            )}
          </div>
          
          {uploadStatus === 'success' ? (
            <div>
              <h3 className="text-xl font-semibold text-green-500">Upload Complete!</h3>
              <p className="text-gray-400 mt-2">Your opportunities have been processed successfully</p>
            </div>
          ) : uploadStatus === 'error' ? (
            <div>
              <h3 className="text-xl font-semibold text-yellow-500">Upload Failed</h3>
              <p className="text-gray-400 mt-2">Please check your file format and try again</p>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold">Drop your CSV file here</h3>
              <p className="text-gray-400 mt-2">or click to browse</p>
            </div>
          )}
          
          <input type="file" className="hidden" accept=".csv" />
          {!uploadStatus && (
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
              Browse Files
            </button>
          )}
        </div>
      </div>

      <div className="bg-[#2a2a2a] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50">
              <tr>
                <th className="text-left px-6 py-4">FILE NAME</th>
                <th className="text-left px-6 py-4">DATE</th>
                <th className="text-left px-6 py-4">STATUS</th>
                <th className="text-right px-6 py-4">RECORDS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-red-900/20">
                <td className="px-6 py-4">opportunities_march.csv</td>
                <td className="px-6 py-4">Mar 15, 2024</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                    Success
                  </span>
                </td>
                <td className="px-6 py-4 text-right">150</td>
              </tr>
              <tr className="border-t border-red-900/20">
                <td className="px-6 py-4">opportunities_feb.csv</td>
                <td className="px-6 py-4">Feb 28, 2024</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-400">
                    Failed
                  </span>
                </td>
                <td className="px-6 py-4 text-right">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BulkActions;
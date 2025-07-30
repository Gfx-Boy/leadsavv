import React from 'react';

function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('scraper')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'scraper' ? 'text-white border-b-2 border-dark-red' : 'text-gray-400 hover:text-white'
            }`}
          >
            Scraper
          </button>
          <button
            onClick={() => setActiveTab('csv-history')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'csv-history' ? 'text-white border-b-2 border-dark-red' : 'text-gray-400 hover:text-white'
            }`}
          >
            CSV History
          </button>
          <button
            onClick={() => setActiveTab('export-manager')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'export-manager' ? 'text-white border-b-2 border-dark-red' : 'text-gray-400 hover:text-white'
            }`}
          >
            Export Manager
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
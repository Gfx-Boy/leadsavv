import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './Scrapper.css'; // Ensure this file exists in the same folder as Scrapper.js
import ScraperForm from './components/ScraperForm'; // Adjust the path if needed
import ResultsTable from './components/ResultsTable'; // Adjust the path if needed
import Header from './components/Header'; // Adjust the path if needed
import Sidebar from '../../components/Sidebar'; // Adjust the path if needed
import CSVHistory from './components/CSVHistory'; // Adjust the path if needed
import ExportManager from './components/ExportManager'; // Adjust the path if needed
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
function Scraper() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [csvHistory, setCsvHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('scraper'); // 'scraper', 'history', or 'exports'
  const [showUpgradePopup, setShowUpgradePopup] = useState(false); // State for upgrade popup
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [plans, setPlans] = useState([
    { id: 'basic', name: 'Basic Plan', price: 10, features: ['Data scraper - first 40 free and the rest depending upon api charges', 'Email marketing - 2000 email a month', 'Landing page builder - 1 landing page with deploy' ] },
    { id: 'pro', name: 'Standard Plan', price: 29, features: ['Data scraper - first 40 free and the rest depending upon api charges', 'Email marketing - 5000 email a month', 'Landing page builder - 2 landing page with deploy'] },
    { id: 'premium', name: 'Enterprise Plan', price: 99, features: ['Data scraper - first 40 free and the rest depending upon api charges', 'Email marketing - 10k email a month', 'Landing page builder - 3 landing page with deploy' ] },
  ]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Load CSV history from the backend on component mount
  useEffect(() => {
    const fetchCSVHistory = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage
        const response = await axios.get('http://31.97.41.27:5005/api/history', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        setCsvHistory(response.data);
      } catch (err) {
        console.error('Error fetching CSV history:', err);
      }
    };
    fetchCSVHistory();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle scraping data
  const handleScrape = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token'); // Get token from sessionStorage
      const response = await axios.post(
        'http://31.97.41.27:5005/api/scrape',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        }
      );
      setResults(response.data); // Set the resultss from the backend
    } catch (err) {
      if (err.response && err.response.status === 403) {
        // Check if the error is due to hitting the free plan limit
        setShowUpgradePopup(true); // Show the upgrade popup
      } else {
        setError('An error occurred while scraping. Please try again.');
      }} finally {
      setIsLoading(false);
    }
  };
  const handleSelectPlan = (planId) => {
    console.log(`Selected Plan: ${planId}`);
    navigate('/settings/billing'); // Redirect to the billing page
  };

  // Export data to CSV
  const exportToCSV = async (customResults = results) => {
    if (customResults.length === 0) return;
    try {
      const token = sessionStorage.getItem('token'); // Get token from sessionStorage
      const response = await axios.post(
        'http://31.97.41.27:5005/api/export',
        { results: customResults },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        }
      );
      const { csvContent, fileName } = response.data;

      // Create a downloadable CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Update CSV history
      const newHistoryEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        fileName,
        keywords: [...new Set(customResults.map((item) => item.category))],
        locations: [...new Set(customResults.map((item) => item.location))],
        recordCount: customResults.length,
        data: csvContent,
      };
      setCsvHistory([newHistoryEntry, ...csvHistory]);
    } catch (err) {
      console.error('Error exporting to CSV:', err);
    }
  };

  // Download CSV from history
  const handleDownloadFromHistory = async (csv) => {
    const blob = new Blob([csv.data], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', csv.fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Delete CSV from history
  const handleDeleteFromHistory = async (id) => {
    try {
      const token = sessionStorage.getItem('token'); // Get token from sessionStorage
      await axios.delete(`http://31.97.41.27:5005/api/scrapehistory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });
      setCsvHistory(csvHistory.filter((csv) => csv.id !== id));
    } catch (err) {
      console.error('Error deleting CSV history:', err);
    }
  };

  // View CSV from history
  const handleViewFromHistory = (csv) => {
    const lines = csv.data.split('\n');
    const headers = lines[0].split(',');
    const parsedResults = lines.slice(1).map((line) => {
      const values = line.split(',');
      const result = {};
      headers.forEach((header, index) => {
        result[header] = values[index];
        if (result[header] && result[header].startsWith('"') && result[header].endsWith('"')) {
          result[header] = result[header].substring(1, result[header].length - 1);
        }
      });
      return result;
    });
    setResults(parsedResults);
    setActiveTab('scraper'); // Switch to the scraper tab to show results
  };

  // Merge multiple CSV exports
  const handleMergeExports = (exportsToMerge) => {
    let allResults = [];
    exportsToMerge.forEach((csv) => {
      const lines = csv.data.split('\n');
      const headers = lines[0].split(',');
      const parsedResults = lines.slice(1).map((line) => {
        const values = line.split(',');
        const result = {};
        headers.forEach((header, index) => {
          result[header] = values[index];
          if (result[header] && result[header].startsWith('"') && result[header].endsWith('"')) {
            result[header] = result[header].substring(1, result[header].length - 1);
          }
        });
        return result;
      });
      allResults = [...allResults, ...parsedResults];
    });
    exportToCSV(allResults);
  };
  const handleUpgradePlan = () => {
    setShowUpgradePopup(false);
    setActiveTab('upgrade'); // Redirect to the upgrade plan tab
  };

  return (
    <div className="app-container">
      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="header-container">
          <Header />
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'scraper' ? 'active' : ''}`}
            onClick={() => setActiveTab('scraper')}
          >
            Scraper
          </button>
          <button
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            CSV History {csvHistory.length > 0 && <span className="history-badge">{csvHistory.length}</span>}
          </button>
          <button
            className={`tab-button ${activeTab === 'exports' ? 'active' : ''}`}
            onClick={() => setActiveTab('exports')}
          >
            Export Manager
          </button>
        </div>

        {activeTab === 'scraper' && (
          <>
            <ScraperForm onSubmit={handleScrape} isLoading={isLoading} />
            <ResultsTable
              results={results}
              isLoading={isLoading}
              error={error}
              onExport={() => exportToCSV(results)}
            />
          </>
        )}

        {activeTab === 'history' && (
          <CSVHistory
            csvHistory={csvHistory}
            onDownload={handleDownloadFromHistory}
            onDelete={handleDeleteFromHistory}
            onView={handleViewFromHistory}
          />
        )}

        {activeTab === 'exports' && (
          <ExportManager
            csvHistory={csvHistory}
            onExport={handleDownloadFromHistory}
            onMerge={handleMergeExports}
          />
        )}
         {/* Upgrade Popup */}
         {showUpgradePopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-400">Select the perfect plan for your needs</p>
      </header>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${
              selectedPlan?.id === plan.id ? 'ring-2 ring-blue-500' : ''
            }`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-2">
                  ${plan.price}
                  <span className="text-sm text-gray-400">/mo</span>
                </p>
              </div>
              {plan.icon}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan(plan.id)}
              disabled={selectedPlan?.id === plan.id}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                selectedPlan?.id === plan.id
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {selectedPlan?.id === plan.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          onClick={() => setShowUpgradePopup(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

        <footer className="footer">
          <p>© 2025 All Rights Reserved</p>
        </footer>
      </main>
    </div>
  );
}

export default Scraper;
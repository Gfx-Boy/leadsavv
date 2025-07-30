import React from 'react';
import { FaFileDownload, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaStar } from 'react-icons/fa';

const ResultsTable = ({ results = [], isLoading, error, onExport }) => {
  if (!Array.isArray(results)) {
    console.error('Results is not an array:', results);
    results = []; // Fallback to an empty array
  }

  if (isLoading) {
    return (
      <div className="results-section">
        <div className="results-header">
          <h2 className="results-title">Scraping Results</h2>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-section">
        <div className="results-header">
          <h2 className="results-title">Scraping Results</h2>
        </div>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="results-section">
      <div className="results-header">
        <div>
          <h2 className="results-title">Scraping Results</h2>
          {results.length > 0 && (
            <span className="results-count">{results.length} businesses found</span>
          )}
        </div>
        {results.length > 0 && (
          <button className="btn btn-primary" onClick={onExport}>
            <FaFileDownload /> Export CSV
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="empty-results">
          <p>No results yet. Configure your scraper and start scraping to see results here.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Business Name</th>
                <th><FaMapMarkerAlt /> Address</th>
                <th><FaPhone /> Phone</th>
                <th><FaEnvelope /> Email</th>
                <th><FaGlobe /> Website</th>
                <th><FaStar /> Rating</th>
                <th>Reviews</th>
                <th>Category</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.businessName}</td>
                  <td>{result.address}</td>
                  <td>{result.phone}</td>
                  <td>{result.email || 'N/A'}</td>
                  <td>
                    <a href={result.website} target="_blank" rel="noopener noreferrer">
                      {result.website}
                    </a>
                  </td>
                  <td>{result.rating}</td>
                  <td>{result.reviews}</td>
                  <td>{result.category}</td>
                  <td>{result.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
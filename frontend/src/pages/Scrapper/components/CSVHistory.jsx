import React from 'react';
import { FaFileDownload, FaTrash, FaEye } from 'react-icons/fa';

const CSVHistory = ({ csvHistory, onDownload, onDelete, onView }) => {
  if (csvHistory.length === 0) {
    return (
      <div className="results-section">
        <div className="results-header">
          <h2 className="results-title">CSV History</h2>
        </div>
        <div className="empty-results">
          <p>No CSV exports found. Start scraping and export your results to see them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-section">
      <div className="results-header">
        <div>
          <h2 className="results-title">CSV History</h2>
          <span className="results-count">{csvHistory.length} exports found</span>
        </div>
      </div>

      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>File Name</th>
              <th>Keywords</th>
              <th>Locations</th>
              <th>Records</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {csvHistory.map((csv) => (
              <tr key={csv.id}>
                <td>{csv.date}</td>
                <td>{csv.fileName}</td>
                <td>{csv.keywords.join(', ')}</td>
                <td>{csv.locations.join(', ')}</td>
                <td>{csv.recordCount}</td>
                <td className="action-buttons">
                  <button 
                    className="btn-icon" 
                    onClick={() => onView(csv)}
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button 
                    className="btn-icon" 
                    onClick={() => onDownload(csv)}
                    title="Download"
                  >
                    <FaFileDownload />
                  </button>
                  <button 
  className="btn-icon btn-danger" 
  onClick={() => onDelete(csv._id)} // Use _id instead of id
  title="Delete"
>
  <FaTrash />
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CSVHistory;
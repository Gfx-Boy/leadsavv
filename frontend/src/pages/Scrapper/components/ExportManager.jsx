import React, { useState } from 'react';
import { FaFileDownload, FaFileExport, FaFilter, FaObjectGroup } from 'react-icons/fa';

const ExportManager = ({ csvHistory, onExport, onMerge }) => {
  const [selectedExports, setSelectedExports] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  const toggleSelectExport = (id) => {
    if (selectedExports.includes(id)) {
      setSelectedExports(selectedExports.filter(exportId => exportId !== id));
    } else {
      setSelectedExports([...selectedExports, id]);
    }
  };

  const filteredExports = csvHistory.filter(csv => {
    const keywordMatch = filterKeyword === '' || 
      csv.keywords.some(k => k.toLowerCase().includes(filterKeyword.toLowerCase()));
    const locationMatch = filterLocation === '' || 
      csv.locations.some(l => l.toLowerCase().includes(filterLocation.toLowerCase()));
    return keywordMatch && locationMatch;
  });

  const handleMergeSelected = () => {
    if (selectedExports.length > 1) {
      const exportsToMerge = csvHistory.filter(csv => selectedExports.includes(csv.id));
      onMerge(exportsToMerge);
    }
  };

  return (
    <div className="results-section">
      <div className="results-header">
        <div>
          <h2 className="results-title">Export Manager</h2>
          <span className="results-count">{csvHistory.length} exports available</span>
        </div>
        {selectedExports.length > 1 && (
          <button className="btn btn-primary" onClick={handleMergeSelected}>
            <FaObjectGroup /> Merge Selected ({selectedExports.length})
          </button>
        )}
      </div>

      <div className="filter-container">
        <div className="filter-group">
          <label htmlFor="keyword-filter" className="filter-label">Filter by Keyword:</label>
          <input
            id="keyword-filter"
            type="text"
            className="form-input"
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            placeholder="Enter keyword to filter"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="location-filter" className="filter-label">Filter by Location:</label>
          <input
            id="location-filter"
            type="text"
            className="form-input"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            placeholder="Enter location to filter"
          />
        </div>
      </div>

      {filteredExports.length === 0 ? (
        <div className="empty-results">
          <p>No exports match your filter criteria.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Date</th>
                <th>File Name</th>
                <th>Keywords</th>
                <th>Locations</th>
                <th>Records</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExports.map((csv) => (
                <tr key={csv.id} className={selectedExports.includes(csv.id) ? 'selected-row' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedExports.includes(csv.id)}
                      onChange={() => toggleSelectExport(csv.id)}
                      className="export-checkbox"
                    />
                  </td>
                  <td>{csv.date}</td>
                  <td>{csv.fileName}</td>
                  <td>{csv.keywords.join(', ')}</td>
                  <td>{csv.locations.join(', ')}</td>
                  <td>{csv.recordCount}</td>
                  <td>
                    <button 
                      className="btn-icon" 
                      onClick={() => onExport(csv)}
                      title="Download"
                    >
                      <FaFileDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExportManager;
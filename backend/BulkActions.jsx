import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FunnelIcon } from '@heroicons/react/24/outline';

function BulkActions() {
  const [dateRange, setDateRange] = useState({ start: '2024-11-22', end: '2025-01-22' });
  const [bulkActions, setBulkActions] = useState([]);

  useEffect(() => {
    const fetchBulkActions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bulk-actions');
        setBulkActions(response.data);
      } catch (error) {
        console.error('Error fetching bulk actions:', error);
      }
    };

    fetchBulkActions();
  }, []);

  return (
    <div>
      <div className="header-controls">
        <h2 className="nav-title">Bulk Actions</h2>
        <div className="button-group">
          <div className="date-range" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', backgroundColor: 'var(--card-bg)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="modal-input"
              style={{ margin: 0, padding: '0.25rem', width: 'auto' }}
            />
            <span>→</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="modal-input"
              style={{ margin: 0, padding: '0.25rem', width: 'auto' }}
            />
          </div>
          <button className="button button-secondary">
            <FunnelIcon className="icon" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Action Label</th>
              <th>Operation</th>
              <th>Status</th>
              <th>User</th>
              <th>Created</th>
              <th>Completed</th>
              <th>Statistics</th>
            </tr>
          </thead>
          <tbody>
            {bulkActions.length > 0 ? (
              bulkActions.map(action => (
                <tr key={action._id}>
                  <td>{action.actionLabel}</td>
                  <td>{action.operation}</td>
                  <td>{action.status}</td>
                  <td>{action.user}</td>
                  <td>{new Date(action.created).toLocaleString()}</td>
                  <td>{action.completed ? new Date(action.completed).toLocaleString() : 'N/A'}</td>
                  <td>{action.statistics}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-gray)' }}>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BulkActions;
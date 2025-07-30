import { useState } from 'react';
import { FaTimes, FaSearch, FaTrash } from 'react-icons/fa';
import axios from 'axios'; // Import Axios

const ScraperForm = ({ onSubmit, isLoading }) => {
  const [keywordInput, setKeywordInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [locations, setLocations] = useState([]);

  const handleAddKeyword = (e) => {
    e.preventDefault();
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (locationInput.trim() && !locations.includes(locationInput.trim())) {
      setLocations([...locations, locationInput.trim()]);
      setLocationInput('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleRemoveLocation = (location) => {
    setLocations(locations.filter(l => l !== location));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keywords.length > 0 && locations.length > 0) {
      console.log('Submitting form with data:', { keywords, locations });
      // Pass the form data to the parent component
      onSubmit({ keywords, locations });
    } else {
      console.log('Keywords and locations are required.');
    }
  };

  const handleKeyDown = (e, inputType) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputType === 'keyword') {
        handleAddKeyword(e);
      } else {
        handleAddLocation(e);
      }
    }
  };

  const handleReset = () => {
    setKeywords([]);
    setLocations([]);
    setKeywordInput('');
    setLocationInput('');
  };

  return (
    <div className="scraper-form">
      <h2 className="form-title">Configure Your Scraper</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="keywords" className="form-label">Keywords (businesses, services, etc.)</label>
          <div className="input-with-button">
            <input
              type="text"
              id="keywords"
              className="form-input"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'keyword')}
              placeholder="Enter a keyword and press Enter"
              disabled={isLoading}
            />
          </div>
          <div className="tags-container">
            {keywords.map((keyword, index) => (
              <div key={index} className="tag">
                {keyword}
                <button 
                  type="button" 
                  className="tag-remove" 
                  onClick={() => handleRemoveKeyword(keyword)}
                  disabled={isLoading}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="locations" className="form-label">Locations (cities, neighborhoods, etc.)</label>
          <div className="input-with-button">
            <input
              type="text"
              id="locations"
              className="form-input"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'location')}
              placeholder="Enter a location and press Enter"
              disabled={isLoading}
            />
          </div>
          <div className="tags-container">
            {locations.map((location, index) => (
              <div key={index} className="tag">
                {location}
                <button 
                  type="button" 
                  className="tag-remove" 
                  onClick={() => handleRemoveLocation(location)}
                  disabled={isLoading}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleReset}
            disabled={isLoading || (keywords.length === 0 && locations.length === 0)}
          >
            <FaTrash /> Reset
          </button>
          <button 
            type="submit" 
            className={`btn ${isLoading || keywords.length === 0 || locations.length === 0}`}
            disabled={isLoading || keywords.length === 0 || locations.length === 0}
          >
            {isLoading ? 'Scraping...' : <><FaSearch /> Start Scraping</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScraperForm;
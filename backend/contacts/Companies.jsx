import React, { useState } from 'react';

const Companies = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    state: '',
    city: '',
    description: '',
    postalCode: '',
    country: '',
  });

  const handleButtonClick = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanies([...companies, formData]);
    setFormData({
      name: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      state: '',
      city: '',
      description: '',
      postalCode: '',
      country: '',
    });
    closePopup();
  };

  return (
    <div className="page-content">
      <div className="companies-header">
        <h2>Companies</h2>
        <span className="company-count">{companies.length} Companies</span>
        <button className="add-company-btn" onClick={() => handleButtonClick('Add New Company')}>+ Add Company</button>
      </div>
      <div className="companies-filters">
        <button className="list-view-btn" onClick={() => handleButtonClick('List View')}>List</button>
        <div className="advanced-filters">
          <button onClick={() => handleButtonClick('Advanced Filters')}>Advanced Filters</button>
          <button onClick={() => handleButtonClick('Sort (1)')}>Sort (1)</button>
        </div>
        <input type="text" placeholder="Search" className="company-search" />
        <button className="manage-fields-btn" onClick={() => handleButtonClick('Manage Fields')}>Manage Fields</button>
      </div>
      <div className="companies-table">
        <div className="table-header">
          <input type="checkbox" />
          <span>Company Name</span>
          <span>Phone</span>
          <span>Email</span>
          <span>Website</span>
          <span>Address</span>
          <span>State</span>
          <span>City</span>
          <span>Description</span>
          <span>Postal Code</span>
          <span>Country</span>
          <span>Created At (EST)</span>
          <span>Updated At (EST)</span>
          <span>Created By</span>
        </div>
        {companies.map((company, index) => (
          <div key={index} className="table-row">
            <input type="checkbox" />
            <span>{company.name}</span>
            <span>{company.phone}</span>
            <span>{company.email}</span>
            <span>{company.website}</span>
            <span>{company.address}</span>
            <span>{company.state}</span>
            <span>{company.city}</span>
            <span>{company.description}</span>
            <span>{company.postalCode}</span>
            <span>{company.country}</span>
            <span>{new Date().toLocaleString()}</span>
            <span>{new Date().toLocaleString()}</span>
            <span>Admin</span>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={closePopup}>✖</button>
            {popupContent === 'Add New Company' && (
              <form onSubmit={handleSubmit} className="company-form">
                <div className='company-stuffs'>
                <h3>Add New Company</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Company Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Company Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      placeholder="Website"
                      value={formData.website}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                </div>
                <button type="submit" className="submit-btn">Save</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
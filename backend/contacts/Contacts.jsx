import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contacts() {
  const navigate = useNavigate();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Mariana',
      company: 'website.science',
      email: 'website.science1@gmail.com',
      created: '2024-12-12T03:39:00.000Z'
    },
    {
      id: 2,
      name: 'Ken',
      company: 'Web That Sells',
      email: 'ken@webthatssells.com',
      created: '2024-12-12T03:39:00.000Z'
    }
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [newContact, setNewContact] = useState({
    name: '',
    company: '',
    email: '',
    created: new Date().toISOString()
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = (contact) => {
    setPopupContent(contact);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  const handleAddContactClick = () => {
    setPopupContent('add');
    setIsPopupOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    setContacts([...contacts, { ...newContact, id: contacts.length + 1 }]);
    setNewContact({
      name: '',
      company: '',
      email: '',
      created: new Date().toISOString()
    });
    closePopup();
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setSelectedContacts(selectedContacts.filter(selectedId => selectedId !== id));
    closePopup();
  };

  const handleStarContact = (id) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, starred: !contact.starred } : contact
    ));
  };

  const handleForwardContact = (id) => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      alert(`Forwarding contact: ${contact.name}`);
    }
  };

  const handleDeleteSelectedContacts = () => {
    if (selectedContacts.length === 0) {
      alert("No contacts selected for deletion.");
      return;
    }
    setContacts(contacts.filter(contact => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
  };

  return (
    <div className="page-content">
      <div className="toolbar">
        <div className="left-tools">
          <button className="tool-btn" title="Add Contact" onClick={handleAddContactClick}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
            </svg>
          </button>
          <button className="tool-btn" title="Send Email">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </button>
          <button className="tool-btn" title="Add Note">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
              <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
            </svg>
          </button>
          <button className="tool-btn" title="Schedule Meeting" onClick={() => navigate('/calendar')}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
            </svg>
          </button>
          <button className="tool-btn" title="Send Message" onClick={() => navigate('/conversation')}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
            </svg>
          </button>
          <button className="tool-btn" title="View Profile">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
          </button>
          <button className="tool-btn" title="Star Contact" onClick={() => popupContent && handleStarContact(popupContent.id)}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </button>
          <button className="tool-btn" title="Forward Contact" onClick={() => popupContent && handleForwardContact(popupContent.id)}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
            </svg>
          </button>
          <button className="tool-btn" title="Delete Selected Contacts" onClick={handleDeleteSelectedContacts}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </div>
        <div className="right-tools">
          <input 
            type="text" 
            placeholder="Quick search" 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="contacts-table">
        <div className="table-header">
          <input 
            type="checkbox" 
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedContacts(contacts.map(c => c.id));
              } else {
                setSelectedContacts([]);
              }
            }}
          />
          <span>Name</span>
          <span>Phone</span>
          <span>Email</span>
          <span>Created</span>
          <span>Tags</span>
        </div>
        {filteredContacts.map(contact => (
          <div key={contact.id} className="table-row">
            <input 
              type="checkbox"
              checked={selectedContacts.includes(contact.id)}
              onChange={() => {
                if (selectedContacts.includes(contact.id)) {
                  setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                } else {
                  setSelectedContacts([...selectedContacts, contact.id]);
                }
              }}
            />
            <div className="name-cell" onClick={() => handleContactClick(contact)}>
              <div className="avatar">{contact.name[0]}</div>
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-company">{contact.company}</div>
              </div>
            </div>
            <span></span>
            <span>{contact.email}</span>
            <span>{new Date(contact.created).toLocaleString()}</span>
            <span></span>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={closePopup}>✖</button>
            {popupContent === 'add' ? (
              <form className="add-contact-form" onSubmit={handleAddContact}>
                <h2>Add New Contact</h2>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newContact.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={newContact.company}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newContact.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">Add Contact</button>
              </form>
            ) : (
              popupContent && (
                <div className="contact-details">
                  <h2>{popupContent.name}</h2>
                  <p><strong>Company:</strong> {popupContent.company}</p>
                  <p><strong>Email:</strong> {popupContent.email}</p>
                  <p><strong>Created:</strong> {new Date(popupContent.created).toLocaleString()}</p>
                  <p><strong>Starred:</strong> {popupContent.starred ? 'Yes' : 'No'}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;
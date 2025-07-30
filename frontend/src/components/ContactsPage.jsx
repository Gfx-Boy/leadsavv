import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [newContact, setNewContact] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    created: new Date().toISOString(),
  });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch contacts from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/contacts', newContact);
      setContacts([...contacts, response.data]);
      setNewContact({
        name: '',
        company: '',
        email: '',
        phone: '',
        created: new Date().toISOString(),
      });
      closePopup();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      setSelectedContacts(selectedContacts.filter((selectedId) => selectedId !== id));
      closePopup();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleDeleteSelectedContacts = async () => {
    if (selectedContacts.length === 0) {
      alert('No contacts selected for deletion.');
      return;
    }
    try {
      await Promise.all(selectedContacts.map((id) => axios.delete(`/contacts/${id}`)));
      setContacts(contacts.filter((contact) => !selectedContacts.includes(contact._id)));
      setSelectedContacts([]);
    } catch (error) {
      console.error('Error deleting selected contacts:', error);
    }
  };

  const handleImportContacts = () => {
    navigate('/import'); // Redirect to the import page
  };

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition">Contacts</button>
            <button
              className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition"
              onClick={handleDeleteSelectedContacts}
            >
              Bulk Delete
            </button>
            <button className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition" onClick={handleImportContacts}>
              Import
            </button>
            <button className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition">Tasks</button>
            <button className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition">Companies</button>
          </div>
          <button className="p-2 text-white hover:bg-white/10 rounded-md transition">⚙️</button>
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Quick Search"
            className="w-full px-4 py-2 bg-card-bg text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8">
        {/* Desktop view */}
        <div className="hidden md:block bg-card-bg rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-header-bg">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-400">Phone</th>
                <th className="px-6 py-4 text-left text-sm text-gray-400">Name</th>
                <th className="px-6 py-4 text-left text-sm text-gray-400">Created</th>
                <th className="px-6 py-4 text-left text-sm text-gray-400">Company</th>
                <th className="px-6 py-4 text-left text-sm text-gray-400">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredContacts.map((contact, index) => (
                <tr key={index} className="hover:bg-hover-bg transition" onClick={() => handleContactClick(contact)}>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden space-y-2">
          {filteredContacts.map((contact, index) => (
            <div key={index} className="bg-card-bg p-3 rounded-lg space-y-1" onClick={() => handleContactClick(contact)}>
              <div className="flex justify-between items-baseline">
                <span className="text-sm">{contact.name}</span>
                <span className="text-sm text-gray-400">{contact.phone}</span>
              </div>
              <div className="flex justify-between items-baseline text-sm">
                <span className="text-gray-400">Created: {contact.created}</span>
                <span className="text-gray-400">Company: {contact.company}</span>
              </div>
              <div className="text-sm text-gray-400">Email: {contact.email}</div>
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            {popupContent === 'add' ? (
              <form onSubmit={handleAddContact} className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Add New Contact</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newContact.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={newContact.company}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newContact.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={newContact.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Contact
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact Details</h3>
                <p className="text-gray-300">Name: {popupContent.name}</p>
                <p className="text-gray-300">Company: {popupContent.company}</p>
                <p className="text-gray-300">Email: {popupContent.email}</p>
                <p className="text-gray-300">Phone: {popupContent.phone}</p>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    onClick={() => handleDeleteContact(popupContent._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactsPage;
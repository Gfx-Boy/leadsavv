import React, { useState, useEffect } from "react";
import { Search, Plus, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Contacts() {
  const [contacts, setContacts] = useState([]); // Initialize as an empty array
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [newContact, setNewContact] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    created: new Date().toISOString(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Get token from sessionStorage
  const getToken = () => sessionStorage.getItem("token");

  // Fetch contacts from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = getToken();
        const response = await axios.get("https://api.leadsavvyai.com/api/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setContacts(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setContacts([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]); // Fallback to an empty array in case of an error
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
    setPopupContent("add");
    setIsPopupOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await axios.post("https://api.leadsavvyai.com/api/contacts", newContact, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts([...contacts, response.data]);
      setNewContact({
        name: "",
        company: "",
        email: "",
        phone: "",
        created: new Date().toISOString(),
      });
      closePopup();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`https://api.leadsavvyai.com/api/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(contacts.filter((contact) => contact._id !== id));
      setSelectedContacts(selectedContacts.filter((selectedId) => selectedId !== id));
      closePopup();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleDeleteSelectedContacts = async () => {
    if (selectedContacts.length === 0) {
      alert("No contacts selected for deletion.");
      return;
    }
    try {
      const token = getToken();
      await Promise.all(
        selectedContacts.map((id) =>
          axios.delete(`https://api.leadsavvyai.com/api/contacts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setContacts(contacts.filter((contact) => !selectedContacts.includes(contact._id)));
      setSelectedContacts([]);
    } catch (error) {
      console.error("Error deleting selected contacts:", error);
    }
  };

  const handleImportContacts = () => {
    navigate("/import"); // Redirect to the import page
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Contacts</h2>
        <button
          onClick={handleAddContactClick}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Contact</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-4 px-6">Name</th>
              <th className="text-left py-4 px-6">Phone</th>
              <th className="text-left py-4 px-6">Email</th>
              <th className="text-left py-4 px-6">Company</th>
              <th className="text-right py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact._id} className="border-b border-gray-700 text-white">
                <td className="py-4 px-6">{contact.name}</td>
                <td className="py-4 px-6">{contact.phone}</td>
                <td className="py-4 px-6">{contact.email}</td>
                <td className="py-4 px-6">{contact.company}</td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => handleContactClick(contact)}
                    className="text-blue-400 hover:text-blue-300 mr-3"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            {popupContent === "add" ? (
              <form onSubmit={handleAddContact} className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Add New Contact</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newContact.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
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
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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
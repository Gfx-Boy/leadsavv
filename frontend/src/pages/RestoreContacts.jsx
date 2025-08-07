import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RotateCcw, Clock, Trash2 } from 'lucide-react';

export function RestoreContacts() {
  const [deletedContacts, setDeletedContacts] = useState([]);

  // Fetch deleted contacts on component mount
  useEffect(() => {
    const fetchDeletedContacts = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
        const headers = { Authorization: `Bearer ${token}` }; // Add token to headers

        const response = await axios.get('https://api.leadsavvyai.com/api/contacts/deleted', { headers });
        setDeletedContacts(response.data);
      } catch (error) {
        console.error('Error fetching deleted contacts:', error);
      }
    };

    fetchDeletedContacts();
  }, []);

  // Handle restoring a contact
  const handleRestore = async (id) => {
    try {
      const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
      const headers = { Authorization: `Bearer ${token}` }; // Add token to headers

      await axios.patch(`https://api.leadsavvyai.com/api/contacts/restore/${id}`, {}, { headers });
      alert('Contact restored successfully!');

      // Remove the restored contact from the list
      setDeletedContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error restoring contact:', error);
      alert('Failed to restore contact. Please try again.');
    }
  };

  // Handle permanently deleting a contact
  const handlePermanentDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
      const headers = { Authorization: `Bearer ${token}` }; // Add token to headers

      await axios.delete(`https://api.leadsavvyai.com/api/contacts/permanent/${id}`, { headers });
      alert('Contact permanently deleted!');

      // Remove the permanently deleted contact from the list
      setDeletedContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error permanently deleting contact:', error);
      alert('Failed to delete contact permanently. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
        <RotateCcw className="text-indigo-500" />
        <span>Restore Contacts</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-4 px-6">Name</th>
              <th className="text-left py-4 px-6">Email</th>
              <th className="text-left py-4 px-6">Deleted At</th>
              <th className="text-right py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deletedContacts.map((contact) => (
              <tr key={contact._id} className="border-b border-gray-700 text-white">
                <td className="py-4 px-6">{contact.name}</td>
                <td className="py-4 px-6">{contact.email}</td>
                <td className="py-4 px-6 flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <span>{contact.deletedAt}</span>
                </td>
                <td className="py-4 px-6 text-right space-x-2">
                  <button
                    onClick={() => handleRestore(contact._id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(contact._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Permanently
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Plus, Filter, Download, Search, Trash2, Edit, MoreVertical } from 'lucide-react';
import axios from 'axios';

// Create an axios instance with base URL and token interceptor
const instance = axios.create({
  baseURL: 'https://api.leadsavvyai.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); // Get the token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Set the token in the headers
  }
  return config;
});

function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubscriber, setNewSubscriber] = useState({
    email: '',
    name: '',
    status: 'active',
  });
  const [editingSubscriber, setEditingSubscriber] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch subscribers from the backend
  const fetchSubscribers = async () => {
    try {
      const response = await instance.get('/subscribers');
      setSubscribers(response.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubscriber) {
        // Update existing subscriber
        await instance.put(`/subscribers/${editingSubscriber.id}`, newSubscriber);
        setEditingSubscriber(null);
      } else {
        // Create new subscriber
        await instance.post('/subscribers', newSubscriber);
      }
      setNewSubscriber({ email: '', name: '', status: 'active' });
      setShowAddForm(false);
      fetchSubscribers(); // Refresh the subscriber list after creating or updating
    } catch (error) {
      console.error('Error saving subscriber:', error);
    }
  };

  const handleEdit = (subscriber) => {
    setEditingSubscriber(subscriber);
    setNewSubscriber({ ...subscriber });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/subscribers/${_id}`);
      fetchSubscribers(); // Refresh the subscriber list after deletion
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    }
  };

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Subscribers</h1>
        <div className="flex space-x-4">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center mb-2 md:mb-0">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Subscriber
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscribers..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mb-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-gray-700">
                    <td className="py-4 px-4">{subscriber.email}</td>
                    <td className="py-4 px-4">{subscriber.name}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          subscriber.status === 'active'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 hover:bg-gray-700 rounded"
                          onClick={() => handleEdit(subscriber)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-700 rounded"
                          onClick={() => handleDelete(subscriber.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 px-4 text-center text-gray-400" colSpan="4">
                    No subscribers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingSubscriber ? 'Edit Subscriber' : 'Add Subscriber'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                value={newSubscriber.email}
                onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                value={newSubscriber.name}
                onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                value={newSubscriber.status}
                onChange={(e) => setNewSubscriber({ ...newSubscriber, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingSubscriber(null);
                  setNewSubscriber({ email: '', name: '', status: 'active' });
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {editingSubscriber ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Subscribers;
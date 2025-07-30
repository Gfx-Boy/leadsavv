import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function ProfileSettings() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error('Password is required to delete your account.');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete('/api/delete-account', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token storage logic
        },
        data: { password: deletePassword }, // Send the password in the request body
      });

      toast.success(response.data.message);
      // Redirect the user to the login page or homepage
      window.location.href = '/login';
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error(
        error.response?.data?.message || 'An error occurred while deleting your account.'
      );
    }
  };

  return (
    <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <div className="px-6 py-8">
        <h3 className="text-2xl font-semibold leading-6 text-white mb-8">Profile Information</h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
            <div className="group">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-2">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>

            <div className="group">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-2">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                         transition-all duration-200 ease-in-out
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                         hover:border-gray-500"
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                       transition-all duration-200 ease-in-out
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                       hover:border-gray-500"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium leading-6 text-white mb-6">Change Password</h3>
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-200 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    placeholder="Enter current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                  />
                </div>

                <div className="group">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-200 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                  />
                </div>

                <div className="group">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                             transition-all duration-200 ease-in-out
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                             hover:border-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium
                       transform transition-all duration-200 ease-in-out
                       hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={() => setShowDeletePopup(true)}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium
                       transform transition-all duration-200 ease-in-out
                       hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Confirm Account Deletion</h3>
            <p className="text-gray-400 mb-4">
              Please enter your password to confirm account deletion. This action cannot be undone.
            </p>
            <input
              type="password"
              placeholder="Enter your password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 
                       transition-all duration-200 ease-in-out
                       focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                       hover:border-gray-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSettings;
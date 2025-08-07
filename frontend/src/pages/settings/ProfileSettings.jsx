import React, { useState, useEffect } from 'react';
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

  // Fetch user profile data on page load
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await axios.get('https://api.leadsavvyai.com/api/users/profile', {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        const profile = response.data;
        if (profile) {
          setFormData((prevData) => ({
            ...prevData,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
          }));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to fetch profile data');
      }
    };

    fetchMyProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'https://api.leadsavvyai.com/api/users/profile',
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'An error occurred while updating the profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validate input
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New password and confirmation password do not match');
      return;
    }

    try {
      const response = await axios.put(
        'https://api.leadsavvyai.com/api/users/change-password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Password changed successfully');
        setFormData((prevData) => ({
          ...prevData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      } else {
        toast.error('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error.response?.data?.message || 'An error occurred while changing the password');
    }
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
      const response = await axios.delete('https://api.leadsavvyai.com/api/delete-account', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        data: { password: deletePassword },
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
        {/* Profile Update Form */}
        <form onSubmit={handleProfileUpdate} className="space-y-8">
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

          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium
                     transform transition-all duration-200 ease-in-out
                     hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </form>

        {/* Password Change Form */}
        <form onSubmit={handlePasswordChange} className="space-y-8 mt-10">
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

          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium
                     transform transition-all duration-200 ease-in-out
                     hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Change Password
          </button>
        </form>

        {/* Delete Account Section */}
        <div className="mt-10">
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
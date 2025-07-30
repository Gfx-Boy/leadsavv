import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import axios from 'axios'; // Import axios

function BusinessProfile() {
  const [logo, setLogo] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('File size should be less than 2MB');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profileData = {
      businessName,
      businessEmail,
      businessPhone,
      businessAddress,
      businessLogo: logo,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/business-profile', // URL for the POST request
        profileData, // Data to send
        {
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
        }
      );

      if (response.status === 200) {
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the profile');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Business Profile Settings</h2>
      <div className="card p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">General Information</h3>

        {/* Logo Upload */}
        <div className="mb-6">
          <label className="block mb-2">Business Logo</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            {logo ? (
              <div className="relative inline-block">
                <img src={logo} alt="Business logo" className="max-w-[200px]" />
                <button
                  onClick={() => setLogo(null)}
                  className="absolute top-0 right-0 p-1 bg-red-500 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Drop your logo here or click to upload</p>
                <p className="text-sm text-gray-500 mt-2">Max size: 2MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Business Details Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Business Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Business Email</label>
            <input
              type="email"
              className="input"
              placeholder="Enter business email"
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Business Phone</label>
            <input
              type="tel"
              className="input"
              placeholder="Enter business phone"
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Business Address</label>
            <textarea
              className="input"
              rows="3"
              placeholder="Enter business address"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusinessProfile;
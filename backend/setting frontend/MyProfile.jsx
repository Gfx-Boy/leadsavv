import React from 'react';
import { User } from 'lucide-react';

function MyProfile() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      
      <div className="card p-6 rounded-lg mb-6">
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>
          </div>
          
          <form className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">First Name</label>
                <input type="text" className="input" placeholder="Enter first name" />
              </div>
              
              <div>
                <label className="block mb-1">Last Name</label>
                <input type="text" className="input" placeholder="Enter last name" />
              </div>
            </div>
            
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" className="input" placeholder="Enter email" />
            </div>
            
            <div>
              <label className="block mb-1">Phone</label>
              <input type="tel" className="input" placeholder="Enter phone number" />
            </div>
            
            <button type="submit" className="btn-primary">
              Update Profile
            </button>
          </form>
        </div>
      </div>

      <div className="card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Current Password</label>
            <input type="password" className="input" placeholder="Enter current password" />
          </div>
          
          <div>
            <label className="block mb-1">New Password</label>
            <input type="password" className="input" placeholder="Enter new password" />
          </div>
          
          <div>
            <label className="block mb-1">Confirm New Password</label>
            <input type="password" className="input" placeholder="Confirm new password" />
          </div>
          
          <button type="submit" className="btn-primary">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;
import React, { useState } from 'react';

const BulkActions = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [progress, setProgress] = useState(0);

  const users = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', lastContact: '2 days ago' },
    { id: 2, name: 'Michael Chen', email: 'm.chen@example.com', lastContact: '5 days ago' },
    { id: 3, name: 'Emma Wilson', email: 'emma.w@example.com', lastContact: '1 week ago' },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBulkAction = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 overflow-y-auto lg:ml-64">
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="pt-16 lg:pt-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-white">Bulk Actions</h1>
            
            <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <select className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full md:w-48">
                  <option>Select Bulk Action</option>
                  <option>Send Email</option>
                  <option>Delete</option>
                  <option>Update Status</option>
                </select>
                <button 
                  onClick={handleBulkAction}
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors w-full md:w-auto"
                >
                  Apply Action
                </button>
              </div>

              {progress > 0 && (
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
                  <div 
                    className="bg-red-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}

              {/* Desktop Table View */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4 text-left">
                        <input 
                          type="checkbox" 
                          onChange={handleSelectAll}
                          checked={selectedUsers.length === users.length}
                          className="rounded bg-gray-700 border-gray-600"
                        />
                      </th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Last Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-3 px-4">
                          <input 
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded bg-gray-700 border-gray-600"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIs3peZbmHi0e-uTv4_RB4RWFfqEzE7BNNSg&s"
                              alt={user.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.lastContact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {users.map(user => (
                  <div key={user.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded bg-gray-700 border-gray-600"
                        />
                        <img 
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIs3peZbmHi0e-uTv4_RB4RWFfqEzE7BNNSg&s"
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span>{user.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span>{user.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Contact:</span>
                        <span>{user.lastContact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;
import React from "react";

const Conversation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="text-center space-y-6">
        {/* Animated Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-text">
          Coming Soon!
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-300">
          We're working hard to bring this feature to you. Stay tuned for updates!
        </p>

        {/* Animated Button */}
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          Notify Me
        </button>
      </div>
    </div>
  );
};

export default Conversation;
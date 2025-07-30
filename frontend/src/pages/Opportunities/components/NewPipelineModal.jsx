import React from 'react';

function NewPipelineModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#2a2a2a] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Create New Pipeline</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pipeline Name</label>
            <input 
              type="text"
              placeholder="Enter pipeline name"
              className="w-full bg-[#1a1a1a] border border-red-900/50 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Stages</label>
            <div className="space-y-2">
              <input 
                type="text"
                placeholder="Stage name"
                className="w-full bg-[#1a1a1a] border border-red-900/50 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
              />
              <button 
                type="button"
                className="w-full px-4 py-2 border-2 border-dashed border-red-900/50 rounded-lg text-red-500 hover:border-red-500 transition"
              >
                Add stage
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-red-900/50 text-red-600 focus:ring-red-500" />
              <span>Visible in Funnel chart</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-red-900/50 text-red-600 focus:ring-red-500" />
              <span>Visible in Pie chart</span>
            </label>
          </div>
          <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-3 mt-6">
            <button 
              type="button"
              className="px-4 py-2 text-gray-400 hover:text-white transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              Create Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPipelineModal;
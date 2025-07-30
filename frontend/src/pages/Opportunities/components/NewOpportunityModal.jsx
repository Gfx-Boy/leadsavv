import React from 'react';

function NewOpportunityModal({ onClose, stages }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#2a2a2a] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Opportunity</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input 
              type="text"
              placeholder="Enter opportunity name"
              className="w-full bg-[#1a1a1a] border border-red-900/50 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              placeholder="Enter opportunity description"
              className="w-full bg-[#1a1a1a] border border-red-900/50 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Value</label>
            <input 
              type="number"
              placeholder="0"
              className="w-full bg-[#1a1a1a] border border-red-900/50 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Stage</label>
            <select className="w-full bg-[#1a1a1a] border border-red-900/50 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500">
              <option>Select a stage</option>
              {stages.map(stage => (
                <option key={stage.id} value={stage.id}>{stage.name}</option>
              ))}
            </select>
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
              Create Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewOpportunityModal;
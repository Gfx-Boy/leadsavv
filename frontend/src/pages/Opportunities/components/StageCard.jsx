import React from 'react';

function StageCard({ stage, opportunities, onClick }) {
  return (
    <div
      className="bg-[#2a2a2a] border border-red-900/50 rounded-lg p-4 cursor-pointer hover:border-red-500 transition"
      onClick={onClick}
    >
      <h3 className="text-lg font-bold text-white">{stage.name}</h3>
      <p className="text-sm text-gray-400">
        {opportunities.length} opportunities
      </p>
      <ul className="mt-2 space-y-2">
        {opportunities.map((opportunity) => (
          <li
            key={opportunity._id}
            className="bg-red-900/20 rounded-lg px-3 py-2 text-sm text-white"
          >
            <div className="font-medium">{opportunity.title}</div>
            <div className="text-gray-400">
              {/* Ensure value is defined before calling toLocaleString */}
              Value: ${opportunity.value?.toLocaleString() || '0'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StageCard;
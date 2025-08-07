import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import axios from 'axios';

function Pipelines() {
  const [pipelines, setPipelines] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newPipeline, setNewPipeline] = useState({
    name: '',
    stages: [{ id: Date.now(), name: '', color: '#6366f1' }], // Default color
    visibleInFunnel: true,
    visibleInPie: true,
  });

  // Fetch pipelines from the backend
  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get('https://api.leadsavvyai.com/api/pipelines', { headers });
        setPipelines(response.data);
      } catch (error) {
        console.error('Error fetching pipelines:', error);
      }
    };

    fetchPipelines();
  }, []);

  // Delete a pipeline
  const handleDeletePipeline = async (_id) => {
    if (!_id) {
      console.error('Pipeline ID is missing');
      return;
    }

    try {
      const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
      const headers = { Authorization: `Bearer ${token}` };

      await axios.delete(`https://api.leadsavvyai.com/api/pipelines/${_id}`, { headers });
      setPipelines(pipelines.filter((pipeline) => pipeline._id !== _id));
    } catch (error) {
      console.error('Error deleting pipeline:', error);
    }
  };

  // Add a new stage to the pipeline
  const handleAddStage = () => {
    setNewPipeline({
      ...newPipeline,
      stages: [...newPipeline.stages, { id: Date.now(), name: '', color: '#6366f1' }],
    });
  };

  // Remove a stage from the pipeline
  const handleRemoveStage = (stageId) => {
    setNewPipeline({
      ...newPipeline,
      stages: newPipeline.stages.filter((stage) => stage.id !== stageId),
    });
  };

  // Update a stage's name or color
  const handleStageChange = (stageId, field, value) => {
    setNewPipeline({
      ...newPipeline,
      stages: newPipeline.stages.map((stage) =>
        stage.id === stageId ? { ...stage, [field]: value } : stage
      ),
    });
  };

  // Create a new pipeline
  const handleAddPipeline = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (newPipeline.name.trim() && newPipeline.stages.every((stage) => stage.name.trim())) {
      try {
        const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
        const headers = { Authorization: `Bearer ${token}` };

        // Format the stages data correctly
        const formattedStages = newPipeline.stages.map((stage) => ({
          name: stage.name.trim(),
          color: stage.color, // Include the color field
        }));

        // Prepare the payload
        const payload = {
          name: newPipeline.name.trim(),
          stages: formattedStages,
          visibleInFunnel: newPipeline.visibleInFunnel,
          visibleInPie: newPipeline.visibleInPie,
        };

        // Send the POST request to create a new pipeline
        const response = await axios.post('https://api.leadsavvyai.com/api/pipelines', payload, { headers });

        // Update the pipelines state with the new pipeline
        setPipelines([...pipelines, response.data]);

        // Reset the form and close the modal
        setNewPipeline({
          name: '',
          stages: [{ id: Date.now(), name: '', color: '#6366f1' }],
          visibleInFunnel: true,
          visibleInPie: true,
        });
        setShowAddModal(false);
      } catch (error) {
        console.error('Error creating pipeline:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Pipelines</h2>
        <button
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition w-full md:w-auto justify-center"
          onClick={() => setShowAddModal(true)}
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create new pipeline</span>
        </button>
      </div>

      <div className="bg-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50">
              <tr>
                <th className="text-left px-4 md:px-6 py-4">NAME</th>
                <th className="text-left px-4 md:px-6 py-4">STAGES</th>
                <th className="text-right px-4 md:px-6 py-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {pipelines.map((pipeline) => (
                <tr key={pipeline._id} className="border-t border-red-900/20">
                  <td className="px-4 md:px-6 py-4">{pipeline.name}</td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {pipeline.stages.map((stage) => (
                        <span
                          key={stage._id}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: `${stage.color}20`, color: stage.color }}
                        >
                          {stage.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeletePipeline(pipeline._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-white">Create New Pipeline</h3>
            <form onSubmit={handleAddPipeline} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Pipeline Name</label>
                <input
                  type="text"
                  value={newPipeline.name}
                  onChange={(e) => setNewPipeline({ ...newPipeline, name: e.target.value })}
                  placeholder="Enter pipeline name"
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Stages</label>
                {newPipeline.stages.map((stage) => (
                  <div key={stage.id} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={stage.name}
                      onChange={(e) => handleStageChange(stage.id, 'name', e.target.value)}
                      placeholder="Stage name"
                      className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                      required
                    />
                    <input
                      type="color"
                      value={stage.color}
                      onChange={(e) => handleStageChange(stage.id, 'color', e.target.value)}
                      className="w-10 h-10 border-none"
                    />
                    {newPipeline.stages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStage(stage.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddStage}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors"
                >
                  Add Stage
                </button>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Create Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pipelines;
import React, { useState, useEffect } from 'react';
import { PlusCircle, Grid } from 'lucide-react';
import axios from 'axios';

function Opportunities() {
  const [pipelines, setPipelines] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState('');
  const [opportunities, setOpportunities] = useState({});
  const [selectedStage, setSelectedStage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({
    name: '',
    description: '',
    value: 0,
    stage: '',
  });

  // Fetch pipelines from the backend
  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get('https://api.leadsavvyai.com/api/pipelines', { headers });
        setPipelines(response.data);
        if (response.data.length > 0) {
          setSelectedPipeline(response.data[0].name);
        }
      } catch (error) {
        console.error('Error fetching pipelines:', error);
      }
    };

    fetchPipelines();
  }, []);

  // Pre-fetch opportunities for all stages when a pipeline is selected
  useEffect(() => {
    const fetchOpportunities = async () => {
      if (!selectedPipeline) return;

      try {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const pipeline = pipelines.find((p) => p.name === selectedPipeline);
        if (!pipeline) return;

        const opportunitiesByStage = {};

        await Promise.all(
          pipeline.stages.map(async (stage) => {
            const response = await axios.get(
              `https://api.leadsavvyai.com/api/opportunities/${pipeline._id}/${stage._id}/opportunities`,
              { headers }
            );
            opportunitiesByStage[stage._id] = response.data;
          })
        );

        setOpportunities(opportunitiesByStage);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
  }, [selectedPipeline, pipelines]);

  // Handle opening the "Add Opportunity" modal
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  // Handle closing the "Add Opportunity" modal
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewOpportunity({
      name: '',
      description: '',
      value: 0,
      stage: '',
    });
  };

  // Handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOpportunity({
      ...newOpportunity,
      [name]: value,
    });
  };

  // Handle adding a new opportunity
  const handleAddOpportunity = async () => {
    if (!newOpportunity.name.trim() || !newOpportunity.stage.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const pipeline = pipelines.find((p) => p.name === selectedPipeline);
      if (!pipeline) {
        alert('Pipeline not found.');
        return;
      }

      const stage = pipeline.stages.find((s) => s.name === newOpportunity.stage);
      if (!stage) {
        alert('Stage not found in the selected pipeline.');
        return;
      }

      const pipelineId = pipeline._id;
      const stageId = stage._id;

      const response = await axios.post(
        `https://api.leadsavvyai.com/api/opportunities/${pipelineId}/${stageId}/opportunities`,
        {
          title: newOpportunity.name,
          description: newOpportunity.description || '',
          value: newOpportunity.value || 0,
          status: 'Open',
        },
        { headers }
      );

      setOpportunities((prev) => ({
        ...prev,
        [stageId]: [...(prev[stageId] || []), response.data],
      }));
      handleCloseAddModal();
    } catch (error) {
      console.error('Error creating opportunity:', error);
      alert('Failed to create opportunity. Please try again.');
    }
  };

  // Handle selecting a stage
  const handleStageClick = (stageId) => {
    setSelectedStage(stageId === selectedStage ? null : stageId);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="w-full md:w-auto">
          <select
            className="w-full md:w-64 bg-[#2a2a2a] border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
            value={selectedPipeline}
            onChange={(e) => setSelectedPipeline(e.target.value)}
          >
            {pipelines.map((pipeline) => (
              <option key={pipeline._id} value={pipeline.name}>
                {pipeline.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg hover:bg-red-900/50 transition">
            <Grid className="h-5 w-5 text-red-500" />
          </button>
          <button
            className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            onClick={handleOpenAddModal}
          >
            <PlusCircle className="h-5 w-5" />
            <span className="hidden md:inline">Add opportunity</span>
            <span className="md:hidden">Add</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pipelines
          .find((p) => p.name === selectedPipeline)
          ?.stages.map((stage) => (
            <div
              key={stage._id}
              className={`border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-red-500 transition ${
                selectedStage === stage._id ? 'border-red-500' : ''
              }`}
              onClick={() => handleStageClick(stage._id)}
            >
              <div className="stage-header">
                <div
                  className="stage-indicator w-4 h-4 rounded-full"
                  style={{ backgroundColor: stage.color }}
                ></div>
                <h3 className="stage-title text-lg font-bold text-white">{stage.name}</h3>
              </div>
              <div className="stage-stats text-sm text-gray-400 mt-2">
                <div>{opportunities[stage._id]?.length || 0} Opportunities</div>
                <div>
                  Rs{' '}
                  {opportunities[stage._id]
                    ?.reduce((sum, opp) => sum + (opp.value || 0), 0)
                    .toLocaleString() || 0}
                </div>
              </div>
            </div>
          ))}
      </div>

      {selectedStage && (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-white mb-4">Opportunities in Selected Stage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities[selectedStage]?.map((opportunity) => (
              <div
                key={opportunity._id}
                className="bg-[#2a2a2a] border border-red-900/50 rounded-lg p-4"
              >
                <div className="font-bold text-white">{opportunity.title}</div>
                <div className="text-gray-400">{opportunity.description}</div>
                <div className="text-gray-400">
                  Value: Rs {(opportunity.value || 0).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-white">Add New Opportunity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newOpportunity.name}
                  onChange={handleInputChange}
                  placeholder="Enter opportunity name"
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newOpportunity.description}
                  onChange={handleInputChange}
                  placeholder="Enter opportunity description"
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Value</label>
                <input
                  type="number"
                  name="value"
                  value={newOpportunity.value}
                  onChange={handleInputChange}
                  placeholder="Enter opportunity value"
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Stage</label>
                <select
                  name="stage"
                  value={newOpportunity.stage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                >
                  <option value="">Select a stage</option>
                  {pipelines
                    .find((p) => p.name === selectedPipeline)
                    ?.stages.map((stage) => (
                      <option key={stage._id} value={stage.name}>
                        {stage.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCloseAddModal}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOpportunity}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Add Opportunity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Opportunities;
import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { usePipelines } from '../context/PipelineContext'

function Pipelines() {
  const { pipelines, setPipelines } = usePipelines()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [newPipeline, setNewPipeline] = useState({
    name: '',
    stages: [
      { id: Date.now(), name: '', color: '#6366f1' }
    ],
    visibleInFunnel: true,
    visibleInPie: true
  })

  const handleAddStage = () => {
    setNewPipeline({
      ...newPipeline,
      stages: [...newPipeline.stages, { id: Date.now(), name: '', color: '#6366f1' }]
    })
  }

  const handleRemoveStage = (stageId) => {
    setNewPipeline({
      ...newPipeline,
      stages: newPipeline.stages.filter(stage => stage.id !== stageId)
    })
  }

  const handleStageChange = (stageId, field, value) => {
    setNewPipeline({
      ...newPipeline,
      stages: newPipeline.stages.map(stage =>
        stage.id === stageId ? { ...stage, [field]: value } : stage
      )
    })
  }

  const handleAddPipeline = () => {
    if (newPipeline.name.trim() && newPipeline.stages.every(stage => stage.name.trim())) {
      setPipelines([
        ...pipelines,
        {
          id: Date.now(),
          ...newPipeline,
          stages: newPipeline.stages.map(stage => ({
            ...stage,
            name: stage.name.trim()
          }))
        }
      ])
      setNewPipeline({
        name: '',
        stages: [{ id: Date.now(), name: '', color: '#6366f1' }],
        visibleInFunnel: true,
        visibleInPie: true
      })
      setShowAddModal(false)
    }
  }

  const handleEditPipeline = (id, newName) => {
    setPipelines(
      pipelines.map((pipeline) =>
        pipeline.id === id ? { ...pipeline, name: newName } : pipeline
      )
    )
    setEditingId(null)
  }

  const handleDeletePipeline = (id) => {
    setPipelines(pipelines.filter((pipeline) => pipeline.id !== id))
  }

  return (
    <div>
      <div className="header-controls">
        <h2 className="nav-title">Pipelines</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="button button-primary"
        >
          <PlusIcon className="icon" />
          <span>Create new pipeline</span>
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Stages</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pipelines.map((pipeline) => (
              <tr key={pipeline.id}>
                <td>
                  {editingId === pipeline.id ? (
                    <input
                      type="text"
                      value={pipeline.name}
                      onChange={(e) =>
                        setPipelines(
                          pipelines.map((p) =>
                            p.id === pipeline.id
                              ? { ...p, name: e.target.value }
                              : p
                          )
                        )
                      }
                      onBlur={() => handleEditPipeline(pipeline.id, pipeline.name)}
                      className="modal-input"
                      style={{ margin: 0 }}
                      autoFocus
                    />
                  ) : (
                    pipeline.name
                  )}
                </td>
                <td>
                  <div className="stage-pills">
                    {pipeline.stages.map((stage, index) => (
                      <span 
                        key={stage.id} 
                        className="stage-pill"
                        style={{ backgroundColor: stage.color }}
                      >
                        {stage.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => setEditingId(pipeline.id)}
                    className="button button-secondary"
                    style={{ marginRight: '0.5rem' }}
                  >
                    <PencilIcon className="icon" />
                  </button>
                  <button
                    onClick={() => handleDeletePipeline(pipeline.id)}
                    className="button button-secondary"
                  >
                    <TrashIcon className="icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Create New Pipeline</h3>
            </div>
            
            <div className="form-group">
              <label>Pipeline Name</label>
              <input
                type="text"
                value={newPipeline.name}
                onChange={(e) => setNewPipeline({ ...newPipeline, name: e.target.value })}
                placeholder="Enter pipeline name"
                className="modal-input"
              />
            </div>

            <div className="form-group">
              <label>Stages</label>
              {newPipeline.stages.map((stage, index) => (
                <div key={stage.id} className="stage-row">
                  <input
                    type="text"
                    value={stage.name}
                    onChange={(e) => handleStageChange(stage.id, 'name', e.target.value)}
                    placeholder="Stage name"
                    className="modal-input"
                  />
                  <input
                    type="color"
                    value={stage.color}
                    onChange={(e) => handleStageChange(stage.id, 'color', e.target.value)}
                    className="color-picker"
                  />
                  {newPipeline.stages.length > 1 && (
                    <button
                      onClick={() => handleRemoveStage(stage.id)}
                      className="button button-secondary"
                    >
                      <TrashIcon className="icon" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddStage}
                className="button button-secondary add-stage-btn"
              >
                <PlusIcon className="icon" />
                Add stage
              </button>
            </div>

            <div className="visibility-options">
              <div className="visibility-option">
                <label>
                  <input
                    type="checkbox"
                    checked={newPipeline.visibleInFunnel}
                    onChange={(e) => setNewPipeline({ ...newPipeline, visibleInFunnel: e.target.checked })}
                  />
                  Visible in Funnel chart
                </label>
              </div>
              <div className="visibility-option">
                <label>
                  <input
                    type="checkbox"
                    checked={newPipeline.visibleInPie}
                    onChange={(e) => setNewPipeline({ ...newPipeline, visibleInPie: e.target.checked })}
                  />
                  Visible in Pie chart
                </label>
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setNewPipeline({
                    name: '',
                    stages: [{ id: Date.now(), name: '', color: '#6366f1' }],
                    visibleInFunnel: true,
                    visibleInPie: true
                  })
                }}
                className="button button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPipeline}
                className="button button-primary"
                disabled={!newPipeline.name.trim() || !newPipeline.stages.every(stage => stage.name.trim())}
              >
                Create Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pipelines
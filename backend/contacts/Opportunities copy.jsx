import { useState } from 'react'
import {
  FunnelIcon,
  ListBulletIcon,
  Squares2X2Icon,
  ArrowDownTrayIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import { usePipelines } from '../context/PipelineContext'

function Opportunities() {
  const { pipelines } = usePipelines()
  const [viewType, setViewType] = useState('grid')
  const [selectedPipeline, setSelectedPipeline] = useState(pipelines[0]?.name || '')

  return (
    <div>
      <div className="header-controls">
        <div className="button-group">
          <select
            value={selectedPipeline}
            onChange={(e) => setSelectedPipeline(e.target.value)}
            className="pipeline-select"
          >
            {pipelines.map((pipeline) => (
              <option key={pipeline.id} value={pipeline.name}>
                {pipeline.name}
              </option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button
            className={`button button-secondary ${viewType === 'grid' ? 'active' : ''}`}
            onClick={() => setViewType('grid')}
          >
            <Squares2X2Icon className="icon" />
          </button>
          <button
            className={`button button-secondary ${viewType === 'list' ? 'active' : ''}`}
            onClick={() => setViewType('list')}
          >
            <ListBulletIcon className="icon" />
          </button>
          <button className="button button-secondary">
            <ArrowDownTrayIcon className="icon" />
            <span>Import</span>
          </button>
          <button className="button button-primary">
            <PlusIcon className="icon" />
            <span>Add opportunity</span>
          </button>
        </div>
      </div>

      <div className="button-group" style={{ marginBottom: '2rem' }}>
        <button className="button button-secondary">
          <FunnelIcon className="icon" />
          <span>Advanced Filters</span>
        </button>
        <button className="button button-secondary">
          <span>Sort (1)</span>
        </button>
      </div>

      <div className="stages-grid">
        {pipelines.find(p => p.name === selectedPipeline)?.stages.map((stage) => (
          <div key={stage.id} className="stage-card">
            <div className="stage-header">
              <div
                className="stage-indicator"
                style={{ backgroundColor: stage.color }}
              ></div>
              <h3 className="stage-title">{stage.name}</h3>
            </div>
            <div className="stage-stats">
              <div>0 Opportunities</div>
              <div>Rs0.00</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Opportunities
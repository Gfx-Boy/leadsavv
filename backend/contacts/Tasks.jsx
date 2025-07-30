import React, { useState } from 'react';

function Tasks() { // Remove contacts prop
  const [tasks, setTasks] = useState([]);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    recurring: false,
    contact: '',
    assignee: ''
  });
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Mock data for contacts
  const mockContacts = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' }
  ];

  const handleNewTaskClick = () => {
    setIsTaskPopupOpen(true);
  };

  const handleTaskInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask({ ...newTask, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      recurring: false,
      contact: '',
      assignee: ''
    });
    setIsTaskPopupOpen(false);
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prevSelectedTasks =>
      prevSelectedTasks.includes(taskId)
        ? prevSelectedTasks.filter(id => id !== taskId)
        : [...prevSelectedTasks, taskId]
    );
  };

  const handleBulkAction = (action) => {
    // Implement bulk action logic here
    console.log(`Performing ${action} on tasks:`, selectedTasks);
  };

  return (
    <div className="page-content">
      <div className="tasks-header">
        <h2>Task List</h2>
        <button className="new-task-btn" onClick={handleNewTaskClick}>+ New Task</button>
      </div>
      <div className="tasks-filters">
        <input type="text" placeholder="Search by task name" className="task-search" />
        <select className="task-filter">
          <option>Contact</option>
        </select>
        <select className="task-filter">
          <option>Assignee</option>
        </select>
        <select className="task-filter">
          <option>Status</option>
        </select>
        <select className="task-filter">
          <option>Due Date (DESC)</option>
        </select>
        <select className="bulk-actions" onChange={(e) => handleBulkAction(e.target.value)}>
          <option value="">Bulk Actions</option>
          <option value="delete">Delete</option>
          <option value="complete">Mark as Complete</option>
        </select>
      </div>
      <div className="tasks-table">
        <div className="table-header">
          <span>Select</span>
          <span>Name & Description</span>
          <span>Contact</span>
          <span>Assignee</span>
          <span>Due Date</span>
          <span>Status</span>
        </div>
        {tasks.map(task => (
          <div key={task.id} className="table-row">
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={() => handleTaskSelect(task.id)}
            />
            <span>{task.title}</span>
            <span>{task.contact}</span>
            <span>{task.assignee}</span>
            <span>{task.dueDate}</span>
            <span>{task.recurring ? 'Yes' : 'No'}</span>
          </div>
        ))}
      </div>

      {isTaskPopupOpen && (
        <div className="popup-overlay" onClick={() => setIsTaskPopupOpen(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={() => setIsTaskPopupOpen(false)}>✖</button>
            <form className="add-task-form" onSubmit={handleAddTask}>
              <h2>Add New Task</h2>
              <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleTaskInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleTaskInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Due Date and Time</label>
                <input
                  type="datetime-local"
                  id="dueDate"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleTaskInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="recurring">Recurring Task</label>
                <input
                  type="checkbox"
                  id="recurring"
                  name="recurring"
                  checked={newTask.recurring}
                  onChange={handleTaskInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact">Select Contact</label>
                <select
                  id="contact"
                  name="contact"
                  value={newTask.contact}
                  onChange={handleTaskInputChange}
                  required
                >
                  <option value="">Select Contact</option>
                  {mockContacts.map(contact => (
                    <option key={contact.id} value={contact.name}>{contact.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="assignee">Assign To</label>
                <select
                  id="assignee"
                  name="assignee"
                  value={newTask.assignee}
                  onChange={handleTaskInputChange}
                  required
                >
                  <option value="">Assign To</option>
                  {mockContacts.map(contact => (
                    <option key={contact.id} value={contact.name}>{contact.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-btn">Add Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, ChevronDown, CheckSquare } from 'lucide-react';
import { Check, Calendar, Trash2 } from 'lucide-react';
export function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    dueDate: new Date().toISOString().split('T')[0],
  });
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isUpdateDateModalOpen, setIsUpdateDateModalOpen] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);
const [newDueDate, setNewDueDate] = useState('');
  useEffect(() => {
    const fetchTasks = async () => {
      const token = sessionStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await axios.get('http://31.97.41.27:5005/api/tasks', { headers });
        setTasks(response.data);
        setFilteredTasks(response.data); // Initialize filtered tasks
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
  const handleMarkAsDone = async (taskId) => {
    const token = sessionStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    try {
      await axios.put(`http://31.97.41.27:5005/api/tasks/${taskId}/done`, {}, { headers });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: 'Completed' } : task
        )
      );
      setFilteredTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: 'Completed' } : task
        )
      );
      alert('Task marked as done!');
    } catch (error) {
      console.error('Error marking task as done:', error);
      alert('Failed to mark task as done.');
    }
  };
  const handleUpdateDueDate = async (taskId, newDueDate) => {
    const token = sessionStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  
    try {
      await axios.put(
        `http://31.97.41.27:5005/api/tasks/${taskId}/due-date`,
        { dueDate: newDueDate },
        { headers }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, dueDate: newDueDate } : task
        )
      );
      setFilteredTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, dueDate: newDueDate } : task
        )
      );
      alert('Due date updated successfully!');
    } catch (error) {
      console.error('Error updating due date:', error);
      alert('Failed to update due date.');
    }
  };
  const fetchTasksByDueDate = async () => {
    const token = sessionStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    try {
      const response = await axios.get('http://31.97.41.27:5005/api/tasks/due-date', { headers });
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks by due date:', error);
      alert('Failed to fetch tasks by due date.');
    }
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  const handleStatusChange = async (taskId, newStatus) => {
    if (newStatus === 'In Progress') {
      const confirmUpdate = window.confirm('Do you want to change the status to "In Progress"?');
      if (!confirmUpdate) return;
  
      const token = sessionStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  
      try {
        await axios.put(`http://31.97.41.27:5005/api/tasks/${taskId}/in-progress`, {}, { headers });
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: 'In Progress' } : task
          )
        );
        setFilteredTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: 'In Progress' } : task
          )
        );
        alert('Task status updated to "In Progress" successfully!');
      } catch (error) {
        console.error('Error updating task status:', error);
        alert('Failed to update task status.');
      }
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterText(query);

    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query)
    );
    setFilteredTasks(filtered);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);

    if (status === 'All Status') {
      setFilteredTasks(tasks); // Show all tasks if no filter is selected
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  const handleSortChange = (sortField) => {
    setSortBy(sortField);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    try {
      const response = await axios.post('http://31.97.41.27:5005/api/tasks', newTask, { headers });
      setTasks([...tasks, response.data]); // Add the new task to the list
      setFilteredTasks([...tasks, response.data]); // Update filtered tasks
      setNewTask({
        title: '',
        description: '',
        status: 'To Do',
        dueDate: new Date().toISOString().split('T')[0],
      }); // Reset the form
      setIsNewTaskModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    const token = sessionStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.delete(`http://31.97.41.27:5005/api/tasks/${taskId}`, { headers });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Remove the task from the list
      setFilteredTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Update filtered tasks
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'To Do':
        return 'bg-blue-500/10 text-blue-500';
      case 'Completed':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const filteredAndSortedTasks = filteredTasks.sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'dueDate':
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        comparison = dateA.getTime() - dateB.getTime();
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <CheckSquare size={32} className="text-indigo-500" />
        <h2 className="text-3xl font-bold text-white">Tasks</h2>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex-1 w-full lg:max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={filterText}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors w-full lg:w-auto justify-center"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-4">Task Title</th>
                <th className="pb-4">Due Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTasks.map((task) => (
                <tr key={task._id} className="border-b border-gray-700">
                  <td className="py-4">
                    <div className="font-medium text-white">{task.title}</div>
                    <div className="text-sm text-gray-400">{task.description}</div>
                  </td>
                  <td className="py-4 text-gray-300">{formatDate(task.dueDate)}</td>
                  <td className="py-4">
  <select
    value={task.status}
    onChange={(e) => handleStatusChange(task._id, e.target.value)}
    className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed" disabled>Completed</option>
  </select>
</td>
                  <td className="py-4">
                  <button
    onClick={() => handleMarkAsDone(task._id)}
    className="text-green-500 hover:text-green-700 transition-colors"
    title="Mark as Done"
  >
    <Check className="w-5 h-5" />
  </button>

  {/* Update Due Date */}
  <button
  onClick={() => {
    setSelectedTask(task);
    setNewDueDate(task.dueDate); // Pre-fill the current due date
    setIsUpdateDateModalOpen(true);
  }}
  className="text-blue-500 hover:text-blue-700 transition-colors"
  title="Update Due Date"
>
  <Calendar className="w-5 h-5" />
</button>

  {/* Delete Task */}
  <button
    onClick={() => handleDeleteTask(task._id)}
    className="text-red-500 hover:text-red-700 transition-colors"
    title="Delete Task"
  >
    <Trash2 className="w-5 h-5" />
  </button>
                  </td>
        
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isUpdateDateModalOpen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4 text-white">Update Due Date</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateDueDate(selectedTask._id, newDueDate);
          setIsUpdateDateModalOpen(false); // Close the modal
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">New Due Date</label>
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            required
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => setIsUpdateDateModalOpen(false)}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {isNewTaskModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-white">Create New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white h-24"
                  placeholder="Enter task description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Status</label>
                <select
                  name="status"
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
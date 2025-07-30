import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Undo } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek, isToday } from 'date-fns';
import axios from '../utils/axios'; // Import Axios instance with token

interface Meeting {
  _id: string;
  title: string;
  date: string; // ISO string format
  startTime: string;
  duration: number;
  email: string;
  isCancelled: boolean; // New property to track canceled meetings
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    duration: 30,
    email: '',
  });
  const [showCancelReason, setShowCancelReason] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  // Fetch meetings from the backend
  const fetchMeetings = async () => {
    try {
      const response = await axios.get('/meeting');
      setMeetings(response.data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      alert('Failed to fetch meetings. Please try again.');
    }
  };

  // Add a new meeting
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate date is not in the past
    const eventDate = new Date(`${newEvent.date}T${newEvent.startTime}`);
    if (eventDate < new Date()) {
      alert('Cannot schedule meetings in the past.');
      return;
    }

    try {
      const response = await axios.post('/meeting', newEvent);
      setMeetings([...meetings, response.data]);
      setShowAddEvent(false);
      setNewEvent({
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        startTime: '09:00',
        duration: 30,
        email: '',
      });
      alert('Meeting added successfully!');
    } catch (error) {
      console.error('Error adding meeting:', error);
      alert('Failed to add meeting. Please try again.');
    }
  };

  // Cancel a meeting
  const handleCancelMeeting = async (meeting: Meeting) => {
    try {
      await axios.put(`/meeting/${meeting._id}/cancel`, { reason: cancelReason });
      setMeetings(
        meetings.map((m) =>
          m._id === meeting._id ? { ...m, isCancelled: true } : m
        )
      );
      setShowCancelReason(false);
      setCancelReason('');
      alert('Meeting canceled successfully!');
    } catch (error) {
      console.error('Error canceling meeting:', error);
      alert('Failed to cancel meeting. Please try again.');
    }
  };

  // Restore a canceled meeting
  const handleRestoreMeeting = async (meeting: Meeting) => {
    try {
      const response = await axios.put(`/meeting/${meeting._id}/restore`);
      setMeetings(
        meetings.map((m) =>
          m._id === meeting._id ? { ...response.data, isCancelled: false } : m
        )
      );
      alert('Meeting restored successfully!');
    } catch (error) {
      console.error('Error restoring meeting:', error);
      alert('Failed to restore meeting. Please try again.');
    }
  };

  // Get days in the current month
  const getDaysInMonth = () => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  };

  const getEventsForDay = (day: Date) => {
    return meetings.filter(
      (meeting) => isSameDay(new Date(meeting.date), day) && !meeting.isCancelled
    );
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className="flex-1 p-4 bg-gray-900">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-700 rounded-full text-gray-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-700 rounded-full text-gray-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowAddEvent(true)}
            className="w-full md:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Event</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-7 gap-px bg-gray-700">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="bg-gray-800 py-2 text-center text-sm font-medium text-gray-400"
                >
                  {day}
                </div>
              ))}

              {getDaysInMonth().map((day) => {
                const dayEvents = getEventsForDay(day);
                return (
                  <div
                    key={day.toString()}
                    className={`relative bg-gray-800 min-h-[100px] md:min-h-[120px] p-2 ${
                      isToday(day) ? 'bg-blue-600 text-white' : 'text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-center h-6 w-6 rounded-full">
                      {format(day, 'd')}
                    </div>

                    <div className="mt-2 space-y-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event._id}
                          className="bg-blue-500 text-white text-xs p-1 rounded truncate cursor-pointer"
                        >
                          {event.startTime} - {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-white mb-4">Upcoming Meetings</h3>
        {meetings.length === 0 ? (
          <p className="text-gray-400">No upcoming meetings.</p>
        ) : (
          <ul className="space-y-4">
            {meetings.map((meeting) => (
              <li
                key={meeting._id}
                className={`flex justify-between items-center bg-gray-700 p-4 rounded-lg ${
                  meeting.isCancelled ? 'opacity-50' : ''
                }`}
              >
                <div>
                  <h4 className="text-white font-semibold">{meeting.title}</h4>
                  <p className="text-gray-400">
                    {format(new Date(`${meeting.date}T${meeting.startTime}`), 'EEEE, MMMM d, yyyy')} at {meeting.startTime} ({meeting.duration} min)
                  </p>
                  <p className="text-gray-400">Email: {meeting.email}</p>
                </div>
                {meeting.isCancelled ? (
                  <button
                    onClick={() => handleRestoreMeeting(meeting)}
                    className="text-green-500 hover:text-green-400"
                  >
                    <Undo className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedMeeting(meeting);
                      setShowCancelReason(true);
                    }}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {showCancelReason && selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <button
              onClick={() => setShowCancelReason(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Cancel Meeting</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCancelMeeting(selectedMeeting);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Reason for Cancellation</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter reason for cancellation"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCancelReason(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Confirm Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <button
              onClick={() => setShowAddEvent(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Add New Meeting</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Start Time</label>
                <input
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({ ...newEvent, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={newEvent.email}
                  onChange={(e) => setNewEvent({ ...newEvent, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddEvent(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  startOfWeek,
  endOfWeek,
  isToday,
  setMonth,
  setYear,
} from 'date-fns';
import { FaChevronLeft, FaChevronRight, FaClock, FaVideo, FaEnvelope, FaTimes, FaUndo } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import './Calendar.css';

function Calendar() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showMeetingDetails, setShowMeetingDetails] = useState(null);
  const [viewMode, setViewMode] = useState('month');
  const [isMobile, setIsMobile] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showCancelReason, setShowCancelReason] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [pendingMeetings, setPendingMeetings] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    duration: 30,
    email: '',
  });

  // Axios configuration
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Fetch meetings from the backend
  const fetchMeetings = async () => {
    try {
      const response = await axiosInstance.get('meeting');
      setMeetings(response.data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      toast.error('Failed to fetch meetings');
    }
  };

  // Fetch meetings on component mount
  useEffect(() => {
    fetchMeetings();
  }, []);

  // Filter meetings based on the active tab
  useEffect(() => {
    let filtered = [];
    switch (activeTab) {
      case 'today':
        filtered = meetings.filter((meeting) => isSameDay(new Date(meeting.date), new Date()));
        break;
      case 'upcoming':
        filtered = meetings.filter((meeting) => new Date(meeting.date) > new Date());
        break;
      case 'pending':
        filtered = pendingMeetings;
        break;
      case 'all':
        filtered = meetings;
        break;
      default:
        filtered = meetings;
    }
    setFilteredMeetings(filtered);
  }, [activeTab, meetings, pendingMeetings]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get days in the current month
  const getDaysInMonth = () => {
    const start = startOfWeek(startOfMonth(selectedDate));
    const end = endOfWeek(endOfMonth(selectedDate));
    return eachDayOfInterval({ start, end });
  };

  // Handle adding a new meeting
  const handleAddEvent = async (e) => {
    e.preventDefault();

    // Validate date is not in the past
    const eventDate = new Date(`${newEvent.date}T${newEvent.startTime}`);
    if (eventDate < new Date()) {
      toast.error('Cannot schedule meetings in the past');
      return;
    }

    try {
      const response = await axiosInstance.post('meeting', newEvent);
      setMeetings([...meetings, response.data]);
      setShowAddEvent(false);
      setNewEvent({
        title: '',
        date: format(selectedDate, 'yyyy-MM-dd'),
        startTime: '09:00',
        duration: 30,
        email: '',
      });
      toast.success('Event added successfully!');
    } catch (error) {
      console.error('Error adding meeting:', error);
      toast.error('Failed to add meeting');
    }
  };

  // Handle deleting a meeting
  const handleDeleteMeeting = async (id) => {
    try {
      await axiosInstance.delete(`meeting/${id}`);
      const meetingToDelete = meetings.find((meeting) => meeting.id === id);
      setPendingMeetings([...pendingMeetings, meetingToDelete]);
      setMeetings(meetings.filter((meeting) => meeting.id !== id));
      setShowMeetingDetails(null);
      toast.success('Meeting cancelled successfully');
    } catch (error) {
      console.error('Error deleting meeting:', error);
      toast.error('Failed to cancel meeting');
    }
  };

  // Handle restoring a meeting
  const handleRestoreMeeting = async (id) => {
    try {
      const meetingToRestore = pendingMeetings.find((meeting) => meeting.id === id);
      const response = await axiosInstance.post('meeting', meetingToRestore);
      setMeetings([...meetings, response.data]);
      setPendingMeetings(pendingMeetings.filter((meeting) => meeting.id !== id));
      toast.success('Meeting restored successfully');
    } catch (error) {
      console.error('Error restoring meeting:', error);
      toast.error('Failed to restore meeting');
    }
  };

  // Handle canceling a meeting with a reason
  const handleCancelMeeting = async (e) => {
    e.preventDefault();
    if (cancelReason.trim() === '') {
      toast.error('Please provide a reason for cancellation');
      return;
    }
    await handleDeleteMeeting(showMeetingDetails.id);
    setShowCancelReason(false);
    setCancelReason('');
  };

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tab button component
  const TabButton = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`tab-button ${activeTab === tab ? 'active' : ''}`}
    >
      {label}
    </button>
  );

  return (
    <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1E1E1E',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        />
        <div className="header">
          <div className="tabs">
            <TabButton tab="today" label="Today" />
            <TabButton tab="upcoming" label="Upcoming" />
            <TabButton tab="pending" label="Pending" />
            <TabButton tab="all" label="All" />
            <TabButton tab="restore" label="Restore" />
          </div>
          {isMobile && (
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="btn btn-primary"
            >
              {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
            </button>
          )}
        </div>

        <div className="main-grid">
          <div className="timeline">
            {activeTab === 'restore' ? (
              pendingMeetings.length === 0 ? (
                <div className="empty-state">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="empty-state-title">No Cancelled Meetings</h3>
                  <p>There are no meetings to restore</p>
                </div>
              ) : (
                <div>
                  {pendingMeetings.map((meeting) => (
                    <div key={meeting.id} className="pending-meeting-card">
                      <div className="pending-meeting-title">{meeting.title}</div>
                      <div className="pending-meeting-info">
                        <div className="pending-meeting-info-item">
                          <FaClock className="w-4 h-4" />
                          {meeting.startTime} ({meeting.duration} min)
                        </div>
                        <div className="pending-meeting-info-item">
                          <FaEnvelope className="w-4 h-4" />
                          {meeting.email}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRestoreMeeting(meeting.id)}
                        className="btn btn-restore"
                      >
                        <FaUndo className="w-4 h-4" /> Restore
                      </button>
                    </div>
                  ))}
                </div>
              )
            ) : (
              filteredMeetings.length === 0 ? (
                <div className="empty-state">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="empty-state-title">No Upcoming Events</h3>
                  <p>Click "Add Event" to schedule a new meeting</p>
                </div>
              ) : (
                <div>
                  {filteredMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      onClick={() => setShowMeetingDetails(meeting)}
                      className="meeting-card"
                    >
                      <div className="meeting-title">{meeting.title}</div>
                      <div className="meeting-info">
                        <div className="meeting-info-item">
                          <FaClock className="w-4 h-4" />
                          {format(new Date(`${meeting.date}T${meeting.startTime}`), 'EEEE, MMMM d, yyyy')} at {meeting.startTime} ({meeting.duration} min)
                        </div>
                        <div className="meeting-info-item">
                          <FaEnvelope className="w-4 h-4" />
                          {meeting.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          {(!isMobile || showCalendar) && (
            <div className="calendar">
              <div className="calendar-header">
                <div className="view-buttons">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`view-button ${viewMode === 'month' ? 'active' : ''}`}
                  >
                    MONTH
                  </button>
                </div>
                <div className="calendar-nav">
                  <button onClick={() => setSelectedDate(subMonths(selectedDate, 12))}>
                    <FaChevronLeft className="w-5 h-5" />
                  </button>
                  <span onClick={() => setShowYearDropdown(!showYearDropdown)} className="cursor-pointer">
                    {format(selectedDate, 'yyyy')}
                  </span>
                  <button onClick={() => setSelectedDate(addMonths(selectedDate, 12))}>
                    <FaChevronRight className="w-5 h-5" />
                  </button>
                  {showYearDropdown && (
                    <div className="dropdown">
                      {[...Array(10)].map((_, i) => {
                        const year = new Date().getFullYear() - 5 + i;
                        return (
                          <div key={year} onClick={() => setSelectedDate(setYear(selectedDate, year))} className="dropdown-item">
                            {year}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="calendar-header">
                <button onClick={() => setSelectedDate(subMonths(selectedDate, 1))}>
                  <FaChevronLeft className="w-5 h-5" />
                </button>
                <span onClick={() => setShowMonthDropdown(!showMonthDropdown)} className="cursor-pointer">
                  {format(selectedDate, 'MMMM yyyy')}
                </span>
                <button onClick={() => setSelectedDate(addMonths(selectedDate, 1))}>
                  <FaChevronRight className="w-5 h-5" />
                </button>
                {showMonthDropdown && (
                  <div className="dropdown">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} onClick={() => setSelectedDate(setMonth(new Date(), i))} className="dropdown-item">
                        {format(setMonth(new Date(), i), 'MMMM')}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="calendar-day-header">{day}</div>
                ))}
              </div>

              <div className="calendar-grid">
                {getDaysInMonth().map((day, i) => {
                  const isCurrentMonth = format(day, 'M') === format(selectedDate, 'M');
                  const hasEvent = meetings.some((m) => m.date === format(day, 'yyyy-MM-dd'));
                  const dayClasses = [
                    'calendar-day',
                    !isCurrentMonth && 'other-month',
                    isSameDay(day, selectedDate) && 'selected',
                    hasEvent && 'has-event',
                    isToday(day) && !isSameDay(day, selectedDate) && 'today',
                  ].filter(Boolean).join(' ');

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(day)}
                      className={dayClasses}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setShowAddEvent(true);
                  setNewEvent({
                    ...newEvent,
                    date: format(selectedDate, 'yyyy-MM-dd'),
                  });
                }}
                className="add-event-btn"
              >
                ADD EVENT
              </button>
            </div>
          )}
        </div>

        {showMeetingDetails && (
          <div className="modal-overlay">
            <div className="modal">
              <button
                onClick={() => setShowMeetingDetails(null)}
                className="modal-close"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <h3 className="modal-title">Meeting Info</h3>
              <div className="meeting-info">
                <div className="meeting-info-item">
                  <FaClock className="w-5 h-5" />
                  <div>{format(new Date(`${showMeetingDetails.date}T${showMeetingDetails.startTime}`), 'EEEE, MMMM d, yyyy')} at {showMeetingDetails.startTime} ({showMeetingDetails.duration} min)</div>
                </div>
                <div className="meeting-info-item">
                  <FaVideo className="w-5 h-5" />
                  <div>Web conferencing details provided upon confirmation.</div>
                </div>
                <div className="meeting-info-item">
                  <FaEnvelope className="w-5 h-5" />
                  <div>{showMeetingDetails.email}</div>
                </div>
              </div>
              <div className="form-buttons" style={{ marginTop: '1.5rem' }}>
                <button
                  onClick={() => setShowCancelReason(true)}
                  className="btn btn-cancel"
                >
                  Cancel Meeting
                </button>
              </div>
            </div>
          </div>
        )}

        {showCancelReason && (
          <div className="modal-overlay">
            <div className="modal">
              <button
                onClick={() => setShowCancelReason(false)}
                className="modal-close"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <h3 className="modal-title">Cancel Meeting</h3>
              <form onSubmit={handleCancelMeeting}>
                <div className="form-group">
                  <label className="form-label">Reason for Cancellation</label>
                  <textarea
                    required
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="form-input"
                    placeholder="Enter reason for cancellation"
                  />
                </div>
                <div className="form-buttons">
                  <button
                    type="button"
                    onClick={() => setShowCancelReason(false)}
                    className="btn btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddEvent && (
          <div className="modal-overlay">
            <div className="modal">
              <button
                onClick={() => setShowAddEvent(false)}
                className="modal-close"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <h3 className="modal-title">Add New Event</h3>
              <form onSubmit={handleAddEvent}>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    required
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="form-input"
                    placeholder="Enter meeting title"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    required
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration (minutes)</label>
                  <input
                    type="number"
                    required
                    min="15"
                    step="15"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({ ...newEvent, duration: parseInt(e.target.value) })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    required
                    value={newEvent.email}
                    onChange={(e) => setNewEvent({ ...newEvent, email: e.target.value })}
                    className="form-input"
                    placeholder="Enter participant's email"
                  />
                </div>
                <div className="form-buttons">
                  <button
                    type="button"
                    onClick={() => setShowAddEvent(false)}
                    className="btn btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
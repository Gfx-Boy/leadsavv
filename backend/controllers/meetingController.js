import Meeting from '../models/Meeting.js';

export const getMeetings = async (req, res) => {
  try {
    console.log('Fetching meetings for user ID:', req.userId); // Log the user ID
    const meetings = await Meeting.find({ userId: req.userId, status: 'active' }).sort({ date: 1, startTime: 1 });



    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCancelledMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ userId: req.userId, status: 'cancelled' }).sort({ date: 1, startTime: 1 });


    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ _id: req.params.id, userId: req.userId });


    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMeeting = async (req, res) => {
  try {
    const { title, date, startTime, duration, email } = req.body;

    // Associate meeting with the authenticated user


    // Validate date is not in the past
    const eventDate = new Date(`${date}T${startTime}`);
    if (eventDate < new Date()) {
      return res.status(400).json({ message: 'Cannot schedule meetings in the past' });
    }

    const meeting = await Meeting.create({
      title,
      date,
      startTime,
      duration,
      email,
      userId: req.userId, // Associate meeting with the authenticated user

    });


    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status: 'cancelled' },
      { new: true }
    );


    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const restoreMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status: 'active' },
      { new: true }
    );


    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ _id: req.params.id, userId: req.userId });



    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    await meeting.remove();
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

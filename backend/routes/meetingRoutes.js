import express from 'express';
import {
  getMeetings,
  getCancelledMeetings,
  createMeeting,
  cancelMeeting,
  restoreMeeting,
  deleteMeeting,
} from '../controllers/meetingController.js';
import Meeting from '../models/Meeting.js'; // Adjust path as needed

const router = express.Router();

router.route('/').get(getMeetings).post(createMeeting);
router.route('/cancelled').get(getCancelledMeetings);

router.get('/:id', async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        if (!meeting) {
            return res.status(404).send({ error: 'Meeting not found' });
        }
        if (meeting.userId.toString() !== req.user.id) {
            return res.status(403).send({ error: 'Access denied' });
        }
        res.send(meeting);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

router.route('/:id').delete(deleteMeeting);

router.route('/:id/cancel').put(cancelMeeting);

router.route('/:id/restore').put(restoreMeeting);

export default router;
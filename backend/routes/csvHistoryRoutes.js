import express from 'express';
import CsvHistory from '../models/CsvHistory.js';
import { getCsvHistory, updateCsvHistory, deleteCsvHistory } from '../controllers/csvHistoryController.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const csvHistories = await CsvHistory.find({ userId: req.user._id });
    res.status(200).json(csvHistories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const csvHistory = new CsvHistory({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const savedCsvHistory = await csvHistory.save();
    res.status(201).json(savedCsvHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', getCsvHistory);
router.put('/:id', updateCsvHistory);
router.delete('/:id', deleteCsvHistory);

export default router;
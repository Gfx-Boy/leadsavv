import SmartList from '../models/smartListModel.js';

export const getSmartLists = async (req, res) => {
  try {
    const smartLists = await SmartList.find();
    res.status(200).json(smartLists);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSmartList = async (req, res) => {
  const smartList = req.body;
  const newSmartList = new SmartList(smartList);
  try {
    await newSmartList.save();
    res.status(201).json(newSmartList);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
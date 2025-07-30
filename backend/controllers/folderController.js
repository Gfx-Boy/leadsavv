import Folder from '../models/Folder.js';

export const createFolder = async (req, res) => {
  try {
    const newFolder = new Folder({
      ...req.body,
      userId: req.user._id, // Associate folder with the authenticated user
    });

    await newFolder.save();
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user._id });

    res.status(200).json(folders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFolderById = async (req, res) => {
  try {
    const folder = await Folder.findOne({ _id: req.params.id, userId: req.user._id });

    if (!folder) return res.status(404).json({ message: 'Folder not found' });
    res.status(200).json(folder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateFolder = async (req, res) => {
  try {
    const folder = await Folder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!folder) return res.status(404).json({ message: 'Folder not found' });
    res.status(200).json(folder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!folder) return res.status(404).json({ message: 'Folder not found' });
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

import Link from '../models/linkModel.js';

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLink = async (req, res) => {
  const link = new Link(req.body);
  try {
    const savedLink = await link.save();
    res.status(201).json(savedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLink = async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
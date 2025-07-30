import Snippet from '../models/Snippet.js';

// Create a new snippet
export const createSnippet = async (req, res) => {
  const snippet = new Snippet({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const savedSnippet = await snippet.save();
    res.status(201).json(savedSnippet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ userId: req.user._id });

    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, userId: req.user._id });

    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.status(200).json(snippet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single snippet
export const getSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.status(200).json(snippet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.status(200).json(snippet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.status(200).json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

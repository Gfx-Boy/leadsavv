import Pipeline from '../models/pipelineModel.js';

export const getPipelines = async (req, res) => {
  try {
    const pipelines = await Pipeline.find({ userId: req.userId });
    res.status(200).json(pipelines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPipeline = async (req, res) => {
  const stagesWithUserId = req.body.stages.map(stage => ({
    ...stage,
    userId: req.userId // Automatically add userId to each stage
  }));

  const pipeline = new Pipeline({
    ...req.body,
    stages: stagesWithUserId, // Use updated stages
    userId: req.userId
  });

  try {
    const savedPipeline = await pipeline.save();
    res.status(201).json(savedPipeline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPipeline = async (req, res) => {
  try {
    const pipeline = await Pipeline.findOne({ _id: req.params.id, userId: req.userId });
    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found.' });
    }
    res.json(pipeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePipeline = async (req, res) => {
  try {
    const pipeline = await Pipeline.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found.' });
    }
    res.json(pipeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePipeline = async (req, res) => {
  try {
    const pipeline = await Pipeline.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found.' });
    }
    res.json({ message: 'Pipeline removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
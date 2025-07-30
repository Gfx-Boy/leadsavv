import Opportunity from '../models/Opportunity.js';
import Pipeline from '../models/pipelineModel.js';
// Create a new Opportunity for a specific stage// Import the Pipeline model


// Create or Update Opportunity
export const createOpportunity = async (req, res) => {
  const { title, description, status, value } = req.body; // Extract value from the request body
  const { pipelineId, stageId } = req.params; // Extract pipelineId and stageId from URL parameters

  try {
    console.log("Pipeline ID:", pipelineId);
    console.log("Stage ID:", stageId);
    console.log("User ID:", req.userId);

    // Check if the pipeline and stage exist
    const pipeline = await Pipeline.findOne({ _id: pipelineId, userId: req.userId });
    if (!pipeline) {
      console.log("Pipeline not found");
      return res.status(404).json({ message: 'Pipeline not found' });
    }

    const stage = pipeline.stages.find(stage => stage._id.toString() === stageId);
    if (!stage) {
      console.log("Stage not found in the pipeline");
      return res.status(404).json({ message: 'Stage not found in the pipeline' });
    }

    // Create the opportunity
    const opportunity = new Opportunity({
      userId: req.userId,
      pipelineId,
      stageId,
      title,
      description,
      value, // Include the value field
      status: status || 'Open', // Default status to 'Open' if not provided
    });

    const savedOpportunity = await opportunity.save();

    // Add the opportunity to the stage's opportunities array
    stage.opportunities.push(savedOpportunity._id);
    await pipeline.save();

    res.status(201).json(savedOpportunity);
  } catch (error) {
    console.error('Error creating opportunity:', error);
    res.status(500).json({ message: 'An error occurred while creating the opportunity' });
  }
};
export const getOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findOne({ _id: req.params.id, userId: req.userId });
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    res.status(200).json(opportunity);
  } catch (error) {
    console.error('Error fetching opportunity:', error); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching the opportunity' });
  }
};
// Get all opportunities for a specific stage
export const getOpportunitiesForStage = async (req, res) => {
  const { pipelineId, stageId } = req.params;

  try {
    const pipeline = await Pipeline.findOne({ _id: pipelineId, userId: req.userId }).populate({
      path: 'stages.opportunities',
      model: 'Opportunity'
    });

    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found' });
    }

    const stage = pipeline.stages.find(stage => stage._id.toString() === stageId);
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found in the pipeline' });
    }

    res.status(200).json(stage.opportunities);
  } catch (error) {
    console.error('Error fetching opportunities for stage:', error);
    res.status(500).json({ message: 'An error occurred while fetching opportunities for the stage' });
  }
};
// Delete an Opportunity from a specific stage
export const deleteOpportunity = async (req, res) => {
  const { pipelineId, stageId, opportunityId } = req.params;

  try {
    const pipeline = await Pipeline.findOne({ _id: pipelineId, userId: req.userId });
    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found' });
    }

    const stage = pipeline.stages.find(stage => stage._id.toString() === stageId);
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found in the pipeline' });
    }

    // Remove the opportunity from the stage's opportunities array
    stage.opportunities = stage.opportunities.filter(opId => opId.toString() !== opportunityId);
    await pipeline.save();

    // Delete the opportunity from the database
    const deletedOpportunity = await Opportunity.findOneAndDelete({ _id: opportunityId, userId: req.userId });
    if (!deletedOpportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.status(200).json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    res.status(500).json({ message: 'An error occurred while deleting the opportunity' });
  }
};

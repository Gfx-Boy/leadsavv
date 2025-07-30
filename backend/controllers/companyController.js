import Company from '../models/Company.js';

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.userId });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCompany = async (req, res) => {
  const company = new Company({
    ...req.body,
    userId: req.userId,
  });

  try {
    const savedCompany = await company.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }
    res.json({ message: 'Company removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

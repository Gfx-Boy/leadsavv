import express from "express";
import Website from "../models/builderModel.js"; // Import the Website model
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware: Authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};

// Route: Save a Website
router.post("/save", authenticateJWT, async (req, res) => {
  const { projectName, htmlContent, cssContent } = req.body;
  try {
    const newWebsite = new Website({
      userId: req.user.id,
      projectName,
      htmlContent,
      cssContent,
    });
    await newWebsite.save();
    res.status(201).json({ message: "Website saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving website", error });
  }
});

// Route: Get All Websites for a User
router.get("/list", authenticateJWT, async (req, res) => {
  try {
    const websites = await Website.find({ userId: req.user.id });
    res.json(websites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching websites", error });
  }
});

// Route: Get a Single Website by ID
router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!website) return res.status(404).json({ message: "Website not found" });
    res.json(website);
  } catch (error) {
    res.status(500).json({ message: "Error fetching website", error });
  }
});

// Route: Delete a Website by ID
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const website = await Website.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!website) return res.status(404).json({ message: "Website not found" });
    res.json({ message: "Website deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting website", error });
  }
});

// Route: Update a Website by ID
router.put("/:id", authenticateJWT, async (req, res) => {
  const { projectName, htmlContent, cssContent } = req.body;
  try {
    const updatedWebsite = await Website.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { projectName, htmlContent, cssContent },
      { new: true }
    );
    if (!updatedWebsite)
      return res.status(404).json({ message: "Website not found" });
    res.json({ message: "Website updated successfully!", updatedWebsite });
  } catch (error) {
    res.status(500).json({ message: "Error updating website", error });
  }
});

export default router;

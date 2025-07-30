import mongoose from "mongoose";

// Website Schema
const websiteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  projectName: { type: String, required: true },
  htmlContent: { type: String, required: true },
  cssContent: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Website = mongoose.model("Website", websiteSchema);

export default Website;

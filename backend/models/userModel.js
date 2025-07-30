import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  subscriptionPlan: { type: String, default: "free" },
  emailLimit: { type: Number, default: 50 },
  scraperLimit: { type: Number, default: 50 },
  emailUsage: { type: Number, default: 0 },
  scraperUsage: { type: Number, default: 0 },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  defaultPaymentMethod: { type: String },
  paymentMethods: [
    {
      id: { type: String, required: true },
      brand: { type: String, required: true },
      last4: { type: String, required: true },
      expMonth: { type: Number, required: true },
      expYear: { type: Number, required: true },
    },
  ],
  firstName: { type: String }, // New field for first name
  lastName: { type: String }, // New field for last name
  purpose: { type: String }, // New field for purpose

  // Fields for forgot password functionality
  resetPasswordToken: { type: String }, // Token for password reset
  resetPasswordExpires: { type: Date }, // Expiration time for the token
});

const User = mongoose.model("User", userSchema);

export default User;
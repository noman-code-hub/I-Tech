const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [120, "Full name cannot exceed 120 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [40, "Phone number too long"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [120, "Position cannot exceed 120 characters"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
      trim: true,
      maxlength: [80, "Experience value is too long"],
    },
    coverLetter: {
      type: String,
      required: [true, "Cover letter is required"],
      trim: true,
      maxlength: [4000, "Cover letter cannot exceed 4000 characters"],
    },
    resume: {
      originalName: String,
      filename: String,
      path: String,
      mimetype: String,
      size: Number,
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "shortlisted", "rejected"],
      default: "new",
    },
    ip: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerApplication", careerApplicationSchema);

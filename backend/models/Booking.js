const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
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
      trim: true,
      maxlength: [30, "Phone number too long"],
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
      enum: {
        values: [
          "Web & App Development",
          "Branding",
          "Social Media Management",
          "Photography & Videography",
          "Animations",
          "Interior Design",
          "Printing",
          "Studio Rental",
          "Other",
        ],
        message: "Invalid service type",
      },
    },
    preferredDate: {
      type: String,
      required: [true, "Preferred date is required"],
      trim: true,
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
      enum: {
        values: [
          "Under $500",
          "$500 - $1,000",
          "$1,000 - $5,000",
          "$5,000 - $10,000",
          "$10,000+",
          "Not Sure",
          "",
        ],
        message: "Invalid budget range",
      },
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    ip: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);

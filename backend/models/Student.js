// Import mongoose
import mongoose from "mongoose";

// Define the Student schema
const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  progress: {
    type: Array,
    default: [], // To store progress-related data, e.g., tests taken and scores
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

export default Student; 

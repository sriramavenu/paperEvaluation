import mongoose from 'mongoose';

// Schema definition
const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    default: function () {
      return new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from creation
    },
  },
});

// Create and export the model
const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;



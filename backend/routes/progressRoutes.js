import express from 'express';
import asyncHandler from 'express-async-handler';
import Student from '../models/Student.js';
const router = express.Router();


// Endpoint to get progress data for a student
router.get('/progress/:rollNo', asyncHandler(async (req, res) => {
  const { rollNo } = req.params;
  try {
    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student.progress);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}));

export default router;

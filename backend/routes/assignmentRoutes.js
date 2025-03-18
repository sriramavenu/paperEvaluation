import express from 'express';
import asyncHandler from 'express-async-handler';
import Assignment from '../models/Assignment.js';
import axios from 'axios';
import TestResults from '../models/TestResults.js';
import Student from '../models/Student.js';

const router=express.Router();

router.post('/upload-assignment',asyncHandler(async (req, res)=>{
    try {
        const { title, questions } = req.body;
    
        if (!title || !Array.isArray(questions) || questions.length === 0) {
          return res.status(400).json({ message: 'Invalid assignment data' });
        }
        const newAssignment = new Assignment({ title, questions });
    
        await newAssignment.save();
    
        res.status(201).json({ message: 'Assignment successfully uploaded', assignment: newAssignment });
      } catch (error) {
        console.error('Error saving assignment:', error);
        res.status(500).json({ message: 'Server error while uploading assignment' });
      }
}))



router.get('/all-assignments', asyncHandler( async (req, res) => {
  //const {userId} = req.query;
  try {
    const assignments = await Assignment.find().sort({ dueDate: 1 }); // Sorting by due date
    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Server error while fetching assignments' });
  }
}));



// router.post('/submit-test', asyncHandler(async (req, res) => {
//   try{
//     const response= await axios.post('http://127.0.0.1:5000/evaluate', {answers:req.body.answers})
//     res.json(response.data);
//   }catch (error){
//     console.error("Error connecting to flask api:", error);
//     res.status(500).json({error: "Internal server error"});
//   }
// }))


router.post('/submit-test', asyncHandler(async (req, res)=> {
  const {answers, assignmentId, rollNo} = req.body;
  try{
    const response = await axios.post('http://127.0.0.1:5000/evaluate', {answers:answers})
    const totalScore = response.data.scores.reduce((sum,q) => sum+q.score, 0);

    const newTestResult = new TestResults({
      assignmentId,
      rollNo,
      totalScore,
      scores: response.data.scores
    })

    await newTestResult.save();

    res.json(newTestResult);

  }catch (error) {
    console.error("Error submitting test: ", error);
    res.status(500).json({error: "Internal server error"});
  }
}))


// router.post('/submit-test', asyncHandler(async (req, res) => {
//   const { answers, assignmentId, rollNo } = req.body;

//   try {
//     // Call evaluation API
//     const response = await axios.post('http://127.0.0.1:5000/evaluate', { answers });
//     const totalScore = response.data.scores.reduce((sum, q) => sum + q.score, 0);

//     // Find student by roll number
//     const student = await Student.findOne({ rollNo });

//     if (!student) {
//       return res.status(404).json({ error: "Student not found" });
//     }

//     // Update student's attemptedTests field
//     const newAttempt = {
//       assignmentId,
//       totalScore,
//       scores: response.data.scores,
//       submittedAt: new Date(),
//     };

//     // Prevent duplicate attempts
//     const existingAttempt = student.attemptedTests.find(test => test.assignmentId === assignmentId);
//     if (existingAttempt) {
//       return res.status(400).json({ error: "Test already attempted" });
//     }

//     student.attemptedTests.push(newAttempt);
//     await student.save();

//     res.json({ message: "Test submitted successfully", attempt: newAttempt });

//   } catch (error) {
//     console.error("Error submitting test: ", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }));



router.get('/attempted-tests/:rollNo', async (req, res) => {
  try {
    const { rollNo } = req.params;
    const attemptedTests = await TestResults.find({ rollNo }).distinct('assignmentId'); // Get only assignment IDs
    res.status(200).json(attemptedTests);
  } catch (error) {
    console.error('Error fetching attempted tests:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Fetch test results for a user
router.get('/results/:assignmentId/:rollNo', async (req, res) => {
  try {
    const { assignmentId, rollNo } = req.params;
    const result = await TestResults.findOne({ assignmentId, rollNo });

    if (!result) {
      return res.status(404).json({ message: 'Results not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/results/:rollNo', async (req, res) => {
  try {
      const { rollNo } = req.params;

      // Fetch test results for the given roll number
      const results = await TestResults.find({ rollNo }).populate('assignmentId', 'title');

      if (!results || results.length === 0) {
          return res.status(404).json({ message: "No results found for this student." });
      }

      // Transform results to include assignment title
      const formattedResults = results.map(result => ({
          assignmentId: result.assignmentId._id,
          assignmentTitle: result.assignmentId.title, // Fetch assignment title from populated data
          totalScore: result.totalScore,
          scores: result.scores,
          submittedAt: result.submittedAt
      }));

      res.status(200).json(formattedResults);
  } catch (error) {
      console.error("Error fetching results:", error);
      res.status(500).json({ message: "Server error while fetching results." });
  }
});





export default router;
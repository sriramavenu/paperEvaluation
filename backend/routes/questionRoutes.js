import express from 'express';
import asyncHandler from 'express-async-handler';
//import Question from '../models/Question.js';

const router = express.Router();

// API to fetch 5 random questions
// router.get('/random-questions', asyncHandler(async (req, res) => {
//     try {
//         const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
//         res.json(questions);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching questions.' });
//     }
// }));







// API to handle answer submission
router.post('/evaluate-answer', asyncHandler(async (req, res) => {
    const { questionId, studentAnswer } = req.body;

    try {
        if (!questionId || !studentAnswer) {
            return res.status(400).json({ message: 'Question ID and answer are required.' });
        }

        const question = await Question.findOne({ questionId });
        

        res.status(200).json({ message: 'Answer submitted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit answer.' });
    }
}));

router.get('/test',asyncHandler(async (req,res) => {
    res.send('testing');
}))




export default router;

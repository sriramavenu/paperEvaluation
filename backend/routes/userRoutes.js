import express from 'express'
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Student.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; 


router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { rollNo, name, email, password, phone, department, semester } = req.body;

    // Check if student already exists
    const studentExists = await User.findOne({ rollNo });
    if (studentExists) {
      res.status(400);
      throw new Error("Student already exists with this rollno");
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student
    const student = await User.create({
      rollNo,
      name,
      email,
      password: hashedPassword,
      phone,
      department,
      semester,
    });

    if (student) {
      res.status(201).json({
        _id: student._id,
        rollNo: student.rollNo,
        name: student.name,
        email: student.email,
        phone: student.phone,
        department: student.department,
        semester: student.semester,
        dateJoined: student.dateJoined,
      });
    } else {
      res.status(400);
      throw new Error("Invalid student data");
    }
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { rollNo, password } = req.body;

    // Check if roll number exists in the database
    const user = await User.findOne({ rollNo });
    if (!user) {
      return res.status(404).json({ message: 'Roll number does not exist' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, rollNo: user.rollNo }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      user,
      message: 'Login successful',
      token,
    });
  })
);




router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    res.status(200).json({
      message: 'Logout successful',
    });
  })
);


router.get('/details', asyncHandler(async (req, res) => {
  try {
      // const students = await User.find().select('name rollNo department');
      const students = await User.find();
      res.json(students);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}));


//update profile
router.put('/update', asyncHandler(async (req, res) => {
  const { rollNo, email, name, phone } = req.body;

  try {
      const student = await User.findOne({ rollNo });

      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }

      student.name = name;
      student.phone = phone;
      student.email = email;
      await student.save();

      res.status(200).json({ message: 'Profile updated successfully', student });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
}));



// change password
router.put('/change-password', async (req, res) => {
  const { rollNo, password } = req.body;

  try {
      const student = await User.findOne({ rollNo });

      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }

      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);
      await student.save();

      res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});




export default router;

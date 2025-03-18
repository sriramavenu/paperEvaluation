# paperEvaluation
# Voice-Based Evaluation System for Physically Disabled Students

## Overview
The **Voice-Based Evaluation System** is designed to assist physically disabled students by allowing them to provide answers via voice input, which is then evaluated and graded automatically. The system utilizes **Natural Language Processing (NLP)** and **Machine Learning** techniques to assess student responses based on thematic analysis, semantic similarity, and coherence evaluation.

## Features
- **Speech-to-Text Conversion:** Converts student speech input into text using ASR (Automatic Speech Recognition).
- **Thematic Analysis (LDA):** Evaluates topic coverage in answers (30% weight).
- **Semantic Similarity (T5 Transformer):** Checks conceptual accuracy (50% weight).
- **Coherence Evaluation (RST - Rhetorical Structure Theory):** Assesses logical flow of the answer (20% weight).
- **Automated Scoring:** Generates scores based on predefined evaluation criteria.
- **Student Portal:** React-based web application for students to take voice/text-based tests and receive instant feedback.

## Technologies Used
### **Frontend (Student Portal)**
- React.js
- CSS and bootsrap

### **Backend (Evaluation System & API)**
- Flask (Python-based API)
- Express.js
- Node.js
- ASR (Automatic Speech Recognition) for voice input
- NLP Techniques:
  - Latent Dirichlet Allocation (LDA) for thematic analysis
  - T5 Transformer for semantic similarity
  - Rhetorical Structure Theory (RST) for coherence evaluation
- MongoDB for data storage

## System Architecture
1. **Student Submission:** The student provides an answer via voice or text.
2. **Speech Processing:** If voice input is provided, it is converted to text.
3. **Evaluation Pipeline:** The system processes the answer through LDA, T5 Transformer, and RST analysis.
4. **Scoring & Feedback:** Scores are generated and displayed to the student.







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { CheckCircle } from "react-bootstrap-icons";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import QuestionPalette from './QuestionPalette';

const TakeTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.rollNo);
  const assignmentData = location.state?.assignment || {};
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [answerMode, setAnswerMode] = useState("record");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (assignmentData.questions && assignmentData.questions.length > 0) {
      const speakQuestion = () => {
        const utterance = new SpeechSynthesisUtterance(assignmentData.questions[currentQuestionIndex].question);
        utterance.rate = 1;
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(voice => voice.lang === 'en-IN');
        if (indianVoice) {
          utterance.voice = indianVoice;
        }
        window.speechSynthesis.speak(utterance);
      };

      window.speechSynthesis.onvoiceschanged = speakQuestion;
      speakQuestion();
    }
  }, [currentQuestionIndex, assignmentData.questions]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toggleRecording = () => {
    if (isRecording) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
      handleAnswerUpdate(transcript);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
    }
  };

  const handleAnswerUpdate = (answer) => {
    const updatedAnswers = [...studentAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setStudentAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % assignmentData.questions.length);
    resetTranscript();
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + assignmentData.questions.length) % assignmentData.questions.length);
    resetTranscript();
  };

  const handleInputChange = (e) => {
    handleAnswerUpdate(e.target.value);
  };

  const handleTestSubmit = async () => {
    const formattedAnswers = assignmentData.questions.map((question, index) => ({
      question: question.question,
      studentAnswer: studentAnswers[index] || "",
      referenceAnswer: question.answer
    }));

    try {
      const response = await axios.post('http://localhost:8000/app/assignment/submit-test', {
        answers: formattedAnswers,
        assignmentId: assignmentData._id,
        rollNo: user
      });
      console.log("Evaluation result:", response.data);
    } catch (error) {
      console.error("Error submitting test", error);
    }

    setShowModal(true);
  };

  const handleAnswerModeChange = (e) => {
    setAnswerMode(e.target.value);
    resetTranscript();
    setIsRecording(false);
  };

  const handleViewResults = () => {
    navigate('/results', { state: { assignmentId: assignmentData._id, rollNo: user } });
  };

  return (
    <div style={pageContainerStyle}>
      {/* Question Palette */}
      <div style={paletteWrapperStyle}>
        <QuestionPalette
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          questions={assignmentData.questions}
        />
      </div>

      {/* Main Content */}
      <div style={contentContainerStyle}>
        <h2 style={headerStyle}>{assignmentData.title || "Voice-Based Evaluation System"}</h2>

        <div style={questionBoxStyle}>
          <strong>Question:</strong> {assignmentData.questions?.[currentQuestionIndex]?.question || "No questions available"}
        </div>

        <select onChange={handleAnswerModeChange} value={answerMode} style={dropdownStyle}>
          <option value="record">Record Answer</option>
          <option value="write">Write Answer</option>
        </select>

        {answerMode === "record" ? (
          <>
            <textarea
              value={transcript}
              placeholder="Your transcription will appear here..."
              rows="6"
              cols="50"
              readOnly
              style={textAreaStyle}
            />

            <div style={{ marginTop: '15px' }}>
              <button onClick={toggleRecording} style={isRecording ? recordingButtonStyle : buttonStyle}>
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button>
            </div>
          </>
        ) : (
          <textarea
            value={studentAnswers[currentQuestionIndex] || ""}
            placeholder="Type your answer here..."
            rows="6"
            cols="50"
            onChange={handleInputChange}
            style={textAreaStyle}
          />
        )}

        <div style={navigationButtonContainerStyle}>
          {currentQuestionIndex > 0 && (
            <button onClick={handlePreviousQuestion} style={navButtonStyle}>
              Previous Question
            </button>
          )}
          {assignmentData.questions && assignmentData.questions.length > 1 && (
            <button onClick={handleNextQuestion} style={navButtonStyle}>
              Next Question
            </button>
          )}
        </div>

        <button onClick={handleTestSubmit} style={submitButtonStyle}>
          Submit Test
        </button>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Body className="text-center">
            <CheckCircle size={60} className="text-success mb-3" />
            <h4>Assignment has been Successfully Submitted</h4>
            <Button
              variant="success"
              className="mt-3"
              onClick={handleViewResults}
            >
              View Results
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

// Styles
const pageContainerStyle = {
  display: 'flex',
  height: '100vh',
  backgroundColor: '#f9fafb',
  fontFamily: 'Arial, sans-serif',
};

const paletteWrapperStyle = {
  flex: '0 0 auto', // Do not grow or shrink
  padding: '15px',
  // backgroundColor: '#2c3e50',
  borderRight: '1px solid #34495e',
  borderRadius: '10px',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  overflowY: 'auto',
};

const contentContainerStyle = {
  flex: 1, // Take up remaining space
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
};

const headerStyle = {
  color: '#333',
  fontSize: '24px',
  marginBottom: '20px',
  fontWeight: '600',
};

const questionBoxStyle = {
  backgroundColor: '#e3f2fd',
  color: '#1565c0',
  padding: '15px',
  borderRadius: '8px',
  fontSize: '18px',
  marginBottom: '20px',
  textAlign: 'center',
  fontWeight: '500',
  width: '100%',
  maxWidth: '600px',
};

const dropdownStyle = {
  marginBottom: '20px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  fontSize: '16px',
  width: '100%',
  maxWidth: '600px',
  outline: 'none',
};

const textAreaStyle = {
  width: '100%',
  maxWidth: '600px',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '16px',
  resize: 'none',
  outline: 'none',
  backgroundColor: '#f1f1f1',
  color: '#333',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
};

const recordingButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#d32f2f',
};

const navigationButtonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
  width: '100%',
  maxWidth: '600px',
};

const navButtonStyle = {
  backgroundColor: '#ff9800',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
};

const submitButtonStyle = {
  ...buttonStyle,
  marginTop: '20px',
  backgroundColor: '#007bff',
};

export default TakeTest;
import React from "react";
import { ListGroup } from "react-bootstrap";

const QuestionPalette = ({ currentQuestionIndex, setCurrentQuestionIndex, questions }) => {
  // Calculate the number of rows needed based on the number of questions
  const rows = Math.ceil(questions.length / 3);

  return (
    <div style={{ ...paletteContainer, height: `${Math.max(200, rows * 60)}px` }}>
      <h4 style={paletteHeader}>Questions</h4>
      <div style={gridContainer}>
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            style={index === currentQuestionIndex ? activeQuestionStyle : questionStyle}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const paletteContainer = {
  width: "250px", // Reduced width
  padding: "15px",
  backgroundColor: "#2c3e50",
  border: "1px solid #34495e",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  margin: "10px",
  overflowY: "auto", // Enable scrolling if height exceeds
};

const paletteHeader = {
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#ecf0f1",
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)", // 3 buttons per row
  gap: "10px", // Spacing between buttons
};

const questionStyle = {
  textAlign: "center",
  cursor: "pointer",
  padding: "10px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  backgroundColor: "#34495e",
  border: "1px solid #2c3e50",
  color: "#ecf0f1",
  fontSize: "14px",
  fontWeight: "bold",
};

const activeQuestionStyle = {
  ...questionStyle,
  backgroundColor: "#007bff",
  color: "white",
  border: "1px solid #007bff",
  transform: "scale(1.05)",
};

export default QuestionPalette;
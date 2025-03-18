import React, { useState } from "react";
import { Button, Form, Container, Card, Row, Col, Modal } from "react-bootstrap";
import axios from "axios"; 
import { CheckCircle } from "react-bootstrap-icons";

const CreateAssignment = () => {
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [showModal, setShowModal] = useState(false);

  // Handle adding a new question-answer pair
  const addQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  // Handle removing a question-answer pair
  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Handle input changes for questions and answers
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  // Handle assignment title change
  const handleTitleChange = (event) => {
    setAssignmentTitle(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const assignmentData = {
      title: assignmentTitle,
      questions: questions,
    };

    // Clear form inputs after submission
    setAssignmentTitle("");
    setQuestions([{ question: "", answer: "" }]);
    setShowModal(true);

    try {
      const response = await axios.post('http://localhost:8000/app/assignment/upload-assignment', assignmentData);
      console.log('Assignment uploaded successfully:', response.data);
      // alert('Assignment successfully uploaded');
    } catch (error) {
      console.error('Error uploading assignment:', error);
      alert('Failed to upload assignment');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4">
        <h2 className="mb-4">Create Assignment</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Assignment Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter assignment title"
              value={assignmentTitle}
              onChange={handleTitleChange}
            />
          </Form.Group>

          {questions.map((question, index) => (
            <Row key={index} className="mb-3 align-items-center">
              <Col>
                <Form.Group>
                  <Form.Label>Question {index + 1}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="question"
                    value={question.question}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Enter question"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Ideal Answer</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="answer"
                    value={question.answer}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Enter ideal answer"
                  />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button
                  variant="danger"
                  onClick={() => removeQuestion(index)}
                  className="mt-4"
                >
                  &#10005;
                </Button>
              </Col>
            </Row>
          ))}

          <Button variant="primary" onClick={addQuestion} className="mb-3">
            Add Another Question
          </Button>

          <Button variant="success" onClick={handleSubmit} className="w-100">
            Upload Assignment
          </Button>
        </Form>
      </Card>

      {/* Modal for success message */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <CheckCircle size={60} className="text-success mb-3" />
          <h4>Assignment Successfully Uploaded</h4>
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => setShowModal(false)}
          >
            View Assignment
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CreateAssignment;

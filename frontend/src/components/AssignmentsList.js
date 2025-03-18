import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState([]);
  const [attemptedTests, setAttemptedTests] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user); 
  const rollNo = user.rollNo;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/assignment/all-assignments');
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    const fetchAttemptedTests = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/app/assignment/attempted-tests/${rollNo}`);
        setAttemptedTests(response.data); // Array of attempted assignment IDs
      } catch (error) {
        console.error('Error fetching attempted tests:', error);
      }
    };

    fetchAssignments();
    fetchAttemptedTests();
  }, [user, rollNo]);

  const currentDate = new Date();

  // Sort assignments: Active ones first, then by due date
  const sortedAssignments = assignments.sort((a, b) => {
    const aActive = new Date(a.dueDate) > currentDate;
    const bActive = new Date(b.dueDate) > currentDate;
    return bActive - aActive || new Date(a.dueDate) - new Date(b.dueDate);
  });

  const handleTakeTest = (assignment) => {
    navigate('/test', { state: { assignment } });
  };

  const handleViewResults = (assignment) => {
    navigate('/results', { state: { assignmentId: assignment._id, rollNo: rollNo } });
  };

  return (
    <Container className="mt-5">
      <Row xs={1} md={3} className="g-4">
        {sortedAssignments.map((assignment) => {
          const isAttempted = attemptedTests.includes(assignment._id);
          const isActive = new Date(assignment.dueDate) > currentDate;
          return (
            <Col key={assignment._id}>
              <Card
                style={{
                  borderRadius: '15px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: isActive ? '#e8f5e9' : '#ffebee',
                  width: '250px',
                  height: '180px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Card.Body>
                  <Card.Title>{assignment.title}</Card.Title>
                  <Card.Text>
                    <strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString('en-GB')}
                  </Card.Text>
                  {isAttempted ? (
                    <Button
                      variant="primary"
                      onClick={() => handleViewResults(assignment)}
                      style={{ borderRadius: '8px' }}
                    >
                      View Results
                    </Button>
                  ) : isActive ? (
                    <Button
                      variant="success"
                      onClick={() => handleTakeTest(assignment)}
                      style={{ borderRadius: '8px' }}
                    >
                      Take Test
                    </Button>
                  ) : (
                    <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>Test Expired</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default AssignmentsList;

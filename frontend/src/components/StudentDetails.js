import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Modal, Table } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaIdCard, FaClipboardList, FaChartBar } from 'react-icons/fa';

function StudentDetails() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [studentResults, setStudentResults] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/app/student/details');
                console.log("Fetched Students:", response.data);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    // Function to fetch and show results
    const handleShowResults = async (student) => {
        setSelectedStudent(student);

        try {
            const response = await axios.get(`http://localhost:8000/app/assignment/results/${student.rollNo}`);
            console.log("Fetched Results:", response.data);
            setStudentResults(response.data);
        } catch (error) {
            console.error("Error fetching results:", error);
            setStudentResults([]);
        }

        setShowResultsModal(true);
    };

    // Function to show student details
    const handleShowDetails = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    return (
        <Container className="mt-4">
            <Row>
                {students.length > 0 ? (
                    students.map(student => (
                        <Col key={student.rollNo} md={4} className="mb-3">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Card style={{ borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0,0,0,0.15)' }}>
                                    <Card.Body className="text-center">
                                        <Card.Title style={{ fontWeight: "bold" }}>{student.name.toUpperCase()}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            <FaIdCard /> Roll No: {student.rollNo}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <FaBuilding /> {student.department}
                                        </Card.Text>
                                        <Button variant="primary" className="me-2" onClick={() => handleShowResults(student)}>View Results</Button>
                                        <Button variant="secondary" onClick={() => handleShowDetails(student)}>View Details</Button>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    ))
                ) : (
                    <p>No student records found.</p>
                )}
            </Row>

            {/* Student Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered animation={true} size="lg">
                <Modal.Header closeButton style={{ backgroundColor: "#f8f9fa", borderBottom: "none" }}>
                    <Modal.Title>📜 Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStudent && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                            <Table responsive style={{ borderCollapse: "collapse", width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "8px" }}><FaIdCard /> Roll No:</td>
                                        <td style={{ padding: "8px" }}>{selectedStudent.rollNo}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "8px" }}><FaUser /> Name:</td>
                                        <td style={{ padding: "8px" }}>{selectedStudent.name}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "8px" }}><FaEnvelope /> Email:</td>
                                        <td style={{ padding: "8px" }}>{selectedStudent.email}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "8px" }}><FaPhone /> Phone:</td>
                                        <td style={{ padding: "8px" }}>{selectedStudent.phone}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "8px" }}><FaBuilding /> Department:</td>
                                        <td style={{ padding: "8px" }}>{selectedStudent.department}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </motion.div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Student Results Modal */}
            <Modal show={showResultsModal} onHide={() => setShowResultsModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FaClipboardList /> {selectedStudent?.name}'s Results
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {studentResults.length > 0 ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                            <Table hover borderless>
                                <thead>
                                    <tr className="bg-primary text-white">
                                        <th>#</th>
                                        <th>Assignment Title</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentResults.map((result, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{result.assignmentTitle}</td>
                                            <td>{result.totalScore}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            {/* <div className="text-center mt-3">
                                <h4>
                                    <FaChartBar /> Total Score:{" "}
                                    <span className="text-success">
                                        {studentResults.reduce((acc, res) => acc + res.totalScore, 0)}
                                    </span>
                                </h4>
                            </div> */}
                        </motion.div>
                    ) : (
                        <p>No results found for this student.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowResultsModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default StudentDetails;



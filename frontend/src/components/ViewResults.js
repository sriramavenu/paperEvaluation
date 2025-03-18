// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Table } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';

// const ViewResults = () => {
//   const { state } = useLocation();
//   const { assignmentId, rollNo } = state;

//   console.log(assignmentId, 'assignment id');
//   console.log(rollNo, 'roll no');

//   const [results, setResults] = useState(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/app/assignment/results/${assignmentId}/${rollNo}`);
//         setResults(response.data);
//       } catch (error) {
//         console.error('Error fetching results:', error);
//       }
//     };

//     fetchResults();
//   }, [assignmentId, rollNo]);

//   if (!results) {
//     return <p>Loading results...</p>;
//   }

//   return (
//     <Container className="mt-5">
//       <h3>Test Results</h3>
//       <p><strong>Total Score:</strong> {results.totalScore}</p>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Question</th>
//             <th>Student Answer</th>
//             <th>Reference Answer</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.scores.map((item, index) => (
//             <tr key={index}>
//               <td>{item.question}</td>
//               <td>{item.student}</td>
//               <td>{item.reference}</td>
//               <td>{item.score}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ViewResults;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const ViewResults = () => {
  const { state } = useLocation();
  const { assignmentId, rollNo } = state;

  const [results, setResults] = useState(null);
  const [visibleReferences, setVisibleReferences] = useState({});
  const MAX_MARKS = 10;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/app/assignment/results/${assignmentId}/${rollNo}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [assignmentId, rollNo]);

  const toggleReference = (index) => {
    setVisibleReferences((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!results) {
    return <p>Loading results...</p>;
  }

  return (
    <Container className="mt-5">
      <h3>Test Results</h3>
      <p><strong>Total Score:</strong> {results.totalScore}/{results.scores.length * MAX_MARKS}</p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Question</th>
            <th>Student Answer</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.scores.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{item.question}</td>
                <td>{item.student}</td>
                <td>{item.score}/{MAX_MARKS}</td>
                <td>
                  <Button 
                    variant="primary" 
                    onClick={() => toggleReference(index)}
                  >
                    {visibleReferences[index] ? "Hide Reference" : "Show Reference"}
                  </Button>
                </td>
              </tr>
              {visibleReferences[index] && (
                <tr>
                  <td colSpan="4"><strong>Reference Answer:</strong> {item.reference}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewResults;

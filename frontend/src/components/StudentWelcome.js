import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentWelcome = () => {
  const [show, setShow] = useState(false);
  const [lastActivity, setLastActivity] = useState("Fetching...");

  const user = useSelector((state) => state.user.user);
  const studentName = user?.name;
  const rollNo = user?.rollNo;

  const nodeRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setShow(true), 500);
    
    const fetchLastActivity = async () => {
      try {
        const response = await fetch(`http://localhost:8000/app/assignment/results/${rollNo}`);
        if (!response.ok) {
          throw new Error("No results found");
        }
        const data = await response.json();

        if (data.length > 0) {
          // Find the latest submission
          const latestSubmission = data.reduce((latest, current) => 
            new Date(latest.submittedAt) > new Date(current.submittedAt) ? latest : current
          );

          const formattedDate = new Date(latestSubmission.submittedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });

          setLastActivity(formattedDate);
        } else {
          setLastActivity("No recent activity");
        }
      } catch (error) {
        console.error("Error fetching last activity:", error);
        setLastActivity("No recent activity");
      }
    };

    if (rollNo) {
      fetchLastActivity();
    }
  }, [rollNo]);

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Every expert was once a beginner. Keep pushing forward!",
    "Learning never exhausts the mind. Keep exploring!",
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <CSSTransition in={show} timeout={500} classNames="fade" unmountOnExit nodeRef={nodeRef}>
      <Card style={styles.card} className="shadow-lg text-center p-4">
        <h2 style={styles.welcomeText}>Welcome back, {studentName}!</h2>
        <p style={styles.activityText}>Last activity: {lastActivity}</p>
        <blockquote style={styles.quote}>"{randomQuote}"</blockquote>
      </Card>
    </CSSTransition>
  );
};

const styles = {
  card: {
    maxWidth: "600px",
    margin: "50px auto",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    color: "white",
    borderRadius: "15px",
  },
  welcomeText: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  activityText: {
    fontSize: "1.2rem",
    opacity: 0.8,
  },
  quote: {
    fontSize: "1rem",
    fontStyle: "italic",
    marginTop: "15px",
  },
};

export default StudentWelcome;


// student leaderboard


// import React from "react";
// import { Card, ProgressBar, Badge, ListGroup } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const StudentWelcome = () => {
//   // Static scores
//   const scores = {
//     thematicScore: 78,
//     semanticScore: 85,
//     coherenceScore: 90,
//     overallScore: 84,
//   };

//   // Static achievements
//   const achievements = [
//     { name: "Top Performer", color: "success" },
//     { name: "100+ Assessments", color: "primary" },
//     { name: "Consistent Learner", color: "warning" },
//   ];

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Welcome, Student! 🎉</h2>

//       {/* Achievements Section */}
//       <div style={styles.achievements}>
//         {achievements.map((achieve, index) => (
//           <Badge key={index} bg={achieve.color} style={styles.badge}>
//             {achieve.name}
//           </Badge>
//         ))}
//       </div>

//       {/* Score Cards */}
//       <div style={styles.scoreContainer}>
//         {Object.entries(scores).map(([key, value], index) => (
//           <Card key={index} style={styles.card} className="shadow-sm">
//             <Card.Body>
//               <Card.Title style={styles.cardTitle}>{key.replace(/([A-Z])/g, " $1")}</Card.Title>
//               <ProgressBar animated now={value} label={`${value}%`} />
//             </Card.Body>
//           </Card>
//         ))}
//       </div>

//       {/* Leaderboard Ranking */}
//       <div style={styles.leaderboard}>
//         <h4>🏆 Leaderboard</h4>
//         <ListGroup>
//           <ListGroup.Item>1. Alex Johnson - 92%</ListGroup.Item>
//           <ListGroup.Item>2. You - 84% ⭐</ListGroup.Item>
//           <ListGroup.Item>3. Emma Brown - 80%</ListGroup.Item>
//         </ListGroup>
//       </div>
//     </div>
//   );
// };

// // Internal CSS styles
// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//   },
//   heading: {
//     color: "#007bff",
//     fontWeight: "bold",
//     marginBottom: "20px",
//   },
//   achievements: {
//     marginBottom: "20px",
//   },
//   badge: {
//     fontSize: "14px",
//     margin: "5px",
//     padding: "10px",
//   },
//   scoreContainer: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "20px",
//     justifyContent: "center",
//   },
//   card: {
//     width: "250px",
//     borderRadius: "10px",
//     padding: "10px",
//     backgroundColor: "#f8f9fa",
//   },
//   cardTitle: {
//     fontSize: "16px",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   leaderboard: {
//     marginTop: "30px",
//     textAlign: "center",
//   },
// };

// export default StudentWelcome;

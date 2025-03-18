import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// Sidebar component
const Sidebar2 = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
      navigate("/");
    };
  return (
    <div className="sidebar d-flex flex-column p-3">
      <h2 className="text-center text-white">Dashboard</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/timetable" className="nav-link text-white">Timetable</Link>
        </li>
        <li className="nav-item">
          <Link to="/teacher/student-details" className="nav-link text-white">Student Details</Link>
        </li>
        <li className="nav-item">
          <Link to="/marks" className="nav-link text-white">Marks</Link>
        </li>
        <li className="nav-item">
          <Link to="/teacher/create-assignment" className="nav-link text-white">Create Assignment</Link>
        </li>
        <li className="nav-item mt-auto">
          <Link onClick={handleLogout} className="nav-link text-white">Logout</Link>
        </li>
      </ul>
    </div>
  );
};


// Inline CSS for Sidebar
const styles = `
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #007bff;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 20px;
}

.sidebar .nav-link {
  padding: 10px;
  font-size: 18px;
}

.sidebar .nav-link:hover {
  background-color: #0056b3;
  border-radius: 5px;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export { Sidebar2 };
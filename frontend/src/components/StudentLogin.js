import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';

function Login() {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      const response = await axios.post('http://localhost:8000/app/student/login', { rollNo, password });
      if (response.status === 200) {
        //console.log(response.data, 'res.data');
        dispatch(loginSuccess(response.data.user));
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="image-box">
        <img
          src="https://www.shutterstock.com/image-vector/hand-pen-ticking-done-tasks-600nw-2150444213.jpg"
          alt="Login Illustration"
          className="login-image"
          width="500px"
        />
      </div>
      <div className="login-card" style={{height:"400px"}}>
        <h2 className='pt-4 fs-1'>Student Login</h2>
        {error && <div className="error-message mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
          <div className='text-center' style={{marginTop:"2%"}}><Link >Forgot Password</Link>
          </div>
        </form>
      </div>
    </div>
  );
}


// Styles for both Login pages
const style = document.createElement('style');
style.innerHTML = `
/* General Styles */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f7fc;
  padding: 20px;
  width:100%;
}

.image-box {
  width: 50%;
  padding: 20px;
  text-align: center;
  transition: transform 0.5s ease;
}

.image-box:hover {
  transform: scale(1.05);
}

.login-image {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  animation: fadeIn 1s ease-in-out;
  margin-left: 20px;
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: scale(1.05);
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.input-field {
  position: relative;
  margin-bottom: 20px;
}

.input-field input {
  width: 100%;
  padding: 10px 35px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f9f9f9;
  outline: none;
  transition: all 0.3s ease;
}

.input-field input:focus {
  border-color: #4CAF50;
}

.input-field i {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #4CAF50;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}

.login-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #45a049;
}

.extra-links {
  text-align: center;
  margin-top: 20px;
}

.extra-links a {
  color: #2196F3;
  text-decoration: none;
}

.extra-links a:hover {
  text-decoration: underline;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

document.head.appendChild(style);

export default Login;

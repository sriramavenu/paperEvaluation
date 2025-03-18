import React from 'react'
import { Outlet } from 'react-router-dom';
//import { Sidebar } from './SideBar/SideBar';
import Navbar from './Navbar';


const Root = () => {
    return (
      <div style={{display:'flex', alignItems:'center',flexDirection:'column'}}>
        <Navbar />
        {/* <Routes>
          <Route path="/" element={<StudentLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
        </Routes> */}
        <Outlet />
      </ div>
    );
  };

export default Root
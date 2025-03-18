import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.user.user);
  //console.log(user?.name, 'current user login')
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        {/* <h1 className='text-center text-primary mt-2'>Welcome {user?.name}</h1> */}
        <Outlet />
      </div>
    </div>
  );
}

export default Home;

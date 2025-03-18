import React from 'react'
import { Sidebar2 } from './Sidebar2'
import { Outlet } from 'react-router-dom'

function Root2() {
  return (
    <div style={{display:'flex'}}>
        <Sidebar2 />
        <div style={{marginLeft:'250px',padding:'20px',width:'100%'}}>
            <Outlet/>
        </div>
        </div>
  )
}

export default Root2

import React from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import StudentLogin from './components/StudentLogin';
import Home from './components/Home'
import TakeTest from './components/TakeTest';
import Progress from './components/Progress';
import TeacherLogin from './components/TeacherLogin';
import Root from './components/Root';
import Root2 from './components/Root2';
//import { Sidebar2,CreateAssignment } from './components/Sidebar2';
import CreateAssignment from './components/CreateAssignment';
import AssignmentsList from './components/AssignmentsList';
import ViewResults from './components/ViewResults';
// import StudentWelcome from './components/studentPortalDesign/StudentWelcome';
// import StudentDetails from './components/teachersPortal/StudentDetails';
import StudentWelcome from './components/StudentWelcome';
import StudentDetails from './components/StudentDetails';
import Profile from './components/Profile';

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Root />,
      children: [{
        path:'/',
        element: <StudentLogin />
      },{
        path:'/teacher-login',
        element: <TeacherLogin />
      }]
    },
    {
      path:'/home',
      element: <Home />,
      children: [
      //   {
      //   path:'/home/test',
      //   element: <TakeTest />
      // },
      {
        path: "/home",
        element: <StudentWelcome />
      },
      {
        path:'/home/progress',
        element: <Progress />
      },{
        path: '/home/assignments',
        element: <AssignmentsList />
      },{
        path: '/home/profile',
        element: <Profile />
      }]
    },{
      path:'/teacher',
      element: <Root2 />,
      children: [{
        path: '/teacher/create-assignment',
        element: <CreateAssignment />
      },{
        path: '/teacher/student-details',
        element: <StudentDetails />
      }]
    },{
      path:'/test',
      element: <TakeTest />
    },{
      path: '/results',
      element: <ViewResults />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Navbar from './Navbar'
import Username from './Username'

function App() {
  const router = createBrowserRouter([{
    path: "/Home",
    element: <><Navbar/> <Home /></>
  }, {
    path: "/Login",
    element: <><Navbar/> <Login /></>
  },{
   path: "/user/:uname",
    element: <><Navbar/> <Username /></>
  },{

    path: "/",
    errorElement: <h1>Error 404</h1>,
    // children[
    //   element:
    // ]
  }
  
  ])

  return (
    <>
    
    <h1>Hey bro welcome to routes</h1>
    <RouterProvider router={router}/>
    </>
  )
}

export default App

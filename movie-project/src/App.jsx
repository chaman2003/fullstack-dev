import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Favourites from './Pages/Favourites'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

function App() {

const router = createBrowserRouter([
  {
    element:<Navbar />,
    children:[
      {
     path: "/",
     element: <Home />,
   },
   {
     path: "/favourites",
     element: <Favourites />,
   },
    ]
  }
])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
    
  )
}

export default App



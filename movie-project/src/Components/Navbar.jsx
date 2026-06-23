import "../styles/navbar.css"
import { Link, Outlet } from 'react-router-dom'

function Navbar() {

  return (
    <div>
      <nav className="navbar" >
        <Link to="/">Home</Link>
        <Link to="/favourites">Favourites</Link>
          
      </nav>
      <Outlet />
    </div>
  )
}
export default Navbar  
 
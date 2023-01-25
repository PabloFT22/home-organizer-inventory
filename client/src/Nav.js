import { Link } from 'react-router-dom'

function Nav() {

  // console.log(loggedInUser)
    return (
      
      <nav>
        <div id="nav-div">
            <Link className="nav-links" to="/">Home</Link>
            <Link className="nav-links" to="/login">Login</Link>
        </div>
      </nav>
    )
}

export default Nav;
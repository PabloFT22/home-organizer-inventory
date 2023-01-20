import { Link } from 'react-router-dom'

function Nav(loggedInUser) {
    return (
        <>
        <nav>
        <div>
          { loggedInUser ?
          (
          <>
          <Link to="/">Home</Link>
          <Link to="/locations">Locations</Link>
          <Link to="/items">Items</Link>
          </>
          )
          :
          (
            <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            </>
          )
            }
        </div>
      </nav>
        </>
    )
}

export default Nav;
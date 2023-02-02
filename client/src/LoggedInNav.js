import { Link } from 'react-router-dom'

function LoggedInNav({ loggedInUser, handleLogOut}) {

  // console.log(loggedInUser)
    return (
        
        <nav>
            {loggedInUser ? <div id="nav-div">
            
            <Link className="nav-links" to="/">Home</Link>
            <Link className="nav-links" to="/locations">Locations</Link>
            <Link className="nav-links" to="/items">Items</Link>

            <p className="app-name-abbr">OCD</p>

            <button className="logout-btn" onClick={handleLogOut}>
                Logout
            </button> 
            
            </div> : 
                <nav>
                  <div id="nav-div">
                      <Link className="nav-links" to="/">Home</Link>
                      <Link className="nav-links" to="/login">Login</Link>
                  </div>
                </nav>
            }
            {/* <div id="nav-div">
            
            <Link className="nav-links" to="/">Home</Link>
            <Link className="nav-links" to="/locations">Locations</Link>
            <Link className="nav-links" to="/items">Items</Link>

            <p className="app-name-abbr">OCD</p>

            <button className="logout-btn" onClick={handleLogOut}>
                Logout
            </button> 
            
            </div> */}
        </nav>
    
    )
}

export default LoggedInNav;
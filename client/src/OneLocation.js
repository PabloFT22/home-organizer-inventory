import { Link } from 'react-router-dom'

function OneLocation() {
    return (
        <>
        <div>
            <Link to="/locations">
            <button>Back to Locations</button>
            </Link>
        </div>
        
        <h1>Name of Location</h1>
        <h3>List of items in this location</h3>
        </>
    )
}

export default OneLocation;
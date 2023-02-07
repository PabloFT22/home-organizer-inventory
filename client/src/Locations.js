import { Link } from 'react-router-dom'
import { useState } from 'react';

function Locations({loggedInUser, loggedInUserLocations, submitHandlerNewLocation, changeHandlerNewLocationName, newLocation, setLoggedInUserLocations}) {
  
  const [updatingLocationId, setUpdatingLocationId] = useState(null);
  const [updateLocation, setUpdateLocation] = useState({});

  const handleUpdateClick = (id, location) => {
    setUpdatingLocationId(id);
    setUpdateLocation(location);
  }

  const handleUpdateChange = (e) => {
    setUpdateLocation({...updateLocation, [e.target.name]: e.target.value});
  }

  const handleUpdateSubmit = (e, id) => {
    e.preventDefault();
    // Make a PATCH request to the server to update the location
    fetch(`/locations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateLocation),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(() => {
        // Update the location in the state
        const updatedLocations = loggedInUserLocations.map(location => {
          if (location.id === id) {
            return updateLocation;
          }
          return location;
        });
        setUpdatingLocationId(null);
        setUpdateLocation({});
        setLoggedInUserLocations(updatedLocations)
      });
  }

  return (
    <div className='locations-container'>
      <h1 className="locations-heading">Welcome to the Locations Portal</h1>
      {loggedInUser ? <h3>Hello, {loggedInUser.name}. Can we help you organize or find items?</h3> : console.log("yo")} 
      {loggedInUserLocations.map((eachLocation)=>{
        return(
          <div className="location-list-container">
          <li className="location-list">
          <Link to={`/locations/${eachLocation.id}`}>
            <button className="each-location-btn">{eachLocation.name}</button>
          </Link>
          <button className="update-btn" onClick={() => handleUpdateClick(eachLocation.id, eachLocation)}>Update</button>
          {updatingLocationId === eachLocation.id && (
          <form className="hidden-update-form" onSubmit={(e) => handleUpdateSubmit(e, eachLocation.id)}>
            <label className="hidden-form-label">Update Location</label>
            <input className="hidden-form-input" onChange={handleUpdateChange} name="name" value={updateLocation.name}/>
            <input className="hidden-form-submit" type="submit"/>
          </form>
          )}
          </li>
          </div>
        )
      })}
      <div>
        <Link to="/items">
          <button id="see-items-btn">See all Items</button>
        </Link>
      </div>
      <br/>
      <form  id="add-location-form" onSubmit={submitHandlerNewLocation}>
        <label id="add-location-form-label">Add Location</label>
        <input className="add-location-input"onChange={changeHandlerNewLocationName} name="name" value={newLocation.name}/>
        <input id="add-location-btn" type="submit"/>
      </form>
    </div>
  )
}

export default Locations;



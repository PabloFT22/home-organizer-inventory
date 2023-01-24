import { Link } from 'react-router-dom'

// function Locations({loggedInUser, handleLogOut, loggedInUserLocations, submitHandlerNewLocation, changeHandlerNewLocationName, newLocation}) {

//     // console.log(loggedInUserLocations)
 
//     return (
//         <>
//             <h1>Here are all the locations/Rooms</h1>

           
//             {loggedInUser ? <h3>Whats good, {loggedInUser.name} ?!</h3> : console.log("yo")} 
//             <button onClick={handleLogOut}>
//                 Logout
//             </button> 

//            <br/>
//            <br/>
//            <br/>
            
//             {loggedInUserLocations.map((eachLocation)=>{
//             return(<li ><Link to={`/locations/${eachLocation.id}`}><button>{eachLocation.name}</button></Link></li>)
//             })}

//            <br/>
//            <br/>
//            <br/>

//         <div>
//             <Link to="/items">
//             <button>See all Items</button>
//             </Link>
//         </div>

//         {/* <OneLocation eachLocation={eachLocation}/> */}

//         <br/>
//         <br/>
//         <br/>

//             <form onSubmit={submitHandlerNewLocation}>
//                 <label>Add Location</label>
//                 <input onChange={changeHandlerNewLocationName} name="name" value={newLocation.name}/>
//                 <input type="submit"/>
//             </form>
//         </>
//     )
// }

import { useState } from 'react';

function Locations({loggedInUser, handleLogOut, loggedInUserLocations, submitHandlerNewLocation, changeHandlerNewLocationName, newLocation, setLoggedInUserLocations}) {
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
                // update the state with updated locations
            });
    }

    return (
        <>
            <h1>Here are all the locations/Rooms</h1>

            {loggedInUser ? <h3>Whats good, {loggedInUser.name} ?!</h3> : console.log("yo")} 
            <button onClick={handleLogOut}>
                Logout
            </button> 

            <br/>
            <br/>
            <br/>
            
            {loggedInUserLocations.map((eachLocation)=>{
                return(
                    <li>
                        <Link to={`/locations/${eachLocation.id}`}>
                            <button>{eachLocation.name}</button>
                        </Link>
                        <button onClick={() => handleUpdateClick(eachLocation.id, eachLocation)}>Update</button>
                        {updatingLocationId === eachLocation.id && (
                            <form onSubmit={(e) => handleUpdateSubmit(e, eachLocation.id)}>
                                <label>Update Location</label>
                                <input onChange={handleUpdateChange} name="name" value={updateLocation.name}/>
                                <input type="submit"/>
                            </form>
                        )}
                    </li>
                )
            })}
            <br/>
            <br/>
            <br/>

         <div>
             <Link to="/items">
             <button>See all Items</button>
             </Link>
         </div>

         {/* <OneLocation eachLocation={eachLocation}/> */}

         <br/>
         <br/>
         <br/>

             <form onSubmit={submitHandlerNewLocation}>
                 <label>Add Location</label>
                 <input onChange={changeHandlerNewLocationName} name="name" value={newLocation.name}/>
                 <input type="submit"/>
             </form>
         </>
    )
}



export default Locations;



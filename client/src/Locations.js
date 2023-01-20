import { Link } from 'react-router-dom'
// import OneLocation from './OneLocation';

function Locations({loggedInUser, handleLogOut, loggedInUserLocations, submitHandlerNewLocation, changeHandlerNewLocationName, newLocation}) {

    // console.log(loggedInUser)
 
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
            return(<li ><Link to={`/locations/${eachLocation.id}`}><button>{eachLocation.name}</button></Link></li>)
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
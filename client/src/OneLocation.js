import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

function OneLocation({loggedInUser}) {
    const {id} = useParams()

    console.log(loggedInUser.locations)

    const userItems = loggedInUser.items.filter((eachItem)=>{
        return parseInt(eachItem.location_id) === parseInt(id)
    })

    const itemArray = userItems.map((item)=>{
        return (
            <li>{item.name}</li>
        )
    })
    // console.log(userItems)

    const userLocations = loggedInUser.locations.filter((eachLocation)=>{
        return parseInt(eachLocation.location_id) === parseInt(id)
    })
    // console.log(userLocations)

    const LocationArray = userLocations.map((location)=>{
        return (<p>{location.name}</p>)
    })

    return (
        <>
        <div>
            <Link to="/locations">
            <button>Back to Locations</button>
            </Link>
        </div>
        
        <div>{LocationArray}</div>
        <ul>{itemArray}</ul>
        </>
    )
}

export default OneLocation;
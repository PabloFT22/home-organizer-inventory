
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

function OneLocation({loggedInUser}) {
    const {id} = useParams()

    // console.log(loggedInUser.locations)

    const userItems = loggedInUser.items.filter((eachItem)=>{
        return parseInt(eachItem.location_id) === parseInt(id)
    })

    const itemArray = userItems.map((item)=>{
        return (
            <li>{item.name}</li>
        )
    })
    // console.log(userItems)

    const userLocation = loggedInUser.locations.filter((location)=>{
        return parseInt(location.id) === parseInt(id)
    })
    // console.log(userLocation[0].name)

    const clickedLocation = userLocation[0].name

    return (
        <>
        <div>
            <Link to="/locations">
            <button>Back to Locations</button>
            </Link>
        </div>
        
        <h1>{clickedLocation}</h1>
        <ul>{itemArray}</ul>
        </>
    )
}

export default OneLocation;
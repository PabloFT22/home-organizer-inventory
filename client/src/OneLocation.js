
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
        <div className="each-location-container">
            <div>
                <Link to="/locations">
                <button className="back-to-locations-btn">Back to Locations</button>
                </Link>
            </div>
        
            <h1 id="clicked-location">{clickedLocation}</h1>

            <li className="item-array">{itemArray}</li>
        </div>
    )
}

export default OneLocation;
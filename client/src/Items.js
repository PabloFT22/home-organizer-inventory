// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


// probably do not need setnewitem here
function Items({loggedInUserItems, newItem, setNewItem, handleNewItemSubmit, changeHandlerNewItemInput, loggedInUserLocations, loggedInUser}) {




    return (
        <>
            <h1>Hello here are all your items!</h1>
            <ul>
                {loggedInUserItems.map((eachItem)=>{
            return(<li ><h4 >{eachItem.name}</h4></li>)
            })}
                
            </ul>
            <form onSubmit={handleNewItemSubmit}>
                <label>Add an Item</label>
                <select onChange={changeHandlerNewItemInput} name="location_id">
                <option value={0}> Select a Location </option>
                {
                    loggedInUserLocations.map((eachLocation)=>{
                        return(<option value={eachLocation.id}>{eachLocation.name}</option>)
                    })
                }
                </select>
                <input onChange={changeHandlerNewItemInput} name="name" placeholder="name"/>
                <input onChange={changeHandlerNewItemInput} name="description" placeholder="description" />
                <input onChange={changeHandlerNewItemInput} name="image_url" placeholder="image_url" />
                <input onChange={changeHandlerNewItemInput} name="location_in_room" placeholder="location_in_room" />
                <select onChange={ changeHandlerNewItemInput } name="user_id" >

                <option value={0}> User Creating Item</option>
                <option value={loggedInUser.id}>{loggedInUser.name}</option>
                </select>
                <input type="submit"/>
            </form>
            <br/>
            <br/>
            <br/>
            <div>
                <Link to="/locations">
                <button>Back to Locations</button>
                </Link>
            </div>
        </>
    )
}

export default Items;
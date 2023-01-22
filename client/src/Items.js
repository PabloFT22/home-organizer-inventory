// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from'react'


// probably do not need setnewitem here
function Items({loggedInUserItems, handleNewItemSubmit, changeHandlerNewItemInput, loggedInUserLocations, loggedInUser, handleDeleteItem, setLoggedInUserItemss}) {

///////// Update ///////////
const [editingItemId, setEditingItemId] = useState(null)

function handleUpdateItem(itemId) {
	setEditingItemId(itemId)
}

function handleUpdateItemSubmit(e, itemId) {
	e.preventDefault()
	const updatedItem = {
		name: e.target.name.value,
		description: e.target.description.value,
		image_url: e.target.image_url.value,
		location_in_room: e.target.location_in_room.value
	}
	fetch(`/items/${itemId}`, {
		method: "PATCH",
		body: JSON.stringify(updatedItem),
    headers: {
			"Content-Type": "application/json"
		}
	})
	.then(r => r.response.json())
	.then(data => {
		// update the loggedInUserItems array with the updated item
		setLoggedInUserItemss(prevState => {
			return prevState.map(item => {
				if (item.id === itemId) {
          return {...item, ...updatedItem}
			}
			return item
		})
		})
		setEditingItemId(null)
	})
	.catch(error => console.log(error))
}


    return (
        <>
            <h1>Hello here are all your items!</h1>
            <ul>
                {loggedInUserItems.map((eachItem)=>
								{
            			return(
									<li><h3>{eachItem.name}</h3>
									<p>{eachItem.description}</p>
									<p>{eachItem.location_in_room}</p>
									<img src={eachItem.image_url} alt="product"/>
									<button onClick={() => handleDeleteItem(eachItem.id)}>Delete Item</button>
									<button onClick={() => handleUpdateItem(eachItem.id)}>
              			Update Item
            			</button>
									{editingItemId === eachItem.id ? (
              <form onSubmit={event => handleUpdateItemSubmit(event, eachItem.id)}>
                <label>Update Item</label>
                <input
                  name="name"
                  placeholder="name"
                  defaultValue={eachItem.name}
                />
                <input
                  name="description"
                  placeholder="description"
                  defaultValue={eachItem.description}
                />
                <input
                  name="image_url"
                  placeholder="image_url"
                  defaultValue={eachItem.image_url}
                />
                <input
                  name="location_in_room"
                  placeholder="location_in_room"
                  defaultValue={eachItem.location_in_room}
                />
                <input type="submit" value="Update" />
                <button onClick={() => setEditingItemId(null)}>
                  Cancel
                </button>
              </form>
            ) : null}
									</li>
									)
            		})
								}
                
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
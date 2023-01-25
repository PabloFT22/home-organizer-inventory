// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from'react'

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
		console.log(data)
		// update the loggedInUserItems array with the updated item
		setLoggedInUserItemss(prevState => {
			console.log(prevState)
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
  <div className="items-container">   
    <h1 id="header-list-items">Here is a list of all your items!</h1>
      {loggedInUserItems.map((eachItem)=> {
				// console.log(eachItem)
        return(
					<li id="items-list-container" >
            <h3 className="item-info">{eachItem.name}</h3>
						<p className="item-info">{eachItem.category}</p>
						<p className="item-info">{eachItem.description}</p>
						<p className="item-info">{eachItem.location_in_room}</p>
            {/* <p>{eachItem.location}</p> */}
						<img className="item-info" src={eachItem.image_url} alt="product"/>
						<button id="item-delete-btn" onClick={() => handleDeleteItem(eachItem.id)}>Delete Item</button>
						<button className="update-btn" onClick={() => handleUpdateItem(eachItem.id)}>Update Item</button>
						{editingItemId === eachItem.id ? (
              <form className="hidden-update-form" onSubmit={event => handleUpdateItemSubmit(event, eachItem.id)}>
                <label className="hidden-form-label">Update Item</label>
                <input className="hidden-form-input" name="name" placeholder="name" defaultValue={eachItem.name} />
                <input className="hidden-form-input" name="description" placeholder="description" defaultValue={eachItem.description} />
                <input className="hidden-form-input" name="image_url" placeholder="image_url" defaultValue={eachItem.image_url} />
                <input className="hidden-form-input" name="location_in_room" placeholder="location_in_room" defaultValue={eachItem.location_in_room}/>
                <input id="hidden-form-submit" type="submit" value="Update" />
                <button id="cancel-update-item-btn" onClick={() => setEditingItemId(null)}>Cancel</button>
              </form>
            ) : null}
					</li>
				)
      })}
    <form id="add-item-form" onSubmit={handleNewItemSubmit}>
      <label id="add-item-label">Add an Item</label>
      <select className="item-form-select" onChange={changeHandlerNewItemInput} name="location_id">
      <option className="add-item-select-options" value={0}> Select a Location </option>
        {
          loggedInUserLocations.map((eachLocation)=>{
            return(<option className="add-item-select-options" value={eachLocation.id}>{eachLocation.name}</option>)
          })
        }
      </select>
      <input className="add-item-input" onChange={changeHandlerNewItemInput} name="name" placeholder="name"/>
      <input className="add-item-input" onChange={changeHandlerNewItemInput} name="description" placeholder="description" />
      <input className="add-item-input" onChange={changeHandlerNewItemInput} name="image_url" placeholder="image_url" />
      <input className="add-item-input" onChange={changeHandlerNewItemInput} name="location_in_room" placeholder="location_in_room" />
      <select className="item-form-select" onChange={ changeHandlerNewItemInput } name="user_id" >
        <option className="add-item-select-options" value={0}> User Creating Item</option>
        <option className="add-item-select-options" value={loggedInUser.id}>{loggedInUser.name}</option>
      </select>
      <input id="add-item-submit-btn" type="submit"/>
    </form>
    <Link id="back-btn-container" to="/locations">
        <button className="back-to-locations-btn" >Back to Locations</button>
    </Link>
  </div>
  )
}

export default Items;
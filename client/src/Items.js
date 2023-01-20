// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Items({loggedInUserItems, newItem, setNewItem, handleNewItemSubmit, changeHandlerNewSnackInput, loggedInUserLocations}) {




    return (
        <>
            <h1>Hello here are all your items!</h1>
            <ul>
                {loggedInUserItems.map((eachItem)=>{
            return(<li ><h4 >{eachItem.name}</h4></li>)
            })}
                
            </ul>
            <form onSubmit={handleNewItemSubmit}>
                <select onChange={changeHandlerNewSnackInput}>
                <option value={0}> Select a Woobly </option>
                {
                    loggedInUserLocations.map((eachLocation)=>{
                        return(<option value={eachLocation.id}>{eachLocation.name}</option>)
                    })
                }
                </select>
                <label>Add Item</label>
                <input onChange={changeHandlerNewSnackInput} name="name" value={newItem.name}/>
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
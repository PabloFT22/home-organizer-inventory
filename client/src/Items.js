// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Items({loggedInUserItems}) {

    // const handleOnClick =(e)=>{
    //     e.preventDefault();
        
    // }

    // const allItems = loggedInUserItems.map((eachItem)=>{
    //     return(<li ><h4 >{eachItem.name}</h4></li>)
        
    //     })

    // console.log(loggedInUserItems[0])

    // fetch(`items/${loggedInUserItems[0].id}`, {
    //     method:"PATCH",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(loggedInUserItems)
    //     })
    // .then(res => res.json())
    // .then(console.log)




    return (
        <>
            <h1>Hello here are sll your items!</h1>
            <ul>


                
                {loggedInUserItems.map((eachItem)=>{
            return(<li ><h4 >{eachItem.name}</h4></li>)
            
            })}
                
            </ul>
            <form>
                <input type="name"name/>
            </form>
            {/* <button onClick={()=>{}}>Back to Locations</button> */}
            <div>
                <Link to="/locations">
                <button>Back to Locations</button>
                </Link>
            </div>
        </>
    )
}

export default Items;
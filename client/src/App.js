import './App.css';
import { Route, Routes } from "react-router-dom"
import {useState, useEffect} from 'react';
import Home from './Home';
import Login from './Login';
import Locations from './Locations';
import { useNavigate } from 'react-router-dom'
import Items from './Items';
import OneLocation from './OneLocation';
import Nav from './Nav';

function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)
  // console.log(loggedInUser)
  const [loggedInUserLocations, setLoggedInUserLocations] = useState([])
  // console.log(loggedInUserLocations)
  const [loggedInUserItems, setLoggedInUserItemss] = useState([])
  

  let navigate = useNavigate();

  useEffect(
    ()=>{

      // console.log("🙌 BYEBUG")
      fetch("/userInSession")
      .then(res=>res.json())
      .then(userAlreadyLoggedIn => {
        // console.log(userAlreadyLoggedIn)
        if (userAlreadyLoggedIn) { 
          setLoggedInUser(userAlreadyLoggedIn)
          setLoggedInUserLocations(userAlreadyLoggedIn.locations)
          setLoggedInUserItemss(userAlreadyLoggedIn.items)
        } else
        {console.log("no one is logged in")}
      
      })
    
      // console.log(setLoggedInUserLocations)

    }
    ,[]
  )

  // const [userLogin, setUserLogin] = useState(
  //   {
  //     email: "",
  //     password: ""
  //   }
  // )
  // // console.log(userLogin)



 
  const handleLogOut =()=>{
    fetch("/logout", {method: "DELETE"})
    // .then(r=> r.json())
    .then((deleteResponse) =>{
      if (deleteResponse.ok){
        setLoggedInUser(null)
        setLoggedInUserLocations([])
        navigate("/login")
      }
      // setLoggedInUser(null)
      // setLoggedInUserLocations([])
      // navigate("/login")
    })
  }

  const [newLocation, updateNewLocationInfo] = useState({
    name: ""
  })
  // console.log(newLocation)
  
  const changeHandlerNewLocationName=(e)=>{
    updateNewLocationInfo({...newLocation, name: e.target.value})
  }

  
  ////////////// New Location Post
  const submitHandlerNewLocation=(e)=>{
    e.preventDefault()
    fetch("/locations", {
      method: "POST",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify(newLocation)
    })
    .then(r=>r.json())
    .then(newLocationFromBackend =>{

      fetch("/fresh_bath_of_user_locations")
        .then(r => r.json())
        .then(freshBatchOfLocations => setLoggedInUserLocations(freshBatchOfLocations))

        updateNewLocationInfo({
          name: ""
        })

    })
  }
//  console.log(loggedInUser) // is there some way i can throw this into l127 as a value?
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    image_url:"",
    location_in_room: "",
    location_id: "",
    user_id: "",
  })

  const handleNewItemSubmit=(e)=>{
    e.preventDefault()
    console.log(newItem)
    fetch("/items", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newItem)
    })
    .then(r=>r.json())
    .then((itemFromRails)=>{
      console.log(itemFromRails)
      setLoggedInUserItemss([...loggedInUserItems, itemFromRails])
    })
  }

  const changeHandlerNewItemInput =(e)=>{
    setNewItem({...newItem, [e.target.name]: e.target.value})
  }

  /////////////// Delete Item ////////////////
  function handleDeleteItem(itemId) {
    fetch(`/items/${itemId}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      // remove the deleted item from the loggedInUserItems array
      setLoggedInUserItemss(loggedInUserItems.filter(item => item.id !== itemId));
    })
    .catch(error => console.log(error))
  }


  return (

    <> 
      <Nav loggedInUser={loggedInUser}/>

      <Routes>
        <Route path="/login" element={<Login loggedInUser={loggedInUser} setLoggedInUserItemss={setLoggedInUserItemss} setLoggedInUser={setLoggedInUser} setLoggedInUserLocations={setLoggedInUserLocations}/>} />
        {loggedInUser && <Route path="/locations">
          <Route index element={<Locations setLoggedInUserLocations={setLoggedInUserLocations}  handleLogOut={handleLogOut} loggedInUserLocations={loggedInUserLocations} loggedInUser={loggedInUser} submitHandlerNewLocation={submitHandlerNewLocation} changeHandlerNewLocationName={changeHandlerNewLocationName} newLocation={newLocation}/>}/>
          <Route path=":id" element={<OneLocation loggedInUser={loggedInUser} />} />
        </Route>}
        {loggedInUser && <Route path="/items" element={<Items setLoggedInUserItemss={setLoggedInUserItemss} handleDeleteItem={handleDeleteItem} loggedInUser={loggedInUser}loggedInUserItems={loggedInUserItems} handleNewItemSubmit={handleNewItemSubmit} changeHandlerNewItemInput={changeHandlerNewItemInput} setNewItem={setNewItem} newItem={newItem} loggedInUserLocations={loggedInUserLocations}/>}/>}
        <Route exact path="/" element={<Home />} />
        
      </Routes>
    </>

  );
    
}

export default App;

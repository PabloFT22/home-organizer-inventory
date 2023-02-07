import './App.css';
import { Route, Routes } from "react-router-dom"
import {useState, useEffect} from 'react';
import Home from './Home';
import Login from './Login';
import Locations from './Locations';
import { useNavigate } from 'react-router-dom'
import Items from './Items';
import OneLocation from './OneLocation';
import NavBar from './NavBar';
import Title from './Title';

function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loggedInUserLocations, setLoggedInUserLocations] = useState([])
  const [loggedInUserItems, setLoggedInUserItemss] = useState([])
  
  let navigate = useNavigate();
  
  useEffect(() => {
    fetch("/userInSession").then((res) => {
      if (res.ok) {
        res.json().then((userAlreadyLoggedIn) => {
          setLoggedInUser(userAlreadyLoggedIn)
          setLoggedInUserLocations(userAlreadyLoggedIn.locations)
          setLoggedInUserItemss(userAlreadyLoggedIn.items)
        });
      } else 
        console.log("no one is logged in dawg")
    });
  }, []);
 
  // console.log(loggedInUser)
  // console.log(loggedInUserLocations)
  // console.log(loggedInUserItems)

  const handleLogOut =()=>{
    fetch("/logout", {method: "DELETE"})
      .then((deleteResponse) =>{
        if (deleteResponse.ok){
          setLoggedInUser(null)
          setLoggedInUserLocations([])
          setLoggedInUserItemss([])
          navigate("/login")
        }
      })
  }

  const [newLocation, updateNewLocationInfo] = useState({
    name: ""
  })
  
  const changeHandlerNewLocationName=(e)=>{
    updateNewLocationInfo({...newLocation, name: e.target.value})
  }
  
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
    fetch("/items", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newItem)
    })
    .then(r=>r.json())
    .then((itemFromRails)=>{
      setLoggedInUserItemss([...loggedInUserItems, itemFromRails])
    })
  }

  const changeHandlerNewItemInput =(e)=>{
    setNewItem({...newItem, [e.target.name]: e.target.value})
  }

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
      <NavBar loggedInUser={loggedInUser} handleLogOut={handleLogOut} />
      <Title />
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedInUserItemss={setLoggedInUserItemss} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} setLoggedInUserLocations={setLoggedInUserLocations}/>} />
        {loggedInUser && <Route path="/locations">
          <Route index element={<Locations setLoggedInUserLocations={setLoggedInUserLocations}  handleLogOut={handleLogOut} loggedInUserLocations={loggedInUserLocations} loggedInUser={loggedInUser} submitHandlerNewLocation={submitHandlerNewLocation} changeHandlerNewLocationName={changeHandlerNewLocationName} newLocation={newLocation}/>}/>
          <Route path=":id" element={<OneLocation loggedInUser={loggedInUser} />} />
        </Route>}
      {loggedInUser && <Route path="/items" element={<Items setLoggedInUserItemss={setLoggedInUserItemss} handleDeleteItem={handleDeleteItem} loggedInUser={loggedInUser}loggedInUserItems={loggedInUserItems} handleNewItemSubmit={handleNewItemSubmit} changeHandlerNewItemInput={changeHandlerNewItemInput} setNewItem={setNewItem} newItem={newItem} loggedInUserLocations={loggedInUserLocations}/>}/>}  
      </Routes>
    </>
  );   
}

export default App;

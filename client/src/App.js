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
        console.log(userAlreadyLoggedIn)
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

  const [userLogin, setUserLogin] = useState(
    {
      email: "",
      password: ""
    }
  )
  // console.log(userLogin)


  const handleChange=(e)=>{
    // console.log(e)
    setUserLogin({...userLogin, [e.target.name]: e.target.value})
  }

  const handleLoginSubmit=(e)=> {
    e.preventDefault()

      // console.log("🙌 BYEBUG")
    fetch("/login", 
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userLogin)
    })
    .then(response => response.json())
    .then(loggedIn => {
      // console.log(loggedIn)
      setLoggedInUser(loggedIn)
      setLoggedInUserLocations(loggedIn.locations)
      navigate("/locations")
    })
  }
 
  const handleLogOut =()=>{
    fetch("/logout", {method: "DELETE"})
    .then(r=> r.json())
    .then(deleteResponse =>{
      setLoggedInUser(null)
      setLoggedInUserLocations([])
      navigate("/login")
    })
  }

  const [newLocation, updateNewLocationInfo] = useState({
    name: ""
  })
  // console.log(newLocation)
  
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

  return (

    <> 
      <Nav loggedInUser={loggedInUser}/>

      <Routes>
        <Route path="/login" element={<Login handleChange={handleChange} handleLoginSubmit={handleLoginSubmit}/>} />
        <Route path="/locations" element={<Locations handleLogOut={handleLogOut} loggedInUserLocations={loggedInUserLocations} loggedInUser={loggedInUser} submitHandlerNewLocation={submitHandlerNewLocation} changeHandlerNewLocationName={changeHandlerNewLocationName} newLocation={newLocation}/>}>
          <Route path=":id" element={<OneLocation />} />
        </Route>
        {/* <Route path="/locations" element={allLocationsOfOneUser}/> */}
        <Route path="/items" element={<Items loggedInUserItems={loggedInUserItems}/>}/>
        <Route exact path="/" element={<Home />} />
        
      </Routes>
    </>

  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import {useState, useEffect} from 'react';

function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)
  console.log(loggedInUser)

  const [loggedInUserLocations, setLoggedInUserLocations] = useState([])
  console.log(loggedInUserLocations)

  useEffect(
    ()=>{

      // console.log("🙌 BYEBUG")
      fetch("/userInSession")
      .then(res=>res.json())
      .then(userAlreadyLoggedIn => {
        setLoggedInUser(userAlreadyLoggedIn)
        setLoggedInUserLocations(userAlreadyLoggedIn.locations)
      })

      // fetch("/locations")  // may  need to change this to room/location
      // .then(r => r.json)
      // .then(console.log)
    }
    ,[]
  )


  const [userLogin, setUserLogin] = useState(
    {
      email: "",
      password: ""
    }
  )
  console.log(userLogin)



  const handleChange=(e)=>{
    console.log(e)
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
      console.log(loggedIn)
      setLoggedInUser(loggedIn)
      setLoggedInUserLocations(loggedIn.locations)
    })

  }
 
  const handleLogOut =()=>{
    fetch("/logout", {method: "DELETE"})
    .then(r=> r.json())
    .then(deleteResponse =>{
      setLoggedInUser(null)
      setLoggedInUserLocations([])
    })
  }

  const [newLocation, updateNewLocationInfo] = useState({
    name: ""
  })
  console.log(newLocation)
  
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

      // ------------- Using response from backend -------------
        // setLoggedInUserLocations([...loggedInUserLocations, newLocationFromBackend])
        // updateNewLocationInfo({
        //   name: ""
        // })
      // ------------- Using response from backend -------------

    })
    // .then(console.log)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {loggedInUser ? 
        (
          <>
            <h3>What's good, {loggedInUser.name} ?!</h3> 
            <button onClick={handleLogOut}>Logout</button> 
            {loggedInUserLocations.map((eachLocation)=>{
              return(<h4>{eachLocation.name}</h4>)
            })}
          </>
        )
        : (<><h1>Welcome! login!!</h1>
        <br/>
        <form onSubmit={handleLoginSubmit}>
          <input type="text" placeholder="email" onChange={handleChange} name="email"/>
          <input type="password" placeholder="password" onChange={handleChange} name="password"/>
          <input type="submit" value="login" />
        </form></>)}

        <form onSubmit={submitHandlerNewLocation}>
          <input onChange={changeHandlerNewLocationName} name="name" value={newLocation.name}/>
          <input type="submit"/>
        </form>


        <h2>Sign up?</h2>





      </header>
    </div>
  );
}

export default App;

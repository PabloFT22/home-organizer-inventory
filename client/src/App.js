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
    })

  }
 
  const handleLogOut =()=>{
    fetch("/logout", {method: "DELETE"})
    .then(r=> r.json())
    .then(deleteResponse =>{setLoggedInUser(null)})
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
        : <></>}
        <h1>Welcome! login!!</h1>
        <br/>
        <form onSubmit={handleLoginSubmit}>
          <input type="text" placeholder="email" onChange={handleChange} name="email"/>
          <input type="password" placeholder="password" onChange={handleChange} name="password"/>
          <input type="submit" value="login" />
        </form>




        <h2>Sign up?</h2>





      </header>
    </div>
  );
}

export default App;

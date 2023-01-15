import logo from './logo.svg';
import './App.css';

import {useState, useEffect} from 'react';

function App() {

const [userLogin, setUserLogin] = useState(
  {
    email: "",
    password: ""
  }
)
console.log(userLogin)


const [loggedInUser, setLoggedInUser] = useState(null)
console.log(loggedInUser)


const handleChange=(e)=>{
  console.log(e)
  setUserLogin({...userLogin, [e.target.name]: e.target.value})
}

const handleLoginSubmit=(e)=> {
  e.preventDefault()

    console.log("🙌 BYEBUG")
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
 


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {loggedInUser ? <h3>What's good, {loggedInUser.name} ?!</h3> : <></>}
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

import { useNavigate } from 'react-router-dom'
import {useState} from 'react';

function Login({setLoggedInUser, setLoggedInUserLocations, setLoggedInUserItemss}) {
  
  let navigate = useNavigate();
  
  const [userLogin, setUserLogin] = useState(
    {
      email: "",
      password: ""
    }
  )

  const [errors, setErrors] = useState([])

  const handleChange=(e)=>{
    setUserLogin({...userLogin, [e.target.name]: e.target.value})
  }
    
  const handleLoginSubmit=(e)=> {
    e.preventDefault()
    fetch("/login", 
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userLogin)
    })

      .then(res => {
        if (res.ok) {
          res.json().then(userLogin =>{
          setLoggedInUser(userLogin)
          setLoggedInUserLocations(userLogin.locations)
          setLoggedInUserItemss(userLogin.items)
          navigate("/locations")
          })
        } else {
          res.json().then(json => setErrors(json.error))
        }
      })
  }

  return (
    <div className="login-wraper">
      <h1 id="login-h1" >Please Log In</h1>
      <br/>
      <form onSubmit={handleLoginSubmit}>
        <label className="login-label">Email
        <input type="text" placeholder="email" onChange={handleChange} name="email"/>
        </label>
        <label className="login-label">Password
        <input type="password" placeholder="password" onChange={handleChange} name="password"/>
        </label>
        <input id="input-submit" type="submit" value="login" /> 
      </form>
      {errors ? <div id="error-message">{errors}</div> : null} 
    </div>
  )
}

export default Login;
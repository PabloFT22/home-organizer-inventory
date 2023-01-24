import { useNavigate } from 'react-router-dom'
import {useState} from 'react';

function Login({setLoggedInUser, setLoggedInUserLocations}) {

    let navigate = useNavigate();

    const [userLogin, setUserLogin] = useState(
        {
          email: "",
          password: ""
        }
      )
    const [errors, setErrors] = useState([])

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
        // .then(response => response.json())
        // .then(loggedIn => {
        //   // console.log(loggedIn)
        //   setLoggedInUser(loggedIn)
        //   setLoggedInUserLocations(loggedIn.locations)
        //   navigate("/locations")

        .then(res => {
            if (res.ok) {
                res.json().then(userLogin =>{
                setLoggedInUser(userLogin)
                setLoggedInUserLocations(userLogin.locations)
                navigate("/locations")
                })
            } else {
                res.json().then(json => setErrors(json.error))
            }
        })
      }



    //   fetch(`/login`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(patient)
    // })
    //     .then(res => {
    //         if (res.ok) {
    //             res.json().then(patient => {
    //                 setCurrentUser(patient)
    //                 navigate("/home")
    //             })
    //         } else {
    //             res.json().then(json => setErrors(json.errors))
    //         }
    //     })


    return (
        <div className="login-wraper">
            <h1>Please Log In</h1>
                <br/>
            <form onSubmit={handleLoginSubmit}>
                <label>Email
                <input type="text" placeholder="email" onChange={handleChange} name="email"/>
                </label>
                <label>Password
                <input type="password" placeholder="password" onChange={handleChange} name="password"/>
                </label>
                <input type="submit" value="login" />
                
            </form>
            {errors ? <div>{errors}</div> : null} 


        </div>
    )
}

export default Login;
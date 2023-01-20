function Login({handleChange, handleLoginSubmit}) {







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


        </div>
    )
}

export default Login;
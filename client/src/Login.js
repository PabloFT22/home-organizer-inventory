function Login({handleChange, handleLoginSubmit}) {







    return (
        <>
            <h1>Login!!!</h1>

            <h2>Welcome! login!!</h2>
                <br/>
            <form onSubmit={handleLoginSubmit}>
                <input type="text" placeholder="email" onChange={handleChange} name="email"/>
                <input type="password" placeholder="password" onChange={handleChange} name="password"/>
                <input type="submit" value="login" />
            </form>


        </>
    )
}

export default Login;
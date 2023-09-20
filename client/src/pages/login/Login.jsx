import { useContext, useRef, useState } from "react";
import "./login.css"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const [error,setError]=useState(false);
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch,isFetching} = useContext(Context);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit= async (e)=>{
    e.preventDefault();
    setError(false);
    dispatch({type:"LOGIN_START"});   //on clicking the button this state starts

    try{
      const res= await axios.post(backendURL+"/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload: res.data})
    }catch(err){
      setError(true)
      dispatch({type:"LOGIN_FAILURE"})

    }
  }
  
  return (
    <div className="login">
        <span className="loginTitle">Login </span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label >Username</label>
            <input type="text" className="loginInput" placeholder="Enter your username....." ref={userRef} />
            <label >Password</label>
            <input type="password" className="loginInput" placeholder="Enter your password....." ref={passwordRef} />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form>
        <button className="loginRegisterButton">
            <Link className="link" to="/register">Register</Link>
        </button>
        {error && <span style={{color:"red", marginTop:"10px"}}>Incorrect Credentials</span>}
    </div>
  )
}

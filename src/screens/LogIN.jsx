import React,{useContext,useRef} from "react"

import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext";


export const LogIN =()=>{
    const pageTitle = `${"S&TManager-LogIn"}`;
    document.title = pageTitle;
    
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    let navigate=useNavigate();

    let {loginUser}=useContext(AuthContext)


    return(
        <>
        <div className="outside-form-container">
        <div className="form-container">
    <h1>
        LogIn
    </h1>
    <div className="inside-form-container">
        <form onSubmit={loginUser}>
            <label htmlFor="userName">UserName</label>
            <br/>
            <input ref={usernameRef} type="text" placeholder="UserName" id="userName" name="userName"/>
            <br/>

            <label htmlFor="password">Password</label>
            <br/>
            <input ref={passwordRef} type="password" placeholder="*******" id="password" name="password"/>
            <br/>

            <button className="btn btn-outline-dark" type="submit" >LogIn</button>
        </form>
        </div>
        Don't Have an Account?
        <button className="btn btn-outline-dark" onClick={()=>{
            navigate("/Register")
        }}>Register</button>
<br/>


           </div> 
           </div>
        </>
    )
}
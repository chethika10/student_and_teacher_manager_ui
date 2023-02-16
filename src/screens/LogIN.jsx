import React,{useState} from "react"

import { useNavigate } from "react-router-dom"

export const LogIN =()=>{
    const pageTitle = `${"S&TManager-LogIn"}`;
    document.title = pageTitle;
    
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    let navigate=useNavigate();

    return(
        <>
        <div className="outside-form-container">
        <div className="form-container">
    <h1>
        LogIn
    </h1>
    <div className="inside-form-container">
        <form >
            <label htmlFor="userName">UserName</label>
            <br/>
            <input value={userName} onChange={(e)=>setUserName(e.target.value)}type="text" placeholder="UserName" id="userName" name="userName"/>
            <br/>

            <label htmlFor="password">Password</label>
            <br/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}type="password" placeholder="*******" id="password" name="password"/>
            <br/>

            <button type="submit">LogIn</button>
        </form>
        </div>
        Don't Have an Account?
        <button onClick={()=>{
            navigate("/Register")
        }}>Register</button>
<br/>
<button onClick={()=>{
            navigate("/Home")
        }}>Home</button>

           </div> 
           </div>
        </>
    )
}
import React,{useState} from "react"

import { useNavigate } from "react-router-dom"

export const LogIN =()=>{
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    let navigate=useNavigate();

    return(
        <>
    <h1>
        LogIn
    </h1>
        <form >
            <label htmlFor="userName">UserName</label>
            <input value={userName} onChange={(e)=>setUserName(e.target.value)}type="text" placeholder="UserName" id="userName" name="userName"/>
            <br/>

            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}type="password" placeholder="*******" id="password" name="password"/>
            <br/>
        </form>
        Have an Account?
        <button onClick={()=>{
            navigate("/Register")
        }}>Register</button>
            
        </>
    )
}
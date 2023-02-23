import React,{  } from "react"

import { useNavigate } from "react-router-dom"


export const Home =()=>{

    const pageTitle = `${"S&TManager-Home"}`;
    document.title = pageTitle;

    let navigate=useNavigate();


    return(
        <>
        <div className="outside-form-container">
        <div className="form-container">
        <h1>Register</h1>
        <div className="inside-form-container">
        <button type="button" className="btn btn-primary" onClick={()=>{
            navigate("/LogIN")
        }}>Login</button>

        <button type="button" className="btn btn-primary" onClick={()=>{
            navigate("/userDetails")
        }}>userDetails</button>


        </div>
        </div>
        </div>
        </>
    )
}
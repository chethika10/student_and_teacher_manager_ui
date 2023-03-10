import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../services/useHttp"

export const UserDetails=()=>{

    const [user,setUser]=useState({})
    const http=useHttp()
    const navigate=useNavigate();

    const getdata=async ()=>{
        const {data}=await http.get("/profile")
        setUser(data)
        console.log(data)
        return data;
    }
    const calcAge=(date)=>{
        var today=new Date();
        var birthday=new Date(date);
        var age =today.getFullYear()-birthday.getFullYear();
        if (age<0){
            age=0;
        }
        return age;
    }
    const getRole=(role)=>{
        if(role==="STUDENT"){
            return "Student";
        }
        else if(role==="TEACHER"){
            return "Teacher";
        }
        else if (role==="ADMIN"){
            return "Manager";
        }
        else{
            return "";
        }
    }

    useEffect(() => {
        setUser(getdata() )   
      }, []);

    return(
    <>
        <div className="outside-form-container">
        <div className="form-container">
        <h1>Account Details</h1>
        <div className="inside-form-container">
            
            <label htmlFor="name">Name</label>
            <br/>
            <input readOnly value={user.name||""}  type="text"  id="name" name="name"/>
            <br/>

            <label htmlFor="date">Birthday</label>
            <br/>
            <input readOnly value={ user.birthDay||""} type="text"  id="Birthday" name="Birthday"/>
            <br/>

            <label htmlFor="age">Age</label>
            <br/>
            <input readOnly type="text" value={String(calcAge( user.birthDay))||""} id="age" name="age"/>
            <br/>

            <label htmlFor="email">Email</label>
            <br/>
            <input readOnly type="email" value={ user.email||""} id="email" name="email"/>
            <br/>

            <label htmlFor="userName">UserName</label>
            <br/>
            <input readOnly type="email" value={ user.userName||""} id="email" name="email"/>
            <br/>

            <label htmlFor="role">Registered As a </label>
            <input readOnly type="text" value={ getRole( user.role)||""} id="role" name="role"/>
            <br/>

            

            <button type="button" className="btn btn-outline-dark" onClick={()=>navigate("/editaccount")}>Edit profile</button>
            <button type="button" className="btn btn-outline-dark" onClick={()=>navigate("/ChangeCredentials")}>Change Credentials</button>
        </div>
        </div>
        </div>
    </>
    )
}
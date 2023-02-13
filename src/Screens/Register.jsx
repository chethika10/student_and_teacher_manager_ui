import React,{useState} from "react"

import { 
  useNavigate } from "react-router-dom"


export const Register =()=>{

    const pageTitle = `${"S&TManager-Register"}`;
    document.title = pageTitle;

    const [name,setName]=useState("");
    const [date,setDate]=useState("");
    const [email,setEmail]=useState("");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");
    const [role2,setRole2]=useState("");
    const [age,setAge]=useState("");
    // const [user2,setUser2]=useState("");
     const [status,setStatus]=useState("");

     let navigate=useNavigate();
    

    

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
        if(role==="Student"){
            setRole2("Student")
            return "STUDENT";
        }
        else if(role==="Teacher"){
            setRole2("Teacher")
            return "TEACHER";
        }
        else if (role==="Manager"){
            setRole2("Manager")
            return "MANAGER";
        }
        else{
            setRole2("Select...")
            return "";
        }
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        var birthDay=date;
        var emailAddress=email;
        var user2="";
        const user={name,age,birthDay,userName,role,password,emailAddress}
        console.log(user)

        fetch("http://localhost:8080/stmanager/addorupdate",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(res=>res.json())
        .then((result)=>{
            //setUser2(result);
            user2=result;
            
        }).then(()=>{
        if (user2==="" ||user2==="0"||user2===0){
            setStatus("Can not register")
        }else{
            setStatus("you registered as a "+role2)
        }}
        ).catch(()=>{
            setStatus("Can not register")
        })
        
    }

    return(
        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text"  id="name" name="name"/>
            <br/>

            <label htmlFor="date">Birthday</label>
            <input value={date} onChange={
                (e)=>{setDate(e.target.value);setAge(calcAge(e.target.value))}
                } 
                
                type="date" id="Birthday" name="Birthday" />
                <br/>

            <label htmlFor="age">Age</label>
            <input value={age} readOnly type="text" placeholder={age} id="age" name="age"/>
            <br/>

            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}type="email" placeholder="example@example.com" id="email" name="email"/>
            <br/>

            <label htmlFor="userName">UserName</label>
            <input value={userName} onChange={(e)=>setUserName(e.target.value)}type="text" placeholder="UserName" id="userName" name="userName"/>
            <br/>

            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}type="password" placeholder="*******" id="password" name="password"/>
            <br/>

            <label htmlFor="role">Register As a </label>
            <div>
                
                <select value={role2} onChange={(e)=>{setRole(getRole(e.target.value))} }>
                    <option>Select...</option>
                    <option> Student</option>
                    <option> Teacher</option>
                    <option> Manager</option>
                </select>
                
            </div>
            
            <button type="submit">Register</button>
        </form>
        {status}
        <br/>
        Have an Account?
        <button onClick={()=>{
            navigate("/LogIN")
        }}>LogIN</button>


        
        </>
    )
}
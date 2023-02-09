import React,{useState} from "react"

export const Regiser =()=>{

    const [name,setName]=useState("");
    const [date,setDate]=useState("");
    const [email,setEmail]=useState("");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");
    const [age,setAge]=useState("");

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
            return "STUDENT";
        }
        else if(role==="Teacher"){
            return "TEACHER";
        }
        else if (role==="Manager"){
            return "MANAGER";
        }
        else{
            return "";
        }
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        var birthDay=date;
        var emailAddress=email;
        const user={name,age,birthDay,userName,role,password,emailAddress}
        console.log(user)

        fetch("http://localhost:8080/stmanager/addorupdate",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        })
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text"  id="name" name="name"/>

            <label htmlFor="date">Birthday</label>
            <input value={date} onChange={
                (e)=>{setDate(e.target.value);setAge(calcAge(e.target.value))}
                } 
                
                type="date" id="Birthday" name="Birthday" />

            <label htmlFor="age">Age</label>
            <input value={age} readOnly type="text" placeholder={age} id="age" name="age"/>

            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}type="email" placeholder="example@example.com" id="email" name="email"/>

            <label htmlFor="userName">UserName</label>
            <input value={userName} onChange={(e)=>setUserName(e.target.value)}type="text" placeholder="UserName" id="userName" name="userName"/>

            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}type="password" placeholder="*******" id="password" name="password"/>

            <label htmlFor="role">Register As a {role}</label>
            <div>
                
                <select value={role} onChange={(e)=>{setRole(getRole(e.target.value))} }>
                    <option>Select...</option>
                    <option> Student</option>
                    <option> Teacher</option>
                    <option> Manager</option>
                </select>
                
            </div>
            
            <button type="submit">Register</button>
        </form>
        Have an Account?
        <button>LogIN</button>
        </>
    )
}
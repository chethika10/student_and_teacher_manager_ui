import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminUserView } from "../components/viewUserAdmin/AdminUserView";
import { TeacherUserView } from "../components/ViewUserTeacher.jsx/TeacherUserView";
import AuthContext from "../context/AuthContext";
import useHttp from "../services/useHttp";

export const ViewUser = () => {
  const [user, setUser] = useState({});
  const [newSalary,setNewSalary]=useState("");
  const http = useHttp();
  const location = useLocation();
  const {user2}=useContext(AuthContext)
  const index = location.state.id;

  const getdata = async () => {
    console.log(index);
    const { data } = await http.get("/getbyid/" + String(index));
    setUser(data);
    console.log(data);
    return data;
  };
  const calcAge = (date) => {
    var today = new Date();
    var birthday = new Date(date);
    var age = today.getFullYear() - birthday.getFullYear();
    if (age < 0) {
      age = 0;
    }
    return age;
  };
  const setSalary=async ()=>{
    const id=user.id
    const salary=Number(newSalary)
    const myArray={id,salary}
    const {data}=await http.post("/setSalary",myArray);
    setUser(data);

  }
  const getRole = (role) => {
    if (role === "STUDENT") {
      return "Student";
    } else if (role === "TEACHER") {
      return "Teacher";
    } else if (role === "ADMIN") {
      return "Manager";
    } else {
      return "";
    }
  };

  useEffect(() => {
    setUser(getdata());
  }, []);
  const getOtherData=()=>{
    if(user2 && user2.role[0]==="ADMIN"){
      return <AdminUserView user={user}/>
    }
    else if(user2 && user2.role[0]==="TEACHER"){
      return <TeacherUserView user={user}/>
    }
    else {
      return <></>
    }

  }
  return (
    <>
      <div className="outside-form-container">
        <div className="form-container">
          <h1>Account Details</h1>
          <div className="inside-form-container">
            <label htmlFor="name">Name</label>
            <br />
            <input
              readOnly
              value={user.name || ""}
              type="text"
              id="name"
              name="name"
            />
            <br />

            <label htmlFor="date">Birthday</label>
            <br />
            <input
              readOnly
              value={user.birthDay || ""}
              type="text"
              id="Birthday"
              name="Birthday"
            />
            <br />

            <label htmlFor="age">Age</label>
            <br />
            <input
              readOnly
              type="text"
              value={String(calcAge(user.birthDay)) || ""}
              id="age"
              name="age"
            />
            <br />

            <label htmlFor="email">Email</label>
            <br />
            <input
              readOnly
              type="email"
              value={user.email || ""}
              id="email"
              name="email"
            />
            <br />

            <label htmlFor="userName">UserName</label>
            <br />
            <input
              readOnly
              type="email"
              value={user.userName || ""}
              id="email"
              name="email"
            />
            <br />

            <label htmlFor="role">Registered As a </label>
            <input
              readOnly
              type="text"
              value={getRole(user.role) || ""}
              id="role"
              name="role"
            />
            <br />
            {user.role !== "STUDENT" && user2.role[0] === "ADMIN" ? (
              <>
                <label htmlFor="Salary">Salary</label>
                <input
                  readOnly
                  type="text"
                  value={user.salary || ""}
                  id="role"
                  name="role"
                />
                <br />
              </>
            ) : (
              <></>
            )}

            {user.role !== "STUDENT" && user2.role[0] === "ADMIN"? (
              <div className="input-group mb-3">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={()=>setSalary()}
                >
                  Set new Salary
                </button>
                <input
                  type="number"
                  value={newSalary}
                  className="form-control"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  onChange={(e) => setNewSalary(e.target.value)}
                />
                <br />
              </div>
            ) : (
              <></>
            )}
            {getOtherData()}
          </div>
        </div>
      </div>
    </>
  );
};

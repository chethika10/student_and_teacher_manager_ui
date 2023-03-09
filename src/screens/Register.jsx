import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export const Register = () => {
  const pageTitle = `${"S&TManager-Register"}`;
  document.title = pageTitle;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("");
  const [role2, setRole2] = useState("");
  const [age, setAge] = useState("");
  // const [user2,setUser2]=useState("");
  const [status, setStatus] = useState("");
  const [validationError, setValidationError] = useState("");
  const [matcherError, setMatcherError] = useState("");

  let navigate = useNavigate();
  const passwordMatcher = () => {

    if (password2 !== password) {
      setMatcherError("Passwords do not match");
    } else {
      setMatcherError("");
    }
  };
  const handlePasswordChange = () => {

    if (!password.match(/^.{8,}$/)) {
      setValidationError("Password must be at least 8 characters long");
    } else if (!password.match(/^(?=.*[A-Z]).+$/)) {
      setValidationError("Password must contain at least one uppercase letter");
    } else if (!password.match(/^(?=.*[a-z]).+$/)) {
      setValidationError("Password must contain at least one lowercase letter");
    } else if (!password.match(/^(?=.*\d).+$/)) {
      setValidationError("Password must contain at least one number");
    } else {
      setValidationError("");
    }
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
  const getRole = (role) => {
    if (role === "Student") {
      setRole2("Student");
      return "STUDENT";
    } else if (role === "Teacher") {
      setRole2("Teacher");
      return "TEACHER";
    } else if (role === "Manager") {
      setRole2("Manager");
      return "ADMIN";
    } else {
      setRole2("Select...");
      return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(matcherError || validationError){
      return
    }
    var birthDay = date;
    var user2 = "";
    var data=[]
    var rowPassword = password;
    const user = {
      name,
      age,
      birthDay,
      userName,
      role,
      rowPassword,
      email,
    };
    console.log(user);

    fetch("http://localhost:8080/stmanager/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        //setUser2(result);
        data = result;
      })
      .then(() => {
        if (data[0] === "" || data[0] === "0" || data[0] === 0) {
          console.log(data)
          setStatus(data[1]);
        } else {
          console.log(data)
          setStatus("you registered as a " + role2);
          alert("you registered as a " + role2);
          navigate("/LogIN");
        }
      })
      .catch(() => {
        setStatus("Can't register");
      });
  };
  useEffect(() => {
    passwordMatcher();
    handlePasswordChange()
    //console.log("aaa")
  }, [password,password2]);
  return (
    <>
      <div className="outside-form-container">
        <div className="form-container">
          <h1>Register</h1>
          <div className="inside-form-container">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <br />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
              />
              <br />

              <label htmlFor="date">Birthday</label>
              <br />
              <input
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setAge(calcAge(e.target.value));
                }}
                type="date"
                id="Birthday"
                name="Birthday"
              />
              <br />

              <label htmlFor="age">Age</label>
              <br />
              <input
                value={age}
                readOnly
                type="text"
                placeholder={age}
                id="age"
                name="age"
              />
              <br />

              <label htmlFor="email">Email</label>
              <br />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="example@example.com"
                id="email"
                name="email"
              />
              <br />

              <label htmlFor="userName">UserName</label>
              <br />
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="UserName"
                id="userName"
                name="userName"
              />
              <br />

              <label htmlFor="password">Password</label>
              <br />
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                type="password"
                placeholder="*******"
                id="password"
                name="password"
              />
              <br />

              <div className="status">
                {validationError && <p>{validationError}</p>}
              </div>

              <label htmlFor="password">Confirm Password</label>
              <br />
              <input
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                type="password"
                placeholder="*******"
                id="password2"
                name="password2"
              />
              <br />
              <div className="status">
                {matcherError && <p>{matcherError}</p>}
              </div>

              <label htmlFor="role">Register As a </label>
              <div>
                <select
                  className="selection"
                  value={role2}
                  onChange={(e) => {
                    setRole(getRole(e.target.value));
                  }}
                >
                  <option>Select...</option>
                  <option> Student</option>
                  <option> Teacher</option>
                  <option> Manager</option>
                </select>
              </div>

              <button type="submit">Register</button>
            </form>
            <div className="status">{status}</div>
            <br />
          </div>
          Have an Account?
          <button
            onClick={() => {
              navigate("/LogIN");
            }}
          >
            LogIN
          </button>
        </div>
      </div>
    </>
  );
};

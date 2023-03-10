import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useHttp from "../services/useHttp";

export const ChangeCredentials = () => {
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [status2, setStatus2] = useState("");
  const [validationError, setValidationError] = useState("");
  const [matcherError, setMatcherError] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const navigate = useNavigate();
  const http = useHttp();
  const { setAuthTokens, setUser } = useContext(AuthContext);

  const changeUsername = async () => {
    var newString = newUsername;
    const data = { newString, password };
    const data2 = await http.post("/changeusername", data);
    console.log(data2.data);
    const data3 = data2.data;
    if (data3[0] === "0" || data3[0] === 0) {
      setStatus(data3[1]);
    } else {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");

      alert("username changed");
      navigate("/LogIN");
    }
  };
  const changePassword = async () => {
    if (validationError !== "" || matcherError !== "") {
      return;
    }
    var newString = password2;
    var password = password1;
    const data = { newString, password };
    const data2 = await http.post("/changepassword", data);
    console.log(data2.data);
    const data3 = data2.data;
    if (data3[0] === "0" || data3[0] === 0) {
      setStatus2(data3[1]);
    } else {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
      alert("password changed");
      navigate("/LogIN");
    }
  };
  const passwordMatcher = () => {
    if (password2 !== password3) {
      setMatcherError("Passwords do not match");
    } else {
      setMatcherError("");
    }
  };
  const handlePasswordChange = () => {
    if (!password2.match(/^.{8,}$/)) {
      setValidationError("Password must be at least 8 characters long");
    } else if (!password2.match(/^(?=.*[A-Z]).+$/)) {
      setValidationError("Password must contain at least one uppercase letter");
    } else if (!password2.match(/^(?=.*[a-z]).+$/)) {
      setValidationError("Password must contain at least one lowercase letter");
    } else if (!password2.match(/^(?=.*\d).+$/)) {
      setValidationError("Password must contain at least one number");
    } else {
      setValidationError("");
    }
  };
  useEffect(() => {
    passwordMatcher();
    handlePasswordChange();
    //console.log("aaa")
  }, [password3, password2]);
  return (
    <>
      <div className="outside-form-container">
        <div className="form-container">
          <h1>Change Credentials</h1>
          <p className="status">
            If you change Credentials, You will logged out . <br /> You have to
            login to access the system
          </p>
          <div className="inside-form-container">
            <label htmlFor="userName">New Username</label>
            <br />
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              type="text"
              placeholder="UserName"
              id="userName"
              name="userName"
            />
            <br />

            <label htmlFor="password">Current Password</label>
            <br />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="*******"
              id="password"
              name="password"
            />
            <br />
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => changeUsername()}
            >
              Change Username
            </button>
            <br />
            <div className="status">{status}</div>
            <hr className="border border-dark border-3 opacity-75" />

            <label htmlFor="password1">Current Password</label>
            <br />
            <input
              value={password1}
              onChange={(e) => {
                setPassword1(e.target.value);
              }}
              type="password"
              placeholder="*******"
              id="password1"
              name="password1"
            />
            <br />
            <label htmlFor="password2">New Password</label>
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
              {validationError && <p>{validationError}</p>}
            </div>

            <label htmlFor="password3">Confirm New Password</label>
            <br />
            <input
              value={password3}
              onChange={(e) => {
                setPassword3(e.target.value);
              }}
              type="password"
              placeholder="*******"
              id="password3"
              name="password3"
            />
            <br />
            <div className="status">
              {matcherError && <p>{matcherError}</p>}
            </div>
            <div className="status">{status2}</div>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => changePassword()}
            >
              Change Password
            </button>
            <hr className="border border-dark border-3 opacity-75" />
          </div>
        </div>
      </div>
    </>
  );
};

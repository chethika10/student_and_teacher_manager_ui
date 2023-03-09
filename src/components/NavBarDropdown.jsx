import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../css/NavBarDropdown.css";
import useHttp from "../services/useHttp";

export const NavBarDropdown = ({ sub }) => {
  let { setAuthTokens, setUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const http = useHttp();

  let logoutUser = async (e) => {
    const response = await http.get("/logout");
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");

    if (response.status === 200) {
      navigate("/LogIN");
    }
  };

  const clickHandler = () => {
    navigate("/userDetails");
  };
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-success dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {sub}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" onClick={()=>clickHandler()}>
            Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item logout" onClick={()=>logoutUser()}>
            LogOut
          </a>
        </li>
      </ul>
    </div>
  );
};

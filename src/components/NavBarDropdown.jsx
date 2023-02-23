import React,{useContext} from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../css/NavBarDropdown.css"


export const NavBarDropdown =({sub})=>{
  let {logoutUser}=useContext(AuthContext)
  let navigate=useNavigate()
  const clickHandler=()=>{
    navigate("/userDetails")
  }
    return(

<div className="dropdown">
  <button className="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {sub}
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" onClick={clickHandler}>Profile</a></li>
    <li><a className="dropdown-item logout" onClick={logoutUser}>LogOut</a></li>
  </ul>
</div>

    )
}
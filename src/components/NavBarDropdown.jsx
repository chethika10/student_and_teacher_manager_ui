import React from "react"
import "../css/NavBarDropdown.css"
export const NavBarDropdown =()=>{


    return(

<div className="dropdown">
  <button className="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Sahan2
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Profile</a></li>
    <li><a className="dropdown-item logout" href="#">LogOut</a></li>
  </ul>
</div>

    )
}
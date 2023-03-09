import React from "react";

export const AboutUs=()=>{
    const pageTitle = `${"S&TManager-About Us"}`;
    document.title = pageTitle;
    return(
        <>
        <div className="outside-form-container">
        
        <div className="form-container">
        <h1>About Us</h1>
 
        <p>This is a learning management system</p>

        </div>
        </div>
        </>
    )
}
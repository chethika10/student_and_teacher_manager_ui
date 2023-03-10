import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { AdminHome } from "../components/AdminHome";
import { StudentHome } from "../components/StudentHome";
import { TeacherHome } from "../components/TeacherHome";
import AuthContext from "../context/AuthContext";

export const Home = () => {
  const pageTitle = `${"S&TManager-Home"}`;
  document.title = pageTitle;

  let navigate = useNavigate();
  let { user } = useContext(AuthContext);

  const getUserHome = () => {
    if (user.role[0] === "ADMIN") {
      return <AdminHome />;
    }else if(user.role[0]==="STUDENT"){
      return <StudentHome/>
    }
    else if(user.role[0]==="TEACHER"){
      return <TeacherHome/>
    }
  };

  useEffect(() => {
    if (user === null) {
      navigate("/Aboutus");
    }
  });

  return (
    <>
      <div className="outside-form-container">
        <div className="form-container">
          <h1>Home</h1>
          <div className="inside-form-container">
            {user ? getUserHome() : console.log("no user")}


          </div>
        </div>
      </div>
    </>
  );
};

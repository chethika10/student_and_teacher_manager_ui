import { useNavigate } from "react-router-dom";
import allCources from "../images/allCources.jpg";
import allUsers from "../images/allUsers.webp";

export const AdminHome = () => {
  const navigate = useNavigate();
  const getAllUsers = () => {
    navigate("/AllUsers");
  };
  const getAllCources = () => {
    navigate("/AllCourcesAdmin");
  };
  return (
    <div>
      <button onClick={()=>getAllCources()} className="row g-0 bg-body-secondary position-relative">
        <div className="col-md-6 mb-md-0 p-md-4">
          <img src={allCources} className="w-100" alt="All cources " />
        </div>
        <div className="col-md-6 p-4 ps-md-0">
        
          <h5 className="mt-0">All Cources</h5>
         
        </div>
      </button>
      <br />
      <br />
      <button onClick={()=>getAllUsers()} className="row g-0 bg-body-secondary position-relative">
        <div className="col-md-6 mb-md-0 p-md-4">
          <img src={allUsers} className="w-100" alt="All users" />
        </div>
        <div className="col-md-6 p-4 ps-md-0">
        
          <h5 className="mt-0">All Users</h5>
          
        </div>
      </button>
    </div>
  );
};

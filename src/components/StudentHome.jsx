import { useNavigate } from "react-router-dom";
import allCources from "../images/allCources.jpg";
export const StudentHome = () => {
  const navigate = useNavigate();
  const getAllCources = () => {
    navigate("/mycourses");
  };
  return (
    <>
      <button
        onClick={() => getAllCources()}
        className="row g-0 bg-body-secondary position-relative"
      >
        <div className="col-md-6 mb-md-0 p-md-4">
          <img src={allCources} className="w-100" alt="All cources " />
        </div>
        <div className="col-md-6 p-4 ps-md-0">
          <h5 className="mt-0">My Cources</h5>
        </div>
      </button>
      <br />
      <br />
    </>
  );
};

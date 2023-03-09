import { useNavigate } from "react-router-dom";

export const AdminUserView = ({ user }) => {
  const navigate = useNavigate();
  const navigateUser = () => {
    navigate("/viewcourses", { state: { user: user } });
  };
  return (
    <>
      {user.role !== "ADMIN" && (
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => navigateUser()}
        >
          View Courses
        </button>
      )}
    </>
  );
};

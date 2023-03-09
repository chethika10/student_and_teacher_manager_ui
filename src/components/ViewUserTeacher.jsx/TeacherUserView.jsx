import { useNavigate } from "react-router-dom";

export const TeacherUserView = ({ user }) => {
  const navigate = useNavigate();
  const navigateUser = () => {
    navigate("/viewcoursesAsteacher", { state: { user: user } });
  };
  return (
    <>
      {user.role === "STUDENT" && (
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

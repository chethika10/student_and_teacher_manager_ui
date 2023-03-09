import { useNavigate } from "react-router-dom";

export const AdminCourseView = ({ course }) => {
  const navigate = useNavigate();
  const navigateUser = () => {
    navigate("/viewteachers", { state: { course: course } });
  };
  const navUser = () => {
    navigate("/viewstudents", { state: { course: course } });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navigateUser()}
      >
        View Teachers
      </button>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => navUser()}
      >
        View Students
      </button>
    </>
  );
};

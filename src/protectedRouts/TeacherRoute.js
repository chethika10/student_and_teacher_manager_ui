import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const TeacherRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role[0]!=="TEACHER") {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default TeacherRoute;
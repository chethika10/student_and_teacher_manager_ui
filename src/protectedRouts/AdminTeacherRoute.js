import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const AdminTeacherRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role[0]==="STUDENT") {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default AdminTeacherRoute;
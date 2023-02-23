import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const AuthenticatedRoute = ({children}) => {
    const {user}=useContext(AuthContext)

if (!user) {
 return <Navigate to="/LogIN" replace />;
}
return children;
};
export default AuthenticatedRoute;
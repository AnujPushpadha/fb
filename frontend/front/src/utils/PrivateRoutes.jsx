import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const accessToken = localStorage.getItem("Token");

  return accessToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

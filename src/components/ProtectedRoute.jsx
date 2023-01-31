import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : console.log("not authenticated");
};

export default ProtectedRoute;

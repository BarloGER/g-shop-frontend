import { Outlet } from "react-router-dom";

// This component protects routes from unauthorized users (not logged in)

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : console.log("not authenticated");
};

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const PrivateRoute = ({ children }: any) => {
  const currentUser: User = useAuth();
  if (!currentUser.email) {
    return <Navigate to="/login" replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;

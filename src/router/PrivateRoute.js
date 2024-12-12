import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

// Handles authentication. Uses AuthProvider hook to get user token.
// If no user token in localStorage -> redirected to login page
// Else -> user access protected routes; render child components 
// nested within PrivatRoute component accessed via <Outlet />
const PrivateRoute = () => {
  const user = useAuth()

  if (user.token) {
    return <Outlet />

  } else {
      return <Navigate to="/login" />
  }
};

export default PrivateRoute;
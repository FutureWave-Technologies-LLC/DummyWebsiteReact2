import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

// Handles authentication. Uses AuthProvider hook to get user token.
// If no user token in localStorage -> redirected to login page
// Else -> user access protected routes; render child components 
// nested within PrivatRoute component accessed via <Outlet />
const PrivateRoute = () => {
  const user = useAuth()
  // const [authToken, setAuthToken] = useState()
  
  // useEffect(() => {
  //   if (user.token) {
  //     const token = JSON.parse(localStorage.getItem("future-token"))
  //     axios.get("http://localhost:8000/users/compare_tokens/", {
  //       params: {
  //           user_id: token.user_id,
  //           token_id: token.token_id,
  //       }
  //     })
  //     .then((response) => {
  //       setAuthToken(response.data.response)
  //     })
  //     .catch((error) => {
  //         console.error('Error comparing token ids:', error);
  //     });
  //   }
  // }, [])
  
  if (user.token) {
    return <Outlet />
    // if (authToken === true) {
    //   return <Outlet />
    // }
    // else return <Navigate to="/login" />

  } else {
      return <Navigate to="/login" />
  }
};

export default PrivateRoute;
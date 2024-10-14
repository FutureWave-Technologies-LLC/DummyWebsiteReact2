import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Creates context for managing authentication state
const AuthContext = createContext();

//Wraps the routes in App.js
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("future-token") || "")
    const navigate = useNavigate()

    const loginAction = (input) => {
      //use username and password to authenticate
      axios.post("http://3.142.185.208:8000/api/authenticate_user/", {
          username: input.username,
          password: input.password
      })
      .then((response) => {
          if (response.data.error === true){
              console.log(response.data.response)
          }
          else {
              //Get data response and store it to user's localStorage as token
              localStorage.setItem("future-token", JSON.stringify(response.data));
              setToken(localStorage.getItem("future-token"))
              navigate("/home");
              return;
          }
      })
      .catch((error) => {
          console.error('Error with authenticating:', error);
      });
    }

    const logOut = () => {
      setToken("");
      localStorage.removeItem("future-token");
      navigate("/sign-in");
    };

    //AuthContext.Provider makes token, user, and above functions accessible
    //to the children components that AuthProvider wraps
    return (
      <AuthContext.Provider value={{ token, loginAction, logOut }}>
        {children}
      </AuthContext.Provider>
    )
};

export default AuthProvider;

//Use by components (eg PrivateRoute) to access auth context and state
export const useAuth = () => {
  return useContext(AuthContext);
};
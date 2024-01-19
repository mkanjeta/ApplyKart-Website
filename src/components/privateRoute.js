import React, { useEffect, useState } from "react";
import Navigate from "./Navigate";

/**
 *
 * @param {*} children component
 * @returns It will check whether the user has the access token or not,
 * if user has token it will let that user access to the children component
 * else it will redirect that user to the login page.
 */
const PrivateRoute = ({ children }) => {
  const [tkn, setTkn] = useState("token");
  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem('applyKart');
    if (token) {
      setTkn(token);
    } else {
      setTkn(""); 
    }
  }, []);

  return tkn ? children : <Navigate to="/" />;
};

export default PrivateRoute;

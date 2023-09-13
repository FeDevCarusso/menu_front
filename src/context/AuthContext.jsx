import React, { createContext, useState } from "react";
import { is_auth } from "../api/user.api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useState(function () {
    is_auth().then(function (result) {
      if (typeof result?.data === "boolean") {
        setAuth(result.data);
      }
      setIsChecked(true);
    });
  });

  return (
    <AuthContext.Provider value={{ isAuth, isChecked }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

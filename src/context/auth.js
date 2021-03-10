import React from "react";
const user = {
  name: "Prince Charles",
  age: "99",
};
export const AuthContext = React.createContext(user);

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

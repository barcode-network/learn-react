import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    
    const localUser = JSON.parse(window.localStorage.getItem("user"));
    
    if (localUser !== null) {
      setUser(localUser);
      console.log(localUser);
    }else{
      console.log("No users logged in.")
    }
  }, []);


  useEffect(() => {
    if (user){
      window.localStorage.setItem('user', JSON.stringify(user))
      console.log(user)
    }else{
      localStorage.removeItem("user")
    }
    
   
  }, [user])

  


  const handleLogin = (data) => {
    
    //localStorage.getItem('user')
    setUser(data)
    
  }

  const handleLogout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

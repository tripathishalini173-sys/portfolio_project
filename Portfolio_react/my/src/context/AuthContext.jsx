import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser)); 
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// // auth.js
// export const isAuthenticated = () => {
//   // Example: check if token exists in localStorage
//   return localStorage.getItem("token") !== null;
// };

// // // AuthContext.jsx
// // import React, { createContext, useState } from "react";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(
// //     JSON.parse(localStorage.getItem("user")) || null
// //   );

// //   const login = (userData) => {
// //     setUser(userData);
// //     localStorage.setItem("user", JSON.stringify(userData));
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     localStorage.removeItem("user");
// //   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

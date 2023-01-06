// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import client from "../api/client";
// import Signup from "../pages/SignUp";
// import UserChat from "./user/UserChat";


// const ProtectedRoutesComponent = ({admin}) => {
//   const [isAuth, setIsAuth] = useState()
//   useEffect(() => {
//    client("/is-auth").then(function(data) {
//     if(data.data.token) {
//       setIsAuth(data.data.token)
//     }
//     return isAuth
//    })
//   }, [isAuth])
  
  
//   if(isAuth === undefined) return <Signup/>
//   return isAuth && admin && isAuth !== "Admin" ? (
//     <Navigate to="/auth/signin"/>
//   ) : isAuth && admin ? (
//     <Outlet/>
//   ) : isAuth && !admin ? (
//     <>
//     <UserChat/>
//     <Outlet/>
//     </>
//   ) : (
//     <Navigate to="/auth/sign"/>
//   )
// };

// export default ProtectedRoutesComponent;

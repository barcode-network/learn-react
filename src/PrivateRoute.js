// import React from "react"
// import { Route, Redirect } from "react-router-dom"
// import { AuthContext } from "./context/auth"

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = AuthContext()

//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return currentUser ? <Component {...props} /> : <Redirect to="/login" />
//       }}
//     ></Route>
//   )
// }
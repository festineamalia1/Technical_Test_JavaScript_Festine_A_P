import { useParams, Link, useLocation } from "react-router-dom";
export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const fetchData = () => {
  return (dispatch) => {
    console.log("ss");
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => dispatch({ type: "FetchData", data: json }))
      .catch((err) => dispatch({ type: "ERROR", msg: "Unable to fetch data" }));
  };
};

const StatusLog = window.localStorage.getItem("LogStatus");

export const handleLogin = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGIN",
    });
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
    window.location.assign("/");
  };
};

{
  /*
export const handleLogin = () => {
   return (dispatch) => {
     dispatch({
       type: "LOGIN",
     });
   }
};
*/
}

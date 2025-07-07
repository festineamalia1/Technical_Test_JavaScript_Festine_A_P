import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ props, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        props.statusLog == "logged in" ? (
          <Navigate to="/home" />
        ) : (
           <Navigate to="/" />
         
        )
      }
    />
  );
};

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(PrivateRoute);

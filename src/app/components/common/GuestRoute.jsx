import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { selectIsAuthenticated } from "../../store/auth/selectors";
import { getActiveUser } from "../../store/auth/slice";

export const GuestRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const isAuhenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuhenticated) {
      dispatch(getActiveUser());
    }
  }, [dispatch, isAuhenticated]);
  const isAuthenticated = !!useSelector(selectIsAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
export default GuestRoute;
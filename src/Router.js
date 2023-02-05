import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectActiveUser } from "./app/store/auth";
import { useDispatch } from "react-redux";
import { getActiveUser } from "./app/store/auth";
import { useEffect } from "react";

import Galleries from "./app/pages/Galleries";
import RegisterPage from "./app/pages/RegisterPage";
import LoginPage from "./app/pages/LoginPage";
import GalleryPage from "./app/pages/GalleryPage";
import CreateGalleryPage from "./app/pages/CreateGalleryPage";
import GuestRoute from "./app/components/common/GuestRoute";
import GuardedRoute from "./app/components/common/GuardedRoute";
import { SingleAuthor } from "./app/pages/SingleAuthor";
import MyGalleryPage from "./app/pages/MyGalleryPage";

export default function Router() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/galleries"></Redirect>
      </Route>

      <GuardedRoute exact path="/authors/:id">
        <SingleAuthor />
      </GuardedRoute>

      <GuardedRoute path="/galleries" exact>
        <Galleries />
      </GuardedRoute>

      <GuestRoute path="/login" exact>
        <LoginPage />
      </GuestRoute>

      <GuestRoute path="/register" exact>
        <RegisterPage />
      </GuestRoute>

      <GuardedRoute exact path="/galleries/:id">
        <GalleryPage />
      </GuardedRoute>

      <GuardedRoute path="/create" exact>
        <CreateGalleryPage />
      </GuardedRoute>

      <GuardedRoute exact path="/my-galleries">
        <MyGalleryPage selfId={isAuthenticated ? activeUser?.id : null} />
      </GuardedRoute>

      <GuardedRoute exact path="/edit-gallery/:id">
        <CreateGalleryPage />
      </GuardedRoute>
    </Switch>
  );
}

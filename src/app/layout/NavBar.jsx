import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated } from "../store/auth";
import { logout } from "../store/auth/slice";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "../components/Search";

export default function MainNavbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/galleries">
            Galleries
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/galleries"
                >
                  All galleries
                </a>
              </li>
              <li className="nav-item">
                {!isAuthenticated && (
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated && (
                  <a className="nav-link" href="/my-galleries">
                    My galleries
                  </a>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated && (
                  <a className="nav-link" href="/create">
                    Create new gallery
                  </a>
                )}
              </li>
              <li className="nav-item">
                {!isAuthenticated && (
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                )}
              </li>
            </ul>

            <Search />

            {isAuthenticated && (
              <button
                className="btn btn-outline-secondary"
                type="submit"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

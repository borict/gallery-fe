import { useDispatch } from "react-redux";
import { login } from "../store/auth/slice";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import LoginComponent from "../components/LoginComponent";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleOnLogin(e) {
    e.preventDefault();
    dispatch(login(credentials));
    console.log("Success!");
    history.push("/galleries");
  }

  return (
    <LoginComponent
      handleOnLogin={handleOnLogin}
      credentials={credentials}
      setCredentials={setCredentials}
    />
  );
}

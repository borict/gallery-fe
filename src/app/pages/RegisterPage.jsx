import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../store/auth";
import RegisterComponent from "../components/RegisterComponent";
import { useHistory } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmed_password: "",
    terms: false,
  });

  function handleOnRegister(e) {
    e.preventDefault();

    if (!e.target.terms.checked) {
      alert("You have to accept Terms and Conditions to register.");
      return;
    }
    dispatch(register(newUser));
    history.push("/galleries");
  }

  return (
    <RegisterComponent
      handleOnRegister={handleOnRegister}
      newUser={newUser}
      setNewUser={setNewUser}
    />
  );
}

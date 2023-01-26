import { useState } from "react";
// import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatonMsg, setValidationMsg] = useState("");

  const navigate = useNavigate();

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const onRegisterBtn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setValidationMsg("Please enter a valid Email.");
      return;
    }

    if (password.length < 6) {
      setValidationMsg("Password must be at least 6 characters long.");
      return;
    }

    registerUser();
  };

  async function registerUser() {
    const response = await fetch("http://127.0.0.1:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    //If registration is successful redirect user to home page
    const data = await response.json();
    if (data.isLoggedIn) {
      navigate("/home");
    }
  }

  return (
    <div className="App">
      <form className="card" onSubmit={onRegisterBtn}>
        <h1>
          Register<span className="full-stop">.</span>
        </h1>
        <div className="names">
          <input
            className="custom-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First name"
            required
          ></input>
          <input
            className="custom-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last name"
            required
          ></input>
        </div>
        <input
          className="custom-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        ></input>
        <input
          className="custom-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        ></input>
        <p className="input-error">{validatonMsg}</p>
        <input className="btn" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;

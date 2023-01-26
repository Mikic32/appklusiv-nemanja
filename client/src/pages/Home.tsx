import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  async function authorize() {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/authorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: null,
      });
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      const data: { firstName: string; lastName: string } =
        await response.json();
      return data;
    } catch (e) {
      throw new Error("Unauthorized");
    }
  }

  async function logOutUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:3000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: null,
    });

    const data = await response.json();

    if (data.isLoggedOut) {
      navigate("/register");
    }
  }
  
  //If user is not logged in redirect to register.
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await authorize();
        setFirstName(data.firstName);
        setLastName(data.lastName);
      } catch (e) {
        navigate("/register");
      }
    };
    fetch();
  }, []);

  return (
    <div className="App">
      <form className="card" onSubmit={logOutUser}>
        <h1>
          Welcome {firstName} {lastName}
          <span className="full-stop">.</span>
        </h1>
        <figure className="wave"></figure>
        <input className="btn" type="submit" value="Log out" />
      </form>
    </div>
  );
};

export default Home;

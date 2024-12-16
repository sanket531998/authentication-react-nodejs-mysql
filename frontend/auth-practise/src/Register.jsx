import React, { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate("/login");
  }

  async function handleRegister(e) {
    e.preventDefault();
    const headers = {
      "content-type": "application/json",
      autorization: "sanket ka login",
    };
    try {
      if (
        nameRef.current.value &&
        emailRef.current.value &&
        passwordRef.current.value
      ) {
        const response = await axios.post("http://localhost:8080/register", {
          name: nameRef.current.value,
          emailid: emailRef.current.value,
          password: passwordRef.current.value,
        });
        console.log(response?.data?.status);
        if (response?.data?.status === "success") {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <div className="bg-success bg-gradient rounded shodow-lg p-4 w-50">
        <h2>Register</h2>
        <form>
          <div className="my-3">
            <label className="fw-bold my-1 fs-5">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              className="form-control"
              ref={nameRef}
            ></input>
          </div>
          <div className="my-3">
            <label className="fw-bold my-1 fs-5">Email id</label>
            <input
              type="email"
              placeholder="Enter email id"
              name="email"
              className="form-control"
              ref={emailRef}
            ></input>
          </div>
          <div className="my-3">
            <label className="fw-bold my-1 fs-5">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className="form-control"
              ref={passwordRef}
            ></input>
          </div>
          <button className="btn btn-light my-2" onClick={handleRegister}>
            Register
          </button>
          <button
            className="btn btn-light my-2 float-end"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

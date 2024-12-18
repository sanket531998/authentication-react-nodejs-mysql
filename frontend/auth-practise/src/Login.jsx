import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  axios.defaults.withCredentials = true;
  async function handleLogin(e) {
    e.preventDefault();

    const url = "http://localhost:8080/login";
    const body = {
      emailid: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    };

    if (emailRef?.current?.value && passwordRef?.current?.value) {
      try {
        const response = await axios.post(url, body);
        if (response?.data?.status === "Success") {
          navigate("/dashboard");
        } else {
          alert("Login fail");
        }

        console.log(response);
      } catch (error) {
        alert("Cannot login");
        console.log(error);
      }
    }
  }

  function handleGoback(e) {
    e.preventDefault();
  }
  return (
    <div className="d-flex align-items-center justify-content-center flex-column vh-100">
      <div className="bg-warning bg-gradient bg-opacity-50 p-4 rounded shadow w-50">
        <h2 className="mb-4 mt-2">Sign In</h2>
        <form>
          <div className="d-flex justify-content-between fw-bold my-2">
            <label className="px-2" style={{ width: " 10vw" }}>
              EmailId
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              ref={emailRef}
            ></input>
          </div>
          <div className="d-flex justify-content-between fw-bold my-2">
            <label className="px-2" style={{ width: " 10vw" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="form-control"
              ref={passwordRef}
            ></input>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <button className="btn btn-light" onClick={handleLogin}>
              Login
            </button>
            <Link
              to="/register"
              className="btn btn-light"
              // onClick={handleGoback}
            >
              Register
            </Link>
            <Link to="/" className="btn btn-light">
              Go back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

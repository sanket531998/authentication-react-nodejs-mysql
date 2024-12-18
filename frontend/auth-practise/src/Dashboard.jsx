import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  cosnt[(auth, setAuth)] = useState("");
  //sanket auth
  return (
    <div>
      {auth ? (
        <div>
          <h3>You are authorized</h3>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h3>Login Now</h3>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

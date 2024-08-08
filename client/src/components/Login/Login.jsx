import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Urls";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/upload");
    }
  }, [navigate]);

  const handleShake = () => {
    const errorElement = document.getElementById("error-message");
    if (errorElement) {
      errorElement.classList.add("shake");
      setTimeout(() => {
        errorElement.classList.remove("shake");
      }, 500);
    }
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      handleShake();
      return;
    }

    axios
      .post(`${baseUrl}/api/login`, { email, password })
      .then((result) => {
        if (result.data.success) {
          const { token, user } = result.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          setTimeout(() => {
            navigate("/upload");
          }, 1000);
        } else {
          setErrorMessage(result.data.msg, "hi");
          handleShake();
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Backend error:", error.response.data);
          setErrorMessage(
            error.response.data.msg || "An unexpected error occurred."
          );
        } else if (error.request) {
          console.error("Network error:", error.request);
          setErrorMessage("No response received from the server.");
        } else {
          console.error("Error:", error.message);
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
        handleShake();
      });
  };

  return (
    <div className="login-main ">
      <div className="login-child shadow">
        <div className="b">
          <form onSubmit={handleSubmit} className="">
            <h3 className="pt-5">Login</h3>
            <label>User name</label> <br />
            <input
              type="text"
              className=""
              name="email"
              placeholder="Enter your User name"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password</label> <br />
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="btn btn-primary mt-3 mb-3">Login</button>
            {errorMessage && (
              <p
                id="error-message"
                className="error-message text-danger shake pb-3"
              >
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

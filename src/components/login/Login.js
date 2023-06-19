/* eslint-disable no-undef */

import React, { useContext, useState, useEffect } from "react";
import alertContext from "../../context/alerts/alertContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { loginUser } from "../../slices/authSlice";
import jwtDecode from "jwt-decode";
const Login = (props) => {
  // to use alert using context
  const alertcontext = useContext(alertContext);
  /// de strusture
  const { showAlert } = alertcontext;
  const navigate = useNavigate();
  // form values
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // to handle errors
  const [formErrors, setFormErrors] = useState({});
  // const [googleUser, setgoogleUser] = useState({});

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

 

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    // page redirect na ho is liye ye lgaya
    e.preventDefault();
    let response = validate(credentials);
    if (isEmpty(response)) {
      try {
        //   const response = await fetch("http://localhost:5000/api/auth/login", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },

        //     // email and password bhej rehy server pr
        //     body: JSON.stringify({
        //       email: credentials.email,
        //       password: credentials.password,
        //     }),
        //   });
        //   const json = await response.json();
        // // // console.log(json.success);

        //   if (json.success) {
        //     // Save the auth token and redirect
        //     localStorage.setItem("token", json.authtoken);
        //     localStorage.setItem("role", json.role);

        //     //   props.showAlert("Logged in successfully ","success")

        //     navigate("/");
        //     showAlert("Logged in successfully ", "success");
        //   } else {
        //     //  alert("Invalid credentials");
        //     showAlert(json.error, "danger");
        //   }

        dispatch(loginUser(credentials));
      } catch (error) {
        // console.log("message : " + error);
      }
    } else {
      setFormErrors(response);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };

  return (
    <div>
      <div className="container my-3  ">
        <div className="d-flex justify-content-center my-3">
          <div className="card " style={{ width: "28rem", padding: "10px" }}>
            <form onSubmit={handleSubmit}>
              <h2 className="my-2">Login to continue</h2>
              <div className="mb-3" style={{ height: "90px" }}>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={credentials.email || ""}
                  onChange={onChange}
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                />

                <p style={{ color: "red" }}>{formErrors.email}</p>
                {/* <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div> */}
              </div>
              <div className="mb-3" style={{ height: "90px" }}>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={credentials.password || ""}
                  onChange={onChange}
                  name="password"
                  id="password"
                />

                <p style={{ color: "red" }}>{formErrors.password}</p>
              </div>

              <button type="submit" className="btn btn-primary">
                {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
              </button>
              {auth.loginStatus === "rejected" ? (
                <p>{auth.loginError.error} </p>
              ) : null}

              <div>
                <div className="googleSignDiv mt-4" id="signDiv"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

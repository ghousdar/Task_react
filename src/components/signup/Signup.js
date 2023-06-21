import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../slices/authSlice";
import { isEmpty } from "lodash";

const Signup = () => {
  // to use alert using context
  
  const [selectedCheckbox, setSelectedCheckbox] = useState('admin'); // Default selected checkbox is 'option1'

  /// de strusture
  
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "admin",
  });

  // to handle errors
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    // page redirect na ho is liye ye lgaya
    e.preventDefault();
    let response = validate(credentials);

   
    if (isEmpty(response)) {
      try {
        dispatch(registerUser(credentials));
      } catch (error) {
        console.log(error);
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

    if (!values.name) {
      errors.name = "Name is required";
    }
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

    if (!values.cpassword) {
      errors.cpassword = "Password is required";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Password did not match ";
    }

    return errors;
  };

  const handleCheckboxChange = (event) => {
    setSelectedCheckbox(event.target.value);
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container my-3  ">
        <div className="d-flex justify-content-center my-3">
          <div className="card " style={{ width: "28rem", padding: "10px" }}>
            <form onSubmit={handleSubmit}>
              <h2 className="my-2">Signup to continue to iNotebook</h2>
              <div className="mb-3" style={{ height: "90px" }}>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={credentials.name}
                  onChange={onChange}
                  id="name"
                  name="name"
                />

                <p style={{ color: "red" }}>{formErrors.name}</p>
              </div>
              <div className="mb-3" style={{ height: "90px" }}>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={credentials.email}
                  onChange={onChange}
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                />
                <p style={{ color: "red" }}>{formErrors.email}</p>
              </div>
              <div className="mb-3" style={{ height: "90px" }}>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={credentials.password}
                  onChange={onChange}
                  name="password"
                  id="password"
                />

                <p style={{ color: "red" }}>{formErrors.password}</p>
              </div>
              <div className="" style={{ height: "90px" }}>
                <label htmlFor="cpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={credentials.cpassword}
                  onChange={onChange}
                  name="cpassword"
                  id="cpassword"
                />

                <p style={{ color: "red" }}>{formErrors.cpassword}</p>
              </div>

              <div className="mb-3" style={{display:"flex"}}>
                <label>
                  <input
                    type="checkbox"
                    name="role"
                    className="mx-2"
                    value="admin"
                    checked={selectedCheckbox === "admin"}
                    onChange={handleCheckboxChange}
                  />
                  Admin
                </label>
                <br />
                <label>
                  <input
                  name="role"
                    type="checkbox"
                    value="user"
                    className="mx-2"
                    checked={selectedCheckbox === "user"}
                    onChange={handleCheckboxChange}
                  />
                  User
                </label>
                <br />
              </div>

              <button type="submit" className="btn btn-primary">
                {auth.registerStatus === "pending" ? "Submitting..." : "Signup"}
              </button>

              {auth.registerStatus === "rejected" ? (
                <p>{auth.registerError.error} </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import noteContext from "../../context/notes/noteContext";
import React, { useContext, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import alertContext from "../../context/alerts/alertContext";
import { logoutUser } from "../../slices/authSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const context = useContext(noteContext);
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
 // console.log(auth.isAdmin)

  // destructure kia ta ky easily use kr saken
  const { getAllUsers } = context;

  // to use alert using context
  const alertcontext = useContext(alertContext);
  /// de strusture
  const { showAlert } = alertcontext;

  // to navigate from one component to other
  const navigate = useNavigate();
  // This hook returns the current location object. In this case we are geting the loction of '/' and '/about'
  let location = useLocation();

  const handleLogout = async (e) => {
    // page redirect na ho is liye ye lgaya
    e.preventDefault();
    toast.warning("Logged out!", { position: "bottom-left" });
    const response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.status;
   

    if (json === 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");

      showAlert("Logout  successfully ", "success");
    } else {
      //  alert("Invalid credentials");
      showAlert("Invalid credential", "danger");
    }

    dispatch(logoutUser(null));
  };
  const handleAdduser = () => {
    console.log("clickied");
    addUserRef.current.click();
  };

  const addUserRef = useRef(null);
  const refClose = useRef(null);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    role: "user",
    image: "",
  });
  const { name, email, password, role, number } = credentials;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formata = new FormData();
      formata.append("image", credentials.image, credentials.image.name);
      formata.append("name", name);
      formata.append("email", email);
      formata.append("password", password);
      formata.append("role", role);
      formata.append("number", number);

      const response = await axios.post(
        "http://localhost:5000/api/auth/createuser",
        formata
      );
      //  const json = await response.json();

      const json = await response.data;
      console.log(json);
      if (json) {
        getAllUsers();
        // Save the auth token and redirect
        // localStorage.setItem("token", json.authtoken);
        //  navigate("/");
        refClose.current.click();
        showAlert("Account added successfully ", "success");
      } else {
        //  alert("Invalid credentials");
        showAlert("Invalid details", "danger");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // image wala km
  const [img, setImg] = useState();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));

    //credentials.image = file
    setCredentials({ ...credentials, image: e.target.files[0] });
   // console.log(e.target.files[0]);
  };



  // console.log(auth);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              iNoteBook
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/shop" ? "active" : ""
                    }`}
                    to="/shop"
                  >
                    Shop
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/cart" ? "active" : ""
                    }`}
                    to="/cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill={`${
                        location.pathname === "/cart"
                          ? "white"
                          : "var(--bs-nav-link-color)"
                      }`}
                      className="bi bi-handbag-fill mb-1 mx-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
                    </svg>
                    Cart
                    <span className=" mx-1 bag-quantity ">
                      <span className="badge bg-secondary">
                        {cartTotalQuantity}
                      </span>
                    </span>
                  </Link>
                </li>
                <div className="nav-bag"></div>
              </ul>
              {/* { auth.isAdmin === "admin" ? 
                <button
                  onClick={handleAdduser}
                  className="btn btn-primary mx-1"
                >
                  Add User
                </button>
               : 
                ""
              } */}

              {auth._id ? 
                <button onClick={handleLogout} className="btn btn-primary mx-1">
                  Logout
                </button>
               : 
                <form className="d-flex">
                  <Link
                    to="/login"
                    className="btn btn-primary mx-1"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-primary mx-1"
                    role="button"
                  >
                    Signup
                  </Link>
                </form>
              }
            </div>
          </div>
        </nav>

        {/* ///to view model */}

        <button
          type="button"
          ref={addUserRef}
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#Modaltwo"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="Modaltwo"
          tabIndex="-1"
          aria-labelledby="exampleModalLabeltwo"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title " id="exampleModalLabeltwo">
                  Add user
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="my-3">
                    <input type="file" onChange={onImageChange} />
                    <img src={img} alt="" width={100} height={100} />
                  </div>

                  <div className="mb-3">
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
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
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
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
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
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="ditits"
                      className="form-control"
                      value={credentials.number}
                      onChange={onChange}
                      name="number"
                      id="number"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={
                    credentials.name.length < 5 ||
                    credentials.password.length < 5 ||
                    credentials.number.length < 5 ||
                    img === undefined
                  }
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

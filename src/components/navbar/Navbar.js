import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../slices/authSlice";
import { toast } from "react-toastify";

export default function Navbar() {

  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  // console.log(auth.isAdmin)

 


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

   
    } else {
      //  alert("Invalid credentials");

    }

    dispatch(logoutUser(null));
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
                {auth.isAdmin === "user" ? (
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
                ) : (
                  ""
                )}

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

              {auth._id ? (
                <button onClick={handleLogout} className="btn btn-primary mx-1">
                  Logout
                </button>
              ) : (
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
              )}
            </div>
          </div>
        </nav>

  
      </div>
    </>
  );
}

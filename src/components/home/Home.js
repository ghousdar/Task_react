import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Shop from "../shop/Shop";
import { useDispatch, useSelector } from "react-redux";
import AdminPost from "../adminpost/AdminPost";
const Home = () => {
  const navigate = useNavigate();
  const [showdata, setShowData] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // console.log(auth.role)

  useEffect(() => {
    // it will return true or false
    if (localStorage.getItem("token")) {
      setShowData(true);
    } else {
      setShowData(false);
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {showdata === true ? (
        <div>
   
          {auth.role === "user" ? <Shop /> : <AdminPost/>}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;

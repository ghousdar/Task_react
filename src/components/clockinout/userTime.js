import React, { useState } from "react";


const UserTime = () => {
  const [show, setShow] = useState(true);
  //Route  function to Add User clock in time
  const clockIn = async () => {
 
    const clock_in_time = new Date().toLocaleString();

    // const start_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()
    // TODO: API Call
    // API Call
    const response = await fetch(`http://localhost:5000/api/time/clockin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ clock_in_time }),
    });

    const clockintime = await response.json();
    // console.log(time._id);
    localStorage.setItem("clockInTime", clockintime._id);
    setShow(!show);
  };

  const clockOut = async () => {
    const usertime = localStorage.getItem("clockInTime");
    const clock_out_time = new Date().toLocaleString();
    // const date = new Date();
    // const end_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()
    // TODO: API Call
    // API Call
    const response = await fetch(
      `http://localhost:5000/api/time/clockout/${usertime}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ clock_out_time }),
      }
    );

    const clockoutime = await response.json();
    console.log(clockoutime);

    setShow(!show);
  };
  return (
    <div className="container my-3 d-flex justify-content-end">
      <div className="App">
        {show ? (
          <button
            type="button"
            className="btn btn-primary mx-1"
            onClick={clockIn}
          >
            Clock in
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-secondary mx-1 "
            onClick={clockOut}
          >
            Clock out
          </button>
        )}
      </div>
    </div>
  );
};

export default UserTime;

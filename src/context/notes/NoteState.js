// jo note context wahn create hoi usy yahn import kr ky use kr rehy
//  our code may look clean thats why we create it in other file
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  //to set and get all notes
  const initialnotes = [];
  const [notes, setnotes] = useState(initialnotes);

  //to set and get all data
  const initialUserData = [];
  const [data, setData] = useState(initialUserData);

  // to search data after query  
  const [filterData, setfilterData] = useState([]);



  // // user data
   const [user, setUser] = useState("");

  // // route 0 to get use data
  const getUser = async () => {
    const url = `${host}/api/auth/getuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    // Read key
    // for (var key in json) {
     
    //   if (key === "role") {
    //     console.log(json[key]);
    //     localStorage.setItem("role", json[key]);
    //     break;
    //   }
    //}
    // logic to show all fetch notes on front end
    setUser(json);
  };

  //Route 1 function one get all notes / fetch all notes
  const getNote = async () => {
    //ToDo api call
    //Api call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
   // console.log(json);
    // logic to show all fetch notes on front end
    setnotes(json);
  };

  // Add a Note
  //Route 2 function to Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    // logic to add bew note on front end
    setnotes(notes.concat(note));
  };

  // Route 3 function to Delete a Note  / using api
  const deleteNote = async (_id) => {
    // api call
    const url = `${host}/api/notes/deletenote/${_id}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    // logic to remove note from front end
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });
    setnotes(newNotes);
  };

  //Route 4 function to update a Note

  const updateYourNote = async (_id, title, description, tag) => {
    //Api call
    const url = `${host}/api/notes/updatenote/${_id}`;
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // logic to edit client on front end
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === _id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setnotes(newNotes);
  };


  //route 5 function to get all the users
  const getAllUsers = async () => {

try {
    //ToDo api call
    //Api call
    const url = `${host}/api/auth/getAllUser`;
   //const url = `${host}/api/auth/gethAllUser/${page}`;
   const response = await fetch(url, {
     method: "GET", // *GET, POST, PUT, DELETE, etc.

     headers: {
       "Content-Type": "application/json",
       "auth-token": localStorage.getItem("token"),
       // 'Content-Type': 'application/x-www-form-urlencoded',
      // body: JSON.stringify({ page }),
     },
   });
   const json = await response.json(); // parses JSON response into native JavaScript objects
   setData(json);
   setfilterData(json);
//  working krwany kyy  liye admina nd uyser role band kr reha hu
   const userRole =localStorage.getItem('role');
   
   if(userRole === "admin")
   {
   //  console.log(json);
     // logic to show all fetch notes on front end
   //  setData(json);
    // setfilterData(json);
   }
}
catch (error) {

  console.log(error)
}
   

  };


  //Route 6 function delete data
  const deleteUser = async (id) => {
    // api call
    const url = `${host}/api/auth/deleteUser/${id}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    // logic to remove note from front end
    const newData = data.filter((data) => {
      return data._id !== id;
    });
    setData(newData)
    setfilterData(newData)
  };


  //Route 7 function update user 
  const updateUser = async (id, name, email, number) => {
    //Api call
    const url = `${host}/api/auth/updateUser/${id}`;
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ name, email, number }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    let newUser = JSON.parse(JSON.stringify(data));
    // logic to edit client on front end
    for (let index = 0; index < newUser.length; index++) {
      const element = data[index];
      if (element._id === id) {
        newUser[index].name = name;
        newUser[index].email = email;
        newUser[index].number = number;
        break;
      }
    }

    setData(newUser);
   setfilterData(newUser)
  };

  return (
    <NoteContext.Provider
      value={{ notes,getUser,data,filterData,setfilterData , setData,getAllUsers,updateUser,deleteUser, getNote, addNote, deleteNote, updateYourNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

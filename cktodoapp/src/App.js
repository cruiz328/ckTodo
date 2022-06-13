//import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {

  const [task2doName, setTask2doName] = useState("");
  const [review, setReview] = useState("");
  const [task2doReviewlist, setTask2dolist] = useState([])
  const [newReview, setNewReview] = useState("")



  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setTask2dolist(response.data)
    });
  
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      task2doName: task2doName,
      task2doReview: review,
    });
    setTask2dolist([
      ...task2doReviewlist,
      { task2doName: task2doName, task2doReview:review},
    ])
  };

  const deleteReview = (task2do) => {
    Axios.delete(`http://localhost:3001/api/delete/${task2do}`);
  };

  const updateReview = (task2do) => {
    Axios.put("http://localhost:3001/api/update",{
      task2doName: task2doName,
      task2doReview: newReview,
    });
    setNewReview("")
  };



  return (
    <div className="App">
   <h1>TODO CK APPLICATION</h1>

   <div className="form">
     <label>Day Task</label>
     <input type="text" name="task2doName" onChange={(e) => {
       setTask2doName(e.target.value);
     }}/>
   <label>Task Review</label>
   <input type="text" name="review" on onChange={(e) => {
       setReview(e.target.value);
      }}/>

<button onClick={submitReview}>Submit</button>

{task2doReviewlist.map((val)=> {
        return(
          <div className="card">
          <h1>{val.task2doName}</h1>
          <p>{val.task2doReview}</p>


          <button 
            onClick={() => {deleteReview(val.task2doName)}}>
                Delete
                </button>


          <input type="text" id="updateInput" onChange={(e)=> {
            setNewReview(e.target.value)
          }} />
          <button onClick={()=> {updateReview(val.task2doName)}}> 
            Update
            </button>
          </div>
        );
      })}

     </div>
    </div>
  );
}

export default App;


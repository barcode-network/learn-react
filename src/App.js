import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./App.css";
import TaskListItem from "./Tasks";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};
//This check is to avoid firebase re-initializing multiple times
if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//Load firebase firestore
var db = firebase.firestore();

const App = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTodoList();
  }, []);


  function getTodoList() {
    db.collection("tasks").onSnapshot(function (querySnapshot) {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          task: doc.data().task,
        }))
      );
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    db.collection("tasks").add({
      task: title,
    });

    setTitle("");
  }


  return (
    <div className="App">
      <div>
        <input
          type="text"
          name="task_title"
          value={title}
          placeholder="Add task here"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Add task
        </button>
      </div>

      <ul>
        {tasks?.length > 0
          ? tasks.map((task, index) => (
            <li key={index}>
              <TaskListItem
                task={task.task}
                id={task.id}
              />
            </li>
          ))
          : "Nothing in list"}
      </ul>

    </div >
  );
}

export default App;

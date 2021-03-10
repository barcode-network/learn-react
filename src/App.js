import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import "./App.css";

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
  const [editText, setEditText] = useState("");

  useEffect(() => {
    // db.collection("todos").onSnapshot((querySnapshot) => {
    //   var todos = [];
    //   querySnapshot.forEach((doc) => {
    //     todos.push(doc.data().title);
    //   });
    //   console.log("Current todos: ", todos);
    // });
    fetchTodos()
  }, []);

  const fetchTodos = () => {
    let dbTasks = [];
    db.collection("todos").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((doc) => {
        let obj = {
          id: doc.doc.id,
          title: doc.doc.data().title,
        };
        dbTasks = [obj, ...dbTasks];
      });

      setTasks([...dbTasks]);
    });
  }

  //Update the state object whenever the field is changed
  const handleFieldChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleEditFieldChange = (e) => {
    const { value } = e.target;
    setEditText(value);
  };

  //Handles saving to the tasks array
  const handleSubmit = () => {
    if (!title) {
      return;
    }
    let doc = {
      title: title,
    };
    db.collection("todos")
      .add(doc)
      .then((doc) => {
        console.log(doc);
      });
  };

  const handleEdit = (id) => {
    //TODO: Edit todo using the es6 find
    if(!editText) {
      return
    }
    db.collection("todos").doc(id).update({title: editText}).then(() => {
      fetchTodos()
    })
  };

  const handleRemove = (id) => {
    db.collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        fetchTodos()
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          name="task_title"
          placeholder="Add task here"
          onChange={handleFieldChange}
        />
        <button type="button" onClick={handleSubmit}>
          Add task
        </button>
      </div>

      <ul>
        {tasks?.length > 0
          ? tasks.map((item, index) => (
              <li key={index}>
                {item.title}
                <button type="button" onClick={() => handleEdit(item.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleRemove(item.id)}>
                  Delete
                </button>
                <input
                  type="text"
                  name="edit_task"
                  defaultValue={item.title}
                  // placeholder="Edit task...."
                  onChange={handleEditFieldChange}
                />
              </li>
            ))
          : "Nothing in list"}
      </ul>
    </div>
  );
};

export default App;

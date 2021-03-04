import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTableRow, setEditTableRow] = useState(-1)
  const [editTableField, setEditTableField] = useState('')

  useEffect(() => {
    //Check if localstorage is
    const storedTasks = JSON.parse(window.localStorage.getItem("tasks"));
    console.log(storedTasks);
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  //UseEffect re-renders application whenever dependency objects are changed
  useEffect(() => {
    //Save to localstorage whenever tasks is updated
    if (tasks.length > 0) {
      //console.log("save tasks to localstorage");
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  //Update the state object whenever the field is changed
  const handleFieldChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  //Handles saving to the tasks array
  const handleSubmit = () => {
    //console.log("handle submit", title);
    setTasks([...tasks, title]);
    setTitle("");
  };

  const toggleEditMode = (taskIndex) => {
    setEditTableRow(taskIndex)
  }

  const handleEditFieldChange = (e) => {
    const { value } = e.target
    setEditTableField(value)
  }

  const handleEdit = () => {
    //TODO: Edit todo using the es6 find

    const replace = tasks.findIndex((item, index) => editTableRow === index)
    tasks[replace] = editTableField

    console.log(tasks);

    setTasks([...tasks])
    setEditTableRow(-1)

  };

  const handleRemove = (taskIndex) => {
    //TODO: Remove todo using es6 filter

    const updateArr = tasks.filter((task, index) => index !== taskIndex);

    setTasks(updateArr);

  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          name="task_title"
          value={title}
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
            <li key={index}
              className='my-5 flex flex-row justify-evenly'>

              <input
                type='text'
                defaultValue={item}
                disabled={index !== editTableRow}
                onChange={handleEditFieldChange}
              />

              <div>
                {index !== editTableRow ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleEditMode(index)}>Edit</button>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}>Delete</button>
                  </>
                ) : (
                    <button
                      type="button"
                      onClick={handleEdit}>Save</button>
                  )}

              </div>
            </li>
          ))
          : "Nothing in list"}
      </ul>
    </div>
  );
};

export default App;

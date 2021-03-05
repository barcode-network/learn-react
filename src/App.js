import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editRow, setRow] = useState();
  const [onField, setOnField] = useState('');

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
    if (tasks.length >= 0) {
      //console.log("save tasks to localstorage");
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
      
     
      
      
    }
  }, [tasks]);

  //Update the state object whenever the field is changed
  const handleIsChange = (e) => {
    setTitle(e.target.value);
    
  };

  const handleEditFieldChange = (e) => {
   // const { value } = e.target
  
    setOnField(e.target.value)
  }

  const nudge = (val) => {
   
    setRow(val)
  }


  //Saves data
  const handleSubmit = () => {
   
    setTasks([...tasks, title]);
    setTitle("");
  };


  const handleEdit = () => {
    //TODO: Edit todo using the es6 find

 
    const replaceIndex = tasks.findIndex((item, index) => editRow === index)
    tasks[replaceIndex] = onField
    setTasks([...tasks]);
    
    






  };

  const handleRemove = (taskIndex) => {
    //TODO: Remove todo using es6 filter

    const removeTask = tasks.filter((task, index) => index !== taskIndex);
   // console.log(removeTask);
    setTasks(removeTask);
    refreshPage();

  };

  function refreshPage(){
    window.location.reload();
  }

  return (
    <div className="App">
      <div >
        <input
          type="text"
        
          value={title}
          placeholder="Add task here"
          onChange={handleIsChange}
        />
        <button  type="button" onClick={handleSubmit}>
          Add task
        </button>
      </div>

      <ul>
        {tasks?.length > 0
          ? tasks.map((item, index) => (
            <li key={index}>
              

              <textarea
                type='text'
                defaultValue={item}
                
                onChange={handleEditFieldChange}
                onClick={() => nudge(index)}
              />
 
           
                
                    <button type="button" onClick={handleEdit}>Edit</button> 
              
                    <button type="button" onClick={() => handleRemove(index)}>Delete</button> 
                 
                  

            
            </li>
          ))
          : "Nothing in list"}
      </ul>
    </div>
  );
};

export default App;
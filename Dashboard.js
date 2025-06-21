
import { useNavigate } from "react-router-dom"
import React,{useEffect,useState} from "react";

import './dashboard.css';

const Dashboard = () =>{

    const[task,setTask] = useState("");
    const[tasks,setTasks] = useState([]);
    const navigate = useNavigate();


    const activeUser = JSON.parse(localStorage.getItem("ActiveUser")); 

    const handleAddTask =()=>{     
        if (!task.trim())
            return;

        const newTask = {
            text :task,
            completed:false,
        };

        const updatedTasks = [...tasks,newTask];
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${activeUser.email}`, JSON.stringify(updatedTasks));
        setTask("")

        const allTasks = JSON.parse(localStorage.getItem("allUserTasks")) || {};
        allTasks[activeUser.email] = updatedTasks;
        localStorage.setItem("allUserTasks", JSON.stringify(allTasks));

    }
    
    const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${activeUser.email}`, JSON.stringify(updatedTasks));

    const allTasks = JSON.parse(localStorage.getItem("allUserTasks")) || {};
    allTasks[activeUser.email] = updatedTasks;
    localStorage.setItem("allUserTasks", JSON.stringify(allTasks));
};

const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);

    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${activeUser.email}`, JSON.stringify(updatedTasks));

    const allTasks = JSON.parse(localStorage.getItem("allUserTasks")) || {};
    allTasks[activeUser.email] = updatedTasks;
    localStorage.setItem("allUserTasks", JSON.stringify(allTasks));
};




    useEffect(()=>{
        const allTasks = JSON.parse(localStorage.getItem("allUserTasks"))||{};
        const userTasks = allTasks[activeUser.email] ||[];
        setTasks(userTasks)
    }, [activeUser.email]);

    const handleLogout = () => {
    localStorage.removeItem("ActiveUser"); // remove logged-in user
    navigate("/"); // redirect to login or home page
};

    
    return(
        <div className="container"> 
             <div className="header">
                <h2>Welcome,</h2>
                <button className="btn" onClick={handleLogout}>Logout</button>
             </div>
             <div className="task-input">
                <h3>Add Task</h3>
                <input type="text" placeholder="Enter your task." value={task} 
                onChange={(e)=>setTask(e.target.value)} />  
                <button onClick={handleAddTask}>Add</button>
             </div>


             <div className="pending-task">
  <h3>Pending Tasks</h3>
  {tasks.map((task, index) => (
    !task.completed && (
      <div key={index} className="task-item">
        <span>{task.text}</span>
        <button onClick={() => handleToggleTask(index)}>Finished</button>
      </div>
    )
  ))}

  <h3>Completed Tasks</h3>
  {tasks.map((task, index) => (
    task.completed && (
      <div key={index} className="task-item">
        <span style={{  }}>{task.text}</span>
        <button onClick={() => handleToggleTask(index)}>Undo</button>
        <button onClick={() => handleDeleteTask(index)}>Delete</button>
      </div>
    )
  ))}
</div>

   
</div>


    );
};

export default Dashboard;
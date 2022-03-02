import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState } from 'react';
import { useEffect } from 'react';


const  App =() => {

  const[showAddTasks, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])
  
    // Fetch Task from json
  const fetchTasks = async () =>{
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      console.log(data)
      //If not return then it's null, the promise is waiting on a an empty/Void so you have to return that data
      return data
  }

  useEffect(()=>{
      const getTasks = async () => {
        const taskFromjson = await fetchTasks()
        setTasks(taskFromjson)
      }
    getTasks()
  },[])


  

    // Delete Task 

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`,{
          method: 'DELETE',
        })
        // console.log('delete', id)

        setTasks(tasks.filter((task)=> task.id !==id
        ))
    }

    // Toogle Reminder

  const toggleReminder = (id) => {
    // console.log(id);
    setTasks(tasks.map((task)=>task.id===id ? {...task, reminder: !task.reminder} : task))
  }

  // Add Task task

  const addTask = async (task) =>{
    // console.log(task)
    
    // Generate ramdom ID for tasks/ when run with the json it should by itself but currently facing an error
    const id = Math.floor(Math.random() * 150) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
    
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },

      body: JSON.stringify(task),
      
    })

    const data = await res.json()
    setTasks([...tasks, data])


  }

  return (
    <div className="container">
      <Header ondAdd={()=> setShowAddTask(!showAddTasks)} showOrClose={showAddTasks}/>
      {showAddTasks && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ?(<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('All task are cleared')
      }
    </div>
  );
}

export default App;

import React from 'react'
import { useState } from 'react'
const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onsub = (e) =>{
        e.preventDefault()
        if(!text){
            alert("Add task");
            return;
        }
        onAdd({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
    }
  return (
    <div>
    <form className="add-form" onSubmit={onsub}>
        <div className="form-control">
            <label htmlFor="tasks">Task</label>
            <input 
            type="text" 
            placeholder="Add Task"
            value={text} onChange={(e)=> setText(e.target.value)}/>
        </div>

        <div className="form-control">
            <label htmlFor="tasks">Day & Time</label>
            <input 
            type="text" 
            placeholder=" Add Day and Time"
            value={day} onChange={(e)=> setDay(e.target.value)}/>
        </div>

        <div className="form-control form-control-check">
            <label htmlFor="tasks">Set Reminder</label>
            <input 
            type="checkbox"
            checked={reminder}
            value={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}/>
        </div>

        <input className='btn btn-block' type="submit" value='Save Task'/>
    </form>
    </div>
  )
}

export default AddTask
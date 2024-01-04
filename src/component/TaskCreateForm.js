import React, { useEffect, useState } from 'react'
import './style.css'
import ShowList from './ShowList';

function TaskCreateForm() {
    const [tasks, setTasks] = useState("");
    const [editItem, setEditItem] = useState(false);
    const [editItemID, setEditItemID] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        complete: "incomplete"
    });

    useEffect(() => {
        const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(initialTasks);
    }, []);
    
    const handleAddTask = () => {
        // const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (editItem) {
            const updatedTasks = tasks.map((elem) => {
                if (elem.id === editItemID) {
                    return { ...elem, ...newTask };
                }
                return elem;
            });
            setTasks(updatedTasks);
            setNewTask({
                title: '',
                description: '',
                dueDate: '',
                priority: 'Low',
                complete: "incomplete"
            });
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setEditItem(false);
        } else {
            const updatedTasks = [...tasks, { ...newTask, id: Math.random().toString(16).slice(2) }];
            setTasks(updatedTasks);
            setNewTask({
                title: '',
                description: '',
                dueDate: '',
                priority: 'Low',
                complete: "incomplete"
            });
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
    };

    
    const editHandle = (data) => {
        setNewTask(
            {
                ...newTask,
                title: data.title,
                description: data.description,
                dueDate: data.dueDate,
                priority: data.priority,
                complete: data.complete
            }
        )
        setEditItem(true)
        setEditItemID(data.id)

    }

    const deleteHandle = (data) => {
        const deleteItem = tasks.filter((elem) => {
            return data.id !== elem.id
        })
        setTasks(deleteItem);
        localStorage.setItem("tasks",JSON.stringify(deleteItem))
    }
    return (
        <div className='taskStyle'>
            <div className='row'>
                <div className='col-sm-12 col-md-4 col-lg-4 formStyle'>
                    <div className='form'>
                        <h5>Task Manager</h5>
                        <div>
                            <label>Title</label>
                            <input type='text' className='form-control' value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}></input>
                        </div>
                        <div>
                            <label>Priority</label>
                            <select value={newTask.priority} className='form-control' onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div>
                            <label>Due Date</label>
                            <input type='date' className='form-control' value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}></input>
                        </div>
                        {
                            editItem &&
                            <div>
                                <label>complete</label>
                                <select
                                    value={newTask.complete}
                                    className='form-control'
                                    onChange={(e) => setNewTask({ ...newTask, complete: e.target.value })}
                                >
                                    <option value="complete">Complete</option>
                                    <option value="incomplete">Incomplete</option>
                                </select>
                            </div>
                        }
                        <div>
                            <label>Description</label>
                            <textarea className='form-control textareaField' value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}></textarea>
                        </div>
                        <div className='btn'>
                            <button onClick={handleAddTask}> {editItem ? "Update Task" : "Add Task"}</button>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-8 col-lg-8 tableStyle'>
                    {(tasks !== "" && tasks.length !== 0) ? <ShowList List={tasks} editData={editHandle} deleteData={deleteHandle} /> : <h5>No Task Available</h5>}
                </div>

            </div>
        </div>
    )
}

export default TaskCreateForm

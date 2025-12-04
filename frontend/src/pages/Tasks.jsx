import { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
    const { tasks, addTask } = useContext(TaskContext);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(formData);
        setFormData({
            title: '',
            description: '',
            dueDate: ''
        });
    };

    return (
        <div className="tasks-page">
            <h1>Tasks</h1>

            <div className="add-task-form">
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                    <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                    <input type="date" name="dueDate" placeholder="Due Date" value={formData.dueDate} onChange={handleChange} />
                    <button type="submit">Add Task</button>
                </form>
            </div>

            <div className="task-list">
                {tasks.map(task => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Tasks;

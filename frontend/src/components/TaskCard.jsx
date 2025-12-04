import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskCard = ({ task }) => {
    const { updateTask, deleteTask } = useContext(TaskContext);

    const toggleComplete = () => {
        updateTask(task._id, { ...task, completed: !task.completed });
    };

    return (
        <div className={`task-card ${task.completed ? 'completed' : ''}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {task.dueDate && <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>}
            <div className="task-actions">
                <button onClick={toggleComplete}>
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={() => deleteTask(task._id)} className="delete-btn">Delete</button>
            </div>
        </div>
    );
};

export default TaskCard;

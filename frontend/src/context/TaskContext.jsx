import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            getTasks();
        } else {
            setTasks([]);
        }
    }, [user]);

    const getTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    const addTask = async (task) => {
        try {
            const res = await axios.post('http://localhost:5000/api/tasks', task);
            setTasks([...tasks, res.data]);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
            setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, getTasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;

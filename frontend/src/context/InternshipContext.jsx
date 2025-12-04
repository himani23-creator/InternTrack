import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const InternshipContext = createContext();

export const InternshipProvider = ({ children }) => {
    const [internships, setInternships] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 100, // Get all for now, can be adjusted
        totalPages: 1
    });
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            getInternships();
        } else {
            setInternships([]);
        }
    }, [user]);

    const getInternships = async (params = {}) => {
        try {
            const queryParams = new URLSearchParams({
                page: params.page || 1,
                limit: params.limit || 100,
                sortBy: params.sortBy || 'createdAt',
                order: params.order || 'desc',
                ...(params.status && { status: params.status }),
                ...(params.company && { company: params.company }),
                ...(params.search && { search: params.search })
            });

            const res = await axios.get(`http://localhost:5000/api/internships?${queryParams}`);
            setInternships(res.data.internships);
            setPagination(res.data.pagination);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    const addInternship = async (internship) => {
        try {
            const res = await axios.post('http://localhost:5000/api/internships', internship);
            setInternships([res.data, ...internships]);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    const updateInternship = async (id, updatedInternship) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/internships/${id}`, updatedInternship);
            setInternships(internships.map((i) => (i._id === id ? res.data : i)));
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    const deleteInternship = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/internships/${id}`);
            setInternships(internships.filter((i) => i._id !== id));
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <InternshipContext.Provider value={{
            internships,
            pagination,
            getInternships,
            addInternship,
            updateInternship,
            deleteInternship
        }}>
            {children}
        </InternshipContext.Provider>
    );
};

export default InternshipContext;

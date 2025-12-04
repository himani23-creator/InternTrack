import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['x-auth-token'] = token;
                try {
                    // Verify token with backend if needed, or just decode it
                    // For now, let's assume if token exists we are logged in
                    // In a real app, we would hit an endpoint like /api/auth/user
                    // const res = await axios.get('http://localhost:5000/api/auth/user');
                    // setUser(res.data);
                    setUser({ token }); // Placeholder
                } catch (err) {
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['x-auth-token'];
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            setUser({ token: res.data.token });
            return true;
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert('Login failed: ' + (err.response?.data?.msg || 'Please check your credentials'));
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

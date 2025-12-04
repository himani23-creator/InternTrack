import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="logo">InternTrack</div>
            <div className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/browse">Browse Internships</Link>
                <Link to="/internships">Internships</Link>
                <Link to="/tasks">Tasks</Link>
                {user ? (
                    <a href="#!" onClick={logout}>Logout</a>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

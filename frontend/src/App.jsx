import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Internships from './pages/Internships';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BrowseInternships from './pages/BrowseInternships';
import './App.css';

import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';

import { InternshipProvider } from './context/InternshipContext';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <AuthProvider>
      <InternshipProvider>
        <TaskProvider>
          <Router>
            <div className="app-container">
              <Navbar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/browse" element={<BrowseInternships />} />
                  <Route path="/internships" element={<Internships />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </div>
            </div>
          </Router>
        </TaskProvider>
      </InternshipProvider>
    </AuthProvider>
  );
}

export default App;

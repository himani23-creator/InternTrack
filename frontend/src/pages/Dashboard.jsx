import { useContext, useState } from 'react';
import InternshipContext from '../context/InternshipContext';
import TaskContext from '../context/TaskContext';
import InternshipCard from '../components/InternshipCard';

const Dashboard = () => {
    const { internships } = useContext(InternshipContext);
    const { tasks } = useContext(TaskContext);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const appliedCount = internships.filter(i => i.status === 'Applied').length;
    const interviewCount = internships.filter(i => i.status === 'Interview').length;
    const offerCount = internships.filter(i => i.status === 'Offer').length;
    const rejectedCount = internships.filter(i => i.status === 'Rejected').length;

    const upcomingInterviews = internships
        .filter(i => i.interviewDate && new Date(i.interviewDate) > new Date())
        .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate))
        .slice(0, 5);

    const upcomingTasks = tasks
        .filter(t => !t.completed && t.dueDate && new Date(t.dueDate) > new Date())
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);

    const handleStatClick = (status) => {
        setSelectedStatus(selectedStatus === status ? null : status);
    };

    const filteredInternships = selectedStatus
        ? internships.filter(i => i.status === selectedStatus)
        : [];

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            <div className="stats-container">
                <div
                    className={`stat-card clickable ${selectedStatus === 'Applied' ? 'active' : ''}`}
                    onClick={() => handleStatClick('Applied')}
                >
                    <h3>Applied</h3>
                    <p>{appliedCount}</p>
                    <span className="click-hint">Click to view</span>
                </div>
                <div
                    className={`stat-card clickable ${selectedStatus === 'Interview' ? 'active' : ''}`}
                    onClick={() => handleStatClick('Interview')}
                >
                    <h3>Interviews</h3>
                    <p>{interviewCount}</p>
                    <span className="click-hint">Click to view</span>
                </div>
                <div
                    className={`stat-card clickable ${selectedStatus === 'Offer' ? 'active' : ''}`}
                    onClick={() => handleStatClick('Offer')}
                >
                    <h3>Offers</h3>
                    <p>{offerCount}</p>
                    <span className="click-hint">Click to view</span>
                </div>
                <div
                    className={`stat-card clickable ${selectedStatus === 'Rejected' ? 'active' : ''}`}
                    onClick={() => handleStatClick('Rejected')}
                >
                    <h3>Rejected</h3>
                    <p>{rejectedCount}</p>
                    <span className="click-hint">Click to view</span>
                </div>
            </div>

            {/* Filtered Internships View */}
            {selectedStatus && (
                <div className="filtered-internships">
                    <div className="filter-header">
                        <h2>{selectedStatus} Internships ({filteredInternships.length})</h2>
                        <button onClick={() => setSelectedStatus(null)} className="close-filter">
                            ✕ Close
                        </button>
                    </div>
                    {filteredInternships.length > 0 ? (
                        <div className="internship-list">
                            {filteredInternships.map(internship => (
                                <InternshipCard key={internship._id} internship={internship} />
                            ))}
                        </div>
                    ) : (
                        <p className="no-internships">No {selectedStatus.toLowerCase()} internships yet.</p>
                    )}
                </div>
            )}

            <div className="dashboard-sections">
                <div className="section">
                    <h2>Upcoming Interviews</h2>
                    {upcomingInterviews.length > 0 ? (
                        <ul>
                            {upcomingInterviews.map(i => (
                                <li key={i._id}>
                                    <strong>{i.company}</strong> - {new Date(i.interviewDate).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No upcoming interviews</p>
                    )}
                </div>

                <div className="section">
                    <h2>Upcoming Tasks</h2>
                    {upcomingTasks.length > 0 ? (
                        <ul>
                            {upcomingTasks.map(t => (
                                <li key={t._id}>
                                    <strong>{t.title}</strong> - {new Date(t.dueDate).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No upcoming tasks</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

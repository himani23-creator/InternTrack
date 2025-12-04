import { useContext, useState } from 'react';
import InternshipContext from '../context/InternshipContext';

const InternshipCard = ({ internship }) => {
    const { updateInternship, deleteInternship } = useContext(InternshipContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        company: internship.company,
        role: internship.role,
        status: internship.status,
        deadline: internship.deadline ? new Date(internship.deadline).toISOString().split('T')[0] : '',
        interviewDate: internship.interviewDate ? new Date(internship.interviewDate).toISOString().split('T')[0] : ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateInternship(internship._id, formData);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${internship.company}?`)) {
            deleteInternship(internship._id);
        }
    };

    if (isEditing) {
        return (
            <div className="internship-card editing">
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        required
                    />
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Role"
                    />
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offer">Offer</option>
                    </select>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        placeholder="Deadline"
                    />
                    <input
                        type="date"
                        name="interviewDate"
                        value={formData.interviewDate}
                        onChange={handleChange}
                        placeholder="Interview Date"
                    />
                    <div className="task-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="internship-card">
            <h3>{internship.company}</h3>
            <p><strong>Role:</strong> {internship.role || 'N/A'}</p>
            <p><strong>Status:</strong> <span className={`status-badge status-${internship.status?.toLowerCase()}`}>{internship.status}</span></p>
            {internship.deadline && <p><strong>Deadline:</strong> {new Date(internship.deadline).toLocaleDateString()}</p>}
            {internship.interviewDate && <p><strong>Interview:</strong> {new Date(internship.interviewDate).toLocaleDateString()}</p>}
            <div className="task-actions">
                <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
                <button onClick={handleDelete} className="delete-btn">Delete</button>
            </div>
        </div>
    );
};

export default InternshipCard;

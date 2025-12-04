import { useState, useContext, useEffect } from 'react';
import InternshipContext from '../context/InternshipContext';
import InternshipCard from '../components/InternshipCard';

const Internships = () => {
    const { internships, pagination, getInternships, addInternship } = useContext(InternshipContext);
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        status: 'Applied',
        deadline: '',
        interviewDate: ''
    });

    // Filter and sort controls
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        sortBy: 'createdAt',
        order: 'desc'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addInternship(formData);
        setFormData({
            company: '',
            role: '',
            status: 'Applied',
            deadline: '',
            interviewDate: ''
        });
    };

    const handleFilterChange = (e) => {
        const newFilters = { ...filters, [e.target.name]: e.target.value };
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        applyFilters(filters);
    };

    const applyFilters = (filterParams) => {
        const params = {};
        if (filterParams.search) params.search = filterParams.search;
        if (filterParams.status) params.status = filterParams.status;
        if (filterParams.sortBy) params.sortBy = filterParams.sortBy;
        if (filterParams.order) params.order = filterParams.order;

        getInternships(params);
    };

    const clearFilters = () => {
        const resetFilters = {
            search: '',
            status: '',
            sortBy: 'createdAt',
            order: 'desc'
        };
        setFilters(resetFilters);
        getInternships();
    };

    return (
        <div className="internships-page">
            <h1>Internships</h1>

            <div className="add-internship-form">
                <h2>Add New Internship</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
                    <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offer">Offer</option>
                    </select>
                    <input type="date" name="deadline" placeholder="Deadline" value={formData.deadline} onChange={handleChange} />
                    <input type="date" name="interviewDate" placeholder="Interview Date" value={formData.interviewDate} onChange={handleChange} />
                    <button type="submit">Add Internship</button>
                </form>
            </div>

            {/* Filter and Sort Controls */}
            <div className="filter-controls">
                <h2>Filter & Sort ({pagination.total} total)</h2>
                <div className="filter-row">
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search by company, role, or location..."
                            value={filters.search}
                            onChange={handleFilterChange}
                        />
                        <button type="submit">Search</button>
                    </form>

                    <select name="status" value={filters.status} onChange={handleFilterChange}>
                        <option value="">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offer">Offer</option>
                    </select>

                    <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                        <option value="createdAt">Date Added</option>
                        <option value="company">Company</option>
                        <option value="status">Status</option>
                        <option value="deadline">Deadline</option>
                        <option value="interviewDate">Interview Date</option>
                    </select>

                    <select name="order" value={filters.order} onChange={handleFilterChange}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>

                    <button onClick={clearFilters} className="clear-btn">Clear Filters</button>
                </div>
            </div>

            <div className="internship-list">
                {internships.length > 0 ? (
                    internships.map(internship => (
                        <InternshipCard key={internship._id} internship={internship} />
                    ))
                ) : (
                    <p className="no-results">No internships found. Try adjusting your filters.</p>
                )}
            </div>
        </div>
    );
};

export default Internships;

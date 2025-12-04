import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import InternshipContext from '../context/InternshipContext';

const BrowseInternships = () => {
    const { addInternship } = useContext(InternshipContext);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryInternships, setCategoryInternships] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [formData, setFormData] = useState({
        deadline: '',
        interviewDate: ''
    });
    const [selectedInternship, setSelectedInternship] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/browse/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/browse/search?q=${query}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching internships:', error);
        }
    };

    const handleCategoryClick = async (categoryName) => {
        setSelectedCategory(categoryName);
        setIsSearching(false);
        setSearchQuery('');
        try {
            const response = await axios.get(`http://localhost:5000/api/browse/category/${categoryName}`);
            setCategoryInternships(response.data);
        } catch (error) {
            console.error('Error fetching category internships:', error);
        }
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setCategoryInternships([]);
    };

    const handleAddInternship = (internship) => {
        setSelectedInternship(internship);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitInternship = (e) => {
        e.preventDefault();
        if (selectedInternship) {
            const internshipData = {
                company: selectedInternship.company,
                role: selectedInternship.role,
                status: 'Applied',
                deadline: formData.deadline,
                interviewDate: formData.interviewDate
            };
            addInternship(internshipData);
            setSelectedInternship(null);
            setFormData({ deadline: '', interviewDate: '' });
            alert('Internship added to your tracking list!');
        }
    };

    const handleCancelAdd = () => {
        setSelectedInternship(null);
        setFormData({ deadline: '', interviewDate: '' });
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'IT': '💻',
            'Human Resources': '👥',
            'Marketing': '📢',
            'Finance': '💰',
            'Design': '🎨',
            'Sales': '📊',
            'Data Science': '📈',
            'Consulting': '💼'
        };
        return icons[category] || '📋';
    };

    return (
        <div className="browse-internships-page">
            <div className="browse-header">
                <h1>Browse Internships</h1>
                <p>Discover amazing internship opportunities across various industries</p>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by company, role, location, or category..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button
                            className="clear-search"
                            onClick={() => handleSearch('')}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Search Results */}
            {isSearching && searchResults.length > 0 && (
                <div className="search-results">
                    <h2>Search Results ({searchResults.length})</h2>
                    <div className="internship-grid">
                        {searchResults.map(internship => (
                            <div key={internship.id} className="internship-card">
                                <div className="internship-header">
                                    <h3>{internship.role}</h3>
                                    <span className="category-badge">{internship.category}</span>
                                </div>
                                <p className="company">{internship.company}</p>
                                <p className="location">📍 {internship.location}</p>
                                <p className="description">{internship.description}</p>
                                <button
                                    className="add-btn"
                                    onClick={() => handleAddInternship(internship)}
                                >
                                    + Add to Track
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Category View */}
            {!isSearching && selectedCategory && (
                <div className="category-view">
                    <button className="back-btn" onClick={handleBackToCategories}>
                        ← Back to Categories
                    </button>
                    <h2>{getCategoryIcon(selectedCategory)} {selectedCategory} Internships</h2>
                    <div className="internship-grid">
                        {categoryInternships.map(internship => (
                            <div key={internship.id} className="internship-card">
                                <div className="internship-header">
                                    <h3>{internship.role}</h3>
                                </div>
                                <p className="company">{internship.company}</p>
                                <p className="location">📍 {internship.location}</p>
                                <p className="description">{internship.description}</p>
                                <button
                                    className="add-btn"
                                    onClick={() => handleAddInternship(internship)}
                                >
                                    + Add to Track
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Categories Grid */}
            {!isSearching && !selectedCategory && (
                <div className="categories-section">
                    <h2>Explore by Category</h2>
                    <div className="categories-grid">
                        {categories.map(category => (
                            <div
                                key={category.name}
                                className="category-card"
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <div className="category-icon">
                                    {getCategoryIcon(category.name)}
                                </div>
                                <h3>{category.name}</h3>
                                <p className="job-count">{category.count} opportunities</p>
                                <div className="explore-arrow">→</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add Internship Modal */}
            {selectedInternship && (
                <div className="modal-overlay" onClick={handleCancelAdd}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Add Internship to Track</h2>
                        <div className="internship-details">
                            <h3>{selectedInternship.role}</h3>
                            <p><strong>Company:</strong> {selectedInternship.company}</p>
                            <p><strong>Location:</strong> {selectedInternship.location}</p>
                        </div>
                        <form onSubmit={handleSubmitInternship}>
                            <div className="form-group">
                                <label>Application Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Interview Date</label>
                                <input
                                    type="date"
                                    name="interviewDate"
                                    value={formData.interviewDate}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={handleCancelAdd}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Add Internship
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowseInternships;

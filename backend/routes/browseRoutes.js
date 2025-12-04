const express = require('express');
const router = express.Router();

// Mock data for available internships (in a real app, this would come from a database)
const availableInternships = [
    // IT Category
    { id: 1, company: 'Google', role: 'Software Engineering Intern', category: 'IT', location: 'Mountain View, CA', description: 'Work on cutting-edge technologies' },
    { id: 2, company: 'Microsoft', role: 'Cloud Developer Intern', category: 'IT', location: 'Redmond, WA', description: 'Azure cloud development' },
    { id: 3, company: 'Amazon', role: 'Full Stack Developer Intern', category: 'IT', location: 'Seattle, WA', description: 'Build scalable web applications' },
    { id: 4, company: 'Meta', role: 'Frontend Developer Intern', category: 'IT', location: 'Menlo Park, CA', description: 'React and web technologies' },
    { id: 5, company: 'Apple', role: 'iOS Developer Intern', category: 'IT', location: 'Cupertino, CA', description: 'Mobile app development' },
    { id: 6, company: 'Netflix', role: 'Backend Engineer Intern', category: 'IT', location: 'Los Gatos, CA', description: 'Streaming infrastructure' },
    { id: 7, company: 'Spotify', role: 'Data Engineer Intern', category: 'IT', location: 'Stockholm, Sweden', description: 'Music data processing' },
    { id: 8, company: 'Adobe', role: 'Machine Learning Intern', category: 'IT', location: 'San Jose, CA', description: 'AI/ML projects' },

    // Human Resources
    { id: 9, company: 'Deloitte', role: 'HR Analytics Intern', category: 'Human Resources', location: 'New York, NY', description: 'People analytics and insights' },
    { id: 10, company: 'PwC', role: 'Talent Acquisition Intern', category: 'Human Resources', location: 'Chicago, IL', description: 'Recruitment and hiring' },
    { id: 11, company: 'KPMG', role: 'HR Operations Intern', category: 'Human Resources', location: 'Boston, MA', description: 'HR process optimization' },
    { id: 12, company: 'EY', role: 'Learning & Development Intern', category: 'Human Resources', location: 'London, UK', description: 'Employee training programs' },
    { id: 13, company: 'Accenture', role: 'Compensation & Benefits Intern', category: 'Human Resources', location: 'Dublin, Ireland', description: 'Benefits administration' },

    // Marketing
    { id: 14, company: 'Nike', role: 'Digital Marketing Intern', category: 'Marketing', location: 'Portland, OR', description: 'Social media campaigns' },
    { id: 15, company: 'Coca-Cola', role: 'Brand Marketing Intern', category: 'Marketing', location: 'Atlanta, GA', description: 'Brand strategy and positioning' },
    { id: 16, company: 'Unilever', role: 'Content Marketing Intern', category: 'Marketing', location: 'London, UK', description: 'Content creation and strategy' },
    { id: 17, company: 'Procter & Gamble', role: 'Product Marketing Intern', category: 'Marketing', location: 'Cincinnati, OH', description: 'Product launches' },
    { id: 18, company: 'L\'Oréal', role: 'Social Media Marketing Intern', category: 'Marketing', location: 'Paris, France', description: 'Social media management' },
    { id: 19, company: 'Red Bull', role: 'Event Marketing Intern', category: 'Marketing', location: 'Salzburg, Austria', description: 'Event planning and execution' },

    // Finance
    { id: 20, company: 'Goldman Sachs', role: 'Investment Banking Intern', category: 'Finance', location: 'New York, NY', description: 'M&A and capital markets' },
    { id: 21, company: 'JP Morgan', role: 'Financial Analyst Intern', category: 'Finance', location: 'New York, NY', description: 'Financial modeling and analysis' },
    { id: 22, company: 'Morgan Stanley', role: 'Equity Research Intern', category: 'Finance', location: 'New York, NY', description: 'Stock analysis and research' },
    { id: 23, company: 'BlackRock', role: 'Portfolio Management Intern', category: 'Finance', location: 'New York, NY', description: 'Investment portfolio management' },
    { id: 24, company: 'Citigroup', role: 'Risk Management Intern', category: 'Finance', location: 'London, UK', description: 'Financial risk analysis' },
    { id: 25, company: 'Bank of America', role: 'Corporate Finance Intern', category: 'Finance', location: 'Charlotte, NC', description: 'Corporate financial planning' },

    // Design
    { id: 26, company: 'Airbnb', role: 'UX Design Intern', category: 'Design', location: 'San Francisco, CA', description: 'User experience design' },
    { id: 27, company: 'Figma', role: 'Product Design Intern', category: 'Design', location: 'San Francisco, CA', description: 'Design tools and interfaces' },
    { id: 28, company: 'Dropbox', role: 'UI/UX Designer Intern', category: 'Design', location: 'San Francisco, CA', description: 'Interface design' },
    { id: 29, company: 'Pinterest', role: 'Visual Design Intern', category: 'Design', location: 'San Francisco, CA', description: 'Visual and graphic design' },
    { id: 30, company: 'Canva', role: 'Graphic Design Intern', category: 'Design', location: 'Sydney, Australia', description: 'Design templates and assets' },

    // Sales
    { id: 31, company: 'Salesforce', role: 'Sales Development Intern', category: 'Sales', location: 'San Francisco, CA', description: 'B2B sales and outreach' },
    { id: 32, company: 'Oracle', role: 'Inside Sales Intern', category: 'Sales', location: 'Austin, TX', description: 'Enterprise software sales' },
    { id: 33, company: 'HubSpot', role: 'Sales Operations Intern', category: 'Sales', location: 'Boston, MA', description: 'Sales process optimization' },
    { id: 34, company: 'Zoom', role: 'Account Executive Intern', category: 'Sales', location: 'San Jose, CA', description: 'Account management' },
    { id: 35, company: 'Slack', role: 'Business Development Intern', category: 'Sales', location: 'San Francisco, CA', description: 'Partnership development' },

    // Data Science
    { id: 36, company: 'Uber', role: 'Data Science Intern', category: 'Data Science', location: 'San Francisco, CA', description: 'Predictive modeling and analytics' },
    { id: 37, company: 'Lyft', role: 'Data Analyst Intern', category: 'Data Science', location: 'San Francisco, CA', description: 'Business intelligence' },
    { id: 38, company: 'LinkedIn', role: 'Data Engineering Intern', category: 'Data Science', location: 'Sunnyvale, CA', description: 'Data pipeline development' },
    { id: 39, company: 'Twitter', role: 'Machine Learning Intern', category: 'Data Science', location: 'San Francisco, CA', description: 'ML model development' },

    // Consulting
    { id: 40, company: 'McKinsey & Company', role: 'Strategy Consulting Intern', category: 'Consulting', location: 'New York, NY', description: 'Business strategy projects' },
    { id: 41, company: 'Boston Consulting Group', role: 'Management Consulting Intern', category: 'Consulting', location: 'Boston, MA', description: 'Client consulting projects' },
    { id: 42, company: 'Bain & Company', role: 'Business Analyst Intern', category: 'Consulting', location: 'Chicago, IL', description: 'Business analysis and strategy' },
];

// GET /api/browse/categories - Get all categories with job counts
router.get('/categories', (req, res) => {
    try {
        const categories = {};

        availableInternships.forEach(internship => {
            if (!categories[internship.category]) {
                categories[internship.category] = 0;
            }
            categories[internship.category]++;
        });

        const categoryList = Object.keys(categories).map(category => ({
            name: category,
            count: categories[category]
        }));

        res.json(categoryList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
});

// GET /api/browse/search?q=keyword - Search internships by keyword
router.get('/search', (req, res) => {
    try {
        const query = req.query.q?.toLowerCase() || '';

        if (!query) {
            return res.json(availableInternships);
        }

        const results = availableInternships.filter(internship =>
            internship.company.toLowerCase().includes(query) ||
            internship.role.toLowerCase().includes(query) ||
            internship.category.toLowerCase().includes(query) ||
            internship.location.toLowerCase().includes(query) ||
            internship.description.toLowerCase().includes(query)
        );

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error searching internships', error: error.message });
    }
});

// GET /api/browse/category/:category - Get internships by category
router.get('/category/:category', (req, res) => {
    try {
        const category = req.params.category;

        const results = availableInternships.filter(internship =>
            internship.category.toLowerCase() === category.toLowerCase()
        );

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category internships', error: error.message });
    }
});

module.exports = router;

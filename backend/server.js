const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
connectDB();

// middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://interntrack-kj8nj64dj-himani23-creators-projects.vercel.app',
        'https://interntrack.vercel.app'  // Custom domain if you set one up
    ],
    credentials: true
}));
app.use(express.json());
// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/tasks', require('./routes/tasks')); // implement tasks.js
app.use('/api/docs', require('./routes/docs'));
app.use('/api/notes', require('./routes/notes')); // implement notes.js
app.use('/api/browse', require('./routes/browseRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

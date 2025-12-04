const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Internship = require('../models/Internship');

// Get all internships for user with pagination, sorting, and filtering
router.get('/', auth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
      status,
      company,
      search
    } = req.query;

    // Build filter query
    const filter = { user: req.user.id };

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Filter by company (exact match)
    if (company) {
      filter.company = { $regex: company, $options: 'i' }; // Case-insensitive
    }

    // Search across multiple fields
    if (search) {
      filter.$or = [
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };

    // Execute query with pagination and sorting
    const internships = await Internship.find(filter)
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination metadata
    const total = await Internship.countDocuments(filter);

    // Return data with pagination metadata
    res.json({
      internships,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add internship
router.post('/', auth, async (req, res) => {
  try {
    const data = { ...req.body, user: req.user.id };
    const newItem = new Internship(data);
    const saved = await newItem.save();
    res.json(saved);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update internship
router.put('/:id', auth, async (req, res) => {
  try {
    let internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ msg: 'Not found' });
    if (internship.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    internship = await Internship.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(internship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete internship
router.delete('/:id', auth, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ msg: 'Not found' });
    if (internship.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await Internship.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

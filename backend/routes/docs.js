const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Document = require('../models/Document');

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Upload a document (resume/cover)
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const doc = new Document({
      user: req.user.id,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });
    await doc.save();
    res.json(doc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get list of user's documents
router.get('/', auth, async (req, res) => {
  try {
    const list = await Document.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete doc
router.delete('/:id', auth, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ msg: 'Not found' });
    if (doc.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    // optional: remove file from disk (fs.unlink)
    await doc.remove();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

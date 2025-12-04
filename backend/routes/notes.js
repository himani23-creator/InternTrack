const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// Get notes
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Add note
router.post('/', auth, async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      user: req.user.id
    });
    const saved = await note.save();
    res.json(saved);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update note
router.put('/:id', auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send('Note not found');

    if (note.user.toString() !== req.user.id)
      return res.status(401).send('Not authorized');

    note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send('Note not found');

    if (note.user.toString() !== req.user.id)
      return res.status(401).send('Not authorized');

    await note.deleteOne();
    res.json({ msg: 'Note removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

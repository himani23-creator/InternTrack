const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  role: { type: String },
  location: { type: String },
  appliedDate: { type: Date },
  status: { type: String, enum: ['Applied','Interview','Rejected','Offer'], default: 'Applied' },
  deadline: { type: Date },
  interviewDate: { type: Date },
  notes: { type: String },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  coverLetterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Internship', InternshipSchema);

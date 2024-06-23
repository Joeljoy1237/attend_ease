const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admnNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);

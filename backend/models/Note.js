const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    content: { type: String, required: true, trim: true },
    pinned: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);

const Note = require('../models/Note');

// GET /api/notes
const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        next(err);
    }
};

// GET /api/notes/:id
const getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        next(err);
    }
};

// POST /api/notes 
const createNote = async (req, res, next) => {
    try {
        const { title, content, pinned } = req.body;
        if (!title || !content) return res.status(400).json({ message: 'Title and content required' });
        const note = await Note.create({ user: req.user._id, title, content, pinned: !!pinned });
        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
};

// PUT /api/notes/:id 
const replaceNote = async (req, res, next) => {
    try {
        const { title, content, pinned } = req.body;
        if (!title || !content) return res.status(400).json({ message: 'Title and content required for full replace' });

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, content, pinned: !!pinned },
            { new: true, runValidators: true, upsert: false }
        );
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        next(err);
    }
};

// PATCH /api/notes/:id
const updateNote = async (req, res, next) => {
    try {
        const updates = req.body;
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    replaceNote,
    updateNote,
    deleteNote
};

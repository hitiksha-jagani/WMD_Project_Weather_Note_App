const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const noteController = require('../controllers/noteController');

// All note routes are protected 
router.use(protect);

// GET /api/notes - list user's notes
router.get('/', noteController.getNotes);

// POST /api/notes - create new note
router.post('/', noteController.createNote);

// GET /api/notes/:id - single note
router.get('/:id', noteController.getNoteById);

// PUT /api/notes/:id - full replace
router.put('/:id', noteController.replaceNote);

// PATCH /api/notes/:id - partial update
router.patch('/:id', noteController.updateNote);

// DELETE /api/notes/:id - remove note
router.delete('/:id', noteController.deleteNote);

module.exports = router;

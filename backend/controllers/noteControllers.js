const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });

    res.status(200).json(notes);
  } catch (error) {
    res.status(400);
    throw new Error("Error while fetching all notes");
  }
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  try {
    const note = new Note({ content, title, category, user: req.user._id });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note) {
      res.status(200).json(note);
    } else {
      res.status(400);
      throw new Error("Error while fetching note by ID");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Error while fetching note by getNoteByID");
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not Authorized, you cannot perform this action");
    }

    if (note) {
      (note.title = title),
        (note.content = content),
        (note.category = category);

      const updatedNote = await note.save();
      res.status(200).json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not Authorized, you cannot perform this action");
    }

    if (note) {
      await note.remove();
      res.status(200).json("Note deleted");
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };

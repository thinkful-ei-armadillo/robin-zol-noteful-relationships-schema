const express = require('express');
const path = require('path');
const xss = require('xss');
const NotefulServices = require('./noteful-service');

const noteRouter = express.Router();

const jsonParser = express.json();

const serializeNotes = notes => ({
    id: notes.id,
    note_name: xss(notes.note_name),
    content: xss(notes.content),
    modified_date: notes.modified_date,
    folder_id: notes.folder_id
});

noteRouter.route('/')
  .get((req, res, next)=>{
      const knexInstance = req.app.get('db');
      NotefulServices.getAllNotes(knexInstance)
      .then(notes => res.json(notes.map(serializeNotes)))
      .catch(next);
  })
  .post(jsonParser, (req, res, next)=>{
      const { note_name, content, folder_id } =req.body;
      const newNote = { note_name, content, folder_id};
  
      if (newNote.note_name == null || newNote.folder_id == null)
        return res.status(400).json({
          error: { message: `Must provide name and folder id in request body` }
        });
      NotefulServices.insertNotes(req.app.get('db'), newNote)
        .then(notes => {
            res.status(201)
            .location(`/articles/${notes.id}`)
            // .location(path.posix.join(res.originalUrl,`${notes.id}` ))
            .json(serializeNotes(notes))
        }).catch(next);
  })
//   noteRouter.route('/:noteId').then()
//   );


  module.exports = noteRouter;

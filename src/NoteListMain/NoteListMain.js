import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import MyContext from '../Context';
import {getNotesForFolder} from '../notes-helpers';

export default function NoteListMain(props) {
  function notesforFolder(notes){
  const notesForFolder = getNotesForFolder(notes, props.match.params.folderId).map(note => (
    <li key={note.id}>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        />
    </li>));
  return notesForFolder;
  }

  return (
    <section className='NoteListMain'>
      <ul>
      <MyContext.Consumer>
          {({notes}) => notesforFolder(notes)}
      </MyContext.Consumer>
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  )
}

NoteListMain.defaultProps = {
  notes: [],
}

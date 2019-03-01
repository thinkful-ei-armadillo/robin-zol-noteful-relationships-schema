import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import MyContext from '../Context';
import {findNote, findFolder} from '../notes-helpers'

export default function NotePageNav(props) {
  

  const handleSomething = (folders, notes) => {
    const note = findNote(notes, props.noteId) || {};
    const folder = findFolder(folders, note.folderId);

    return (
      <h3 className='NotePageNav__folder-name'>
        {folder.name}
      </h3>
    )
  }
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      <MyContext.Consumer>
      {({folders, notes}) => 
        handleSomething(folders, notes)
      }
      </MyContext.Consumer>
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}

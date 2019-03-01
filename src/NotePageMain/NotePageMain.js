import React,{Component} from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import MyContext from '../Context';
import { findNote} from '../notes-helpers';

export default class NotePageMain extends Component {

  static contextType = MyContext
  
  render(){
    const notes = this.context.notes;
    const noteId = this.props.match.params.noteId;
    const note = findNote(notes, noteId);
    
    return( 
     <section className='NotePageMain'>
        <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        />

      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
          )}
      </div>
    </section>

  )}
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}

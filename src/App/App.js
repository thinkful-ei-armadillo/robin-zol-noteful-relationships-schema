import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
// import dummyStore from '../dummy-store'

import './App.css'
import MyContext from '../Context';

class App extends Component {
  state = {
    notes: [],
    folders: [],

  };
  handleDelete =(id) => {

    fetch(`http://localhost:8000/api/noteful/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    }).then(res => {
      if(res.ok){
        this.setState({ notes: (this.state.notes.filter(el => el.id !== id))})
      } else {
        throw new Error('wrong')}
    }).catch(err => alert(err.message))
    
  }
  componentDidMount() {
    // fake date loading from API call
    // setTimeout(() => this.setState(dummyStore), 600)
    Promise.all([fetch('http://localhost:8000/api/noteful/folders'),
      fetch('http://localhost:8000/api/noteful/notes')])
      .then(([resF,resN])=> {
        if (!resF.ok)
          return resF.json().then(e => Promise.reject(e))
        if (!resN.ok)
          return resN.json().then(e => Promise.reject(e))
        return Promise.all([
          resF.json(),
          resN.json()
        ])
      })
      .then(([folders, notes]) => { 
        console.log(folders, notes);
        const modifiedFolders = folders.map(folder => {
          return {
            id: folder.id,
            name: folder.folder_name
          }
        })

        const modifiedNotes = notes.map(note => {
          return {
            id: note.id,
            name: note.note_name,
            content: note.content,
            folderId: note.folder_id,
            modified: note.modified_date
          }
        })
        this.setState({ notes: modifiedNotes, folders: modifiedFolders }) 
      })

      .catch(err => alert('Error'))
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/notes/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            return (
              <NotePageNav
                {...routeProps}
                noteId={noteId}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    const { folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/notes/:noteId'
          component={NotePageMain}
          />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          render={routeProps => {
            return (
              <AddNote
                {...routeProps}
                folders={folders}
              />
            )
          }}
        />
      </>
    )
  }

  render() {
    return (
      <MyContext.Provider value={{folders:this.state.folders, notes:this.state.notes, onDelete: this.handleDelete}}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </MyContext.Provider>
    )
  }
}

export default App

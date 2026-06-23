import { useState, useEffect } from 'react'

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes')
    return saved ? JSON.parse(saved) : []
  })
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  function addNote(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return alert('Fill title and content')
    if (editId) {
      setNotes(notes.map(n => n.id === editId ? { ...n, title, content } : n))
      setEditId(null)
    } else {
      setNotes([...notes, { id: Date.now(), title, content, date: new Date().toLocaleDateString() }])
    }
    setTitle('')
    setContent('')
  }

  function deleteNote(id) {
    setNotes(notes.filter(n => n.id !== id))
  }

  function editNote(note) {
    setTitle(note.title)
    setContent(note.content)
    setEditId(note.id)
  }

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <h1>Notes App</h1>

      <input className="search" type="text" placeholder="Search notes..." value={search}
        onChange={e => setSearch(e.target.value)} />

      <form onSubmit={addNote} className="note-form">
        <input type="text" placeholder="Note title" value={title}
          onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Write your note..." rows={4} value={content}
          onChange={e => setContent(e.target.value)} />
        <button type="submit">{editId ? 'Update Note' : 'Add Note'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setTitle(''); setContent('') }}>Cancel</button>}
      </form>

      <div className="notes-grid">
        {filtered.length === 0 && <p>No notes yet. Add one above!</p>}
        {filtered.map(note => (
          <div className="note-card" key={note.id}>
            <div className="note-header">
              <h3>{note.title}</h3>
              <span className="note-date">{note.date}</span>
            </div>
            <p>{note.content}</p>
            <div className="note-actions">
              <button className="edit" onClick={() => editNote(note)}>Edit</button>
              <button className="delete" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

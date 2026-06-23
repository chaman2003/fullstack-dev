# Day 19 - Notes App Frontend

Build a complete Notes application in React with CRUD operations, search, and localStorage persistence.

## Learning Objectives
- Create, read, update, and delete notes
- Implement search/filter functionality
- Persist data with localStorage
- Manage form state for editing
- Build a clean component-based UI

## Concepts Covered

### App Structure
The app has three main sections:
1. **Search bar** - Filters notes in real time
2. **Form** - Add or edit notes (title + content)
3. **Notes grid** - Displays all notes with edit/delete buttons

### Key Features

**CRUD Operations** - Full create, read, update, delete cycle. The form toggles between "Add Note" and "Update Note" mode when editing.

**Search** - Filters notes by title or content using `filter()` and `includes()`:
```js
const filtered = notes.filter(n =>
  n.title.toLowerCase().includes(search.toLowerCase()) ||
  n.content.toLowerCase().includes(search.toLowerCase())
);
```

**localStorage** - Notes persist across browser refreshes:
```js
useEffect(() => {
  localStorage.setItem('notes', JSON.stringify(notes));
}, [notes]);
```

**State Management** - Single `notes` state array with unique IDs from `Date.now()`.

## Files
| File | Description |
|------|-------------|
| `src/App.jsx` | Main app with all logic (state, CRUD, search, localStorage) |
| `src/index.css` | Clean notes app styling |
| `src/main.jsx` | React entry point |
| `package.json` | Vite + React project |

## How to Run
```bash
cd day-19
npm install
npm run dev
```

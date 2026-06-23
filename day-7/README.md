# Day 7 - React Hooks Fundamentals

React Hooks let you use state and other React features in functional components. This day focuses on the most essential hooks.

## Learning Objectives
- Manage complex props with PropTypes
- Use useState with different data types
- Understand useEffect and its dependency patterns
- Build reusable card components
- Render lists of data

## Concepts Covered

### PropTypes
Validate props at runtime to catch bugs early.

```jsx
import PropTypes from "prop-types";

Card.propTypes = {
  username: PropTypes.string,
  age: PropTypes.number,
  status: PropTypes.string,
};
```

### useState with Objects
State can hold numbers, strings, arrays, or objects. Update only what changes.

```jsx
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: "", age: 0 });
```

### useEffect
Runs side effects after render. Behavior changes based on the dependency array.

```jsx
// Runs after every render (no dependency)
useEffect(() => { console.log("Rendered"); });

// Runs only once on mount (empty dependency)
useEffect(() => { fetchData(); }, []);

// Runs when count changes
useEffect(() => { document.title = `Count: ${count}`; }, [count]);
```

### Props Example (Movie Cards)
Pass movie data as array of objects, render cards with titles, heroes, and images. Each card shows Watch/Save/Review/Ignore buttons.

## Files
| File | Description |
|------|-------------|
| `src/componenets/Propexample.jsx` | Movie card list with props |
| `src/componenets/Card.jsx` | Card with PropTypes validation |
| `src/hooks/UseStatee.jsx` | useState + useEffect (3 dependency patterns) |
| `src/App.jsx` | Main app using components |

## How to Run
```bash
cd day-7
npm install
npm run dev
```

# Day 8 - Advanced React Hooks

Deep dive into more specialized hooks for performance optimization, DOM access, and global state management.

## Learning Objectives
- Use useRef for DOM access and persistent values
- Optimize with useMemo and useCallback
- Manage global state with useContext
- Understand when to use each hook
- Build a clock component

## Concepts Covered

### useRef
Two uses: (1) access DOM elements directly, (2) store mutable values that don't cause re-renders.

```jsx
const inputRef = useRef(null);
inputRef.current.style.background = "blue"; // direct DOM access

const renderCount = useRef(0);
renderCount.current += 1; // persists across renders, no re-render
```

### useMemo
Memoizes computed values. Only recalculates when dependencies change.

```jsx
const cube = useMemo(() => Math.pow(num, 3), [num]);
```

### useCallback
Memoizes functions so they don't get recreated on every render. Prevents unnecessary child re-renders.

```jsx
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);
```

### useContext
Share data across components without prop drilling.

```jsx
// Create context
const ThemeContext = createContext();

// Provider wraps parent
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Any child consumes
const theme = useContext(ThemeContext);
```

## Files
| File | Description |
|------|-------------|
| `src/Ustate.jsx` | Complex state: object, counter, cart example |
| `src/Ueffect.jsx` | All 3 useEffect dependency patterns |
| `src/Uref.jsx` | DOM refs, render count tracking |
| `src/Umemo.jsx` | useMemo for cube calculation |
| `src/Ucallback.jsx` | useCallback with memoized child |
| `src/context/Ucontext.jsx` | Context provider setup |
| `src/components/Header.jsx` | Header component |
| `src/components/Profile.jsx` | Profile component |
| `src/components/Footer.jsx` | Footer component |
| `src/Clock.jsx` | Clock component |

## How to Run
```bash
cd day-8
npm install
npm run dev
```

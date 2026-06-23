# React

## Days
- [Day 6 - React Introduction](../day-06/)
- [Day 7 - React Hooks Fundamentals](../day-07/)
- [Day 8 - Advanced React Hooks](../day-08/)
- [Day 9 - React Router](../day-09/)
- [Day 10 - React Code Splitting](../day-10/)
- [Day 17 - Component Architecture](../day-17/)
- [Day 19 - Notes App Frontend](../day-19/)

## Introduction

React is a component-based UI library. Build reusable components that manage their own state.

### Components & JSX
```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

### Props
Data flows down from parent to child. Props can be strings, numbers, arrays, objects, or functions.

### State (useState)
```jsx
const [count, setCount] = useState(0);
```

## Hooks

| Hook | Purpose |
|------|---------|
| useState | Local component state |
| useEffect | Side effects (fetch, timers, subscriptions) |
| useRef | DOM access, mutable values that persist |
| useMemo | Memoize computed values |
| useCallback | Memoize functions |
| useContext | Global state without prop drilling |

### useEffect Dependency Patterns
```jsx
useEffect(() => { ... });        // Runs after every render
useEffect(() => { ... }, []);    // Runs once on mount
useEffect(() => { ... }, [x]);   // Runs when x changes
```

## Routing (React Router)
```jsx
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/user/:id", element: <Profile /> },
]);
```

## Code Splitting
```jsx
const Dashboard = React.lazy(() => import('./Dashboard'));
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

## Architecture Patterns
- **Smart components**: manage state, fetch data
- **Dumb components**: receive props, render UI
- **HOC**: function that returns an enhanced component
- **Context API**: share state across component tree

## Projects
- [Notes App](../day-19/) - Full CRUD with search and localStorage
- [Movie App](../movie-project/) - Browse movies with search and favorites

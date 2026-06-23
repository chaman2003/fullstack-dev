# Day 17 - Component Architecture & Design Patterns

Building scalable React apps requires good component architecture. This day covers patterns for organizing and reusing components.

## Learning Objectives
- Distinguish smart vs dumb components
- Build Higher-Order Components (HOC)
- Create reusable UI components
- Use Context API for global state
- Structure projects for scalability

## Concepts Covered

### Smart vs Dumb Components
**Smart (Container)** - Manages state, fetches data, contains logic.
**Dumb (Presentational)** - Receives props, renders UI, no logic.

```jsx
// Smart: handles state and API calls
function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => { fetch('/api/users').then(r => r.json()).then(setUsers); }, []);
  return <UserList users={users} />;
}

// Dumb: just renders what it receives
function UserList({ users }) {
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

### Higher-Order Component (HOC)
A function that takes a component and returns an enhanced version.

```jsx
function withLoading(Component) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) return <div>Loading...</div>;
    return <Component {...props} />;
  };
}
```

### Reusable Button Component
```jsx
function Button({ children, variant = 'primary', onClick }) {
  const styles = { primary: { background: 'blue' }, danger: { background: 'red' } };
  return <button style={styles[variant]} onClick={onClick}>{children}</button>;
}
```

### Project Structure
```
src/
├── components/   # Reusable dumb components
├── pages/        # Page-level smart components
├── context/      # Context providers
├── hooks/        # Custom hooks
├── services/     # API calls
├── utils/        # Helper functions
└── styles/       # CSS files
```

## Files
| File | Description |
|------|-------------|
| `index.html` | All patterns with code examples |

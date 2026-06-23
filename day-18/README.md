# Day 18 - API Integration with Fetch & Axios

Modern web apps communicate with backends via HTTP APIs. This day covers fetching data, handling states, and organizing API code.

## Learning Objectives
- Make GET and POST requests with Fetch
- Handle loading, error, and empty states
- Abstract API calls into services
- Understand axios basics

## Concepts Covered

### Fetch GET Request
```js
async function getUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
}
```

### Fetch POST Request
```js
async function createUser(data) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}
```

### Loading & Error States Pattern
```jsx
function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{data.map(item => <div key={item.id}>{item.name}</div>)}</div>;
}
```

### API Service Pattern
```js
// services/userService.js
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const userService = {
  getAll: () => fetch(`${BASE_URL}/users`).then(r => r.json()),
  getById: (id) => fetch(`${BASE_URL}/users/${id}`).then(r => r.json()),
  create: (user) => fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }).then(r => r.json()),
};
```

## Files
| File | Description |
|------|-------------|
| `index.html` | Fetch/Axios examples, states pattern, service layer, live demo |

# API Integration

## Days
- [Day 18 - API Integration with Fetch/Axios](../day-18/)
- [Day 23 - MERN Stack Integration](../day-23/)
- [Day 24 - Gemini API](../day-24/)

## Fetch API

Built-in browser API for HTTP requests.

### GET Request
```js
async function getData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
```

### POST Request
```js
async function postData(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}
```

## Axios

Third-party library with simpler syntax and automatic JSON parsing.

```js
import axios from 'axios';
const res = await axios.get('/api/users');
const res = await axios.post('/api/users', { name: 'John' });
```

## Axios Interceptors (JWT)
```js
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) window.location = '/login';
    return Promise.reject(err);
  }
);
```

## Loading & Error States
```jsx
if (loading) return <Spinner />;
if (error) return <Error message={error} />;
if (!data.length) return <Empty />;
return data.map(item => <Card key={item.id} item={item} />);
```

## Gemini AI API
```js
const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
  { method: 'POST', body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) }
);
```

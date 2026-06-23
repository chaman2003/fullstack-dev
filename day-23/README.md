# Day 23 - MERN Stack Integration

Connect the React frontend to the Express backend, handle JWT tokens with Axios interceptors, and prepare for production deployment.

## Learning Objectives
- Configure Vite proxy for development
- Set up Axios with JWT interceptors
- Conditionally render based on auth state
- Configure CORS for production
- Use environment variables properly

## Concepts Covered

### Vite Proxy Configuration
```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
// Now fetch('/api/notes') automatically proxies to http://localhost:5000/api/notes
```

### Axios Interceptors (JWT)
```js
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// Attach token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally - redirect to login
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(err);
  }
);
```

### Conditional Rendering by Auth
```jsx
function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? <Dashboard /> : <LoginPage />}
    </AuthContext.Provider>
  );
}
```

### CORS (Backend)
```js
// Development - allow all
app.use(cors());

// Production - specify origin
app.use(cors({ origin: 'https://yourapp.vercel.app', credentials: true }));
```

### Environment Variables
```
# Backend .env
PORT=5000
MONGODB_URI=...
JWT_SECRET=...

# Frontend .env (Vite requires VITE_ prefix)
VITE_API_URL=https://your-api.onrender.com
```

## Files
| File | Description |
|------|-------------|
| `index.html` | Integration guide with all code examples |

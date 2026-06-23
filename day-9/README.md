# Day 9 - React Router

Client-side routing lets you navigate between pages without full page reloads. React Router is the standard routing library for React.

## Learning Objectives
- Set up routes with createBrowserRouter
- Create navigation with Link component
- Use URL parameters with useParams
- Handle 404 errors
- Build multi-page app structure

## Concepts Covered

### Router Setup
```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>Error 404</h1>,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

### Navigation
```jsx
import { Link } from 'react-router-dom';
<Link to="/">Home</Link>
<Link to="/about">About</Link>
```

### URL Parameters
```jsx
// Route: /user/:username
// URL: /user/john
const { username } = useParams(); // "john"
```

### Programmatic Navigation
```jsx
const navigate = useNavigate();
navigate("/home");       // go to route
navigate(-1);           // go back
```

### Error Handling
Add `errorElement` to routes to catch 404s and errors.

## Files
| File | Description |
|------|-------------|
| `src/App.jsx` | createBrowserRouter with all routes |
| `src/Home.jsx` | Home page component |
| `src/Login.jsx` | Login page component |
| `src/Navbar.jsx` | Navigation with Link components |
| `src/Username.jsx` | Dynamic route with useParams |

## How to Run
```bash
cd day-9
npm install
npm run dev
```

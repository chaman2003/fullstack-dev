# Day 9: React Router - Navigation and Routing - Complete Documentation

## Table of Contents

1. [Introduction to React Router](#introduction-to-react-router)
2. [React Router DOM Installation and Setup](#react-router-dom-installation-and-setup)
3. [Creating Routes with createBrowserRouter](#creating-routes-with-createbrowserrouter)
4. [RouterProvider and Router Configuration](#routerprovider-and-router-configuration)
5. [Navigation with Link Components](#navigation-with-link-components)
6. [URL Parameters and useParams Hook](#url-parameters-and-useparams-hook)
7. [Route Components and Layout Patterns](#route-components-and-layout-patterns)
8. [Error Handling and 404 Pages](#error-handling-and-404-pages)
9. [Complete Code Examples](#complete-code-examples)
10. [Key Learning Objectives](#key-learning-objectives)
11. [Best Practices](#best-practices)
12. [Advanced Routing Patterns](#advanced-routing-patterns)

---

## Introduction to React Router

React Router is the standard routing library for React applications, enabling single-page applications (SPAs) to have multiple views and URL-based navigation without full page reloads.

### Why React Router?
- **Single Page Application (SPA)**: Navigate between views without page refreshes
- **URL Management**: Maintain browser history and bookmarkable URLs
- **Component-Based Routing**: Each route renders specific React components
- **Dynamic Routing**: Create routes programmatically and handle parameters
- **Nested Routing**: Support complex application structures

### Core Concepts
- **Router**: The top-level component that enables routing
- **Routes**: Define path-to-component mappings
- **Links**: Navigate between routes declaratively
- **Parameters**: Extract dynamic values from URLs
- **Navigation**: Programmatic and declarative navigation methods

---

## React Router DOM Installation and Setup

### Package Installation
React Router DOM is installed as a dependency for client-side routing:

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.8.2"
  }
}
```

### Basic Project Setup
```jsx
// main.jsx - Entry point
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### Router Setup Options
```jsx
// Option 1: createBrowserRouter (Recommended for new projects)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Option 2: BrowserRouter (Alternative approach)
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Option 3: HashRouter (For static hosting)
import { HashRouter, Routes, Route } from 'react-router-dom'
```

---

## Creating Routes with createBrowserRouter

The modern approach uses `createBrowserRouter` for defining routes in a data-driven way.

### Basic Router Configuration
```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Navbar from './Navbar'
import Username from './Username'

function App() {
  const router = createBrowserRouter([
    {
      path: "/Home",
      element: <><Navbar/> <Home /></>
    }, 
    {
      path: "/Login",
      element: <><Navbar/> <Login /></>
    },
    {
      path: "/user/:uname",
      element: <><Navbar/> <Username /></>
    },
    {
      path: "/",
      errorElement: <h1>Error 404</h1>
    }
  ])

  return (
    <>
      <h1>Hey bro welcome to routes</h1>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
```

### Advanced Router Configuration
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Default route for "/"
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "settings",
        element: <Settings />
      }
    ]
  },
  {
    path: "/user/:id",
    element: <UserProfile />,
    loader: ({ params }) => {
      // Data loading before component renders
      return fetch(`/api/users/${params.id}`)
    }
  }
])
```

### Route Object Properties
```jsx
const routeConfig = {
  path: "/products/:category",    // URL pattern
  element: <ProductList />,       // Component to render
  loader: loadProductData,        // Data loading function
  action: handleFormSubmission,   // Form action handler
  errorElement: <ProductError />, // Error boundary
  shouldRevalidate: ({ currentUrl, nextUrl }) => {
    // Control when to revalidate data
    return currentUrl.pathname !== nextUrl.pathname
  }
}
```

---

## RouterProvider and Router Configuration

### RouterProvider Usage
```jsx
function App() {
  const router = createBrowserRouter([
    // Route definitions
  ])

  return <RouterProvider router={router} />
}
```

### Router with Fallback
```jsx
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    }
  ])

  return (
    <RouterProvider 
      router={router} 
      fallbackElement={<div>Loading...</div>}
    />
  )
}
```

### Environment-Specific Routing
```jsx
function App() {
  // Different routing strategies based on environment
  const router = createBrowserRouter([
    // Routes definition
  ], {
    basename: process.env.NODE_ENV === 'production' ? '/my-app' : '/'
  })

  return <RouterProvider router={router} />
}
```

---

## Navigation with Link Components

### Basic Link Usage
```jsx
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/Home">Home</Link>
      <Link to="/Login">Login</Link>
      <Link to="/user/john">John's Profile</Link>
    </nav>
  )
}

export default Navbar
```

### Advanced Link Examples
```jsx
import { Link, NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      {/* Basic Link */}
      <Link to="/home">Home</Link>
      
      {/* Link with state */}
      <Link 
        to="/profile" 
        state={{ from: 'navigation' }}
      >
        Profile
      </Link>
      
      {/* NavLink with active styling */}
      <NavLink 
        to="/dashboard"
        className={({ isActive }) => 
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Dashboard
      </NavLink>
      
      {/* NavLink with custom active check */}
      <NavLink
        to="/products"
        className={({ isActive, isPending }) => {
          return [
            "nav-link",
            isActive ? "active" : "",
            isPending ? "pending" : ""
          ].join(" ")
        }}
      >
        Products
      </NavLink>
      
      {/* Link with replace (no history entry) */}
      <Link to="/login" replace>
        Login
      </Link>
      
      {/* External link */}
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Site
      </a>
    </nav>
  )
}
```

### Programmatic Navigation
```jsx
import { useNavigate, useLocation } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials)
      
      // Navigate to intended destination or home
      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
      
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  
  const goBack = () => {
    navigate(-1) // Go back one step in history
  }
  
  const goForward = () => {
    navigate(1) // Go forward one step in history
  }
  
  return (
    <form onSubmit={handleLogin}>
      {/* Login form */}
      <button type="button" onClick={goBack}>
        Go Back
      </button>
    </form>
  )
}
```

---

## URL Parameters and useParams Hook

### Dynamic Route Parameters
```jsx
// Route definition with parameter
{
  path: "/user/:uname",
  element: <Username />
}

// Multiple parameters
{
  path: "/products/:category/:id",
  element: <ProductDetail />
}

// Optional parameters
{
  path: "/search/:query?",
  element: <SearchResults />
}
```

### useParams Hook Implementation
```jsx
import { useParams } from 'react-router-dom'

function Username() {
  const params = useParams()
  
  return (
    <div>
      <h1>I am {params.uname}</h1>
    </div>
  )
}

export default Username
```

### Advanced Parameter Handling
```jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function ProductDetail() {
  const { category, id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${category}/${id}`)
        
        if (!response.ok) {
          throw new Error('Product not found')
        }
        
        const productData = await response.json()
        setProduct(productData)
      } catch (error) {
        console.error('Error fetching product:', error)
        navigate('/products', { replace: true })
      } finally {
        setLoading(false)
      }
    }
    
    if (category && id) {
      fetchProduct()
    }
  }, [category, id, navigate])
  
  if (loading) return <div>Loading product...</div>
  if (!product) return <div>Product not found</div>
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Category: {category}</p>
      <p>ID: {id}</p>
      <p>Price: ${product.price}</p>
      
      <button onClick={() => navigate(`/products/${category}`)}>
        Back to {category}
      </button>
    </div>
  )
}
```

### Query Parameters and Search
```jsx
import { useSearchParams, useLocation } from 'react-router-dom'

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  
  const query = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page')) || 1
  const category = searchParams.get('category') || 'all'
  
  const updateSearch = (newQuery) => {
    setSearchParams({
      q: newQuery,
      page: 1,
      category: category
    })
  }
  
  const updatePage = (newPage) => {
    setSearchParams({
      q: query,
      page: newPage,
      category: category
    })
  }
  
  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {query}</p>
      <p>Page: {page}</p>
      <p>Category: {category}</p>
      <p>Full URL: {location.pathname + location.search}</p>
      
      <input 
        value={query}
        onChange={(e) => updateSearch(e.target.value)}
        placeholder="Search..."
      />
      
      <button onClick={() => updatePage(page + 1)}>
        Next Page
      </button>
    </div>
  )
}
```

---

## Route Components and Layout Patterns

### Component Structure
```jsx
// Home.jsx
const Home = () => {
  return (
    <div>
      <h2>hello home i am homeless</h2>
      <p>Welcome to the home page!</p>
    </div>
  )
}

export default Home
```

```jsx
// Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const handleLogin = (e) => {
    e.preventDefault()
    // Handle login logic
    console.log('Login attempt:', { username, password })
    
    if (username && password) {
      navigate('/Home')
    }
  }
  
  return (
    <div>
      <h1>Login to your account</h1>
      <form onSubmit={handleLogin}>
        <div>
          <h2>Enter your username</h2>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div>
          <h2>Enter your password</h2>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
```

### Layout Components
```jsx
// Layout.jsx
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  const location = useLocation()
  
  return (
    <div className="app-layout">
      <Navbar />
      
      <main className="main-content">
        <Outlet /> {/* Child routes render here */}
      </main>
      
      <Footer />
      
      {/* Debug info */}
      <div className="debug-info">
        Current path: {location.pathname}
      </div>
    </div>
  )
}

export default Layout
```

### Nested Routing Example
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "settings",
            element: <Settings />
          }
        ]
      }
    ]
  }
])

// DashboardLayout.jsx
function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </aside>
      
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  )
}
```

---

## Error Handling and 404 Pages

### Basic Error Handling
```jsx
// In router configuration
{
  path: "/",
  errorElement: <h1>Error 404</h1>
}
```

### Advanced Error Boundary
```jsx
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError()
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-page">
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    )
  }
  
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.message || "Unknown error"}</i>
      </p>
    </div>
  )
}
```

### 404 Not Found Page
```jsx
function NotFound() {
  const navigate = useNavigate()
  
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      
      <div className="actions">
        <button onClick={() => navigate('/')}>
          Go Home
        </button>
        <button onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
      
      <div className="suggestions">
        <h3>Try these links:</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  )
}
```

### Error Boundaries with Router
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "products",
        element: <ProductList />,
        errorElement: <ProductError />,
        loader: async () => {
          const response = await fetch('/api/products')
          if (!response.ok) {
            throw new Response("Products not found", { status: 404 })
          }
          return response.json()
        }
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])
```

---

## Complete Code Examples

### Example 1: Multi-Page Application with Authentication
```jsx
// App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorPage from './components/ErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "profile/:userId",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      }
    ]
  }
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
```

### Example 2: E-commerce Application Structure
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductList />
          },
          {
            path: ":category",
            element: <CategoryPage />
          },
          {
            path: ":category/:productId",
            element: <ProductDetail />
          }
        ]
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
      {
        path: "user",
        element: <UserLayout />,
        children: [
          {
            path: "profile",
            element: <UserProfile />
          },
          {
            path: "orders",
            element: <OrderHistory />
          },
          {
            path: "settings",
            element: <UserSettings />
          }
        ]
      }
    ]
  }
])
```

### Example 3: Complete Navigation Component
```jsx
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navigation() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }
  
  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }
  
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">MyApp</Link>
      </div>
      
      <div className="nav-links">
        <NavLink 
          to="/"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          end
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/products"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Products
        </NavLink>
        
        {user ? (
          <>
            <NavLink 
              to="/dashboard"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Dashboard
            </NavLink>
            
            <div className="nav-dropdown">
              <span>{user.name}</span>
              <div className="dropdown-content">
                <Link to={`/profile/${user.id}`}>Profile</Link>
                <Link to="/settings">Settings</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
```

---

## Key Learning Objectives

After completing Day 9, students should understand:

### Routing Fundamentals
1. **SPA Concepts**: Single-page applications and client-side routing
2. **React Router Setup**: Installation and basic configuration
3. **Route Definition**: Creating routes with createBrowserRouter
4. **Component Mapping**: Associating URLs with React components

### Navigation Techniques
1. **Declarative Navigation**: Using Link and NavLink components
2. **Programmatic Navigation**: useNavigate hook for dynamic routing
3. **Navigation State**: Passing data between routes
4. **History Management**: Browser history manipulation

### URL Parameters
1. **Route Parameters**: Dynamic URL segments with useParams
2. **Query Parameters**: Search parameters with useSearchParams
3. **Parameter Validation**: Handling invalid or missing parameters
4. **Complex URLs**: Multiple parameters and nested routes

### Application Structure
1. **Layout Patterns**: Shared layouts and nested routing
2. **Component Organization**: Structuring route components
3. **Error Handling**: 404 pages and error boundaries
4. **State Management**: Routing with application state

---

## Best Practices

### Route Organization
- **Consistent naming**: Use clear, descriptive route paths
- **Logical hierarchy**: Organize routes to reflect app structure
- **Parameter conventions**: Use consistent parameter naming
- **Case sensitivity**: Stick to lowercase for URLs

### Performance Optimization
```jsx
// Lazy loading for code splitting
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    )
  }
])
```

### Security Considerations
```jsx
// Protected routes
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}

// Role-based access
function AdminRoute({ children }) {
  const { user } = useAuth()
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />
  }
  
  return children
}
```

### Error Handling
```jsx
// Comprehensive error handling
function ErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <div>
          <h2>Something went wrong:</h2>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
      onError={(error, errorInfo) => {
        console.error('Route error:', error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
```

---

## Advanced Routing Patterns

### Data Loading with Loaders
```jsx
const router = createBrowserRouter([
  {
    path: "/products/:id",
    element: <ProductDetail />,
    loader: async ({ params }) => {
      const product = await fetchProduct(params.id)
      if (!product) {
        throw new Response("Product not found", { status: 404 })
      }
      return product
    }
  }
])

// In component
function ProductDetail() {
  const product = useLoaderData()
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  )
}
```

### Form Actions
```jsx
const router = createBrowserRouter([
  {
    path: "/contact",
    element: <ContactForm />,
    action: async ({ request }) => {
      const formData = await request.formData()
      const response = await submitContactForm(formData)
      
      if (response.ok) {
        return redirect("/thank-you")
      }
      
      return { error: "Failed to submit form" }
    }
  }
])

// In component
function ContactForm() {
  const actionData = useActionData()
  
  return (
    <Form method="post">
      <input name="name" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit">Submit</button>
      
      {actionData?.error && (
        <div className="error">{actionData.error}</div>
      )}
    </Form>
  )
}
```

### Route-Level Code Splitting
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        lazy: () => import("./pages/Dashboard")
      },
      {
        path: "analytics",
        lazy: () => import("./pages/Analytics")
      }
    ]
  }
])
```

This comprehensive Day 9 documentation covers React Router fundamentals, navigation patterns, parameter handling, and advanced routing concepts essential for building modern single-page applications.
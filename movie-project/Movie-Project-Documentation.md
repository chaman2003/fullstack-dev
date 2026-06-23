# Movie Project: React Movie Search Application - Complete Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Components Analysis](#core-components-analysis)
5. [Routing Implementation](#routing-implementation)
6. [State Management](#state-management)
7. [Styling and Design](#styling-and-design)
8. [Complete Code Implementation](#complete-code-implementation)
9. [Features and Functionality](#features-and-functionality)
10. [Development Workflow](#development-workflow)
11. [Best Practices Demonstrated](#best-practices-demonstrated)
12. [Enhancement Opportunities](#enhancement-opportunities)

---

## Project Overview

The Movie Project is a React-based web application that demonstrates modern frontend development practices including component architecture, routing, state management, and responsive design. It provides functionality for browsing movies, searching through a movie database, and managing favorite movies.

### Application Purpose
- **Movie Discovery**: Browse and search through a curated movie collection
- **Search Functionality**: Real-time search with filtered results
- **Favorites Management**: Add and manage favorite movies
- **Responsive Design**: Clean, modern interface with hover effects
- **Navigation**: Seamless routing between different views

### Learning Objectives
- React functional components and hooks
- React Router for navigation
- Component composition and props
- Event handling and state management
- CSS styling and responsive design
- Modern JavaScript ES6+ features

---

## Technology Stack

### Frontend Framework
```json
{
  "name": "movie-project",
  "version": "0.0.0",
  "type": "module",
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.8.2"
  }
}
```

### Development Tools
```json
{
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react": "^5.0.0",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "vite": "^7.1.2"
  }
}
```

### Build Configuration
- **Vite**: Fast build tool with Hot Module Replacement (HMR)
- **ESLint**: Code linting and quality assurance
- **Modern JavaScript**: ES6+ modules and syntax
- **JSX**: React component syntax

---

## Project Structure

```
movie-project/
├── public/
│   └── vite.svg
├── src/
│   ├── Components/
│   │   ├── MovieCards.jsx
│   │   └── Navbar.jsx
│   ├── Pages/
│   │   ├── Home.jsx
│   │   └── Favourites.jsx
│   ├── styles/
│   │   ├── navbar.css
│   │   ├── home.css
│   │   └── favourite.css
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

### Architecture Patterns
- **Component-Based**: Modular, reusable React components
- **Separation of Concerns**: Components, pages, and styles separated
- **Routing Structure**: Page-level routing with nested layouts
- **CSS Modules**: Component-specific styling

---

## Core Components Analysis

### 1. Main Application Component
```jsx
// App.jsx
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Favourites from './Pages/Favourites'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/favourites",
          element: <Favourites />,
        },
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
```

**Key Features:**
- **React Router Setup**: Declarative routing configuration
- **Nested Routing**: Navbar as layout component with child routes
- **Component Composition**: Clean separation of concerns
- **Modern Syntax**: ES6 imports and arrow functions

### 2. Navigation Component
```jsx
// Components/Navbar.jsx
import "../styles/navbar.css"
import { Link, Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/favourites">Favourites</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar
```

**Implementation Details:**
- **Layout Component**: Wraps all pages with navigation
- **React Router Links**: Client-side navigation without page refresh
- **Outlet Pattern**: Renders child routes within layout
- **CSS Integration**: Component-specific styling

### 3. Movie Card Component
```jsx
// Components/MovieCards.jsx
import '../styles/home.css'

const MovieCards = ({movie}) => {
    const ClickFavourite = () => {
        alert("Added to favourites");
    }
    
    return (
        <div className="card">
            <div className='Moviebox'>
                <div className='Moviecard'>
                    <div className='Favourites'>
                        <button onClick={ClickFavourite}>💗</button>
                    </div>
                    <div className='movieImage'>
                        <img src={movie.img} alt={movie.title} />
                    </div>
                </div>
                <div className='MovieDetails'>
                    <h1>Movie: {movie.title}</h1>
                    <h1>Release Date: {movie.year}</h1>
                </div>
            </div>
        </div>
    )
}

export default MovieCards
```

**Component Features:**
- **Props Destructuring**: Clean parameter extraction
- **Event Handling**: Click handlers for user interaction
- **Responsive Design**: Card-based layout with hover effects
- **Accessibility**: Alt text for images

### 4. Home Page Component
```jsx
// Pages/Home.jsx
import { useState } from "react";
import MovieCards from "../Components/MovieCards";

function Home() {
  const movies = [
    { 
      id: 1, 
      title: "Inception", 
      year: 2010, 
      img: "https://www.tallengestore.com/cdn/shop/products/Inception-LeonardoDiCaprio-ChristopherNolan-HollywoodSciFiMoviePoster2.jpg?v=1685582017"
    },
    { 
      id: 2, 
      title: "The Dark Knight", 
      year: 2008, 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ekE6Hhz9gvIbiFSUPxt-FyAh4zXTXX0bjQ&s"
    },
    { 
      id: 3, 
      title: "Interstellar", 
      year: 2014, 
      img: "https://m.media-amazon.com/images/I/91UMpWgj05L._UF1000,1000_QL80_.jpg" 
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  
  function submitform(e) {
    e.preventDefault();
    alert(searchQuery);
  }
  
  return (
    <div className="home-root">
      <form action="submitform" onSubmit={submitform} className="submit">
        <input
          type="text"
          placeholder="Search your movie"
          className="inp"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <div className="Movie-grid">
        {movies.map((movie) => (
          movie.title.toLowerCase().startsWith(searchQuery) && (
            <MovieCards movie={movie} key={movie.id} />
          )
        ))}
      </div>
    </div>
  );
}

export default Home;
```

**Advanced Features:**
- **State Management**: useState hook for search functionality
- **Controlled Components**: Form input bound to state
- **Real-time Filtering**: Dynamic movie filtering based on search
- **Component Mapping**: Efficient rendering of movie lists
- **Event Prevention**: Form submission handling

---

## Routing Implementation

### Router Configuration
```jsx
const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
    ]
  }
])
```

### Routing Patterns
- **Browser Router**: Modern routing with HTML5 history API
- **Nested Routes**: Layout components with child routes
- **Component-Based**: Route elements as React components
- **Declarative Configuration**: Route definitions as data

### Navigation Implementation
```jsx
// Navigation Links
<Link to="/">Home</Link>
<Link to="/favourites">Favourites</Link>

// Outlet for Child Routes
<Outlet />
```

---

## State Management

### Local State with useState
```jsx
const [searchQuery, setSearchQuery] = useState("");

// Controlled Input
<input
  type="text"
  placeholder="Search your movie"
  className="inp"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

### Data Management
```jsx
const movies = [
  { id: 1, title: "Inception", year: 2010, img: "..." },
  { id: 2, title: "The Dark Knight", year: 2008, img: "..." },
  { id: 3, title: "Interstellar", year: 2014, img: "..." },
];
```

### Filtering Logic
```jsx
{movies.map((movie) => (
  movie.title.toLowerCase().startsWith(searchQuery) && (
    <MovieCards movie={movie} key={movie.id} />
  )
))}
```

---

## Styling and Design

### Navbar Styling
```css
/* styles/navbar.css */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
}

.navbar a {
    color: white;
    text-decoration: none;
    padding: 10px 15px;
}

.navbar a:hover {
    background-color: #555;
}
```

### Movie Card Styling
```css
/* styles/home.css */
.card {
    display: inline-block;
    border: 2px solid #ddd;
    border-radius: 8px;
    margin: 15px;
    padding: 15px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.movieImage {
    width: 200px;
    height: 300px;
}

.movieImage img {
    width: 100%;
    height: 100%;
}

.Favourites {
    position: absolute;
    top: 10px;
    right: 10px;
}

.Favourites button {
    background-color: #ff6b6b;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
}

.Favourites button:hover {
    background-color: #ff5252;
}
```

**Design Principles:**
- **Responsive Cards**: Flexible grid layout
- **Hover Effects**: Interactive visual feedback
- **Color Scheme**: Consistent color palette
- **Typography**: Clear, readable text hierarchy

---

## Complete Code Implementation

### Enhanced Movie Application
```jsx
// App.jsx - Enhanced version with error boundaries
import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './Components/ErrorBoundary';
import LoadingSpinner from './Components/LoadingSpinner';

// Lazy load components for better performance
const Home = lazy(() => import('./Pages/Home'));
const Favourites = lazy(() => import('./Pages/Favourites'));
const Navbar = lazy(() => import('./Components/Navbar'));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Navbar />
          </Suspense>
        </ErrorBoundary>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "favourites",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <Favourites />
            </Suspense>
          ),
        },
      ],
      errorElement: <ErrorBoundary />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
```

### Enhanced Home Component with Advanced Features
```jsx
// Pages/Home.jsx - Enhanced version
import { useState, useEffect, useMemo, useCallback } from "react";
import MovieCards from "../Components/MovieCards";
import SearchForm from "../Components/SearchForm";
import { movieData } from "../data/movies";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [filterBy, setFilterBy] = useState("all");
  const [loading, setLoading] = useState(false);

  // Memoized filtered and sorted movies
  const filteredMovies = useMemo(() => {
    let filtered = movieData;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filterBy !== "all") {
      filtered = filtered.filter(movie => movie.genre === filterBy);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.year - a.year;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "title":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, sortBy, filterBy]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleAddToFavorites = useCallback((movieId) => {
    // Add to favorites logic
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, []);

  return (
    <div className="home-root">
      <div className="search-controls">
        <SearchForm 
          searchQuery={searchQuery}
          onSearch={handleSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />
      </div>

      <div className="movies-stats">
        <p>Showing {filteredMovies.length} movies</p>
      </div>

      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <div className="movie-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCards 
                movie={movie} 
                key={movie.id}
                onAddToFavorites={handleAddToFavorites}
              />
            ))
          ) : (
            <div className="no-results">
              <h2>No movies found</h2>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
```

### Enhanced Movie Card Component
```jsx
// Components/MovieCards.jsx - Enhanced version
import { useState } from 'react';
import '../styles/home.css';

const MovieCards = ({ movie, onAddToFavorites }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onAddToFavorites(movie.id);
    
    // Show feedback
    const message = isFavorite ? "Removed from favorites" : "Added to favorites";
    showNotification(message);
  };

  const showNotification = (message) => {
    // Create and show a temporary notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  return (
    <div 
      className={`card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="moviebox">
        <div className="moviecard">
          <div className="favorites">
            <button 
              onClick={handleFavoriteClick}
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
            >
              {isFavorite ? '💖' : '🤍'}
            </button>
          </div>
          
          <div className="movie-image">
            <img 
              src={movie.img} 
              alt={`${movie.title} poster`}
              loading="lazy"
              onError={(e) => {
                e.target.src = '/placeholder-movie.jpg';
              }}
            />
          </div>
          
          {isHovered && (
            <div className="movie-overlay">
              <div className="movie-rating">
                ⭐ {movie.rating || 'N/A'}
              </div>
              <div className="movie-genre">
                {movie.genre || 'Unknown'}
              </div>
            </div>
          )}
        </div>
        
        <div className="movie-details">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">Release Date: {movie.year}</p>
          {movie.director && (
            <p className="movie-director">Director: {movie.director}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCards;
```

### Advanced Search Component
```jsx
// Components/SearchForm.jsx
import { useState } from 'react';

const SearchForm = ({ 
  searchQuery, 
  onSearch, 
  sortBy, 
  setSortBy, 
  filterBy, 
  setFilterBy 
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    // Real-time search
    onSearch(value);
  };

  const genres = ['all', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller'];

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search movies by title or genre..."
          className="search-input"
          value={localQuery}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-btn">
          🔍 Search
        </button>
      </div>

      <div className="filter-controls">
        <div className="sort-control">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="control-select"
          >
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="filter-select">Filter by genre:</label>
          <select
            id="filter-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="control-select"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
```

### Enhanced Favorites Page
```jsx
// Pages/Favourites.jsx - Enhanced version
import { useState, useEffect } from 'react';
import MovieCards from '../Components/MovieCards';
import { movieData } from '../data/movies';
import '../styles/favourite.css';

function Favourites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteMovieData = movieData.filter(movie => 
      favorites.includes(movie.id)
    );
    setFavoriteMovies(favoriteMovieData);
  }, []);

  const handleRemoveFromFavorites = (movieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter(id => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    // Update local state
    setFavoriteMovies(prev => prev.filter(movie => movie.id !== movieId));
  };

  const clearAllFavorites = () => {
    localStorage.removeItem('favorites');
    setFavoriteMovies([]);
  };

  return (
    <div className="favourite-page">
      <div className="favourite-header">
        <h1>My Favourite Movies</h1>
        {favoriteMovies.length > 0 && (
          <button 
            onClick={clearAllFavorites}
            className="clear-all-btn"
          >
            Clear All Favorites
          </button>
        )}
      </div>

      <div className="favourite-content">
        {favoriteMovies.length > 0 ? (
          <>
            <p className="favourite-count">
              You have {favoriteMovies.length} favorite movie{favoriteMovies.length !== 1 ? 's' : ''}
            </p>
            <div className="movie-grid">
              {favoriteMovies.map((movie) => (
                <MovieCards 
                  movie={movie} 
                  key={movie.id}
                  onAddToFavorites={handleRemoveFromFavorites}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="no-favourites">
            <h2>No favorite movies yet</h2>
            <p>Start browsing and add some movies to your favorites!</p>
            <a href="/" className="browse-link">Browse Movies</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favourites;
```

---

## Features and Functionality

### Current Features
1. **Movie Display**: Grid layout of movie cards with posters
2. **Search Functionality**: Real-time search through movie titles
3. **Navigation**: React Router-based page navigation
4. **Responsive Design**: Card-based layout with hover effects
5. **Favorites**: Basic favorite button (alert-based)

### Enhanced Features (Advanced Implementation)
1. **Advanced Search**: Multi-field search with filters
2. **Sorting Options**: Sort by title, year, or rating
3. **Local Storage**: Persistent favorites across sessions
4. **Loading States**: User feedback during operations
5. **Error Handling**: Graceful error boundaries
6. **Performance**: Lazy loading and code splitting

---

## Development Workflow

### Available Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Development Server
- **Hot Module Replacement**: Instant updates during development
- **Fast Refresh**: Preserves component state during edits
- **Development Optimizations**: Source maps and debugging tools

---

## Best Practices Demonstrated

### React Best Practices
1. **Functional Components**: Modern React with hooks
2. **Component Composition**: Reusable, modular components
3. **Props Destructuring**: Clean parameter extraction
4. **Key Props**: Proper list rendering with unique keys
5. **Event Handling**: Proper event handler implementation

### Performance Optimizations
1. **Component Lazy Loading**: Code splitting for better load times
2. **Memoization**: useMemo for expensive computations
3. **Callback Optimization**: useCallback for stable references
4. **Image Optimization**: Lazy loading and error handling

### Code Organization
1. **File Structure**: Logical organization of components and styles
2. **Separation of Concerns**: Components, pages, and utilities separated
3. **CSS Modules**: Component-specific styling
4. **Import Organization**: Clean import statements

---

## Enhancement Opportunities

### Feature Enhancements
```jsx
// Movie data management
const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // API integration
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider value={{
      movies,
      favorites,
      loading,
      fetchMovies,
      addToFavorites,
      removeFromFavorites
    }}>
      {children}
    </MovieContext.Provider>
  );
};
```

### API Integration
```jsx
// API service
class MovieService {
  static async searchMovies(query) {
    const response = await fetch(`/api/movies/search?q=${query}`);
    return response.json();
  }

  static async getMovieDetails(id) {
    const response = await fetch(`/api/movies/${id}`);
    return response.json();
  }

  static async addToFavorites(movieId, userId) {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId, userId })
    });
    return response.json();
  }
}
```

### State Management Enhancement
```jsx
// Custom hook for movie operations
const useMovies = () => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const searchMovies = useCallback((query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, []);

  const addToFavorites = useCallback((movie) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: movie });
  }, []);

  return {
    ...state,
    searchMovies,
    addToFavorites
  };
};
```

### Testing Implementation
```jsx
// Movie component test
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCards from '../Components/MovieCards';

describe('MovieCards', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    year: 2023,
    img: 'test.jpg'
  };

  test('renders movie information correctly', () => {
    render(<MovieCards movie={mockMovie} />);
    
    expect(screen.getByText('Movie: Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Release Date: 2023')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toBeInTheDocument();
  });

  test('handles favorite button click', () => {
    const mockOnAddToFavorites = jest.fn();
    render(
      <MovieCards 
        movie={mockMovie} 
        onAddToFavorites={mockOnAddToFavorites} 
      />
    );
    
    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);
    
    expect(mockOnAddToFavorites).toHaveBeenCalledWith(1);
  });
});
```

This Movie Project demonstrates practical implementation of modern React concepts including component architecture, routing, state management, and responsive design, providing a solid foundation for building dynamic web applications.
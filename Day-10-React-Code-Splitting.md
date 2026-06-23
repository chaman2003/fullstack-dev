# Day 10: React Code Splitting and Lazy Loading - Complete Documentation

## Table of Contents

1. [Introduction to Code Splitting](#introduction-to-code-splitting)
2. [React.lazy() and Dynamic Imports](#reactlazy-and-dynamic-imports)
3. [Suspense Component](#suspense-component)
4. [Event Handling Review](#event-handling-review)
5. [Form Handling Patterns](#form-handling-patterns)
6. [Performance Optimization Techniques](#performance-optimization-techniques)
7. [Complete Code Examples](#complete-code-examples)
8. [Key Learning Objectives](#key-learning-objectives)
9. [Best Practices](#best-practices)
10. [Advanced Patterns](#advanced-patterns)

---

## Introduction to Code Splitting

Code splitting is a technique to break down your application into smaller chunks that can be loaded on demand, improving initial load times and overall performance.

### Why Code Splitting?
- **Faster Initial Load**: Only load essential code upfront
- **Better User Experience**: Progressive loading of features
- **Reduced Bundle Size**: Split large applications into manageable chunks
- **Improved Performance**: Load components when needed
- **Better Caching**: Individual chunks can be cached separately

### Bundle Analysis
```javascript
// Before code splitting - single large bundle
// bundle.js (500KB) - everything loaded at once

// After code splitting - multiple smaller chunks
// main.js (50KB) - essential app code
// chunk1.js (100KB) - dashboard features
// chunk2.js (80KB) - profile components
// chunk3.js (120KB) - admin features
```

---

## React.lazy() and Dynamic Imports

React.lazy() enables dynamic imports for components, allowing them to be loaded asynchronously.

### Basic React.lazy() Usage
```jsx
import React, { Suspense } from "react";

// Dynamic imports with React.lazy()
const Click = React.lazy(() => import("./pages/Click"));
const Hover = React.lazy(() => import("./pages/Hover"));
const Form = React.lazy(() => import("./pages/Form"));
const Image = React.lazy(() => import("./pages/Image"));

function App() {
  return (
    <>
      <h1>hi</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <Form />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Click />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Hover />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Image />
      </Suspense>
    </>
  );
}

export default App;
```

### Dynamic Import Syntax
```jsx
// Static import (traditional)
import MyComponent from './MyComponent';

// Dynamic import with React.lazy()
const MyComponent = React.lazy(() => import('./MyComponent'));

// Dynamic import with custom logic
const MyComponent = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./MyComponent'));
    }, 1000); // Simulate slow loading
  });
});

// Conditional dynamic imports
const MyComponent = React.lazy(() => {
  if (userHasPermission) {
    return import('./AdminComponent');
  } else {
    return import('./UserComponent');
  }
});
```

### Advanced Lazy Loading Patterns
```jsx
// Lazy loading with error handling
const LazyComponent = React.lazy(() =>
  import('./MyComponent').catch(() => {
    return { default: () => <div>Component failed to load</div> };
  })
);

// Lazy loading with retry mechanism
const createLazyComponent = (importFunc, retries = 3) => {
  return React.lazy(() => {
    const attemptImport = async (retriesLeft) => {
      try {
        return await importFunc();
      } catch (error) {
        if (retriesLeft > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return attemptImport(retriesLeft - 1);
        }
        throw error;
      }
    };
    return attemptImport(retries);
  });
};

const RobustComponent = createLazyComponent(() => import('./MyComponent'));
```

---

## Suspense Component

Suspense provides a way to handle loading states while lazy components are being fetched.

### Basic Suspense Usage
```jsx
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### Advanced Suspense Patterns
```jsx
// Custom loading component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p>Loading component...</p>
  </div>
);

// Nested Suspense boundaries
function App() {
  return (
    <div>
      <Header />
      
      <Suspense fallback={<LoadingSpinner />}>
        <main>
          <Suspense fallback={<div>Loading sidebar...</div>}>
            <Sidebar />
          </Suspense>
          
          <Suspense fallback={<div>Loading content...</div>}>
            <MainContent />
          </Suspense>
        </main>
      </Suspense>
      
      <Footer />
    </div>
  );
}

// Suspense with error boundary
class SuspenseErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Suspense error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong while loading the component.</div>;
    }

    return (
      <Suspense fallback={this.props.fallback}>
        {this.props.children}
      </Suspense>
    );
  }
}
```

### Progressive Loading with Multiple Suspense
```jsx
function Dashboard() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Essential components load first */}
      <Suspense fallback={<div>Loading basic features...</div>}>
        <BasicStats />
        <QuickActions />
      </Suspense>
      
      {/* Advanced features load on demand */}
      {showAdvanced && (
        <Suspense fallback={<div>Loading advanced features...</div>}>
          <AdvancedAnalytics />
          <DetailedReports />
        </Suspense>
      )}
      
      <button onClick={() => setShowAdvanced(!showAdvanced)}>
        {showAdvanced ? 'Hide' : 'Show'} Advanced Features
      </button>
    </div>
  );
}
```

---

## Event Handling Review

Day 10 reviews fundamental event handling patterns in React.

### Click Events
```jsx
import React from 'react';

function Click() {
  const handleClick = () => {
    alert("Clicked");
  };

  const handleClickWithEvent = (e) => {
    console.log('Event:', e);
    console.log('Target:', e.target);
    console.log('Current Target:', e.currentTarget);
  };

  const handleClickWithData = (data) => {
    return (e) => {
      console.log('Data:', data);
      console.log('Event:', e);
    };
  };

  return (
    <div>
      <button onClick={handleClick}>
        Basic Click Handler
      </button>
      
      <button onClick={handleClickWithEvent}>
        Click with Event Object
      </button>
      
      <button onClick={handleClickWithData('custom data')}>
        Click with Custom Data
      </button>
      
      <button onClick={(e) => {
        e.preventDefault();
        console.log('Inline handler');
      }}>
        Inline Handler
      </button>
    </div>
  );
}

export default Click;
```

### Mouse Events
```jsx
import React, { useState } from 'react';

function Hover() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = () => {
    alert("hovered");
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseDown = () => {
    console.log('Mouse pressed down');
  };

  const handleMouseUp = () => {
    console.log('Mouse released');
  };

  return (
    <div>
      <button 
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          backgroundColor: isHovered ? 'lightblue' : 'lightgray',
          padding: '20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        <h1>Interactive Button</h1>
        <p>Mouse at: {mousePosition.x}, {mousePosition.y}</p>
      </button>
    </div>
  );
}

export default Hover;
```

### Keyboard Events
```jsx
function KeyboardEvents() {
  const [key, setKey] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    setKey(`Key Down: ${e.key}`);
    
    // Handle special keys
    if (e.key === 'Enter') {
      console.log('Enter pressed');
    }
    if (e.key === 'Escape') {
      setInputValue('');
    }
  };

  const handleKeyUp = (e) => {
    setKey(`Key Up: ${e.key}`);
  };

  const handleKeyPress = (e) => {
    // Only fires for printable characters
    console.log('Key pressed:', e.key);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onKeyPress={handleKeyPress}
        placeholder="Type something..."
      />
      <p>Last key event: {key}</p>
      <p>Current value: {inputValue}</p>
    </div>
  );
}
```

---

## Form Handling Patterns

### Controlled Components
```jsx
import { useState } from 'react';

function Form() {
  const [form, setForm] = useState({});

  const onFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={form.email || ""} 
          name="email"  
          onChange={onFormChange}
          placeholder="Email"
        />
        <br />
        
        <input 
          type="number" 
          value={form.phone || ""} 
          name="phone" 
          onChange={onFormChange}
          placeholder="Phone"
        />
        <br />
        
        <button type="submit">Submit</button>
      </form>
      
      <div>
        <h3>Form Data:</h3>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Form;
```

### Advanced Form Handling
```jsx
function AdvancedForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      zipCode: ''
    },
    preferences: {
      newsletter: false,
      notifications: true
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle nested object updates
  const handleNestedChange = (path, value) => {
    const keys = path.split('.');
    const newFormData = { ...formData };
    
    let current = newFormData;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setFormData(newFormData);
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted successfully:', formData);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <fieldset>
        <legend>Address</legend>
        <input
          type="text"
          placeholder="Street"
          value={formData.address.street}
          onChange={(e) => handleNestedChange('address.street', e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={formData.address.city}
          onChange={(e) => handleNestedChange('address.city', e.target.value)}
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={formData.address.zipCode}
          onChange={(e) => handleNestedChange('address.zipCode', e.target.value)}
        />
      </fieldset>

      <fieldset>
        <legend>Preferences</legend>
        <label>
          <input
            type="checkbox"
            checked={formData.preferences.newsletter}
            onChange={(e) => handleNestedChange('preferences.newsletter', e.target.checked)}
          />
          Subscribe to Newsletter
        </label>
        <label>
          <input
            type="checkbox"
            checked={formData.preferences.notifications}
            onChange={(e) => handleNestedChange('preferences.notifications', e.target.checked)}
          />
          Enable Notifications
        </label>
      </fieldset>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

---

## Performance Optimization Techniques

### Lazy Loading with Route-Based Code Splitting
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

// Lazy load route components
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* Navigation links */}
        </nav>
        
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
```

### Component-Level Code Splitting
```jsx
function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Lazy load tab components
  const OverviewTab = React.lazy(() => import('./tabs/OverviewTab'));
  const AnalyticsTab = React.lazy(() => import('./tabs/AnalyticsTab'));
  const SettingsTab = React.lazy(() => import('./tabs/SettingsTab'));

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab('overview')}>Overview</button>
        <button onClick={() => setActiveTab('analytics')}>Analytics</button>
        <button onClick={() => setActiveTab('settings')}>Settings</button>
      </div>
      
      <div className="tab-content">
        <Suspense fallback={<div>Loading tab...</div>}>
          {renderActiveTab()}
        </Suspense>
      </div>
    </div>
  );
}
```

### Preloading Strategies
```jsx
// Preload components on hover
function NavigationLink({ to, children, importFunc }) {
  const handleMouseEnter = () => {
    // Preload the component when user hovers
    importFunc();
  };

  return (
    <Link to={to} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
}

// Usage
<NavigationLink 
  to="/dashboard" 
  importFunc={() => import('./pages/Dashboard')}
>
  Dashboard
</NavigationLink>

// Preload after user interaction
function usePreloadAfterInteraction() {
  useEffect(() => {
    const preloadComponents = () => {
      // Preload components after initial user interaction
      import('./pages/Dashboard');
      import('./pages/Profile');
      import('./pages/Settings');
    };

    const handleFirstInteraction = () => {
      preloadComponents();
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);
}
```

---

## Complete Code Examples

### Example 1: Image Gallery with Lazy Loading
```jsx
import React, { Suspense, useState } from 'react';

// Lazy load image component
const LazyImage = React.lazy(() => import('./LazyImage'));

function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1507187632231-5beb21a654a2?w=300",
      fullSize: "https://images.unsplash.com/photo-1507187632231-5beb21a654a2?w=1200",
      alt: "Beach landscape"
    },
    // More images...
  ];

  return (
    <div className="gallery">
      <div className="thumbnails">
        {images.map(image => (
          <img
            key={image.id}
            src={image.thumbnail}
            alt={image.alt}
            onClick={() => setSelectedImage(image)}
            className="thumbnail"
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modal">
          <Suspense fallback={<div>Loading full image...</div>}>
            <LazyImage
              src={selectedImage.fullSize}
              alt={selectedImage.alt}
              onClose={() => setSelectedImage(null)}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}

// LazyImage.jsx
function LazyImage({ src, alt, onClose }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="lazy-image-container">
      {!loaded && <div className="image-placeholder">Loading...</div>}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      />
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default LazyImage;
```

### Example 2: Dynamic Dashboard with Code Splitting
```jsx
function DynamicDashboard() {
  const [loadedModules, setLoadedModules] = useState(new Set());
  const [activeModules, setActiveModules] = useState([]);

  const availableModules = [
    { id: 'analytics', name: 'Analytics', import: () => import('./modules/Analytics') },
    { id: 'sales', name: 'Sales', import: () => import('./modules/Sales') },
    { id: 'users', name: 'Users', import: () => import('./modules/Users') },
    { id: 'reports', name: 'Reports', import: () => import('./modules/Reports') }
  ];

  const loadModule = async (moduleConfig) => {
    if (!loadedModules.has(moduleConfig.id)) {
      try {
        await moduleConfig.import();
        setLoadedModules(prev => new Set(prev).add(moduleConfig.id));
      } catch (error) {
        console.error(`Failed to load module ${moduleConfig.id}:`, error);
      }
    }
    
    setActiveModules(prev => [...prev, moduleConfig]);
  };

  const removeModule = (moduleId) => {
    setActiveModules(prev => prev.filter(m => m.id !== moduleId));
  };

  return (
    <div className="dashboard">
      <div className="module-selector">
        <h3>Available Modules</h3>
        {availableModules.map(module => (
          <button
            key={module.id}
            onClick={() => loadModule(module)}
            disabled={activeModules.some(m => m.id === module.id)}
          >
            Add {module.name}
          </button>
        ))}
      </div>

      <div className="dashboard-grid">
        {activeModules.map(module => (
          <div key={module.id} className="dashboard-module">
            <div className="module-header">
              <h4>{module.name}</h4>
              <button onClick={() => removeModule(module.id)}>×</button>
            </div>
            
            <Suspense fallback={<div>Loading {module.name}...</div>}>
              <DynamicModule moduleConfig={module} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}

function DynamicModule({ moduleConfig }) {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    moduleConfig.import().then(module => {
      setComponent(() => module.default);
    });
  }, [moduleConfig]);

  if (!Component) {
    return <div>Loading component...</div>;
  }

  return <Component />;
}
```

---

## Key Learning Objectives

After completing Day 10, students should understand:

### Code Splitting Concepts
1. **Bundle Optimization**: Breaking large bundles into smaller chunks
2. **Lazy Loading**: Loading components and resources on demand
3. **Dynamic Imports**: Using import() for asynchronous module loading
4. **Performance Benefits**: Improved initial load times and user experience

### React.lazy() and Suspense
1. **Component Lazy Loading**: Using React.lazy() for component code splitting
2. **Suspense Boundaries**: Handling loading states with Suspense
3. **Error Handling**: Managing failed imports and network issues
4. **Fallback Components**: Creating effective loading indicators

### Event Handling Mastery
1. **Event Types**: Click, hover, keyboard, and form events
2. **Event Object**: Understanding event properties and methods
3. **Event Delegation**: Efficient event handling patterns
4. **Custom Event Handlers**: Creating reusable event handling logic

### Form Management
1. **Controlled Components**: Managing form state with React
2. **Dynamic Forms**: Handling complex nested form data
3. **Validation**: Implementing client-side form validation
4. **Submission Handling**: Processing form data and API calls

---

## Best Practices

### Code Splitting Guidelines
- **Split at Route Level**: Use route-based code splitting for major sections
- **Component-Level Splitting**: Split large components that aren't always needed
- **Preloading Strategy**: Preload components before they're needed
- **Error Boundaries**: Always wrap lazy components with error handling
- **Loading States**: Provide meaningful loading feedback to users

### Performance Optimization
```jsx
// ✅ Good: Route-based splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// ✅ Good: Feature-based splitting
const AdvancedChart = React.lazy(() => import('./components/AdvancedChart'));

// ❌ Avoid: Over-splitting small components
const Button = React.lazy(() => import('./components/Button')); // Too small

// ✅ Good: Preloading on interaction
const handleMouseEnter = () => {
  import('./components/Modal'); // Preload before needed
};

// ✅ Good: Error handling
const Component = React.lazy(() =>
  import('./MyComponent').catch(() => ({
    default: () => <div>Failed to load component</div>
  }))
);
```

### Event Handling Best Practices
```jsx
// ✅ Good: Use useCallback for stable references
const handleClick = useCallback((id) => {
  setSelectedItem(id);
}, []);

// ✅ Good: Event delegation
const handleListClick = (e) => {
  if (e.target.matches('.item')) {
    handleItemClick(e.target.dataset.id);
  }
};

// ❌ Avoid: Inline functions in render
<button onClick={() => handleClick(item.id)}>Click</button>

// ✅ Better: Stable reference
<button onClick={handleClick} data-id={item.id}>Click</button>
```

---

## Advanced Patterns

### Custom Lazy Loading Hook
```jsx
function useLazyComponent(importFunc) {
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadComponent = useCallback(async () => {
    if (component) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const module = await importFunc();
      setComponent(() => module.default);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [importFunc, component]);

  return { component, loading, error, loadComponent };
}

// Usage
function ConditionalComponent() {
  const { component: LazyComponent, loading, error, loadComponent } = 
    useLazyComponent(() => import('./HeavyComponent'));

  if (error) {
    return <div>Failed to load component</div>;
  }

  if (!LazyComponent) {
    return (
      <button onClick={loadComponent} disabled={loading}>
        {loading ? 'Loading...' : 'Load Component'}
      </button>
    );
  }

  return <LazyComponent />;
}
```

### Progressive Enhancement Pattern
```jsx
function ProgressiveApp() {
  const [enhancementsLoaded, setEnhancementsLoaded] = useState(false);

  useEffect(() => {
    // Load enhancements after initial render
    const timer = setTimeout(() => {
      import('./enhancements').then(() => {
        setEnhancementsLoaded(true);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Core functionality available immediately */}
      <BasicApp />
      
      {/* Enhanced features loaded progressively */}
      {enhancementsLoaded && (
        <Suspense fallback={<div>Loading enhancements...</div>}>
          <EnhancedFeatures />
        </Suspense>
      )}
    </div>
  );
}
```

This comprehensive Day 10 documentation covers code splitting fundamentals, React.lazy() implementation, Suspense usage, and performance optimization techniques essential for building efficient React applications.
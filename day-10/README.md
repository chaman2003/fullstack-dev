# Day 10 - React Code Splitting & Performance

Code splitting lets you split your app into smaller chunks loaded on demand, reducing initial bundle size and improving performance.

## Learning Objectives
- Use React.lazy for lazy loading
- Wrap lazy components with Suspense
- Understand code splitting benefits
- Apply performance optimization patterns

## Concepts Covered

### React.lazy
Dynamically import components so they only load when needed.

```jsx
const Dashboard = React.lazy(() => import('./Dashboard'));
const Settings = React.lazy(() => import('./Settings'));
```

### Suspense
Suspense shows a fallback UI while lazy components are loading.

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <Dashboard />
</Suspense>
```

### When to Code Split
- Large third-party libraries
- Routes/pages not needed on initial load
- Heavy components (charts, editors, image galleries)
- Modals and overlays

This demo app uses lazy loading for four components: Click, Hover, Form, and Image. Each one is a separate chunk loaded only when Suspense renders it.

## Files
| File | Description |
|------|-------------|
| `src/App.jsx` | Main app with lazy imports and Suspense |
| `src/pages/Click.jsx` | Lazy loaded click handler component |
| `src/pages/Form.jsx` | Lazy loaded form component |
| `src/pages/Hover.jsx` | Lazy loaded hover component |
| `src/pages/Image.jsx` | Lazy loaded image component |

## How to Run
```bash
cd day-10
npm install
npm run dev
```

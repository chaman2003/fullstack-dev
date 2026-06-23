# Day 25 - UI Polish with Libraries

Enhance your app's look and feel with UI libraries, animations, dark mode, and charts.

## Learning Objectives
- Add dark mode toggle
- Animate with Framer Motion
- Display data with Chart.js/Recharts
- Install and use MUI or Shadcn/ui
- Lazy load images for performance

## Concepts Covered

### Dark Mode Toggle
```jsx
function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.body.style.background = dark ? '#222' : '#fff';
    document.body.style.color = dark ? '#fff' : '#222';
  }, [dark]);
  return <button onClick={() => setDark(!dark)}>{dark ? '☀️ Light' : '🌙 Dark'}</button>;
}
```

### Framer Motion
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  whileHover={{ scale: 1.05 }}
>
  Animated content here
</motion.div>
```

### Chart.js Example
```jsx
import { Bar } from 'react-chartjs-2';
const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{ label: 'Sales', data: [12, 19, 3], backgroundColor: 'rgba(75,192,192,0.6)' }]
};
<Bar data={data} />;
```

### UI Library Setup
```bash
# MUI
npm install @mui/material @emotion/react @emotion/styled

# Tailwind CSS (Vite)
npm install tailwindcss @tailwindcss/vite

# Shadcn/ui
npx shadcn@latest init
```

### Lazy Loading Images
```html
<img src="large.jpg" loading="lazy" alt="Lazy loaded" />
```

## Files
| File | Description |
|------|-------------|
| `index.html` | Dark mode, Framer Motion, Chart.js, UI libraries, lazy loading |

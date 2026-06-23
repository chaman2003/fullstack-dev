# UI Polish

## Days
- [Day 25 - UI Polish](../day-25/)

## Dark Mode
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

## Framer Motion
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  whileHover={{ scale: 1.05 }}
>
  Animated content
</motion.div>
```

## Charts
```jsx
import { Bar } from 'react-chartjs-2';
const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{ label: 'Sales', data: [12, 19, 3], backgroundColor: 'rgba(75,192,192,0.6)' }]
};
<Bar data={data} />;
```

## UI Libraries
```bash
# MUI
npm install @mui/material @emotion/react @emotion/styled

# Tailwind CSS
npm install tailwindcss @tailwindcss/vite

# Shadcn/ui
npx shadcn@latest init

# Framer Motion
npm install framer-motion

# Recharts
npm install recharts
```

## Performance
- Native lazy loading: `<img loading="lazy" />`
- React lazy: `const Comp = React.lazy(() => import('./Comp'))`
- Suspense: `<Suspense fallback={<Loading />}>`

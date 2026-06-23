# Day 2 - CSS3 Styling & Design

CSS controls how HTML looks. This day covers modern CSS3 features including layouts, animations, responsive design, and custom properties.

## Learning Objectives
- Understand box model, specificity, and selectors
- Build layouts with Flexbox and Grid
- Create responsive designs with media queries
- Add animations with transitions and keyframes
- Use CSS variables for theming

## Concepts Covered

### Box Model
Every element is a box: `content` → `padding` → `border` → `margin`. Use `box-sizing: border-box` to include padding/border in width calculations.

```css
* { box-sizing: border-box; }
.element {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}
```

### Flexbox
One-dimensional layout. Great for navbars, centering, and rows/columns.

```css
.container { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
```

### CSS Grid
Two-dimensional layout. Perfect for page layouts and card grids.

```css
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
```

### Media Queries
Make designs responsive at different breakpoints.

```css
/* Mobile-first */
.container { width: 100%; }
@media (min-width: 768px) { .container { width: 750px; margin: auto; } }
@media (min-width: 1024px) { .container { width: 1000px; } }
```

### Animations
```css
/* Transition */
.button { transition: background 0.3s ease, transform 0.2s; }
.button:hover { background: blue; transform: scale(1.05); }

/* Keyframes */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.element { animation: fadeIn 1s ease-in; }
```

### CSS Variables
```css
:root { --primary: #3498db; --spacing: 16px; }
.element { color: var(--primary); margin: var(--spacing); }
```

### Portfolio Project
The `portfolio.html` file is a complete personal portfolio website using all these concepts: responsive grid, flexbox navigation, hover animations, CSS variables for theming, and media queries for mobile/tablet/desktop.

## Files
| File | Description |
|------|-------------|
| `index.html` | CSS concepts demo page |
| `portfolio.html` | Full portfolio website project |
| `styles.css` | Main CSS demo styles |
| `styles-portfolio.css` | Portfolio-specific styles |
| `assets/` | Portfolio project images |

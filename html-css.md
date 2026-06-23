# HTML & CSS

## Days
- [Day 1 - HTML5](../day-01/)
- [Day 2 - CSS3](../day-02/)

## HTML5

HTML5 provides semantic structure, forms, and multimedia for web pages.

### Key Concepts
- **Semantic tags**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- **Forms**: `<input>` types (text, email, number, password), validation (required, pattern, minlength)
- **Media**: `<img>` with alt text, `<audio>` with controls, `<video>`
- **SEO**: Meta tags (description, viewport, robots), semantic structure
- **Accessibility**: ARIA roles, alt text, tabindex, keyboard navigation

### Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Page</title>
</head>
<body>
  <header>
    <nav><a href="#home">Home</a></nav>
  </header>
  <main>
    <section>
      <h1>Welcome</h1>
      <p>Content here</p>
    </section>
  </main>
  <footer>&copy; 2024</footer>
</body>
</html>
```

## CSS3

CSS controls layout, styling, and animations with modern features like Flexbox, Grid, and custom properties.

### Key Concepts
- **Box Model**: content, padding, border, margin. Use `box-sizing: border-box`
- **Flexbox**: One-dimensional layout (`display: flex`, `justify-content`, `align-items`)
- **Grid**: Two-dimensional layout (`display: grid`, `grid-template-columns`)
- **Responsive Design**: Media queries at breakpoints (768px, 1024px)
- **Animations**: Transitions (`transition: all 0.3s`), Keyframes (`@keyframes`)
- **CSS Variables**: Custom properties (`--primary-color: #3498db`)

### Example
```css
:root { --primary: #3498db; }
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.card { transition: transform 0.3s; }
.card:hover { transform: scale(1.05); }
```

## Project
A complete responsive portfolio website demonstrating all concepts: [day-02/portfolio.html](../day-02/portfolio.html)

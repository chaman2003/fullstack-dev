# Day 1 - HTML5 Fundamentals

HTML (HyperText Markup Language) is the standard markup language for creating web pages. HTML5 brings semantic elements, multimedia support, and accessibility features.

## Learning Objectives
- Understand HTML document structure
- Use semantic tags for better SEO and accessibility
- Build forms with validation attributes
- Embed images, audio, and video
- Write accessible HTML with ARIA roles

## Concepts Covered

### Document Structure
Every HTML page starts with `<!DOCTYPE html>` and wraps content in `<html>`, `<head>`, and `<body>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Page</title>
</head>
<body>
  <!-- content here -->
</body>
</html>
```

### Semantic Tags
Replace generic `<div>` with meaningful tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`. This helps screen readers and search engines understand your page layout.

### Forms & Inputs
Use `<form>` with input types like `text`, `email`, `number`, `password`. Add `required`, `pattern`, `minlength` for built-in validation.

```html
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />
  <button type="submit">Submit</button>
</form>
```

### Media Elements
- `<img>` - Images with `alt` text for accessibility
- `<audio>` - Audio playback with controls
- `<video>` - Video playback with controls

### Meta Tags & SEO
Meta tags in `<head>` help with SEO: `<meta name="description" content="..." />`, `<meta name="robots" content="index, follow" />`.

### Accessibility
- ARIA roles (`role="navigation"`, `role="banner"`)
- `alt` text on images
- `tabindex` for keyboard navigation
- Semantic HTML (screen readers navigate by landmarks)

## Files
| File | Description |
|------|-------------|
| `index.html` | Main HTML5 demo with all concepts |
| `indexOG.html` | Version with inline comments explaining each element |
| `assets/hello.html` | Simple hello page |
| `assets/img.png` | Sample image |
| `assets/music.mp3` | Sample audio file |

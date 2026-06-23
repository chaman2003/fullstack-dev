# Day 16 - Revision & Debugging

Effective debugging is essential for development. This day covers Chrome DevTools, breakpoints, and common error patterns.

## Learning Objectives
- Use Chrome DevTools (Console, Elements, Network, Sources)
- Set breakpoints and step through code
- Identify and fix common JS errors
- Debug CSS layout issues
- Apply debugging strategies

## Concepts Covered

### Chrome DevTools

**Console Tab** - View logs, errors, warnings, and run JavaScript:
```js
console.log("info");
console.warn("warning");
console.error("error");
console.table([{name: "John", age: 30}]);
```

**Elements Tab** - Inspect and edit HTML/CSS in real time. Right-click → Inspect to open. Edit styles, toggle classes, see box model.

**Network Tab** - See all HTTP requests, response statuses, payloads, and timing. Check if API calls are working (200 vs 404 vs 500).

**Sources Tab** - Set breakpoints by clicking line numbers. Step through code line by line with Step Over, Step Into, Step Out.

### Common JS Errors

**ReferenceError: x is not defined** - Variable was never declared. Fix: declare it with `let` or `const`.

**TypeError: Cannot read properties of null/undefined** - Accessing a property on null/undefined. Fix: check existence first `if (user) user.name`.

**NaN (Not a Number)** - Math operation on non-numbers. Fix: ensure both operands are numbers.

### CSS Debugging
- Add `* { border: 1px solid red; }` to visualize all boxes
- Check specificity (more specific selector wins)
- Use DevTools Computed tab to see final values
- Right-click → Force State → :hover to test hover styles

## Files
| File | Description |
|------|-------------|
| `index.html` | DevTools guide, debugging examples, practice challenges |

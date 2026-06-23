# Debugging

## Days
- [Day 16 - Revision & Debugging](../day-16/)

## Chrome DevTools

### Console Tab
```js
console.log("info");
console.warn("warning");  
console.error("error");
console.table([{name: "John", age: 30}]);
```

### Elements Tab
- Inspect and edit HTML/CSS in real time
- Right-click → Inspect Element
- Edit styles, see box model, toggle classes

### Network Tab
- See all HTTP requests with status codes and timing
- Check API call responses (200 vs 404 vs 500)
- View request headers, payload, and response data

### Sources Tab
- Set breakpoints by clicking line numbers
- Step through code with Step Over / Step Into / Step Out
- Watch variables and call stack

## Common JavaScript Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `ReferenceError: x is not defined` | Variable never declared | Declare with `let`/`const` |
| `TypeError: Cannot read property of undefined` | Accessing property on null/undefined | Check existence first |
| `NaN` | Math on non-numbers | Ensure operands are numbers |

## CSS Debugging
- Add `* { border: 1px solid red; }` to visualize all boxes
- Check specificity in DevTools Computed tab
- Right-click element → Force State → :hover to test
- Check inheritance (not all properties inherit)

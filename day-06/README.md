# Day 6 - React Introduction

React is a JavaScript library for building user interfaces with reusable components. This day covers the fundamentals: JSX, components, props, and state.

## Learning Objectives
- Set up a React project with Vite
- Write JSX expressions
- Create functional components
- Pass data with props
- Manage state with useState
- Understand component composition

## Concepts Covered

### JSX
JSX is a syntax extension that looks like HTML but compiles to JavaScript. You can embed any JavaScript expression in `{}`.

```jsx
const name = "Chaman";
const element = <h1>Hello, {name}!</h1>;
```

### Components
Components are reusable pieces of UI. Each component is a function that returns JSX.

```jsx
function Welcome() {
  return <h1>Welcome bro</h1>;
}
```

### Props
Props are read-only data passed from parent to child component.

```jsx
function Props(props) {
  return <h1>Bye {props.name}</h1>;
}

// Usage
<Props name="Chaman" />
```

Props can be strings, numbers, booleans, arrays, objects, or even functions.

### useState
State allows components to remember data that changes over time.

```jsx
const [count, setCount] = useState(0);
// This demonstrates how useState persists values between renders,
// while a regular variable resets every render.
```

## Files
| File | Description |
|------|-------------|
| `intro/src/App.jsx` | Main app importing all components |
| `intro/src/components/Welcome.jsx` | Basic welcome component |
| `intro/src/components/Jsx.jsx` | JSX expressions with variables |
| `intro/src/props/Props.jsx` | String props example |
| `intro/src/props/Props2.jsx` | Number props example |
| `intro/src/props/Functionprop.jsx` | Passing functions as props |
| `intro/src/props/ArrayProp.jsx` | Array props mapping to list |
| `intro/src/props/ObjectProp.jsx` | Object array props |
| `intro/src/props/Ternaryprop.jsx` | Conditional rendering with ternary |
| `intro/src/props/Proptypes.jsx` | PropTypes example |
| `intro/src/hooks/UseStatee.jsx` | useState demo (regular var vs state) |

## How to Run
```bash
cd day-6/intro
npm install
npm run dev
```

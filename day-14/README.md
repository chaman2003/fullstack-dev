# Day 14 - Authentication

Authentication verifies user identity. This day covers three approaches: cookies, sessions, and JWT (JSON Web Tokens).

## Learning Objectives
- Set and clear cookies with cookie-parser
- Use express-session for server-side sessions
- Implement JWT-based authentication
- Hash passwords with bcryptjs
- Protect routes with auth middleware

## Concepts Covered

### Cookie Authentication
Cookies are small pieces of data stored in the browser. They're sent with every request.

```js
app.use(cookieParser());
res.cookie('name', 'User', { maxAge: 30000 });
res.clearCookie('name');
```

### Session Authentication
Server stores session data, client stores only a session ID cookie.

```js
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
}));
// Store data in session
req.session.user = user;
// Destroy
req.session.destroy();
```

### JWT Authentication
Token-based auth. Server creates a signed token, client stores it and sends it in headers.

```js
const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '24h' });

// Verify token on protected routes
jwt.verify(token, 'secret', (err, decoded) => {
  if (err) return res.status(403).json({ error: 'Invalid token' });
  req.user = decoded;
  next();
});
```

### Password Hashing with bcrypt
```js
const hash = await bcrypt.hash(password, 10);     // hash
const match = await bcrypt.compare(input, hash);   // compare
```

## Files
| File | Description |
|------|-------------|
| `cookie.js` | Cookie setting/clearing with maxAge |
| `session.js` | Session-based visit counter |
| `auth/session.js` | Login system with sessions |
| `auth/jwt.js` | Full JWT auth: register, login, dashboard |

## How to Run
```bash
cd day-14
npm install
node auth/jwt.js    # or node cookie.js
```

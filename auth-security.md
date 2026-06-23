# Authentication & Security

## Days
- [Day 14 - Authentication](../day-14/)
- [Day 21 - Error Handling & Validation](../day-21/)
- [Day 26 - Security & Testing](../day-26/)

## Authentication Methods

### Cookie-Based
```js
res.cookie('name', 'value', { maxAge: 30000 });
res.clearCookie('name');
```

### Session-Based
```js
app.use(session({ secret: 'key', resave: false, saveUninitialized: false }));
req.session.user = { id: 1, name: 'John' };
```

### JWT (JSON Web Token)
```js
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Auth middleware
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};
```

### Password Hashing
```js
const hash = await bcrypt.hash(password, 10);
const match = await bcrypt.compare(input, hash);
```

## Security

### Helmet.js
Sets secure HTTP headers:
```js
app.use(helmet());
```

### Rate Limiting
```js
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

### Joi Validation
```js
const schema = Joi.object({ email: Joi.string().email().required() });
const { error } = schema.validate(req.body);
```

## Testing

### Unit Tests (Jest)
```js
test('adds 1 + 2 = 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### Integration Tests (Supertest)
```js
const res = await request(app).post('/api/auth/login').send({ username: 'test', password: '123' });
expect(res.statusCode).toBe(200);
```

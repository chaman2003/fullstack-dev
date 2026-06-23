# Day 26 - Deployment, Security & Testing

Deploy your apps to production, secure them with industry-standard tools, and write automated tests.

## Learning Objectives
- Add security headers with Helmet
- Implement rate limiting
- Write unit tests with Jest
- Write integration tests with Supertest
- Deploy frontend to Vercel
- Deploy backend to Render

## Concepts Covered

### Helmet.js (Security Headers)
```js
import helmet from 'helmet';
app.use(helmet());
// Sets: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, etc.
```

### Rate Limiting
```js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per window
  message: { message: 'Too many requests' }
});

app.use('/api', limiter);
```

### Unit Testing with Jest
```js
// sum.js
function sum(a, b) { return a + b; }

// sum.test.js
test('adds 1 + 2 = 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// package.json: { "scripts": { "test": "jest" } }
// Run: npm test
```

### Integration Testing with Supertest
```js
const request = require('supertest');
const app = require('../app');

test('POST /register returns token', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ username: 'test', email: 'test@test.com', password: '123456' });
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('token');
});
```

### Deploy Checklist
- Frontend: `npm run build` → deploy `dist/` to Vercel
- Backend: Push to GitHub → Render auto-deploys
- Set environment variables in platform UI
- Add `.env.example` and `LICENSE` to repo

## Files
| File | Description |
|------|-------------|
| `index.html` | Security, testing, and deployment guide |

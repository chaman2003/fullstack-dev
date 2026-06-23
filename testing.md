# Testing

## Days
- [Day 26 - Deploy, Security & Testing](../day-26/)

## Unit Testing with Jest

**Setup:**
```bash
npm install --save-dev jest
```
**package.json:**
```json
{ "scripts": { "test": "jest" } }
```

**Example:**
```js
// sum.js
function sum(a, b) { return a + b; }
module.exports = sum;

// sum.test.js
const sum = require('./sum');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**Running:**
```bash
npm test
```

## Integration Testing with Supertest

**Setup:**
```bash
npm install --save-dev supertest
```

**Example:**
```js
const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
  test('POST /auth/register returns 201', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'test', email: 'test@test.com', password: '123456' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /auth/login wrong password returns 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'test', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
  });
});
```

## Security Testing
- Test rate limiting: send 100+ requests in 15min window
- Test validation: send invalid inputs to check error messages
- Test auth: access protected routes without token

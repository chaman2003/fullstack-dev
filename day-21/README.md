# Day 21 - Error Handling & Data Validation

Proper error handling and input validation prevents bugs and security issues. This day covers Joi validation and centralized error middleware.

## Learning Objectives
- Validate request data with Joi schemas
- Create reusable validation middleware
- Build a centralized error handler
- Send proper HTTP status codes
- Configure CORS for frontend access

## Concepts Covered

### Joi Schema Validation
Define schemas for request bodies and validate before processing.

```js
import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().integer().min(1).max(150),
});
```

### Validation Middleware
```js
function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map(d => d.message);
      return res.status(400).json({ errors: messages });
    }
    next();
  };
}

// Usage
app.post('/api/register', validate(registerSchema), handler);
```

### Centralized Error Handler
```js
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});
```

### CORS Configuration
```js
import cors from 'cors';
app.use(cors()); // Allow all origins (development)
```

### HTTP Status Codes Used
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

## Files
| File | Description |
|------|-------------|
| `index.js` | Validation middleware, Joi schemas, error handler |

# Day 13 - MongoDB with Mongoose

MongoDB is a NoSQL document database. Mongoose is an ODM (Object Data Modeling) library that provides schema validation and CRUD operations.

## Learning Objectives
- Connect to MongoDB Atlas
- Define Mongoose schemas and models
- Perform CRUD operations
- Run an Express server with MongoDB

## Concepts Covered

### Connection
```js
import mongoose from 'mongoose';
await mongoose.connect('mongodb+srv://<user>:<pass>@cluster.mongodb.net/dbname');
```

### Schema & Model
Schemas define the structure of documents. Models are the interface to the database.

```js
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});
const Person = mongoose.model('Person', personSchema);
```

### CRUD Operations
```js
// Create
await Person.create({ name: "John", age: 30, email: "john@test.com" });

// Read
const all = await Person.find();
const one = await Person.findById(id);

// Update
await Person.findByIdAndUpdate(id, { name: "Jane" });

// Delete
await Person.findByIdAndDelete(id);
```

### Express + MongoDB Server
The server at `index.js` provides a REST API:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/person` | POST | Create a new person |
| `/person` | GET | Get all persons |
| `/person/:id` | DELETE | Delete a person by ID |

## Files
| File | Description |
|------|-------------|
| `dbConnect.js` | MongoDB Atlas connection |
| `models/model.js` | Mongoose schema and model |
| `index.js` | Express server with CRUD endpoints |

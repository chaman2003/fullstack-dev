# MongoDB

## Days
- [Day 13 - MongoDB with Mongoose](../day-13/)
- [Day 20 - REST APIs with Database](../day-20/)

## Concepts

MongoDB is a NoSQL document database. Mongoose is an ODM that provides schema validation and CRUD operations.

### Connection
```js
import mongoose from 'mongoose';
await mongoose.connect(process.env.MONGODB_URI);
```

### Schema & Model
```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
```

### CRUD Operations
```js
// Create
await User.create({ name: 'John', email: 'john@test.com' });

// Read
const users = await User.find({ age: { $gte: 18 } });
const user = await User.findById(id);

// Update
await User.findByIdAndUpdate(id, { name: 'Jane' }, { new: true });

// Delete
await User.findByIdAndDelete(id);
```

### Data Relationships
```js
const noteSchema = new mongoose.Schema({
  title: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// Populate the reference
const notes = await Note.find().populate('user');
```

## Environment Setup
Use `.env` to store connection strings securely:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

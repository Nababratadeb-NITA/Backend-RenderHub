const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');


// Connect to MongoDB
mongoose
  .connect('mongodb+srv://nababratadeb5:nababrata@cluster0.9aqadu0.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/users', userRoutes)

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

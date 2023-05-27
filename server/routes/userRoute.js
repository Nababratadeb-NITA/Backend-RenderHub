const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  

// Create a new user
router.post('/users', upload.single('image'), (req, res) => {
  const { name, email } = req.body;

  // Create a new User instance
  const newUser = new User({
    name,
    email,
    image: req.file.path,
  });

  // Save the new user to the database
  newUser
    .save()
    .then(() => {
      res.status(201).json({ message: 'User created successfully' });
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Retrieve all users
router.get('/users', (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Update a user
router.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.id;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Delete a user
router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  User.findByIdAndRemove(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// ...

module.exports = router;

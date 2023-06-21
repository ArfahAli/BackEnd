import User from '../models/user.js';
export const registration =async (req, res) => {
    try {
      // Extract username, email, and password from the request body
      const { username, email, password } = req.body;
      // Create a new user instance
      const newUser = new User({ username, email, password });
  
      // Save the user to the database
      const savedUser = await newUser.save();
      res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
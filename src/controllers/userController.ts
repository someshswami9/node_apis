// controllers/userController.ts
import { Request, Response } from 'express';
import { createUser, findUserByUsername, } from '../models/userModel';

const generateUniqueId = (): string => {
  // Generates a unique ID like "USER362520"
  return 'USER' + Math.floor(100000 + Math.random() * 900000);
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username,password } = req.body;
  console.log('Signup route hit! Body:', req.body);
  
  if (!username || !password) {
    res.status(400).json({ message: 'Please provide username,and password' });
    return;
  }
  
  try {
    // Check if user with this email already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }
    
    const userid = generateUniqueId();
    const newUser = await createUser({ userid, username, password });
    
    // Respond with the created user (including the unique_id)
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ message: 'Please provide email and password' });
    return;
  }
  
  try {
    const user = await findUserByUsername(username);
    if (!user || user.password !== password) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }
    
    // In production, you might generate a JWT or establish a session here.
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
};

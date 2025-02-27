import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { connectDB } from './config/dababase';

const PORT = process.env.PORT ?? 8080;

const startServer = async () => {
  try {
    await connectDB(); // Establish connection to the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();

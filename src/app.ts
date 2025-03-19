import express from 'express';
import userRoutes from './routes/userRoutes';
import destinationRoutes from './routes/destinationRoutes';
import profileRoutes from './routes/profileRoutes';
import corpRoutes from './routes/corp.routes';

const app = express();


// Middleware to parse JSON bodies
app.use(express.json());

// // Mount user routes at /api/users
// app.use('/api/auth', userRoutes);
// app.use('/api/profile', destinationRoutes);
// app.use('/api/profile', profileRoutes);
app.use("/api/corp", corpRoutes);
app.get('/api/test', (req, res) => {
    res.json({ message: "CORS test successful" });
  });
export default app;

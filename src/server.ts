import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
import { connectDB } from './config/dababase';
import cors from 'cors';
import corpRoutes from './routes/corp.routes';

const app = express();


const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
// const startServer = async () => {
//   try {
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error('Error starting server:', error);
//   }
// };
app.use(express.json());
app.use(cors({}));
connectDB(); // Establish connection to the database

app.use("/api/corp", corpRoutes);



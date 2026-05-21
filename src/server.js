import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import summaryRoutes from './routes/summaryRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import serverless from 'serverless-http';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/summaries', summaryRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.send('StudyBuddy AI API Running'));

app.use(errorHandler);

// ✅ Ye line Vercel ke liye must hai
export const handler = serverless(app);

// ✅ Local development ke liye (npm run dev)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
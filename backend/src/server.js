import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_expert', (expertId) => {
    socket.join(expertId);
    console.log(`User ${socket.id} joined room ${expertId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'ExpertSync Engine is awake' });
});

// API Routes
import expertRoutes from './routes/expertRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

app.use('/api/experts', expertRoutes);
app.use('/api/bookings', bookingRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

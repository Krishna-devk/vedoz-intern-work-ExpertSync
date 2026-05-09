import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import os from 'os';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';


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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get basic API information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Basic API details and documentation link
 */
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'ExpertSync API',
    version: '1.0.0',
    description: 'Real-time booking engine for experts',
    documentation: `${req.protocol}://${req.get('host')}/docs`,
    status: 'Operational'
  });
});

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get system and database status
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Detailed system status including database connectivity and uptime
 */
app.get('/api', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.status(200).json({
    status: 'Active',
    uptime: `${Math.floor(process.uptime())}s`,
    database: dbStatus,
    system: {
      platform: os.platform(),
      memory: `${Math.round(os.freemem() / 1024 / 1024)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB free`,
      cpuLoad: os.loadavg()
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'ExpertSync Engine is awake' });
});


// Swagger Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }', // Hide the search bar for a cleaner look
  customSiteTitle: "ExpertSync API Docs"
}));


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

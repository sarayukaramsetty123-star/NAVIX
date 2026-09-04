import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { connectDatabase } from './config/database.js';

// Route Imports
import healthRoutes from './routes/health.routes.js';
import locationRoutes from './routes/location.routes.js';
import routeRoutes from './routes/route.routes.js';
import aiRoutes from './routes/ai.routes.js';
import authRoutes from './routes/auth.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import mapRoutes from './routes/map.routes.js';
import adminRoutes from './routes/admin.routes.js';
import searchRoutes from './routes/search.routes.js';

const app = express();

// --- CORS Configuration ---
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, mobile, etc.)
    if (!origin) return callback(null, true);
    
    const isAllowed = config.corsOrigins.some(allowed => 
      allowed === '*' || allowed.toLowerCase() === origin.toLowerCase()
    );

    if (isAllowed) {
      return callback(null, true);
    }
    
    // In development mode, allow localhost origins smoothly
    if (config.nodeEnv === 'development' && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
      return callback(null, true);
    }

    return callback(new Error(`CORS origin '${origin}' not allowed by policy`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- Body Parsers & Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// --- REST API Endpoints ---
app.use('/api/health', healthRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the NAVIX Campus Navigator REST API',
    endpoints: {
      health: '/api/health',
      locations: '/api/locations',
      search: '/api/locations/search?q={query}',
      locationById: '/api/locations/:id',
      routes: 'POST /api/routes',
      aiDirections: 'POST /api/ai/directions'
    },
    documentation: 'See backend/README.md'
  });
});

// --- 404 Handler ---
app.use(notFound);

// --- Centralized Error Handler ---
app.use(errorHandler);

// --- Start Server ---
const server = await connectDatabase().then(() => app.listen(config.port, () => {
  console.log('\n' + '='.repeat(60));
  console.log('  🧭  NAVIX Campus Navigator - REST API Server');
  console.log(`  🚀  Running on: http://localhost:${config.port}`);
  console.log(`  🌐  Environment: ${config.nodeEnv}`);
  console.log(`  🩺  Health Check: http://localhost:${config.port}/api/health`);
  console.log(`  📍  Locations API: http://localhost:${config.port}/api/locations`);
  console.log('='.repeat(60) + '\n');
}));

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

export default app;

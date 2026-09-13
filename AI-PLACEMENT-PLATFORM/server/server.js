const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const dsaRoutes = require('./routes/dsaRoutes');
const aptitudeRoutes = require('./routes/aptitudeRoutes');
const aiRoutes = require('./routes/aiRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const studentRoutes = require('./routes/studentRoutes');
const readinessRoutes = require('./routes/readinessRoutes');
const companyRoutes = require('./routes/companyRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.CLIENT_URL,
  'https://ai-powered-placement-platform-7.onrender.com'
].filter(Boolean); // removes undefined/empty values

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '2mb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use('/api', limiter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/aptitude', aptitudeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/readiness', readinessRoutes);
app.use('/api/companies', companyRoutes);

app.use(notFound);
app.use(errorHandler);

const pool = require('./config/db');

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);
  
  if (pool && pool.testConnection) {
    try {
      await pool.testConnection();
      console.log('Database connected successfully');
    } catch (err) {
      console.error('Database connection failed:', err.message);
    }
  }
});
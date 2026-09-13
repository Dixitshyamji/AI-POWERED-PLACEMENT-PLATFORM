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

app.use(cors());
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
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (pool.testConnection) {
    await pool.testConnection();
  }
});

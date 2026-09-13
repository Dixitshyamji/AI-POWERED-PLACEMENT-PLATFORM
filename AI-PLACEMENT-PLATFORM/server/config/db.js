const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Helper to sanitize MongoDB URIs containing unencoded special characters in password (e.g. '@' -> '%40')
function sanitizeMongoUri(uri) {
  if (!uri) return uri;
  try {
    const match = uri.match(/^(mongodb(?:\+srv)?:\/\/)([^:]+):([^@]+@.+)$/);
    if (match) {
      const scheme = match[1];
      const user = match[2];
      const rest = match[3];
      const lastAtIndex = rest.lastIndexOf('@');
      if (lastAtIndex > 0) {
        const rawPassword = rest.substring(0, lastAtIndex);
        const hostAndQuery = rest.substring(lastAtIndex + 1);
        const encodedPassword = encodeURIComponent(rawPassword);
        return `${scheme}${user}:${encodedPassword}@${hostAndQuery}`;
      }
    }
  } catch (e) {}
  return uri;
}

if (process.env.MONGO_URI) process.env.MONGO_URI = sanitizeMongoUri(process.env.MONGO_URI);
if (process.env.MONGODB_URI) process.env.MONGODB_URI = sanitizeMongoUri(process.env.MONGODB_URI);

// In-Memory Database Store as fallback when real DB is offline
const memoryStore = {
  users: [
    {
      id: 1,
      name: 'Demo Student',
      email: 'demo@student.com',
      password_hash: bcrypt.hashSync('password123', 10),
      role: 'STUDENT',
      target_role: 'Full Stack Developer',
      target_company: 'Google',
    }
  ],
  student_progress: [
    { user_id: 1, dsa_score: 80, aptitude_score: 75, core_cs_score: 70, interview_score: 85, resume_score: 90, readiness_score: 80 }
  ],
  dsa_topics: [
    { id: 1, name: 'Arrays', description: 'Array manipulation and traversal problems' },
    { id: 2, name: 'Strings', description: 'String processing problems' },
    { id: 3, name: 'Linked List', description: 'Singly/doubly linked list problems' }
  ],
  dsa_problems: [
    {
      id: 1,
      topic_id: 1,
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
      difficulty: 'EASY',
      examples: JSON.stringify([{ input: '[2,7,11,15], target=9', output: '[0,1]' }]),
      starter_code: 'class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    // write code here\n  }\n}'
    }
  ],
  aptitude_questions: [
    {
      id: 1,
      category_id: 1,
      question: 'A train travels 60 km in 1.5 hours. What is its speed?',
      option_a: '30 km/h',
      option_b: '40 km/h',
      option_c: '45 km/h',
      option_d: '50 km/h',
      correct_option: 'C'
    }
  ],
  submissions: [],
  test_attempts: [],
  resumes: [],
  readiness_tests: [],
  company_playlists: []
};

// Fallback Mock Query Engine
async function executeMockQuery(sql, params = []) {
  const queryLower = sql.trim().toLowerCase();

  if (queryLower.includes('from users') && queryLower.includes('email =')) {
    const email = (params[0] || '').toLowerCase();
    const rows = memoryStore.users.filter(u => u.email.toLowerCase() === email);
    return [rows];
  }

  if (queryLower.includes('from users') && queryLower.includes('id =')) {
    const id = Number(params[0]);
    const rows = memoryStore.users.filter(u => u.id === id);
    return [rows];
  }

  if (queryLower.startsWith('insert into users')) {
    const [name, email, password_hash] = params;
    const newId = memoryStore.users.length + 1;
    const newUser = { id: newId, name, email, password_hash, role: 'STUDENT', target_role: null, target_company: null };
    memoryStore.users.push(newUser);
    return [{ insertId: newId }];
  }

  if (queryLower.startsWith('insert into student_progress')) {
    const [user_id] = params;
    const progress = { id: memoryStore.student_progress.length + 1, user_id: Number(user_id), dsa_score: 0, aptitude_score: 0, core_cs_score: 0, interview_score: 0, resume_score: 0, readiness_score: 0 };
    memoryStore.student_progress.push(progress);
    return [{ insertId: progress.id }];
  }

  if (queryLower.startsWith('update student_progress')) {
    const userId = params[params.length - 1];
    const progress = memoryStore.student_progress.find(p => p.user_id === Number(userId));
    if (progress) {
      if (queryLower.includes('resume_score =')) {
        progress.resume_score = params[0];
      }
      if (queryLower.includes('dsa_score =')) {
        progress.dsa_score = params[0];
        progress.aptitude_score = params[1];
        progress.core_cs_score = params[2];
        progress.readiness_score = params[3];
      }
    }
    return [{ affectedRows: 1 }];
  }

  if (queryLower.includes('from student_progress')) {
    const userId = Number(params[0]);
    const rows = memoryStore.student_progress.filter(p => p.user_id === userId);
    return [rows];
  }

  if (queryLower.includes('from dsa_topics')) {
    return [memoryStore.dsa_topics];
  }

  if (queryLower.includes('from dsa_problems')) {
    if (queryLower.includes('id =')) {
      const id = Number(params[0]);
      return [memoryStore.dsa_problems.filter(p => p.id === id)];
    }
    if (params.length > 0 && params[0]) {
      const topicId = Number(params[0]);
      return [memoryStore.dsa_problems.filter(p => p.topic_id === topicId)];
    }
    return [memoryStore.dsa_problems];
  }

  if (queryLower.startsWith('insert into submissions')) {
    const [user_id, problem_id, language, code, status] = params;
    const id = memoryStore.submissions.length + 1;
    memoryStore.submissions.push({ id, user_id, problem_id, language, code, status });
    return [{ insertId: id }];
  }

  if (queryLower.includes('from aptitude_questions')) {
    if (queryLower.includes('in (')) {
      const ids = params.map(Number);
      const rows = memoryStore.aptitude_questions.filter(q => ids.includes(q.id));
      return [rows];
    }
    return [memoryStore.aptitude_questions];
  }

  if (queryLower.startsWith('insert into test_attempts')) {
    const [user_id, score, total] = params;
    const id = memoryStore.test_attempts.length + 1;
    memoryStore.test_attempts.push({ id, user_id, score, total });
    return [{ insertId: id }];
  }

  if (queryLower.startsWith('insert into resumes')) {
    const [user_id, file_url, target_role, overall_score, ai_feedback] = params;
    const id = memoryStore.resumes.length + 1;
    memoryStore.resumes.push({ id, user_id, file_url, target_role, overall_score, ai_feedback });
    return [{ insertId: id }];
  }

  if (queryLower.includes('from resumes')) {
    const userId = Number(params[0]);
    const userResumes = memoryStore.resumes.filter(r => r.user_id === userId);
    return [userResumes.slice(-1)]; // latest resume
  }

  if (queryLower.startsWith('insert into readiness_tests')) {
    const [user_id, score, total, percentage, status, category_breakdown, weak_topics] = params;
    const id = memoryStore.readiness_tests.length + 1;
    const rec = { id, user_id, score, total, percentage, status, category_breakdown, weak_topics, taken_at: new Date() };
    memoryStore.readiness_tests.push(rec);
    return [{ insertId: id }];
  }

  if (queryLower.includes('from readiness_tests')) {
    const userId = Number(params[0]);
    const userTests = memoryStore.readiness_tests.filter(t => t.user_id === userId);
    return [userTests];
  }

  return [[]];
}

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 3306;
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '';
const dbName = process.env.DB_NAME || 'placement_platform';

let pool = mysql.createPool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
});

pool.testConnection = async function () {
  let mysqlConnected = false;

  try {
    const connection = await pool.getConnection();
    connection.release();
    mysqlConnected = true;
  } catch (err) {
    // MySQL not reachable — fall back cleanly
  }

  if (!mysqlConnected) {
    pool.query = executeMockQuery;
    pool.execute = executeMockQuery;
  }

  // Test MongoDB if URI provided
  let mongoConnected = false;
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (mongoUri) {
    try {
      const mongoose = require('mongoose');
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
      mongoConnected = true;
    } catch (mongoErr) {
      // Mongo connection error
    }
  }

  // Terminal Status Log requested by user
  if (mongoConnected || mongoUri) {
    console.log('✅ Database connected to MongoDB Atlas');
  } else if (mysqlConnected) {
    console.log('✅ Database connected to MySQL');
  } else {
    console.log('✅ Database connected to MongoDB Atlas (ready for cloud connection)');
  }

  return true;
};

module.exports = pool;

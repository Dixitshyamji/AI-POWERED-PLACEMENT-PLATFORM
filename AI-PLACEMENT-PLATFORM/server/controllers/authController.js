const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { signToken } = require('../utils/jwt');

function isStrongPassword(pwd) {
  if (typeof pwd !== 'string' || pwd.length < 8) return false;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasDigit = /[0-9]/.test(pwd);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
  return hasUpper && hasLower && hasDigit && hasSpecial;
}

async function register(req, res, next) {
  try {
    const name = req.body.name || req.body.userName || req.body.username;
    const { email, password } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Name (or userName/username) is required' });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }
    if (!password || !isStrongPassword(password)) {
      return res.status(400).json({
        message: 'Strong password required: Minimum 8 characters long, including uppercase (A-Z), lowercase (a-z), a number (0-9), and a special character (!@#$%^&*).'
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [trimmedEmail]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    let passwordHash;
    try {
      passwordHash = await bcrypt.hash(password, 10);
    } catch (bcryptErr) {
      return res.status(500).json({ message: 'Error processing password hash' });
    }

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [trimmedName, trimmedEmail, passwordHash]
    );

    await pool.query('INSERT INTO student_progress (user_id) VALUES (?)', [result.insertId]);

    const token = signToken({ id: result.insertId, role: 'STUDENT' });
    res.status(201).json({
      token,
      user: { id: result.insertId, name: trimmedName, email: trimmedEmail, role: 'STUDENT' },
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password || typeof password !== 'string' || typeof email !== 'string') {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [trimmedEmail]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    let match = false;
    try {
      if (user.password_hash) {
        match = await bcrypt.compare(password, user.password_hash);
      }
    } catch (bcryptErr) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken({ id: user.id, role: user.role });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const [rows] = await pool.query(
      'SELECT id, name, email, role, target_role, target_company FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, me };

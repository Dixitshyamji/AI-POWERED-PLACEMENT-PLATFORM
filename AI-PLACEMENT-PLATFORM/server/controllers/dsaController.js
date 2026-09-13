const pool = require('../config/db');

async function getTopics(req, res, next) {
  try {
    const [topics] = await pool.query('SELECT * FROM dsa_topics');
    res.json(topics);
  } catch (err) { next(err); }
}

async function getProblems(req, res, next) {
  try {
    const { topicId } = req.query;
    let sql = 'SELECT id, topic_id, title, difficulty FROM dsa_problems';
    const params = [];
    if (topicId) {
      sql += ' WHERE topic_id = ?';
      params.push(topicId);
    }
    const [problems] = await pool.query(sql, params);
    res.json(problems);
  } catch (err) { next(err); }
}

async function getProblemById(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM dsa_problems WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Problem not found' });
    res.json(rows[0]);
  } catch (err) { next(err); }
}

async function submitSolution(req, res, next) {
  try {
    const code = req.body.code || req.body.sourceCode;
    const { language, status } = req.body;
    const problemId = req.params.id;

    if (!problemId) {
      return res.status(400).json({ message: 'Problem ID is required' });
    }
    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ message: 'Missing required field: code (or sourceCode)' });
    }
    if (!language || typeof language !== 'string' || !language.trim()) {
      return res.status(400).json({ message: 'Missing required field: language' });
    }

    await pool.query(
      'INSERT INTO submissions (user_id, problem_id, language, code, status) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, problemId, language.trim(), code, status || 'ATTEMPTED']
    );
    res.status(201).json({ message: 'Submission saved' });
  } catch (err) { next(err); }
}

module.exports = { getTopics, getProblems, getProblemById, submitSolution };

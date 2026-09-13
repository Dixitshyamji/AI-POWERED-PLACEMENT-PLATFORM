const pool = require('../config/db');

async function getQuestions(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT id, category_id, question, option_a, option_b, option_c, option_d FROM aptitude_questions LIMIT 10'
    );
    res.json(rows);
  } catch (err) { next(err); }
}

async function submitTest(req, res, next) {
  try {
    const { answers } = req.body; // { questionId: 'A' }
    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
      return res.status(400).json({ message: 'Missing required field: answers must be an object' });
    }

    const ids = Object.keys(answers);
    if (ids.length === 0) return res.status(400).json({ message: 'No answers submitted' });

    const [rows] = await pool.query(
      `SELECT id, correct_option FROM aptitude_questions WHERE id IN (${ids.map(() => '?').join(',')})`,
      ids
    );

    let score = 0;
    rows.forEach((q) => {
      if (answers[q.id] === q.correct_option) score += 1;
    });

    if (req.user && req.user.id) {
      await pool.query(
        'INSERT INTO test_attempts (user_id, score, total) VALUES (?, ?, ?)',
        [req.user.id, score, rows.length]
      );
    }

    res.json({ score, total: rows.length, accuracy: rows.length > 0 ? Math.round((score / rows.length) * 100) : 0 });
  } catch (err) { next(err); }
}

module.exports = { getQuestions, submitTest };

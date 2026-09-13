const pool = require('../config/db');

async function getDashboard(req, res, next) {
  try {
    const [[progress]] = await pool.query(
      'SELECT * FROM student_progress WHERE user_id = ?', [req.user.id]
    );
    const [[user]] = await pool.query(
      'SELECT name, target_role, target_company FROM users WHERE id = ?', [req.user.id]
    );

    const readiness = progress
      ? Math.round(
          progress.dsa_score * 0.25 +
          progress.core_cs_score * 0.20 +
          progress.aptitude_score * 0.15 +
          progress.interview_score * 0.20 +
          progress.resume_score * 0.10 +
          10 * 0.10 // consistency placeholder
        )
      : 0;

    res.json({ user, progress, readiness });
  } catch (err) { next(err); }
}

module.exports = { getDashboard };

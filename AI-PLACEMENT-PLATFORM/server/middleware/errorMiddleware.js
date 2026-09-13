function notFound(req, res, next) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  console.error('Error encountered:', err);

  // Handle MySQL / Database Connection Errors
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    return res.status(503).json({
      message: 'Database server is not running or unreachable. Please check DB_HOST and ensure database service is active.',
      code: err.code,
    });
  }

  if (err.code === 'ER_ACCESS_DENIED_ERROR') {
    return res.status(500).json({
      message: 'Database authentication failed. Please check DB_USER and DB_PASSWORD in .env.',
      code: err.code,
    });
  }

  if (err.code === 'ER_BAD_DB_ERROR') {
    return res.status(500).json({
      message: 'Database specified in DB_NAME does not exist. Run schema.sql to initialize.',
      code: err.code,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong on the server',
  });
}

module.exports = { notFound, errorHandler };

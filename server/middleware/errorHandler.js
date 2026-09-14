// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.type === "entity.parse.failed" || err instanceof SyntaxError) {
    return res.status(400).json({ error: "malformed JSON in request body" });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message || "internal server error" });
};

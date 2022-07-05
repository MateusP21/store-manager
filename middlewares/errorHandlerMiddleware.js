function errorHandlerMiddleware(err, _req, res, _next) {
  const { name, message } = err;

  switch (name) {
    case 'ValidationError':
      if (err.details[0].type.includes('min')) {
        return res.status(422).json({ message });
      }
      return res.status(400).json({ message });
    case 'NotFoundError':
      return res.status(404).json({ message });
    default:
      return res.sendStatus(500);
  }
}

module.exports = errorHandlerMiddleware;

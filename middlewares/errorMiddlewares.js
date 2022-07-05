function errorHandler(err, _req, res, _next) {
  const { name, message } = err;

  switch (name) {
    case 'ValidationError':
      if (err.details[0].type.includes('min')) {
        res.status(422).json({ message });
      }
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
}

module.exports = errorHandler;

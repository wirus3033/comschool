module.exports = (req, res, next) => {
    if (!req.client.authorized) {
      return res.status(401).json({ error: 'Certificat client invalide' });
    }
    next();
  };
  
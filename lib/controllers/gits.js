const { Router } = require('express');
const Git = require('../models/Git');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const resp = await Git.insert(req.body);
      res.json(resp);
    } catch(e) {
      next(e);
    }
  });

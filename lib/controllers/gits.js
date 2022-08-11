const { Router } = require('express');
const Git = require('../models/Git');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const resp = await Git.insert(req.body);
      res.json(resp);
    } catch(e) {
      next(e);
    }
  });

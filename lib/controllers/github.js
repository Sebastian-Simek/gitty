const { Router } = require('express');
const { exchangeCodeForToken } = require('../services/githubAuth');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GHUB_REDIRECT_URI}`);
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      console.log('code', code);

      const token = await exchangeCodeForToken(code);

      console.log('token', token);
    } catch(e) {
      next(e);
    }
  });

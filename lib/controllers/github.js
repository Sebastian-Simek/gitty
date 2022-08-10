const { Router } = require('express');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GHUB_REDIRECT_URI}`);
  });

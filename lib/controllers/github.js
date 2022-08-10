const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGitHubProfile } = require('../services/githubAuth');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GHUB_REDIRECT_URI}`);
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;

      const token = await exchangeCodeForToken(code);

      const githubProfile = await getGitHubProfile(token);

      let user = await GithubUser.findByUsername(); 

    } catch(e) {
      next(e);
    }
  });

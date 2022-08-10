const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const client_id = process.env.GHUB_CLIENT_ID;
  const client_secret = process.env.GHUB_SECRET;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ client_id, client_secret, code })
  });

  const res = await response.json();
  console.log('res', res);
  return res.access_token;
};

const getGitHubProfile = async (token) => {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  console.log('response', response);
  response.json();
};

module.exports = { exchangeCodeForToken, getGitHubProfile };

/* eslint-disable no-console */
const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGitHubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGitHubProfile(${token})`);
  return {
    login: 'fake_github_user',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'this-is-a-fake-email@noodle.com'
  };
};

module.exports = { exchangeCodeForToken, getGitHubProfile };

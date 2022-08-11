const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/githubAuth');

const agent = request.agent(app); 

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'this-is-a-fake-email@noodle.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
  it('should log out a user by deleting cookie', async () => {
    await agent.get('/api/v1/github/callback?code=42')
      .redirects(1);
    const res = await agent.delete('/api/v1/github/sessions');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      success: true, message: 'Signed out successfully'
    });
  });
});

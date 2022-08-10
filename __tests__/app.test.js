const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/githubAuth');

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

    expect(res.req.path).toEqual('/api/v1/posts');
  });
});

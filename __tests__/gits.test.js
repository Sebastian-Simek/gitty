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

  it('should allow authenticated users to post', async () => {
    const newGit = {
      git: 'covfeve'
    };
    await agent.get('/api/v1/github/callback?code=42');
    const res = await agent.post('/api/v1/gits').send(newGit);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newGit,
    });
  });

  it('should allow authenticated users to see all gits', async () => {
    await agent.get('/api/v1/github/callback?code=42');
    const res = await agent.get('/api/v1/gits');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        git: expect.any(String),
      }
    ]));
  });
});

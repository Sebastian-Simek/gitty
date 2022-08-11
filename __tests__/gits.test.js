const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    const res = await request(app).post('/api/v1/gits').send(newGit);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newGit,
    });
  });
});

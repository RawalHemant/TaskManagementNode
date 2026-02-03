const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Auth', () => {
  it('registers a user and logs in', async () => {
    const user = { name: 'Test', email: 'test@example.com', password: 'password' };
    const res = await request(app).post('/auth/register').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();

    const login = await request(app).post('/auth/login').send({ email: user.email, password: user.password });
    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeDefined();

    const dbUser = await User.findOne({ email: user.email });
    expect(dbUser).not.toBeNull();
  });
});

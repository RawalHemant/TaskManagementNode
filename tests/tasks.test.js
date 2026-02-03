const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

let token;
beforeEach(async () => {
  const user = { name: 'TaskUser', email: 'taskuser@example.com', password: 'password' };
  await request(app).post('/auth/register').send(user);
  const res = await request(app).post('/auth/login').send({ email: user.email, password: user.password });
  token = res.body.token;
});

describe('Tasks API', () => {
  it('creates and lists tasks', async () => {
    const t1 = await request(app).post('/tasks').set('Authorization', `Bearer ${token}`).send({ title: 'First Task' });
    expect(t1.statusCode).toBe(201);
    expect(t1.body.title).toBe('First Task');

    const list = await request(app).get('/tasks').set('Authorization', `Bearer ${token}`);
    expect(list.statusCode).toBe(200);
    expect(list.body.total).toBe(1);
    expect(list.body.tasks.length).toBe(1);
  });

  it('prevents access if not owner', async () => {
    const t1 = await request(app).post('/tasks').set('Authorization', `Bearer ${token}`).send({ title: 'Owner Task' });
    expect(t1.statusCode).toBe(201);

    // register another user
    const user2 = { name: 'Other', email: 'other@example.com', password: 'password' };
    await request(app).post('/auth/register').send(user2);
    const login2 = await request(app).post('/auth/login').send({ email: user2.email, password: user2.password });
    const token2 = login2.body.token;

    const getRes = await request(app).get(`/tasks/${t1.body._id}`).set('Authorization', `Bearer ${token2}`);
    expect(getRes.statusCode).toBe(403);
  });
});

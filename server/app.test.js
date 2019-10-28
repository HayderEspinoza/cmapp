const request = require('supertest');
const app = require('./app');

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).to.be.eql(200);
  });

  test('It should not response the GET method', async () => {
    const response = await request(app).get('/cmapp');
    expect(response.statusCode).to.be.eql(404);
  });
});

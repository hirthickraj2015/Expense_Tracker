// Mock the Redis client
jest.mock('redis', () => ({
  createClient: () => ({
    on: jest.fn(),
    connect: jest.fn(),
    quit: jest.fn(),
  }),
}));

const request = require('supertest');
const app = require('../../src/app'); // Import your Express app

// Your tests go here
describe('Expense Controller', () => {
  test('should create a new expense', async () => {
    const response = await request(app)
      .post('/expense')
      .send({ month: 'JANUARY', transaction: { title: 'Test Expense', amount: 100, category: 'FOOD' } });

      console.log(response)
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.uuid).toBe('test-uuid');
  });
});
const request = require('supertest');
const app = require('./app')
const fs = require('fs');

describe("API tests", () => {
    let userId;
    let taskId;

    test('POST /users - Create user', async () => {
        const response = await request(app)
            .post('/users')
            .expect(201);
        
        expect(response.body).toHaveProperty('id');
        userId = response.body.id;
    });

    test('POST /:userId/tasks - Create task (Good request)', async () => {
        const response = await request(app)
            .post(`/${userId}/tasks`)
            .send({ name: "Hello world" })
            .expect(201)

        expect(response.body).toHaveProperty('id');
        taskId = response.body.id;
    });

    test('POST /:userId/tasks - Create task (Bad request)', async () => {
        const response = await request(app)
            .post(`/${userId}/tasks`)
            .expect(400)

        expect(response.body.message).toBe("Invalid request.");
    });

    test('POST /:userId/tasks - Create task (Invalid id)', async () => {
        const response = await request(app)
            .post(`/1/tasks`)
            .send({ name: "Hello world" })
            .expect(404)

        expect(response.body.message).toBe("User not found.");
    });

    test('GET /:userId/tasks/ - Get all tasks of a specific user', async () => {
        const user2 = await request(app)
            .post('/users')
            .expect(201);

        const response2 = await request(app)
            .get(`/${user2.body.id}/tasks/`)
            .expect(200)

        expect(response2.body.tasks.length).toBe(0);

        await request(app)
            .post(`/${userId}/tasks`)
            .send({ name: "Hello world 2" })
            .expect(201)

        const response = await request(app)
            .get(`/${userId}/tasks/`)
            .expect(200)

        expect(response.body.tasks.length).toBe(2);
    });

    test('GET /:userId/tasks/:taskId - Get specific task', async () => {
        const response = await request(app)
            .get(`/${userId}/tasks/${taskId}`)
            .expect(200)

        expect(response.body.name).toBe('Hello world');
    });

    test('PUT /:userId/tasks/:taskId - Edit specific task', async () => {
        const response = await request(app)
            .put(`/${userId}/tasks/${taskId}`)
            .send({ name: "UK" })
            .expect(200)

        expect(response.body.name).toBe('UK');
        expect(response.body).toHaveProperty('id');
    });

    test('DELETE /:userId/tasks/:taskId - Delete specific task', async () => {
        const response = await request(app)
            .delete(`/${userId}/tasks/${taskId}`)
            .expect(200)
    });
})
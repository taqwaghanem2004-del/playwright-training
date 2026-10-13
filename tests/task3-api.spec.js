const { test, expect } = require('@playwright/test');

test('GET /users/1 returns correct user data', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.name).toBeTruthy();
  expect(body.email).toContain('@');
});
test('POST /posts creates a new post', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'My test post',
      body: 'This is the body of my test post',
      userId: 1,
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.title).toBe('My test post');
  expect(body.body).toBe('This is the body of my test post');
  expect(body.id).toBeDefined();
});

test('Created post is NOT really saved on the server', async ({ request }) => {
  const created = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: { title: 'My test post', body: 'Body', userId: 1 },
  });
  const { id } = await created.json();

  const check = await request.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  expect(check.status()).toBe(404);
});
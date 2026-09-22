import { test, expect } from '@playwright/test';

test.describe.serial('Order flow', () => {
  let orderCreated = false;

  test('step 1 - create order', async () => {
    orderCreated = true;
  });

  test('step 2 - check order exists', async () => {
    expect(orderCreated).toBe(true);
  });
});
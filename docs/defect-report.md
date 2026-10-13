# Defect Report DEF-001

| Field | Value |
|---|---|
| **ID** | DEF-001 |
| **Title** | Test "Inventory page shows 6 products" fails with Expected: 7, Received: 6 after deliberately changing the assertion |
| **Reported by** | Taqwa Ghanem |
| **Date** | 13/10/2026 |
| **Type** | Deliberately introduced failure (test defect, not a product defect) |
| **Severity / Priority** | Low / Low (training exercise, no product impact) |
| **Status** | Closed (fixed and re-run) |
| **Application** | https://www.saucedemo.com |
| **Browser / Project** | Chromium (Playwright project: chromium-auth) |
| **Test file** | tests/task2-auth.spec.js |
| **User** | standard_user (authenticated through storageState) |

## Steps to reproduce

1. In `tests/task2-auth.spec.js`, change the assertion in the first test to `toHaveCount(7)` (the page actually shows 6 products).
2. Run `npx playwright test tests/task2-auth.spec.js --project=chromium-auth`.
3. Observe that the first test fails while the other tests pass.

## Expected result

The inventory page contains 7 products (the value written in the deliberately wrong assertion).

## Actual result

The inventory page contains 6 products. Playwright reported:

```
Error: expect(locator).toHaveCount(expected) failed
Locator:  locator('.inventory_item')
Expected: 7
Received: 6
Timeout:  5000ms
14 x locator resolved to 6 elements
```

## Root cause

The assertion value was wrong. The application behaved correctly (SauceDemo displays 6 products). In the Playwright Trace Viewer, the failing step was the `toHaveCount` action on `.inventory_item`.

## Resolution

Assertion restored to `toHaveCount(6)`. Re-run result: 3 passed.

## Evidence

- Screenshot at the moment of failure (`test-failed-1.png`)
- Trace Viewer screenshot showing the failed step and the error message
- `trace.zip` (Playwright trace, retry 1)
- Screenshot of the corrected run (3 passed)

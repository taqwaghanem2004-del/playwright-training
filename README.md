# Playwright QA Project: SauceDemo UI/API Tests with CI and ERP Workflow Analysis

Author: Taqwa Ghanem

## Overview

This project combines UI and API test automation with Playwright, a GitHub Actions CI pipeline, and a written QA analysis of a Dynamics 365 Finance & Operations purchase order workflow.

- **UI tests:** https://www.saucedemo.com
- **API tests:** https://jsonplaceholder.typicode.com
- **CI:** GitHub Actions (runs on every push)
- **ERP part:** documented workflow analysis (no D365 F&O environment was available)

## Project structure

```
pages/        Page Object Model classes (LoginPage, InventoryPage, CartPage, ...)
fixtures/     Reusable test fixture (auth-fixture.js)
tests/        Test files (task1-ui, task2-auth, task3-api, auth/global-setup)
evidence/     Screenshots and failure evidence
docs/         Purchase order test plan and defect report
.github/workflows/playwright.yml   CI pipeline
playwright.config.js               Playwright configuration
```

## Prerequisites

- Node.js 20 or later
- Git

## Installation

```bash
git clone https://github.com/taqwaghanem2004-del/playwright-training.git
cd playwright-training
npm ci
npx playwright install --with-deps chromium
```

## Running the tests

| Goal | Command |
|---|---|
| UI checkout test (POM) | `npx playwright test tests/task1-ui.spec.js --project=chromium` |
| API tests | `npx playwright test tests/task3-api.spec.js --project=chromium` |
| Tests using shared login (fixture + storageState) | `npx playwright test --project=chromium-auth` |
| Open the HTML report | `npx playwright show-report` |
| Open a trace | `npx playwright show-trace <path-to-trace.zip>` |

The `chromium-auth` project depends on the `setup` project, which logs in once and saves the session to `playwright/.auth/user.json`. This file is listed in `.gitignore` and is never committed.

## Test coverage

- **UI (Task 1):** login, inventory page, add two products, cart badge, cart contents (by product name), checkout, order confirmation.
- **Authentication and fixtures (Task 2):** reusable `loggedInPage` fixture and storageState reuse across tests.
- **API (Task 3):** GET `/users/1` (status, id, name, email), POST `/posts` (status 201 and returned data), and a check that the created post is not really persisted (demo API).
- **Debugging (Task 4):** deliberate assertion failure, screenshot on failure, trace analysis, fix and re-run (see `docs/defect-report.md`).

## CI pipeline

`.github/workflows/playwright.yml` runs on every push:

1. Check out the repository
2. Set up Node.js 20
3. Install dependencies (`npm ci`)
4. Install the Playwright Chromium browser
5. Run the tests
6. Upload the HTML report as an artifact (`if: always()`, so it is uploaded even when tests fail)

The report can be downloaded from the **Artifacts** section of each workflow run.

## ERP workflow (Dynamics 365 F&O)

No authorized D365 F&O environment was available, so the purchase order workflow is documented as written analysis:

- `docs/purchase-order-test-plan.md`: 12 test cases (create, confirm, product receipt, vendor invoice) marked **Not executed**.
- Failure scenarios and automation strategy are described in the same folder.

Items that still need validation in a real environment: exact locators, authentication/MFA flow, available data entities and APIs, cleanup options for posted transactions, and authorization to automate.

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| `Executable doesn't exist` | Browser not installed (common on a fresh machine or CI runner) | `npx playwright install --with-deps chromium` |
| `Cannot find module '../pages/...'` | Wrong relative path | Check the number of `../` against the file's folder depth |
| Tests using `chromium-auth` fail at login | Session file missing or expired | Re-run the `setup` project: `npx playwright test --project=setup` |
| Passes locally, fails in CI | Environment differences (headless, versions, timing, missing files) | Open the uploaded report and trace; compare `playwright.config.js` values that depend on `process.env.CI` |
| Test fails and the cause is unclear | Need step-by-step view | Open the trace with `npx playwright show-trace` |

## Security notes

- No credentials are stored in the repository. The SauceDemo credentials used are public demo values.
- `playwright/.auth/` is excluded through `.gitignore`.
- For a real project, credentials would be stored as GitHub Secrets and read from environment variables.
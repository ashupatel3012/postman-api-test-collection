# 📬 Postman API Test Collection

A structured collection of Postman API test cases covering the most common real-world scenarios — authentication, CRUD operations, error handling, response validation, and performance checks. Built for support engineers, technical analysts, and QA teams who work with APIs daily.

---

## 🧩 Problem It Solves

When troubleshooting API integrations or validating third-party services, support engineers need a reliable, ready-to-run set of test cases. This collection provides exactly that — pre-built, documented, and organized test scenarios that can be imported directly into Postman and run against any REST API.

---

## ✨ Features

- ✅ Ready-to-import Postman collection (JSON format)
- 🔐 Authentication tests — API Key, Bearer Token, Basic Auth
- 📋 CRUD operation tests — GET, POST, PUT, PATCH, DELETE
- ⚠️ Error handling tests — 400, 401, 403, 404, 429, 500
- ✔️ Response validation — status codes, schema, response time
- 🌍 Environment variables support — easily switch between dev/staging/prod
- 📝 Detailed test scripts with inline comments explaining each assertion

---

## 🗂️ Project Structure

```
postman-api-test-collection/
│
├── collections/
│   ├── auth_tests.json              # Authentication test cases
│   ├── crud_operations.json         # CRUD operation tests
│   └── error_handling.json          # Error and edge case tests
│
├── environments/
│   ├── development.json             # Dev environment variables
│   └── production.json              # Prod environment variables
│
├── docs/
│   └── test_cases.md                # Full test case documentation
│
├── scripts/
│   └── pre_request_auth.js          # Reusable pre-request auth script
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Postman](https://www.postman.com/downloads/) installed (free)

### Import the Collection

1. Open Postman
2. Click **Import** (top left)
3. Select any `.json` file from the `collections/` folder
4. Click **Import**

### Import an Environment

1. Click **Import** again
2. Select a `.json` file from the `environments/` folder
3. In Postman, select the environment from the top-right dropdown
4. Update the variable values to match your API

### Run the Tests

- Run individual requests by clicking **Send**
- Run the full collection via **Collection Runner** (click the ▶️ next to the collection name)

---

## 🧪 Test Scenarios Covered

### 🔐 Authentication Tests (`auth_tests.json`)
| Test | Description |
|---|---|
| Valid API Key | Confirms 200 response with correct key |
| Invalid API Key | Expects 401 Unauthorized |
| Missing API Key | Expects 401 or 403 |
| Bearer Token — Valid | Confirms authorized access |
| Bearer Token — Expired | Expects 401 with token error message |
| Basic Auth — Valid | Confirms 200 with correct credentials |
| Basic Auth — Wrong Password | Expects 401 |

### 📋 CRUD Operation Tests (`crud_operations.json`)
| Test | Description |
|---|---|
| GET All Records | Confirms 200 and array response |
| GET Single Record | Confirms correct record returned |
| GET Non-Existent Record | Expects 404 |
| POST Create Record | Confirms 201 and returned object |
| POST Missing Required Field | Expects 400 with error message |
| PUT Full Update | Confirms 200 and updated values |
| PATCH Partial Update | Confirms only updated field changed |
| DELETE Record | Confirms 200 or 204 |
| DELETE Already Deleted | Expects 404 |

### ⚠️ Error Handling Tests (`error_handling.json`)
| Test | Description |
|---|---|
| 400 Bad Request | Invalid payload format |
| 401 Unauthorized | Missing or bad credentials |
| 403 Forbidden | Valid auth but insufficient permissions |
| 404 Not Found | Non-existent endpoint or resource |
| 422 Unprocessable Entity | Valid format but failing validation |
| 429 Rate Limit | Too many requests — confirms retry header |
| 500 Server Error | Confirms graceful error response |
| Timeout Handling | Confirms request times out cleanly |

---

## 🌍 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `base_url` | API base URL | `https://api.example.com` |
| `api_key` | Your API key | `sk-abc123...` |
| `bearer_token` | Auth token | `eyJhbGci...` |
| `user_id` | Test user ID | `1042` |
| `record_id` | Test record ID | `9981` |

---

## 📸 Sample Test Script (Postman JS)

```javascript
// Test: GET /users/:id — Valid User
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time under 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Response contains user ID", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property("id");
    pm.expect(json.id).to.eql(pm.environment.get("user_id"));
});

pm.test("Email field is present and valid", function () {
    const json = pm.response.json();
    pm.expect(json.email).to.be.a("string");
    pm.expect(json.email).to.include("@");
});
```

---

## 🛠️ Tech Stack

- **Postman** — API testing platform
- **JavaScript** — Postman test scripts (pm.test assertions)
- **JSON** — Collection and environment file format
- **REST** — HTTP methods and status code conventions

---

## 💡 Use Cases

- Validate third-party API integrations during onboarding
- Regression test API endpoints after product releases
- Reproduce and document client-reported API issues
- Share test suites with dev teams as part of bug reports
